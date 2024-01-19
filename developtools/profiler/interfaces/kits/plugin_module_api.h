/*
 * Copyright (c) 2021 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

#ifndef PLUGIN_MODULE_API_H
#define PLUGIN_MODULE_API_H

#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>
#include <climits>

#ifdef __cplusplus
extern "C" {
#endif

/**
 * @brief interface type of plugin session starting
 *
 * It will be called when the plugin session starts, and the binary data pointed
 * by the parameter is the protobuffer binary data filled by the IDE side;
 *
 * The implementation part —— need to call the deserialization code generated by
 * protobuffer to restore it to the data type generated by proto;
 *
 * For the third-party developers, you can also not use the protobuffer as a
 * serialization tool, only need to adapt to the Java code.
 *
 * @param ConfigData configure the starting address of information memory block
 * @param ConfigSize configure the byte counts of information memory block
 * @return Return 0 for success and -1 for failure
 */
typedef int (*PluginSessionStartCallback)(const uint8_t* configData, uint32_t configSize);

/**
 * @brief interface type of Plugin result reporting interface type
 * The incoming memory block is a large memory pre allocated by the plugin management module,
 * The implementation part —— need to define the specific result type object of proto and serialize it to this memory,
 * The framework will transfer the original data to the PC as it is.
 * @param bufferData: the starting address of the memory buffer where the result is stored
 * @param bufferSize: The byte counts in the memory buffer where the result is stored
 * @return The return value greater than 0 indicates the number of bytes filled in memory,
 * and 0 indicates that nothing is filled,
 * return value less than 0 indicates failure, and -1 is a general error
 * If the absolute value of the return value is greater than buffersize, the number of bytes in the buffer
 * is insufficient to store the result. The framework will try to get the result again with a larger cache.
 */
typedef int (*PluginReportResultCallback)(uint8_t* bufferData, uint32_t bufferSize);

/**
 * @brief interface type of plugin session stop,
 * Called when stopping plugin sessions
 * @return Return 0 for success and -1 for failure.
 */
typedef int (*PluginSessionStopCallback)(void);

/**
 * @brief interface type of plugin session stop,
 * Called when stopping plugin sessions
 * @return Return 0 for success and -1 for failure.
 */
typedef int (*PluginReportBasicDataCallback)(void);

/**
 * WriterStruct type forward declaration
 */
typedef struct WriterStruct WriterStruct;

/**
 * @brief write : interface type
 * @param writer : pointer
 * @param data : the first byte pointer of data buffer
 * @param size : The byte counts in the data buffer
 * @return : Return the number of bytes written for success, and returns -1 for failure
 */
typedef long (*WriteFuncPtr)(WriterStruct* writer, const void* data, size_t size);

/**
 * @brief flush : interface type
 * @return Return true for success and false for failure；
 */
typedef bool (*FlushFuncPtr)(WriterStruct* writer);

/**
 * WriterStruct : type definition, containing two function pointers.
 */
struct WriterStruct {
    /**
     * write : function pointer,point to the actual write function.
     */
    WriteFuncPtr write;

    /**
     * flush function pointer,point to the actual flush function.
     */
    FlushFuncPtr flush;
};

/**
 * @brief : register writer interface type
 * @param : writer, writer pointer
 * @return : Return 0 for success and -1 for failure
 */
typedef int (*RegisterWriterStructCallback)(const WriterStruct* writer);

/**
 * PluginModuleCallbacks : type forward declaration
 */
typedef struct PluginModuleCallbacks PluginModuleCallbacks;

/**
 * @brief Plugin callback function table
 */
struct PluginModuleCallbacks {
    /**
     * Session start callback
     */
    PluginSessionStartCallback onPluginSessionStart;

    /**
     * Data reporting callback and it is used to connect the
     * polling reporting results of plugin management framework.
     */
    PluginReportResultCallback onPluginReportResult;

    /**
     * Session stop callback
     */
    PluginSessionStopCallback onPluginSessionStop;

    /**
     * Register the writer callback, which is used to connect the
     * flow reporting results of plugin management framework
     */
    RegisterWriterStructCallback onRegisterWriterStruct;

    /**
     * report plugin basic data
     */
    PluginReportBasicDataCallback onReportBasicDataCallback = 0;
};

/**
 * @brief The maximum length of the plugin name and it does not contain the ending character(\0)
 */
#define PLUGIN_MODULE_NAME_MAX 127

/**
 * @brief The maximum length of the plugin version and it does not contain the ending character(\0)
 */
#define PLUGIN_MODULE_VERSION_MAX 7

/**
 * PluginModuleStruct type forward declaration
 */
typedef struct PluginModuleStruct PluginModuleStruct;

struct PluginModuleStruct {
    /**
     * Callback function table
     */
    PluginModuleCallbacks* callbacks;

    /**
     * Plugin name
     */
    char name[PLUGIN_MODULE_NAME_MAX + 1];

    /**
     * Plugin version
     */
    char version[PLUGIN_MODULE_VERSION_MAX + 1];

    /**
     * (polling type needed)result buffer byte number prompt, used to prompt the plugin management
     * module to call the data reporting interface to use the memory buffer byte number
     */
    uint32_t resultBufferSizeHint;

    bool isStandaloneFileData = false;

    char outFileName[PATH_MAX + 1];
};

/**
 * Plugin module registration information；

 * The plugin management module will search the symbol from the dynamic object file according to the name,
 * and then retrieve the basic information and callback function table.
 *
 * If Callback function table of onPluginReportResult is filled with non null values,
 * the plugin will be regarded as a "polling" plugin by the plugin management framework,
 * and the management framework will call this interface in the module regularly.

 * If Callback function table of onRegisterWriterStruct is filled with non null values,
 * The plugin will be regarded as a "streaming" plugin by the plugin management framework,
 * and the management framework will not call this interface in the module regularly.

 * The plugin module needs to save the writer pointer when the onregisterwriterstruct interface is called,
 * and create a thread when the onpluginsessionstart interface is called;

 * At the right time, the thread calls the writer's write() interface to write data to
 * the shared memory area, and calls the writer's flush ();

 * The interface notifies the service process to take the data from the shared memory area.
 */
extern PluginModuleStruct g_pluginModule;

#ifdef __cplusplus
}
#endif

#endif // PLUGIN_MODULE_API_H