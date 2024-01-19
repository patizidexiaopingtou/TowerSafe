#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Copyright (c) 2020-2021 Huawei Device Co., Ltd.
# 
# HDF is dual licensed: you can use it either under the terms of
# the GPL, or the BSD license, at your option.
# See the LICENSE file in the root of this repository for complete details.


import json
import os
import hashlib
import platform
import configparser
import re
from ast import literal_eval

from hdf_tool_exception import HdfToolException
from hdf_tool_settings import HdfToolSettings
from command_line.hdf_command_error_code import CommandErrorCode


class WordsConverter(object):
    def __init__(self, words_str):
        self.words_str = words_str
        if len(self.words_str) == 0:
            raise HdfToolException('empty words')
        self.words_list = self.split()
        self.upper = '_'.join([w.upper() for w in self.words_list])
        self.lower = '_'.join([w.lower() for w in self.words_list])
        self.upper_camel = ''.join([w.capitalize() for w in self.words_list])
        if len(self.upper_camel) == 1:
            self.lower_camel = self.upper_camel[0].lower()
        else:
            self.lower_camel = '%s%s' % (self.upper_camel[0].lower(),
                                         self.upper_camel[1:])

    def _capital_pos_generator(self):
        count = len(self.words_str)
        for i in range(count):
            if self.words_str[i].isupper():
                yield i
        yield count

    def split(self):
        words_list = []
        capital_split_words = []
        start = 0
        for i in self._capital_pos_generator():
            end = i
            if end != start:
                capital_split_words.append(self.words_str[start:end])
                start = end
        for word in capital_split_words:
            words_list.extend([w for w in word.split('_') if w])
        return words_list

    def upper_case(self):
        return self.upper

    def lower_case(self):
        return self.lower

    def upper_camel_case(self):
        return self.upper_camel

    def lower_camel_case(self):
        return self.lower_camel


class SectionRange(object):
    def __init__(self, start_pos, end_pos):
        self.start_pos = start_pos
        self.end_pos = end_pos


class SectionContent(object):
    def __init__(self, begin_flag, content, end_flag):
        self.begin_flag = begin_flag
        self.content = content
        self.end_flag = end_flag

    def to_str(self):
        return '%s%s%s' % (self.begin_flag, self.content, self.end_flag)


def find_section(file_content, section_content):
    if not file_content or not section_content:
        return False
    start_pos = file_content.find(section_content.begin_flag)
    if start_pos == -1:
        return False
    end_pos = file_content.find(section_content.end_flag)
    if end_pos == -1:
        return False
    return SectionRange(start_pos, end_pos + len(section_content.end_flag) - 1)


def _write_one_section(file_obj, section_content):
    if not file_obj or not section_content:
        return
    file_obj.write(section_content.begin_flag)
    file_obj.write(section_content.content)
    file_obj.write(section_content.end_flag)


def add_before_and_save(file_content, file_path, pos_range, new_section):
    if not file_content or not file_path or not pos_range or not new_section:
        return
    config_info = HdfToolSettings().get_file_config_info()
    write_fd = os.open(file_path, config_info["flags"], config_info["modes"])
    with os.fdopen(write_fd, "w", newline='\n') as file_write:
        file_write.write(file_content[:pos_range.start_pos])
        _write_one_section(file_write, new_section)
        file_write.write(file_content[pos_range.start_pos:])


def add_after_and_save(file_content, file_path, pos_range, new_section):
    if not file_content or not file_path or not pos_range or not new_section:
        return
    with open(file_path, 'w', newline='\n') as file_write:
        file_write.write(file_content[:pos_range.end_pos + 1])
        _write_one_section(file_write, new_section)
        if len(file_content) > pos_range.end_pos + 1:
            file_write.write(file_content[pos_range.end_pos + 1:])


def append_and_save(file_content, file_path, new_section):
    if not file_content or not file_path or not new_section:
        return
    with open(file_path, 'w', newline='\n') as file_write:
        file_write.write(file_content)
        _write_one_section(file_write, new_section)


def delete_and_save(file_content, file_path, delete_range):
    if not file_content or not file_path or not delete_range:
        return
    length = len(file_content)
    with open(file_path, 'w', newline='\n') as file_write:
        file_write.write(file_content[:delete_range.start_pos])
        if delete_range.end_pos + 1 < length:
            file_write.write(file_content[delete_range.end_pos + 1:])


