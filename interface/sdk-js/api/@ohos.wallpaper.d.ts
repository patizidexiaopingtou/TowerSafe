/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
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
import {AsyncCallback} from './basic';
import image from './@ohos.multimedia.image';

/**
 * System wallpaper
 * @syscap SystemCapability.MiscServices.Wallpaper
 * @since 7
 */
declare namespace wallpaper {
    /**
     * RgbaColor definition
     * @syscap SystemCapability.MiscServices.Wallpaper
     * @since 7
     * @deprecated since 9
     */
     interface RgbaColor {
        /**
         * The range is 0 to 255.
         */
        red: number;
        /**
         * The range is 0 to 255.
         */
        green: number;
        /**
         * The range is 0 to 255.
         */
        blue: number;
        /**
         * The range is 0 to 255.
         */
        alpha: number;
    }

    /**
     * Indicates wallpaper type.
     * @syscap SystemCapability.MiscServices.Wallpaper
     * @since 7
     */
    enum WallpaperType {
        /**
         * Indicates the home screen wallpaper.
         */
        WALLPAPER_SYSTEM,
        /**
         * Indicates the lock screen wallpaper.
         */
        WALLPAPER_LOCKSCREEN
    }

    /**
     * Obtains the wallpaper colors for the wallpaper of the specified type. Returns rgbaColor type of array callback function.
     * @param wallpaperType Indicates the wallpaper type.
     * @syscap SystemCapability.MiscServices.Wallpaper
     * @since 7
     * @deprecated since 9
     */
    function getColors(wallpaperType: WallpaperType, callback: AsyncCallback<Array<RgbaColor>>): void;

    /**
     * Obtains the wallpaper colors for the wallpaper of the specified type. Returns rgbaColor type of array callback function.
     * @param wallpaperType Indicates the wallpaper type.
     * @returns { Promise<Array<RgbaColor>> } the Promise<Array<RgbaColor>> returned by the function.
     * @syscap SystemCapability.MiscServices.Wallpaper
     * @since 7
     * @deprecated since 9
     */
    function getColors(wallpaperType: WallpaperType): Promise<Array<RgbaColor>>;

    /**
     * Obtains the wallpaper colors for the wallpaper of the specified type. Returns rgbaColor type of array callback function.
     * @param wallpaperType Indicates the wallpaper type.
     * @returns { Array<RgbaColor> } the Array<RgbaColor> returned by the function.
     * @throws {BusinessError} 401 - parameter error.
     * @throws {BusinessError} 202 - permission verification failed, application which is not a system application uses system API.
     * @syscap SystemCapability.MiscServices.Wallpaper
     * @systemapi Hide this for inner system use.
     * @since 9
     */
    function getColorsSync(wallpaperType: WallpaperType): Array<RgbaColor>;

    /**
     * Obtains the ID of the wallpaper of the specified type. Returns an integer greater than or equal to {@code 0} representing the wallpaper ID.
     * if the specified type of wallpaper has been set; returns {@code -1} otherwise. The return value is an integer ranging from -1 to 2^31 - 1.
     * @param wallpaperType Indicates the wallpaper type.
     * @syscap SystemCapability.MiscServices.Wallpaper
     * @since 7
     * @deprecated since 9
     */
    function getId(wallpaperType: WallpaperType, callback: AsyncCallback<number>): void;

    /**
     * Obtains the ID of the wallpaper of the specified type. Returns an integer greater than or equal to {@code 0} representing the wallpaper ID.
     * if the specified type of wallpaper has been set; returns {@code -1} otherwise. The return value is an integer ranging from -1 to 2^31 - 1.
     * @param wallpaperType Indicates the wallpaper type.
     * @returns { Promise<number> } the Promise<number> returned by the function.
     * @syscap SystemCapability.MiscServices.Wallpaper
     * @since 7
     * @deprecated since 9
     */
    function getId(wallpaperType: WallpaperType): Promise<number>;

