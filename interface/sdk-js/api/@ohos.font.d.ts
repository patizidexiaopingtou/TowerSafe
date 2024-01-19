/*
 * Copyright (c) 2022 Shenzhen Kaihong Digital Industry Development Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 * @import font from '@ohos.font';
 */
declare namespace font {
    /**
   * @since 9
   */
  interface FontOptions {

    /**
     * The font name to register.
     * @since 9
     */
    familyName: string;

    /**
     * The path of the font file.
     * @since 9
     */
    familySrc: string;
  }
  /**
   * Register a customized font in the FontManager.
   * @param options FontOptions
   * @since 9
   */
  function registerFont(options: FontOptions):void;

}

export default font;