def replace_and_save(file_content, file_path, old_range, new_section):
    if not file_content or not file_path or not old_range or not new_section:
        return
    with open(file_path, 'w', newline='\n') as file_write:
        file_write.write(file_content[:old_range.start_pos])
        _write_one_section(file_write, new_section)
        file_write.write(file_content[old_range.end_pos + 1:])


def get_id(part2):
    full_name = part2
    return hashlib.sha256(full_name.encode('utf8')).hexdigest()[:32]


def create_dirs(dir_path):
    if dir_path and not os.path.exists(dir_path):
        try:
            os.makedirs(dir_path)
        except Exception:
            raise HdfToolException('create dirs fail: %s' % dir_path)


def read_file(file_path):
    with open(file_path, encoding="utf-8") as file_read:
        content = file_read.read()
    return content


def read_file_lines(file_path, code_type="utf-8"):
    with open(file_path, encoding=code_type) as file_read:
        lines = file_read.readlines()
    return lines


def read_file_binary(file_path):
    with open(file_path, "rb") as file_binary_read:
        temp_file_lines = file_binary_read.readlines()
    file_lines = []
    for line in temp_file_lines:
        if line.startswith(b"#") or not (line.strip()):
            continue
        else:
            file_lines.append(line.decode("utf-8"))
    return file_lines


def write_file(file_path, content):
    with open(file_path, 'w+', newline='\n') as file_write:
        file_write.write(content)


def write_file_lines(file_path, content, code_type="utf-8"):
    config_info = HdfToolSettings().get_file_config_info()
    write_fd = os.open(file_path, config_info["flags"], config_info["modes"])
    with os.fdopen(write_fd, "w", encoding=code_type) as file_write:
        file_write.writelines(content)


def get_framework_lite_dir(root):
    return os.path.join(root, 'drivers', 'adapter', 'khdf', 'liteos')


def get_vendor_root_dir(root):
    return os.path.join(root, 'vendor')


def get_vendor_dir(root, vendor):
    return os.path.join(get_vendor_root_dir(root), vendor)


def get_vendor_hdf_dir_framework(root):
    relative_path = HdfToolSettings().get_drivers_path_framework()
    return os.path.join(root, relative_path)


def module_save_file_info(root):
    adapter_framework = get_vendor_hdf_dir_framework(root=root)
    if not os.path.exists(adapter_framework):
        raise HdfToolException(
            ' adapter model path  "%s" not exist' %
            adapter_framework, CommandErrorCode.TARGET_NOT_EXIST)
    save_file_path = HdfToolSettings().get_module_save_path()
    create_file_save_path = os.path.join(adapter_framework, save_file_path)
    if not os.path.exists(create_file_save_path):
        raise HdfToolException(
            'create file config "%s" not exist' %
            create_file_save_path, CommandErrorCode.TARGET_NOT_EXIST)
    return create_file_save_path


def get_vendor_hdf_dir_peripheral(root):
    relative_path = HdfToolSettings().get_drivers_path_peripheral()
    return os.path.join(root, relative_path)


def get_vendor_hdf_dir_adapter(root, kernel='liteos'):
    relative_path = HdfToolSettings().get_drivers_path_adapter()
    return os.path.join(root, relative_path, kernel)


def get_vendor_lite_mk_path(root):
    return os.path.join(get_vendor_hdf_dir_adapter(root), 'hdf_lite.mk')


def get_vendor_makefile_path(root, kernel):
    return os.path.join(get_vendor_hdf_dir_adapter(root, kernel), 'Makefile')


def get_dot_configs_path(root, vendor, board):
    path = os.path.join(root, "vendor", vendor, board, 'kernel_configs')
    return [os.path.join(path, i) for i in os.listdir(path)]


def get_module_dir(root, module=""):
    return os.path.join(get_vendor_hdf_dir_framework(root), 'model', module)


def get_drv_root_dir(root, module):
    return os.path.join(get_module_dir(root, module), 'driver')


def get_drv_dir(root, module, driver):
    return os.path.join(get_drv_root_dir(root, module), driver)


