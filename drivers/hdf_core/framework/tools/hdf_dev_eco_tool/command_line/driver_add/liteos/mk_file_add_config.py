#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Copyright (c) 2022 Huawei Device Co., Ltd.
#
# HDF is dual licensed: you can use it either under the terms of
# the GPL, or the BSD license, at your option.
# See the LICENSE file in the root of this repository for complete details.


import os
from string import Template

import hdf_utils
from .gn_file_add_config import judge_driver_config_exists, analyze_parent_path


def find_makefile_file_end_index(date_lines, model_name):
    file_end_flag = "include $(HDF_DRIVER)"
    end_index = 0
    if model_name == "sensor":
        model_dir_name = ("FRAMEWORKS_%s_ROOT" % model_name.upper())
    else:
        model_dir_name = ("%s_ROOT_DIR" % model_name.upper())
    model_dir_value = ""

    for index, line in enumerate(date_lines):
        if line.startswith("#"):
            continue
        elif line.strip().startswith(file_end_flag):
            end_index = index
        elif line.strip().startswith(model_dir_name):
            model_dir_value = line.split("=")[-1].strip()
        else:
            continue
    result_tuple = (end_index, model_dir_name, model_dir_value)
    return result_tuple


def audio_makefile_file_operation(path, args_tuple):
    source_path, head_path, module, driver, root, devices, kernel = args_tuple
    makefile_gn_path = path
    date_lines = hdf_utils.read_file_lines(makefile_gn_path)
    judge_result = judge_driver_config_exists(date_lines, driver_name=driver)
    if judge_result:
        return
    result_tuple = find_makefile_file_end_index(date_lines, model_name=module)
    end_index, model_dir_name, model_dir_value = result_tuple
    first_line = "\nifeq ($(LOSCFG_DRIVERS_HDF_${model_name_upper}_${driver_name_upper}), y)\n"
    third_line = "LOCAL_INCLUDE += $(${file_parent_path})/${head_path}\n"
    four_line = "endif\n"

    if len(source_path) > 1:
        sources_line_items = []
        multi_resource = "LOCAL_SRCS += "
        temp_line = r'$(${file_parent_path})/${source_path}'
        for source in source_path:
            temp_handle = Template(temp_line.replace("$(", "temp_flag"))
            temp_dict = analyze_parent_path(
                    date_lines, source, "", devices, root)
            if source == source_path[-1]:
                sources_line_items.append(len(multi_resource) * " ")
                sources_line_items.append(temp_handle.substitute(temp_dict).replace("temp_flag", "$("))
                sources_line_items.append("\n")
            else:
                sources_line_items.append(temp_handle.substitute(temp_dict).replace("temp_flag", "$("))
                sources_line_items.append(" \\\n")
        build_resource = "{}{}".format(multi_resource, "".join(sources_line_items))
    else:
        build_resource = "LOCAL_SRCS += $(${file_parent_path})/${source_path}\n"
        for source in source_path:
            temp_handle = Template(build_resource.replace("$(", "temp_flag"))
            temp_dict = analyze_parent_path(
                    date_lines, source, "", devices, root)
            build_resource = temp_handle.substitute(temp_dict).replace("temp_flag", "$(")
    makefile_add_template = "{}{}{}{}".format(first_line, build_resource, third_line, four_line)
    makefile_replace_dict = analyze_parent_path(
        date_lines, "", head_path[0], devices, root, kernel_type=kernel)
    temp_handle = Template(makefile_add_template.replace("$(", "temp_flag"))
    model_dict = {
        'model_name_upper': module.upper(),
        'driver_name_upper': driver.upper(),
    }
    makefile_replace_dict.update(model_dict)
    new_line = temp_handle.substitute(makefile_replace_dict).replace("temp_flag", "$(")
    date_lines = date_lines[:end_index - 1] + [new_line] + date_lines[end_index - 1:]
    hdf_utils.write_file_lines(makefile_gn_path, date_lines)


