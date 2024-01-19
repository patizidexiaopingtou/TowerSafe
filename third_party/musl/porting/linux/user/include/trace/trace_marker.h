/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
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

#ifndef _TRACE_TRACE_MARKER_H
#define _TRACE_TRACE_MARKER_H

#define TRACE_MARKER_MESSAGE_LEN 1024

#ifdef __cplusplus
extern "C"
{
#endif

/**
  * @brief Write the function call information to the trace_marker node in kernel space,
  *        used on the same thread as trace_marker_end(),with the symbol "B".
  * @param message The function of information.
  * @param value The value which want to trace.
  */
void trace_marker_begin(const char *message, const char *value);

/**
  * @brief Write the terminator to the trace_marker node of the kernel space,
  *        used on the same thread as trace_marker_begin(),with the symbol "E".
  */
void trace_marker_end(void);

/**
  * @brief Write the function call information to the trace_marker node in kernel space,
  *        used in a different thread than trace_marker_async_end(),with the symbol "S".
  * @param message The function of information.
  * @param value The value which want to trace.
  */
void trace_marker_async_begin(const char *message, const char *value, int taskId);

/**
  * @brief Write the terminator to the trace_marker node in kernel space,
  *        used in a different thread than trace_marker_async_begin(),with the symbol "F".
  * @param message The function of information.
  * @param value The value which want to trace.
  */
void trace_marker_async_end(const char *message, const char *value, int taskId);

/**
  * @brief Marks a pre-traced numeric variable,with the symbol "C".
  * @param message The function of information.
  * @param value The value which want to trace.
  */
void trace_marker_count(const char *message, int value);

#ifdef __cplusplus
}
#endif
#endif