def get_drv_src_dir(root, module):
    return get_drv_root_dir(root, module)


def get_drv_src_dir_peripheral(root, module):
    return get_vendor_hdf_dir_peripheral(root)


def get_drv_include_dir(root, module, driver):
    return os.path.join(get_drv_dir(root, module, driver), 'include')


def get_vendor_kconfig_path(root,  kernel):
    hdf_dir = get_vendor_hdf_dir_adapter(root, kernel)
    return os.path.join(hdf_dir, 'Kconfig')


def get_module_kconfig_path(root, module):
    return os.path.join(get_drv_root_dir(root, module), 'Kconfig')


def get_module_mk_path(root, module):
    return os.path.join(get_drv_root_dir(root, module), 'Makefile')


def get_liteos_a_dot_config_path(root):
    return os.path.join(root, 'kernel', 'liteos_a', '.config')


def get_resources_dir():
    cur_dir = os.path.realpath(os.path.dirname(__file__))
    return os.path.join(cur_dir, 'resources')


def get_templates_dir():
    return os.path.join(get_resources_dir(), 'templates')


def get_templates_lite_dir():
    return os.path.join(get_templates_dir(), 'lite')


def get_template(template_name, type_='lite'):
    templates_dir = os.path.join(get_templates_dir(), type_)
    template = os.path.join(templates_dir, template_name)
    with open(template) as file_read:
        template_str = file_read.read()
    return template_str


def get_hdf_lite_settings_mk_path(root_dir):
    return os.path.join(get_framework_lite_dir(root_dir),
                        'hdf_lite_settings.mk')


def get_hdf_lite_mk_path(root_dir):
    return os.path.join(get_framework_lite_dir(root_dir),
                        'hdf_lite.mk')


def get_hdf_lite_kconfig_path(root_dir):
    return os.path.join(get_framework_lite_dir(root_dir),
                        'Kconfig')


def is_commented_line(line, comment_start):
    if line.strip().startswith(comment_start):
        return True
    else:
        return False


def get_vendor_gn_path(root):
    return os.path.join(get_vendor_hdf_dir_adapter(root), 'model', 'BUILD.gn')


def get_template_file_path(root):
    template_relative_path = HdfToolSettings().get_template_path()
    relative_path2 = HdfToolSettings().get_drivers_path_framework()
    return os.path.join(root, relative_path2, template_relative_path)


def get_hcs_file_path(root, vendor, board):
    l2_board_list = list(filter(
        lambda x: x[0].isupper(),
        HdfToolSettings().get_board_list()))
    if board in l2_board_list:
        return os.path.join(root, "vendor", vendor, board,
                            "hdf_config", "khdf", "device_info",
                            "device_info.hcs")
    else:
        return os.path.join(root, "vendor", vendor, board,
                            "hdf_config", "device_info", "device_info.hcs")


def template_filename_filtrate(dir_path, kernal):
    filename_list = []
    for filename in os.listdir(dir_path):
        if filename.split("_")[0] == kernal.capitalize():
            filename_list.append(filename)
    return filename_list


def type_judge(file_path, root, model_file_path, k_filename, path_dict):
    if isinstance(file_path, list):
        for file_name in file_path:
            if not os.path.exists(os.path.join(root, file_name)):
                model_file_path[k_filename] = " "
            else:
                model_file_path[k_filename] = path_dict[k_filename]
    else:
        if not os.path.exists(os.path.join(root, file_path)):
            model_file_path[k_filename] = " "
        else:
            model_file_path[k_filename] = path_dict[k_filename]


def model_info(path_dict, root, model_file_path, key):
    if isinstance(path_dict, dict):
        for k_filename, file_path in path_dict.items():
            type_judge(file_path, root, model_file_path, k_filename, path_dict)
    else:
        hcs_file_path = os.path.join(root, path_dict)
        if not os.path.exists(hcs_file_path):
            model_file_path[key] = " "
        else:
            model_file_path[key] = path_dict
    return model_file_path