    /**
     * Obtains a file of the wallpaper of the specified type. Returns the file descriptor.
     * @param wallpaperType Indicates the wallpaper type.
     * @permission ohos.permission.GET_WALLPAPER
     * @syscap SystemCapability.MiscServices.Wallpaper
     * @since 8
     * @deprecated since 9
     */
    function getFile(wallpaperType: WallpaperType, callback: AsyncCallback<number>): void;

    /**
     * Obtains a file of the wallpaper of the specified type. Returns the file descriptor.
     * @param wallpaperType Indicates the wallpaper type.
     * @permission ohos.permission.GET_WALLPAPER
     * @returns { Promise<number> } the Promise<number> returned by the function.
     * @syscap SystemCapability.MiscServices.Wallpaper
     * @since 8
     * @deprecated since 9
     */
    function getFile(wallpaperType: WallpaperType): Promise<number>;

    /**
     * Obtains the minimum height of the wallpaper. in pixels. returns 0 if no wallpaper has been set.
     * @syscap SystemCapability.MiscServices.Wallpaper
     * @since 7
     * @deprecated since 9
     */
    function getMinHeight(callback: AsyncCallback<number>): void;

    /**
     * Obtains the minimum height of the wallpaper. in pixels. returns 0 if no wallpaper has been set.
     * @returns { Promise<number> } the Promise<number> returned by the function.
     * @syscap SystemCapability.MiscServices.Wallpaper
     * @since 7
     * @deprecated since 9
     */
    function getMinHeight(): Promise<number>;

    /**
     * Obtains the minimum height of the wallpaper. in pixels. returns 0 if no wallpaper has been set.
     * @returns { number } the number returned by the function.
     * @throws {BusinessError} 202 - permission verification failed, application which is not a system application uses system API.
     * @syscap SystemCapability.MiscServices.Wallpaper
     * @systemapi Hide this for inner system use.
     * @since 9
     */
    function getMinHeightSync(): number;

    /**
     * Obtains the minimum width of the wallpaper. in pixels. returns 0 if no wallpaper has been set.
     * @syscap SystemCapability.MiscServices.Wallpaper
     * @since 7
     * @deprecated since 9
     */
    function getMinWidth(callback: AsyncCallback<number>): void;

    /**
     * Obtains the minimum width of the wallpaper. in pixels. returns 0 if no wallpaper has been set.
     * @returns { Promise<number> } the Promise<number> returned by the function.
     * @syscap SystemCapability.MiscServices.Wallpaper
     * @since 7
     * @deprecated since 9
     */
    function getMinWidth(): Promise<number>;

    /**
     * Obtains the minimum width of the wallpaper. in pixels. returns 0 if no wallpaper has been set.
     * @returns { number } the number returned by the function.
     * @throws {BusinessError} 202 - permission verification failed, application which is not a system application uses system API.
     * @syscap SystemCapability.MiscServices.Wallpaper
     * @systemapi Hide this for inner system use.
     * @since 9
     */
    function getMinWidthSync(): number;

    /**
     * Checks whether to allow the application to change the wallpaper for the current user.
     * Returns true if the application is allowed to set a wallpaper for the current user. returns false otherwise.
     * @syscap SystemCapability.MiscServices.Wallpaper
     * @since 7
     * @deprecated since 9
     */
    function isChangePermitted(callback: AsyncCallback<boolean>): void;

    /**
     * Checks whether to allow the application to change the wallpaper for the current user.
     * Returns true if the application is allowed to set a wallpaper for the current user. returns false otherwise.
     * @returns { Promise<boolean> } the Promise<boolean> returned by the function.
     * @syscap SystemCapability.MiscServices.Wallpaper
     * @since 7
     * @deprecated since 9
     */
    function isChangePermitted(): Promise<boolean>;

    /**
     * Checks whether a user is allowed to set wallpapers.
     * Returns true if a user is allowed to set wallpapers. returns false otherwise.
     * @syscap SystemCapability.MiscServices.Wallpaper
     * @since 7
     * @deprecated since 9
     */
    function isOperationAllowed(callback: AsyncCallback<boolean>): void;

