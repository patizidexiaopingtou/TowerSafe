@rem Copyright (C) 2021 Huawei Device Co., Ltd.
@rem Licensed under the Apache License, Version 2.0 (the "License");
@rem you may not use this file except in compliance with the License.
@rem You may obtain a copy of the License at
@rem
@rem     http://www.apache.org/licenses/LICENSE-2.0
@rem
@rem Unless required by applicable law or agreed to in writing, software
@rem distributed under the License is distributed on an "AS IS" BASIS,
@rem WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
@rem See the License for the specific language governing permissions and
@rem limitations under the License.

@echo off
hdc_std shell "echo > /sys/kernel/debug/tracing/trace"
hdc_std shell "echo 4096 > /sys/kernel/debug/tracing/saved_cmdlines_size"
hdc_std shell "bytrace -t 10 -b 204800 --overwrite filemanagement gresource devicemanager deviceprofile dscreen dinput dhfwk accessibility dsched samgr ohos ace workq idle app ark ability binder disk distributeddatamgr dsoftbus freq graphic irq mdfs memory memreclaim misc mmc msdp multimodalinput notification pagecache regulators rpc sched sync window zaudio zcamera zimage zmedia > /data/log/data.ftrace"
hdc_std shell "echo > /sys/kernel/debug/tracing/trace"
hdc_std shell "sed -i '1,2d' /data/log/mynewtrace.ftrace"
hdc_std file recv /data/log/mynewtrace.ftrace .
pause
