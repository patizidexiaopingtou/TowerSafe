#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
Copyright (c) 2020-2021 Huawei Device Co., Ltd.
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
"""

import os
import fnmatch
import sys
import argparse
import distutils.dir_util as dir_util
import distutils.file_util as file_util
import json
import subprocess

def get_modulename_by_buildtarget(module_list_file, build_target):
    if not os.path.exists(module_list_file):
        return ""
    module_info_data = {}
    with open(module_list_file, "r") as module_file:
        module_info_data = json.load(module_file)
    for module in module_info_data:
        if module == build_target:
            return module_info_data[module];
    return ""

if __name__ == '__main__':
    global_parts_info = sys.argv[1]
    tmp_subsystem_part = sys.argv[2]
    method = sys.argv[3]
    if method == "judgePart":
      res = get_modulename_by_buildtarget(global_parts_info,tmp_subsystem_part)
      sys.stdout.write(str(res))
    else:
      sys.stdout.write("test")