def makefile_file_operation(path, driver_file_path, head_path,
                            module, driver, root_path):
    makefile_gn_path = path
    date_lines = hdf_utils.read_file_lines(makefile_gn_path)
    judge_result = judge_driver_config_exists(date_lines, driver_name=driver)
    if judge_result:
        return
    source_file_path = driver_file_path.replace('\\', '/')
    result_tuple = find_makefile_file_end_index(date_lines, model_name=module)
    end_index, model_dir_name, model_dir_value = result_tuple
    makefile_add_template = get_liteos_mk_template(module)
    include_model_info = model_dir_value.split("model")[-1].strip('"') + "/"
    makefile_path_config = source_file_path.split(include_model_info)
    temp_handle = Template(makefile_add_template.replace("$(", "temp_flag"))
    base_replace_dict = {
        'model_name_upper': module.upper(),
        'driver_name_upper': driver.upper(),
    }
    if module == "display":
        temp_replace = {
            'source_file_path': '/'.join(
                list(filter(lambda x: x, driver_file_path.split(root_path)[-1].
                            strip(os.path.sep).split(os.path.sep)))),
            'head_file_path': '/'.join(
                list(filter(lambda x: x, head_path.split(root_path)[-1].
                            strip(os.path.sep).split(os.path.sep)))[:-1])}
    elif module == "sensor":
        temp_replace = {
            'source_file_path': source_file_path.split(module, 1)[-1][1:],
            'head_file_path': '/'.join(list(filter(
                lambda x: x, head_path.split(module, 1)[-1][1:].
                    split(os.path.sep)))[:-1]).strip(os.path.sep)}
    else:
        temp_replace = {
            'source_file_path': makefile_path_config[-1],
            'head_file_path': '/'.join(
                list(filter(lambda x: x, head_path.split("model")[-1].strip(
                    os.path.sep).split(os.path.sep)[2:-1])))}
    temp_replace.update(base_replace_dict)
    new_line = temp_handle.substitute(temp_replace).replace("temp_flag", "$(")
    endif_status = False
    for index, v in enumerate(date_lines[::-1]):
        if v.strip().startswith("endif"):
            endif_status = True
            end_line_index = len(date_lines) - index - 1
            date_lines = date_lines[:end_line_index] + [new_line] + \
                         date_lines[end_line_index:]
            break
    if not endif_status:
        date_lines = date_lines + [new_line]
    hdf_utils.write_file_lines(makefile_gn_path, date_lines)


def get_liteos_mk_template(module):
    first_line = "\nifeq ($(LOSCFG_DRIVERS_HDF_${model_name_upper}_${driver_name_upper}), y)\n"
    input_include_line = "LOCAL_INCLUDE += $(${model_name_upper}_ROOT_DIR)/${head_file_path}\n"
    input_second_line = "LOCAL_SRCS += $(${model_name_upper}_ROOT_DIR)/${source_file_path}\n"

    sensor_include_line = "LOCAL_INCLUDE += $(PERIPHERAL_${model_name_upper}_ROOT)/${head_file_path}\n"
    sensor_second_line = "LOCAL_SRCS += $(PERIPHERAL_${model_name_upper}_ROOT)/${source_file_path}\n"

    display_include_line = "LOCAL_INCLUDE += $(LITEOSTOPDIR)/../../${head_file_path}\n"
    display_second_line = "LOCAL_SRCS += $(LITEOSTOPDIR)/../../${source_file_path}\n"
    third_line = "endif\n"
    if module == "sensor":
        makefile_add_template = first_line + sensor_include_line \
                                + sensor_second_line + third_line
    elif module == "display":
        makefile_add_template = first_line + display_include_line \
                                + display_second_line + third_line
    else:
        makefile_add_template = first_line + input_include_line \
                                + input_second_line + third_line
    return makefile_add_template