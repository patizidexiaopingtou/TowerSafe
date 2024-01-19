#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# Copyright (C) 2021 Huawei Device Co., Ltd.
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
import os
import subprocess
import sys
import argparse
import logging
from pathlib import Path

THIS_FILE = os.path.basename(__file__)
logging.basicConfig(format='%(asctime)s %(levelname)s %(message)s',
    level=logging.INFO)
logger = logging.getLogger(THIS_FILE)

def main():
    parser = argparse.ArgumentParser(
        description='FTrace C++ code generator.')
    parser.add_argument('-v', dest='version', required=True, type=str,
                        help='device kernel version')

    args = parser.parse_args(sys.argv[1:])
    version = args.version

    version_path = "device_kernel_version/{}".format(version)
    events_file = version_path + "/events"
    if not Path(events_file).is_dir():
        logger.error('device kernel events directory does not exist({})'.format(events_file))
        exit(1)

    # generate proto file
    proto_path = "{}/../../../../protos/types/plugins/ftrace_data/{}/".format(os.getcwd(), version)
    proto_cmd = "python ftrace_proto_generator.py -a allowlist.txt -e {} -o {}".format(events_file, proto_path)
    if (subprocess.run(proto_cmd, shell=True) != 0):
        logger.error('Execution python failed! cmd: {}'.format(proto_cmd))
        exit(2)

    # generate parsers cpp
    cpp_cmd = "python {}/ftrace_cpp_generator.py -a allowlist.txt -e {}".format(version_path, events_file)
    parsers_cmd = "{} -p {}/event_parsers/".format(cpp_cmd, version_path)
    if (subprocess.run(parsers_cmd, shell=True) != 0):
        logger.error('Execution python failed! cmd: {}'.format(parsers_cmd))
        exit(3)

    # generate formatters cpp
    parsers_cmd = "{} -f {}/event_formatters/".format(cpp_cmd, version_path)
    if (subprocess.run(parsers_cmd, shell=True) != 0):
        logger.error('Execution python failed! cmd: {}'.format(parsers_cmd))
        exit(4)

if __name__ == '__main__':
    main()
    print("refresh device kernel code sucess!")