    /**
     * Checks whether a user is allowed to set wallpapers.
     * Returns true if a user is allowed to set wallpapers. returns false otherwise.
     * @returns { Promise<boolean> } the Promise<boolean> returned by the function.
     * @syscap SystemCapability.MiscServices.Wallpaper
     * @since 7
     * @deprecated since 9
     */
    function isOperationAllowed(): Promise<boolean>;

    /**
     * Removes a wallpaper of the specified type and restores the default one.
     * @param wallpaperType Indicates the wallpaper type.
     * @permission ohos.permission.SET_WALLPAPER
     * @syscap SystemCapability.MiscServices.Wallpaper
     * @since 7
     * @deprecated since 9
     */
    function reset(wallpaperType: WallpaperType, callback: AsyncCallback<void>): void;

    /**
     * Removes a wallpaper of the specified type and restores the default one.
     * @param wallpaperType Indicates the wallpaper type.
     * @permission ohos.permission.SET_WALLPAPER
     * @syscap SystemCapability.MiscServices.Wallpaper
     * @since 7
     * @deprecated since 9
     */
    function reset(wallpaperType: WallpaperType): Promise<void>;

    /**
     * Removes a wallpaper of the specified type and restores the default one.
     * @param wallpaperType Indicates the wallpaper type.
     * @throws {BusinessError} 401 - parameter error.
     * @throws {BusinessError} 201 - permission denied.
     * @throws {BusinessError} 202 - permission verification failed, application which is not a system application uses system API.
     * @permission ohos.permission.SET_WALLPAPER
     * @syscap SystemCapability.MiscServices.Wallpaper
     * @systemapi Hide this for inner system use.
     * @since 9
     */
    function restore(wallpaperType: WallpaperType, callback: AsyncCallback<void>): void;

    /**
     * Removes a wallpaper of the specified type and restores the default one.
     * @param wallpaperType Indicates the wallpaper type.
     * @throws {BusinessError} 401 - parameter error.
     * @throws {BusinessError} 201 - permission denied.
     * @throws {BusinessError} 202 - permission verification failed, application which is not a system application uses system API.
     * @permission ohos.permission.SET_WALLPAPER
     * @syscap SystemCapability.MiscServices.Wallpaper
     * @systemapi Hide this for inner system use.
     * @since 9
     */
    function restore(wallpaperType: WallpaperType): Promise<void>;

    /**
     * Sets a wallpaper of the specified type based on the uri path from a JPEG or PNG file or the pixel map of a PNG file.
     * @param source Indicates the uri path from a JPEG or PNG file or the pixel map of the PNG file.
     * @param wallpaperType Indicates the wallpaper type.
     * @permission ohos.permission.SET_WALLPAPER
     * @syscap SystemCapability.MiscServices.Wallpaper
     * @since 7
     * @deprecated since 9
     */
    function setWallpaper(source: string | image.PixelMap, wallpaperType: WallpaperType, callback: AsyncCallback<void>): void;

    /**
     * Sets a wallpaper of the specified type based on the uri path from a JPEG or PNG file or the pixel map of a PNG file.
     * @param source Indicates the uri path from a JPEG or PNG file or the pixel map of the PNG file.
     * @param wallpaperType Indicates the wallpaper type.
     * @permission ohos.permission.SET_WALLPAPER
     * @syscap SystemCapability.MiscServices.Wallpaper
     * @since 7
     * @deprecated since 9
     */
    function setWallpaper(source: string | image.PixelMap, wallpaperType: WallpaperType): Promise<void>;

    /**
     * Sets a wallpaper of the specified type based on the uri path from a JPEG or PNG file or the pixel map of a PNG file.
     * @param source Indicates the uri path from a JPEG or PNG file or the pixel map of the PNG file.
     * @param wallpaperType Indicates the wallpaper type.
     * @throws {BusinessError} 401 - parameter error.
     * @throws {BusinessError} 201 - permission denied.
     * @throws {BusinessError} 202 - permission verification failed, application which is not a system application uses system API.
     * @permission ohos.permission.SET_WALLPAPER
     * @syscap SystemCapability.MiscServices.Wallpaper
     * @systemapi Hide this for inner system use.
     * @since 9
     */
    function setImage(source: string | image.PixelMap, wallpaperType: WallpaperType, callback: AsyncCallback<void>): void;