def get_create_model_info(root, create_data):
    data = json.loads(create_data)
    out_model_list = []
    if not data:
        return []
    file_key_list = list(list(data.items())[0][-1].keys())[:-1]
    for k, _ in data.items():
        model_file_path = {}
        for key in file_key_list:
            if key.split("_")[-1] == "path":
                path_dict = data[k][key]
                model_file_path = model_info(
                    path_dict, root, model_file_path, key)
        out_model_list.append({k: model_file_path})
    return out_model_list


def get_config_config_path(root, kernel):
    return os.path.join(root, "kernel", kernel, "config", "linux-5.10")


def judge_file_path_exists(temp_path):
    if not os.path.exists(temp_path):
        raise HdfToolException(
            'path  "%s" not exist' % temp_path,
            CommandErrorCode.TARGET_NOT_EXIST)


def write_config(root_path, config_file_json, config_name):
    if platform.system() == "Windows":
        config_file_replace = json.dumps(config_file_json, indent=4). \
            replace("{}\\\\".format(root_path.replace('\\', '\\\\')), "")
        write_file(os.path.join('resources', config_name),
                   config_file_replace.replace('\\\\', '/'))
    if platform.system() == "Linux":
        config_file_replace = json.dumps(config_file_json, indent=4). \
            replace(root_path + '/', "")
        write_file(os.path.join('resources', config_name),
                   config_file_replace)


def ini_file_read_operation(section_name, node_name, path=""):
    if path:
        ini_config_path = path
    else:
        ini_config_path = os.path.join("resources", "config.ini")
    config = configparser.ConfigParser()
    config.read(ini_config_path)
    model_child_dir_list = config.get(section=section_name, option=node_name)
    return literal_eval(model_child_dir_list), config


def ini_file_write_operation(model, operation_object, model_child_dir_list):
    json_format_list = json.dumps(model_child_dir_list)
    operation_object.set(model, "file_dir", json_format_list)
    ini_file_path = os.path.join("resources", "config.ini")
    config_info = HdfToolSettings().get_file_config_info()
    write_fd = os.open(ini_file_path, config_info["flags"], config_info["modes"])
    with os.fdopen(write_fd, "w") as write_ini_file:
        operation_object.write(write_ini_file)


def judge_enable_line(enable_line, device_base):
    if isinstance(enable_line, bytes):
        if enable_line.find((device_base + " ").encode("utf-8")) == -1 and \
                enable_line.find((device_base + "=").encode("utf-8")) == -1:
            return enable_line
    else:
        if enable_line.find(device_base + " ") == -1 and \
                enable_line.find(device_base + "=") == -1:
            return enable_line


class GnMkFileParse(object):
    def __init__(self, file_path, temp_re):
        self.file = file_path
        self.file_info = self._file_read()
        self.import_list = []
        self.module_switch = ""
        self.module_name = ""
        self.driver_dict = {}
        self.driver_name = ""
        self._start_index = ""
        self._end_index = ""
        self.driver_re = temp_re

    def _file_read(self):
        return read_file_binary(file_path=self.file)

    def split_driver_start_to_end(self, flag_str):
        count = 0
        for index, line in enumerate(self.file_info):
            re_result = re.search(self.driver_re, line.strip())
            if re_result and count == 0:
                count += 1
                self._start_index = index
                self.driver_name = re_result.group("name")
                continue
            if line.strip() == flag_str and count > 0:
                self._end_index = index
                count -= 1
                if count == 0:
                    self.driver_dict[self.driver_name] = \
                        [self._start_index, self._end_index]
        return self.driver_dict

    def get_driver_config_str(self, driver_index):
        return "".join(self.file_info[driver_index[0]: driver_index[-1] + 1])


class MakefileAndKconfigFileParse(object):
    def __init__(self, file_path, flag_str, re_name):
        self.file = file_path
        self.file_info = self._file_read()
        self.driver_re_name = re_name
        self.driver_re_flg = flag_str
        self.driver_dict = {}

    def _file_read(self):
        return read_file_binary(file_path=self.file)

    def split_driver_start_to_end(self):
        res_list = re.split(self.driver_re_flg, "".join(self.file_info))
        for res in res_list:
            re_name = re.search(self.driver_re_name, res)
            if res and re_name:
                res_splicing = "".join([self.driver_re_flg, res])
                self.driver_dict[re_name.group("name")] = res_splicing
        return self.driver_dict