    /**
     * Sets a wallpaper of the specified type based on the uri path from a JPEG or PNG file or the pixel map of a PNG file.
     * @param source Indicates the uri path from a JPEG or PNG file or the pixel map of the PNG file.
     * @param wallpaperType Indicates the wallpaper type.
     * @throws {BusinessError} 401 - parameter error.
     * @throws {BusinessError} 201 - permission denied.
     * @throws {BusinessError} 202 - permission verification failed, application which is not a system application uses system API.
     * @permission ohos.permission.SET_WALLPAPER
     * @syscap SystemCapability.MiscServices.Wallpaper
     * @systemapi Hide this for inner system use.
     * @since 9
     */
    function setImage(source: string | image.PixelMap, wallpaperType: WallpaperType): Promise<void>;

    /**
     * Obtains the default pixel map of a wallpaper of the specified type. Returns the default pixel map.
     * @param wallpaperType Indicates the wallpaper type.
     * @permission ohos.permission.GET_WALLPAPER
     * @syscap SystemCapability.MiscServices.Wallpaper
     * @systemapi Hide this for inner system use.
     * @since 7
     * @deprecated since 9
     */
    function getPixelMap(wallpaperType: WallpaperType, callback: AsyncCallback<image.PixelMap>): void;

    /**
     * Obtains the default pixel map of a wallpaper of the specified type. Returns the default pixel map.
     * @param wallpaperType Indicates the wallpaper type.
     * @returns { Promise<image.PixelMap> } the Promise<image.PixelMap> returned by the function.
     * @permission ohos.permission.GET_WALLPAPER
     * @syscap SystemCapability.MiscServices.Wallpaper
     * @systemapi Hide this for inner system use.
     * @since 7
     * @deprecated since 9
     */
    function getPixelMap(wallpaperType: WallpaperType): Promise<image.PixelMap>;

    /**
     * Obtains the default pixel map of a wallpaper of the specified type. Returns the default pixel map.
     * @param wallpaperType Indicates the wallpaper type.
     * @throws {BusinessError} 401 - parameter error.
     * @throws {BusinessError} 201 - permission denied.
     * @permission ohos.permission.GET_WALLPAPER
     * @syscap SystemCapability.MiscServices.Wallpaper
     * @systemapi Hide this for inner system use.
     * @since 9
     */
    function getImage(wallpaperType: WallpaperType, callback: AsyncCallback<image.PixelMap>): void;

    /**
     * Obtains the default pixel map of a wallpaper of the specified type. Returns the default pixel map.
     * @param wallpaperType Indicates the wallpaper type.
     * @returns { Promise<image.PixelMap> } the Promise<image.PixelMap> returned by the function.
     * @throws {BusinessError} 401 - parameter error.
     * @throws {BusinessError} 201 - permission denied.
     * @permission ohos.permission.GET_WALLPAPER
     * @syscap SystemCapability.MiscServices.Wallpaper
     * @systemapi Hide this for inner system use.
     * @since 9
     */
    function getImage(wallpaperType: WallpaperType): Promise<image.PixelMap>;

    /**
     * Registers a listener for wallpaper color changes to receive notifications about the changes.
     * @param type The incoming colorChange table open receiver pick a color change wallpaper wallpaper color changes
     * @param callback Provides dominant colors of the wallpaper.
     * @syscap SystemCapability.MiscServices.Wallpaper
     * @since 7
     * @deprecated since 9
     */
    function on(type: 'colorChange', callback: (colors: Array<RgbaColor>, wallpaperType: WallpaperType) => void): void;

    /**
     * Unregisters a listener for wallpaper color changes.
     * @param type Incoming 'colorChange' table delete receiver to pick up a color change wallpaper wallpaper color changes
     * @param callback Provides dominant colors of the wallpaper.
     * @syscap SystemCapability.MiscServices.Wallpaper
     * @since 7
     * @deprecated since 9
     */
    function off(type: 'colorChange', callback?: (colors: Array<RgbaColor>, wallpaperType: WallpaperType) => void): void;
}

export default wallpaper;
