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
import { AsyncCallback, Callback } from './basic';
import { WantAgent } from './@ohos.wantAgent';

/**
 * Provides interfaces for acquiring location information, managing location switches,
 * geocoding, reverse geocoding, country code, geofencing and other functions.
 * @namespace geoLocationManager
 * @since 9
 */
declare namespace geoLocationManager {
    /**
     * Subscribe location changed.
     * @permission ohos.permission.APPROXIMATELY_LOCATION
     * @param { LocationRequest } request - Indicates the location request parameters.
     * @param { Callback<Location> } callback - Indicates the callback for reporting the location result.
     * @returns { void }.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 3301000 - Location service is unavailable.
     * @throws { BusinessError } 3301100 - The location switch is off.
     * @throws { BusinessError } 3301200 - Failed to obtain the geographical location.
     * @syscap SystemCapability.Location.Location.Core
     * @since 9
     */
    function on(type: 'locationChange', request: LocationRequest, callback: Callback<Location>): void;

    /**
     * Unsubscribe location changed.
     * @permission ohos.permission.APPROXIMATELY_LOCATION
     * @param { Callback<Location> } [callback] - Indicates the callback for reporting the location result.
     * @returns { void }.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 3301000 - Location service is unavailable.
     * @throws { BusinessError } 3301100 - The location switch is off.
     * @throws { BusinessError } 3301200 - Failed to obtain the geographical location.
     * @syscap SystemCapability.Location.Location.Core
     * @since 9
     */
    function off(type: 'locationChange', callback?: Callback<Location>): void;

    /**
     * Subscribe location switch changed.
     * @param { Callback<boolean> } callback - Indicates the callback for reporting the location switch status.
     * @returns { void }.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 3301000 - Location service is unavailable.
     * @syscap SystemCapability.Location.Location.Core
     * @since 9
     */
    function on(type: 'locationEnabledChange', callback: Callback<boolean>): void;

    /**
     * Unsubscribe location switch changed.
     * @param { Callback<boolean> } [callback] - Indicates the callback for reporting the location switch status.
     * @returns { void }.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 3301000 - Location service is unavailable.
     * @syscap SystemCapability.Location.Location.Core
     * @since 9
     */
    function off(type: 'locationEnabledChange', callback?: Callback<boolean>): void;

    /**
     * Subscribe to cache GNSS locations update messages.
     * @permission ohos.permission.APPROXIMATELY_LOCATION
     * @param { CachedGnssLocationsRequest } request - Indicates the cached GNSS locations request parameters.
     * @param { Callback<Array<Location>> } callback - Indicates the callback for reporting the cached GNSS locations.
     * @returns { void }.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 3301000 - Location service is unavailable.
     * @throws { BusinessError } 3301100 - The location switch is off.
     * @throws { BusinessError } 3301200 - Failed to obtain the geographical location.
     * @syscap SystemCapability.Location.Location.Gnss
     * @since 9
     */
    function on(type: 'cachedGnssLocationsChange', request: CachedGnssLocationsRequest, callback: Callback<Array<Location>>): void;

    /**
     * Unsubscribe to cache GNSS locations update messages.
     * @permission ohos.permission.APPROXIMATELY_LOCATION
     * @param { Callback<Array<Location>> } [callback] - Indicates the callback for reporting the cached gnss locations.
     * @returns { void }.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 3301000 - Location service is unavailable.
     * @throws { BusinessError } 3301100 - The location switch is off.
     * @throws { BusinessError } 3301200 - Failed to obtain the geographical location.
     * @syscap SystemCapability.Location.Location.Gnss
     * @since 9
     */
    function off(type: 'cachedGnssLocationsChange', callback?: Callback<Array<Location>>): void;

    /**
     * Subscribe satellite status changed.
     * @permission ohos.permission.APPROXIMATELY_LOCATION
     * @param { Callback<SatelliteStatusInfo> } callback - Indicates the callback for reporting the satellite status.
     * @returns { void }.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 3301000 - Location service is unavailable.
     * @throws { BusinessError } 3301100 - The location switch is off.
     * @syscap SystemCapability.Location.Location.Gnss
     * @since 9
     */
    function on(type: 'satelliteStatusChange', callback: Callback<SatelliteStatusInfo>): void;

    /**
     * Unsubscribe satellite status changed.
     * @permission ohos.permission.APPROXIMATELY_LOCATION
     * @param { Callback<SatelliteStatusInfo> } [callback] - Indicates the callback for reporting the satellite status.
     * @returns { void }.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 3301000 - Location service is unavailable.
     * @throws { BusinessError } 3301100 - The location switch is off.
     * @syscap SystemCapability.Location.Location.Gnss
     * @since 9
     */
    function off(type: 'satelliteStatusChange', callback?: Callback<SatelliteStatusInfo>): void;

    /**
     * Subscribe nmea message changed.
     * @permission ohos.permission.LOCATION and ohos.permission.APPROXIMATELY_LOCATION
     * @param { Callback<string> } callback - Indicates the callback for reporting the nmea message.
     * @returns { void }.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 3301000 - Location service is unavailable.
     * @throws { BusinessError } 3301100 - The location switch is off.
     * @syscap SystemCapability.Location.Location.Gnss
     * @since 9
     */
    function on(type: 'nmeaMessage', callback: Callback<string>): void;

    /**
     * Unsubscribe nmea message changed.
     * @permission ohos.permission.LOCATION and ohos.permission.APPROXIMATELY_LOCATION
     * @param { Callback<string> } [callback] - Indicates the callback for reporting the nmea message.
     * @returns { void }.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 3301000 - Location service is unavailable.
     * @throws { BusinessError } 3301100 - The location switch is off.
     * @syscap SystemCapability.Location.Location.Gnss
     * @since 9
     */
    function off(type: 'nmeaMessage', callback?: Callback<string>): void;

    /**
     * Add a geofence and subscribe geo fence status changed.
     * @permission ohos.permission.APPROXIMATELY_LOCATION
     * @param { GeofenceRequest } request - Indicates the Geo-fence configuration parameters.
     * @param { WantAgent } want - Indicates which ability to start when the geofence event is triggered.
     * @returns { void }.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 3301000 - Location service is unavailable.
     * @throws { BusinessError } 3301100 - The location switch is off.
     * @throws { BusinessError } 3301600 - Failed to operate the geofence.
     * @syscap SystemCapability.Location.Location.Geofence
     * @since 9
     */
    function on(type: 'gnssFenceStatusChange', request: GeofenceRequest, want: WantAgent): void;

    /**
     * Remove a geofence and unsubscribe geo fence status changed.
     * @permission ohos.permission.APPROXIMATELY_LOCATION
     * @param { GeofenceRequest } request - Indicates the Geo-fence configuration parameters.
     * @param { WantAgent } want - Indicates which ability to start when the geofence event is triggered.
     * @returns { void }.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 3301000 - Location service is unavailable.
     * @throws { BusinessError } 3301100 - The location switch is off.
     * @throws { BusinessError } 3301600 - Failed to operate the geofence.
     * @syscap SystemCapability.Location.Location.Geofence
     * @since 9
     */
    function off(type: 'gnssFenceStatusChange', request: GeofenceRequest, want: WantAgent): void;

    /**
     * Registering the callback function for listening to country code changes.
     * @param { Callback<CountryCode> } callback - Indicates the callback for reporting country code changes.
     * @returns { void }.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 3301000 - Location service is unavailable.
     * @throws { BusinessError } 3301500 - Failed to query the area information.
     * @syscap SystemCapability.Location.Location.Core
     * @since 9
     */
    function on(type: 'countryCodeChange', callback: Callback<CountryCode>): void;

    /**
     * Unregistering the callback function for listening to country code changes.
     * @param { Callback<CountryCode> } [callback] - Indicates the callback for reporting country code changes.
     * @returns { void }.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 3301000 - Location service is unavailable.
     * @throws { BusinessError } 3301500 - Failed to query the area information.
     * @syscap SystemCapability.Location.Location.Core
     * @since 9
     */
    function off(type: 'countryCodeChange', callback?: Callback<CountryCode>): void;

    /**
     * Obtain current location.
     * @permission ohos.permission.APPROXIMATELY_LOCATION
     * @param { CurrentLocationRequest } request - Indicates the location request parameters.
     * @param { AsyncCallback<Location> } callback - Indicates the callback for reporting the location result.
     * @returns { void }.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 3301000 - Location service is unavailable.
     * @throws { BusinessError } 3301100 - The location switch is off.
     * @throws { BusinessError } 3301200 - Failed to obtain the geographical location.
     * @syscap SystemCapability.Location.Location.Core
     * @since 9
     */
    function getCurrentLocation(request: CurrentLocationRequest, callback: AsyncCallback<Location>): void;

    /**
     * Obtain current location.
     * @permission ohos.permission.APPROXIMATELY_LOCATION
     * @param { AsyncCallback<Location> } callback - Indicates the callback for reporting the location result.
     * @returns { void }.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 3301000 - Location service is unavailable.
     * @throws { BusinessError } 3301100 - The location switch is off.
     * @throws { BusinessError } 3301200 - Failed to obtain the geographical location.
     * @syscap SystemCapability.Location.Location.Core
     * @since 9
     */
    function getCurrentLocation(callback: AsyncCallback<Location>): void;

    /**
     * Obtain current location.
     * @permission ohos.permission.APPROXIMATELY_LOCATION
     * @param { CurrentLocationRequest } [request] - Indicates the location request parameters.
     * @returns { Promise<Location> } The promise returned by the function.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 3301000 - Location service is unavailable.
     * @throws { BusinessError } 3301100 - The location switch is off.
     * @throws { BusinessError } 3301200 - Failed to obtain the geographical location.
     * @syscap SystemCapability.Location.Location.Core
     * @since 9
     */
    function getCurrentLocation(request?: CurrentLocationRequest): Promise<Location>;

    /**
     * Obtain last known location.
     * @permission ohos.permission.APPROXIMATELY_LOCATION
     * @returns { Location } The last known location information.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 3301000 - Location service is unavailable.
     * @throws { BusinessError } 3301100 - The location switch is off.
     * @throws { BusinessError } 3301200 - Failed to obtain the geographical location.
     * @syscap SystemCapability.Location.Location.Core
     * @since 9
     */
    function getLastLocation(): Location;

    /**
     * Obtain current location switch status.
     * @returns { boolean } Returns {@code true} if the location switch on, returns {@code false} otherwise.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 3301000 - Location service is unavailable.
     * @syscap SystemCapability.Location.Location.Core
     * @since 9
     */
    function isLocationEnabled(): boolean;

    /**
     * Enable location switch.
     * @permission ohos.permission.MANAGE_SECURE_SETTINGS
     * @param { AsyncCallback<void> } callback - Indicates the callback for reporting the error message.
     * @returns { void }.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 202 - System API is not allowed called by third HAP.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 3301000 - Location service is unavailable.
     * @syscap SystemCapability.Location.Location.Core
     * @systemapi
     * @since 9
     */
    function enableLocation(callback: AsyncCallback<void>): void;

    /**
     * Enable location switch.
     * @permission ohos.permission.MANAGE_SECURE_SETTINGS
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 202 - System API is not allowed called by third HAP.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 3301000 - Location service is unavailable.
     * @syscap SystemCapability.Location.Location.Core
     * @systemapi
     * @since 9
     */
    function enableLocation(): Promise<void>;

    /**
     * Disable location switch.
     * @permission ohos.permission.MANAGE_SECURE_SETTINGS
     * @returns { void }.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 202 - System API is not allowed called by third HAP.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 3301000 - Location service is unavailable.
     * @syscap SystemCapability.Location.Location.Core
     * @systemapi
     * @since 9
     */
    function disableLocation(): void;

    /**
     * Obtain address info from location.
     * @param { ReverseGeoCodeRequest } request - Indicates the reverse geocode query parameters.
     * @param { AsyncCallback<Array<GeoAddress>> } callback - Indicates the callback for reporting the address info.
     * @returns { void }.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 3301000 - Location service is unavailable.
     * @throws { BusinessError } 3301300 - Reverse geocoding query failed.
     * @syscap SystemCapability.Location.Location.Geocoder
     * @since 9
     */
    function getAddressesFromLocation(request: ReverseGeoCodeRequest, callback: AsyncCallback<Array<GeoAddress>>): void;

    /**
     * Obtain address info from location.
     * @param { ReverseGeoCodeRequest } request - Indicates the reverse geocode query parameters.
     * @returns { Promise<Array<GeoAddress>> } The promise returned by the function.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 3301000 - Location service is unavailable.
     * @throws { BusinessError } 3301300 - Reverse geocoding query failed.
     * @syscap SystemCapability.Location.Location.Geocoder
     * @since 9
     */
    function getAddressesFromLocation(request: ReverseGeoCodeRequest): Promise<Array<GeoAddress>>;

    /**
     * Obtain latitude and longitude info from location address.
     * @param { GeoCodeRequest } request - Indicates the geocode query parameters.
     * @param { AsyncCallback<Array<GeoAddress>> } callback - Indicates the callback for reporting the latitude and longitude result.
     * @returns { void }.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 3301000 - Location service is unavailable.
     * @throws { BusinessError } 3301400 - Geocoding query failed.
     * @syscap SystemCapability.Location.Location.Geocoder
     * @since 9
     */
    function getAddressesFromLocationName(request: GeoCodeRequest, callback: AsyncCallback<Array<GeoAddress>>): void;

    /**
     * Obtain latitude and longitude info from location address.
     * @param { GeoCodeRequest } request - Indicates the geocode query parameters.
     * @returns { Promise<Array<GeoAddress>> } The promise returned by the function.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 3301000 - Location service is unavailable.
     * @throws { BusinessError } 3301400 - Geocoding query failed.
     * @syscap SystemCapability.Location.Location.Geocoder
     * @since 9
     */
    function getAddressesFromLocationName(request: GeoCodeRequest): Promise<Array<GeoAddress>>;

    /**
     * Obtain geocoding service status.
     * @returns { boolean } Returns {@code true} if geocoding service is available, returns {@code false} otherwise.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 3301000 - Location service is unavailable.
     * @syscap SystemCapability.Location.Location.Geocoder
     * @since 9
     */
    function isGeocoderAvailable(): boolean;

    /**
     * Obtain the number of cached GNSS locations reported at a time.
     * @permission ohos.permission.APPROXIMATELY_LOCATION
     * @param { AsyncCallback<number> } callback - Indicates the callback for reporting the cached GNSS locations size.
     * @returns { void }.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 3301000 - Location service is unavailable.
     * @throws { BusinessError } 3301100 - The location switch is off.
     * @syscap SystemCapability.Location.Location.Gnss
     * @since 9
     */
    function getCachedGnssLocationsSize(callback: AsyncCallback<number>): void;

    /**
     * Obtain the number of cached GNSS locations.
     * @permission ohos.permission.APPROXIMATELY_LOCATION
     * @returns { Promise<number> } The promise returned by the function.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 3301000 - Location service is unavailable.
     * @throws { BusinessError } 3301100 - The location switch is off.
     * @syscap SystemCapability.Location.Location.Gnss
     * @since 9
     */
    function getCachedGnssLocationsSize(): Promise<number>;

    /**
     * All prepared GNSS locations are returned to the application through the callback function,
     * and the bottom-layer buffer is cleared.
     * @permission ohos.permission.APPROXIMATELY_LOCATION
     * @param { AsyncCallback<void> } callback - Indicates the callback for reporting the error message.
     * If the function fails to execute, the error message will be carried in the first parameter err of AsyncCallback,
     * If the function executes successfully, execute the callback function only, no data will be returned.
     * @returns { void }.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 3301000 - Location service is unavailable.
     * @throws { BusinessError } 3301100 - The location switch is off.
     * @throws { BusinessError } 3301200 - Failed to obtain the geographical location.
     * @syscap SystemCapability.Location.Location.Gnss
     * @since 9
     */
    function flushCachedGnssLocations(callback: AsyncCallback<void>): void;

    /**
     * All prepared GNSS locations are returned to the application,
     * and the bottom-layer buffer is cleared.
     * @permission ohos.permission.APPROXIMATELY_LOCATION
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 3301000 - Location service is unavailable.
     * @throws { BusinessError } 3301100 - The location switch is off.
     * @throws { BusinessError } 3301200 - Failed to obtain the geographical location.
     * @syscap SystemCapability.Location.Location.Gnss
     * @since 9
     */
    function flushCachedGnssLocations(): Promise<void>;

    /**
     * Send extended commands to location subsystem.
     * @param { LocationCommand } command - Indicates the extended command message body.
     * @param { AsyncCallback<void> } callback - Indicates the callback for reporting the error message.
     * If the function fails to execute, the error message will be carried in the first parameter err of AsyncCallback,
     * If the function executes successfully, execute the callback function only, no data will be returned.
     * @returns { void }.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 3301000 - Location service is unavailable.
     * @syscap SystemCapability.Location.Location.Core
     * @since 9
     */
    function sendCommand(command: LocationCommand, callback: AsyncCallback<void>): void;

    /**
     * Send extended commands to location subsystem.
     * @param { LocationCommand } command - Indicates the extended command message body.
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 3301000 - Location service is unavailable.
     * @syscap SystemCapability.Location.Location.Core
     * @since 9
     */
    function sendCommand(command: LocationCommand): Promise<void>;

    /**
     * Obtain the current country code.
     * @param { AsyncCallback<CountryCode> } callback - Indicates the callback for reporting the country code.
     * @returns { void }.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 3301000 - Location service is unavailable.
     * @throws { BusinessError } 3301500 - Failed to query the area information.
     * @syscap SystemCapability.Location.Location.Core
     * @since 9
     */
    function getCountryCode(callback: AsyncCallback<CountryCode>): void;

    /**
     * Obtain the current country code.
     * @returns { Promise<CountryCode> } The promise returned by the function.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 3301000 - Location service is unavailable.
     * @throws { BusinessError } 3301500 - Failed to query the area information.
     * @syscap SystemCapability.Location.Location.Core
     * @since 9
     */
    function getCountryCode(): Promise<CountryCode>;

    /**
     * Enable the geographical location simulation function.
     * @returns { void }.
     * @throws { BusinessError } 202 - System API is not allowed called by third HAP.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 3301000 - Location service is unavailable.
     * @throws { BusinessError } 3301100 - The location switch is off.
     * @syscap SystemCapability.Location.Location.Core
     * @systemapi
     * @since 9
     */
    function enableLocationMock(): void;

    /**
     * Disable the geographical location simulation function.
     * @returns { void }.
     * @throws { BusinessError } 202 - System API is not allowed called by third HAP.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 3301000 - Location service is unavailable.
     * @throws { BusinessError } 3301100 - The location switch is off.
     * @syscap SystemCapability.Location.Location.Core
     * @systemapi
     * @since 9
     */
    function disableLocationMock(): void;

    /**
     * Set the configuration parameters for location simulation.
     * @param { LocationMockConfig } config - Indicates the configuration parameters for location simulation.
     * Contains the array of locations and reporting intervals that need to be simulated.
     * @returns { void }.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 3301000 - Location service is unavailable.
     * @throws { BusinessError } 3301100 - The location switch is off.
     * @syscap SystemCapability.Location.Location.Core
     * @systemapi
     * @since 9
     */
    function setMockedLocations(config: LocationMockConfig): void;

    /**
     * Enable the reverse geocoding simulation function.
     * @returns { void }.
     * @throws { BusinessError } 202 - System API is not allowed called by third HAP.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 3301000 - Location service is unavailable.
     * @syscap SystemCapability.Location.Location.Core
     * @systemapi
     * @since 9
     */
    function enableReverseGeocodingMock(): void;

    /**
     * Disable the reverse geocoding simulation function.
     * @returns { void }.
     * @throws { BusinessError } 202 - System API is not allowed called by third HAP.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 3301000 - Location service is unavailable.
     * @syscap SystemCapability.Location.Location.Core
     * @systemapi
     * @since 9
     */
    function disableReverseGeocodingMock(): void;

    /**
     * Set the configuration parameters for simulating reverse geocoding.
     * @param { Array<ReverseGeocodingMockInfo> } mockInfos - Indicates the set of locations and place names to be simulated.
     * @returns { void }.
     * @throws { BusinessError } 202 - System API is not allowed called by third HAP.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 3301000 - Location service is unavailable.
     * @syscap SystemCapability.Location.Location.Core
     * @systemapi
     * @since 9
     */
    function setReverseGeocodingMockInfo(mockInfos: Array<ReverseGeocodingMockInfo>): void;

    /**
     * Querying location privacy protocol confirmation status.
     * @param { LocationPrivacyType } type - Indicates location privacy protocol type.
     * @returns { boolean } Returns {@code true} if the location privacy protocol has been confirmed, returns {@code false} otherwise.
     * @throws { BusinessError } 202 - System API is not allowed called by third HAP.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 3301000 - Location service is unavailable.
     * @syscap SystemCapability.Location.Location.Core
     * @systemapi
     * @since 9
     */
    function isLocationPrivacyConfirmed(type: LocationPrivacyType): boolean;

    /**
     * Set location privacy protocol confirmation status.
     * @permission ohos.permission.MANAGE_SECURE_SETTINGS
     * @param { LocationPrivacyType } type - Indicates location privacy protocol type.
     * @param { boolean } isConfirmed - Indicates whether the location privacy protocol has been confirmed.
     * @returns { void }.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 202 - System API is not allowed called by third HAP.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 3301000 - Location service is unavailable.
     * @syscap SystemCapability.Location.Location.Core
     * @systemapi
     * @since 9
     */
    function setLocationPrivacyConfirmStatus(type: LocationPrivacyType, isConfirmed: boolean): void;

    /**
     * Configuration parameters for simulating reverse geocoding.
     * @typedef ReverseGeocodingMockInfo
     * @syscap SystemCapability.Location.Location.Core
     * @systemapi
     * @since 9
     */
    export interface ReverseGeocodingMockInfo {
        /**
         * Location for which reverse geocoding query is required.
         * @type { ReverseGeoCodeRequest }
         * @systemapi
         * @since 9
         */
        location: ReverseGeoCodeRequest;

        /**
         * Actual address information corresponding to the location.
         * @type { GeoAddress }
         * @systemapi
         * @since 9
         */
        geoAddress: GeoAddress;
    }

    /**
     * Parameters for configuring the location simulation function.
     * @typedef LocationMockConfig
     * @syscap SystemCapability.Location.Location.Core
     * @systemapi
     * @since 9
     */
    export interface LocationMockConfig {
        /**
         * Interval for reporting simulated locations.
         * @type { number }
         * @systemapi
         * @since 9
         */
        timeInterval: number;

        /**
         * Mock location array.
         * @type { Array<Location> }
         * @systemapi
         * @since 9
         */
        locations: Array<Location>;
    }

    /**
     * Satellite status information.
     * @typedef SatelliteStatusInfo
     * @syscap SystemCapability.Location.Location.Gnss
     * @since 9
     */
    export interface SatelliteStatusInfo {
        /**
         * Number of satellites.
         * @type { number }
         * @since 9
         */
        satellitesNumber: number;

        /**
         * Satellite ID array.
         * @type { Array<number> }
         * @since 9
         */
        satelliteIds: Array<number>;

        /**
         * Carrier to noise density array.
         * @type { Array<number> }
         * @since 9
         */
        carrierToNoiseDensitys: Array<number>;

        /**
         * Satellite altitude array.
         * @type { Array<number> }
         * @since 9
         */
        altitudes: Array<number>;

        /**
         * Satellite azimuth array.
         * @type { Array<number> }
         * @since 9
         */
        azimuths: Array<number>;

        /**
         * Satellite carrier frequency array.
         * @type { Array<number> }
         * @since 9
         */
        carrierFrequencies: Array<number>;
    }

    /**
     * Parameters for requesting to report cache location information.
     * @typedef CachedGnssLocationsRequest
     * @syscap SystemCapability.Location.Location.Gnss
     * @since 9
     */
    export interface CachedGnssLocationsRequest {
        /**
         * GNSS cache location report period.
         * @type { number }
         * @since 9
         */
        reportingPeriodSec: number;

        /**
         * Indicates whether to wake up the listener when the GNSS cache location queue is full.
         * @type { boolean }
         * @since 9
         */
        wakeUpCacheQueueFull: boolean;
    }

    /**
     * Configuring parameters in geo fence requests.
     * @typedef GeofenceRequest
     * @syscap SystemCapability.Location.Location.Geofence
     * @since 9
     */
    export interface GeofenceRequest {
        /**
         * Indicate the user scenario.
         * @type { LocationRequestScenario }
         * @since 9
         */
        scenario: LocationRequestScenario;

        /**
         * Circular fence information.
         * @type { Geofence }
         * @since 9
         */
        geofence: Geofence;
    }

    /**
     * Circular fence information.
     * @typedef Geofence
     * @syscap SystemCapability.Location.Location.Geofence
     * @since 9
     */
    export interface Geofence {
        /**
         * Latitude of the center point of the circular fence.
         * @type { number }
         * @since 9
         */
        latitude: number;

        /**
         * Longitude of the center point of the circular fence.
         * @type { number }
         * @since 9
         */
        longitude: number;

        /**
         * Radius of the circular fence.
         * @type { number }
         * @since 9
         */
        radius: number;

        /**
         * Expiration of the circular fence.
         * @type { number }
         * @since 9
         */
        expiration: number;
    }

    /**
     * Configuring parameters in reverse geocode requests.
     * @typedef ReverseGeoCodeRequest
     * @syscap SystemCapability.Location.Location.Geocoder
     * @since 9
     */
    export interface ReverseGeoCodeRequest {
        /**
         * Indicates the language area information.
         * @type { ?string }
         * @since 9
         */
        locale?: string;

        /**
         * Latitude for reverse geocoding query.
         * @type { number }
         * @since 9
         */
        latitude: number;

        /**
         * Longitude for reverse geocoding query.
         * @type { number }
         * @since 9
         */
        longitude: number;

        /**
         * Indicates the maximum number of addresses returned by reverse geocoding query.
         * @type { ?number }
         * @since 9
         */
        maxItems?: number;
    }

    /**
     * Configuring parameters in geocode requests.
     * @typedef GeoCodeRequest
     * @syscap SystemCapability.Location.Location.Geocoder
     * @since 9
     */
    export interface GeoCodeRequest {
        /**
         * Indicates the language area information.
         * @type { ?string }
         * @since 9
         */
        locale?: string;

        /**
         * Address information that needs to be geocoded.
         * @type { string }
         * @since 9
         */
        description: string;

        /**
         * Indicates the maximum number of geocode query results.
         * @type { ?number }
         * @since 9
         */
        maxItems?: number;

        /**
         * Indicates the minimum latitude for geocoding query results.
         * @type { ?number }
         * @since 9
         */
        minLatitude?: number;

        /**
         * Indicates the minimum longitude for geocoding query results.
         * @type { ?number }
         * @since 9
         */
        minLongitude?: number;

        /**
         * Indicates the maximum latitude for geocoding query results.
         * @type { ?number }
         * @since 9
         */
        maxLatitude?: number;

        /**
         * Indicates the maximum longitude for geocoding query results.
         * @type { ?number }
         * @since 9
         */
        maxLongitude?: number;
    }

    /**
     * Data struct describes geographic locations.
     * @typedef GeoAddress
     * @syscap SystemCapability.Location.Location.Geocoder
     * @since 9
     */
    export interface GeoAddress {
        /**
         * Indicates latitude information.
         * A positive value indicates north latitude,
         * and a negative value indicates south latitude.
         * @type { ?number }
         * @since 9
         */
        latitude?: number;

        /**
         * Indicates longitude information.
         * A positive value indicates east longitude ,
         * and a negative value indicates west longitude.
         * @type { ?number }
         * @since 9
         */
        longitude?: number;

        /**
         * Indicates language used for the location description.
         * zh indicates Chinese, and en indicates English.
         * @type { ?string }
         * @since 9
         */
        locale?: string;

        /**
         * Indicates landmark of the location.
         * @type { ?string }
         * @since 9
         */
        placeName?: string;

        /**
         * Indicates country code.
         * @type { ?string }
         * @since 9
         */
        countryCode?: string;

        /**
         * Indicates country name.
         * @type { ?string }
         * @since 9
         */
        countryName?: string;

        /**
         * Indicates administrative region name.
         * @type { ?string }
         * @since 9
         */
        administrativeArea?: string;

        /**
         * Indicates sub-administrative region name.
         * @type { ?string }
         * @since 9
         */
        subAdministrativeArea?: string;

        /**
         * Indicates locality information.
         * @type { ?string }
         * @since 9
         */
        locality?: string;

        /**
         * Indicates sub-locality information.
         * @type { ?string }
         * @since 9
         */
        subLocality?: string;

        /**
         * Indicates road name.
         * @type { ?string }
         * @since 9
         */
        roadName?: string;

        /**
         * Indicates auxiliary road information.
         * @type { ?string }
         * @since 9
         */
        subRoadName?: string;

        /**
         * Indicates house information.
         * @type { ?string }
         * @since 9
         */
        premises?: string;

        /**
         * Indicates postal code.
         * @type { ?string }
         * @since 9
         */
        postalCode?: string;

        /**
         * Indicates phone number.
         * @type { ?string }
         * @since 9
         */
        phoneNumber?: string;

        /**
         * Indicates website URL.
         * @type { ?string }
         * @since 9
         */
        addressUrl?: string;

        /**
         * Indicates additional information.
         * @type { ?Array<string> }
         * @since 9
         */
        descriptions?: Array<string>;

        /**
         * Indicates the amount of additional descriptive information.
         * @type { ?number }
         * @since 9
         */
        descriptionsSize?: number;

        /**
         * Indicates whether it is an mock GeoAddress
         * @type { ?Boolean }
         * @systemapi
         * @since 9
         */
        isFromMock?: Boolean;
    }

    /**
     * Configuring parameters in location requests.
     * @typedef LocationRequest
     * @syscap SystemCapability.Location.Location.Core
     * @since 9
     */
    export interface LocationRequest {
        /**
         * Priority of the location request.
         * @type { ?LocationRequestPriority }
         * @since 9
         */
        priority?: LocationRequestPriority;

        /**
         * User scenario of the location request.
         * @type { ?LocationRequestScenario }
         * @since 9
         */
        scenario?: LocationRequestScenario;

        /**
         * Location report interval.
         * @type { ?number }
         * @since 9
         */
        timeInterval?: number;

        /**
         * Location report distance interval.
         * @type { ?number }
         * @since 9
         */
        distanceInterval?: number;

        /**
         * Accuracy requirements for reporting locations.
         * @type { ?number }
         * @since 9
         */
        maxAccuracy?: number;
    }

    /**
     * Configuring parameters in current location requests.
     * @typedef CurrentLocationRequest
     * @syscap SystemCapability.Location.Location.Core
     * @since 9
     */
    export interface CurrentLocationRequest {
        /**
         * Priority of the location request.
         * @type { ?LocationRequestPriority }
         * @since 9
         */
        priority?: LocationRequestPriority;

        /**
         * User scenario of the location request.
         * @type { ?LocationRequestScenario }
         * @since 9
         */
        scenario?: LocationRequestScenario;

        /**
         * Accuracy requirements for reporting locations.
         * @type { ?number }
         * @since 9
         */
        maxAccuracy?: number;

        /**
         * Timeout interval of a single location request.
         * @type { ?number }
         * @since 9
         */
        timeoutMs?: number;
    }

    /**
     * Provides information about geographic locations.
     * @typedef Location
     * @syscap SystemCapability.Location.Location.Core
     * @since 9
     */
    export interface Location {
        /**
         * Indicates latitude information.
         * A positive value indicates north latitude,
         * and a negative value indicates south latitude.
         * @type { number }
         * @since 9
         */
        latitude: number;

        /**
         * Indicates Longitude information.
         * A positive value indicates east longitude ,
         * and a negative value indicates west longitude.
         * @type { number }
         * @since 9
         */
        longitude: number;

        /**
         * Indicates location altitude, in meters.
         * @type { number }
         * @since 9
         */
        altitude: number;

        /**
         * Indicates location accuracy, in meters.
         * @type { number }
         * @since 9
         */
        accuracy: number;

        /**
         * Indicates speed, in m/s.
         * @type { number }
         * @since 9
         */
        speed: number;

        /**
         * Indicates location timestamp in the UTC format.
         * @type { number }
         * @since 9
         */
        timeStamp: number;

        /**
         * Indicates direction information.
         * @type { number }
         * @since 9
         */
        direction: number;

        /**
         * Indicates location timestamp since boot.
         * @type { number }
         * @since 9
         */
        timeSinceBoot: number;

        /**
         * Indicates additional information.
         * @type { ?Array<string> }
         * @since 9
         */
        additions?: Array<string>;

        /**
         * Indicates the amount of additional descriptive information.
         * @type { ?number }
         * @since 9
         */
        additionSize?: number;

        /**
         * Indicates whether it is an mock location.
         * @type { ?Boolean }
         * @systemapi
         * @since 9
         */
        isFromMock?: Boolean;
    }

    /**
     * Enum for location priority.
     * @enum { number }
     * @syscap SystemCapability.Location.Location.Core
     * @since 9
     */
    export enum LocationRequestPriority {
        /**
         * Default priority.
         * @syscap SystemCapability.Location.Location.Core
         * @since 9
         */
        UNSET = 0x200,

        /**
         * Preferentially ensure the locating accuracy.
         * @syscap SystemCapability.Location.Location.Core
         * @since 9
         */
        ACCURACY,

        /**
         * Preferentially ensure low power consumption for locating.
         * @syscap SystemCapability.Location.Location.Core
         * @since 9
         */
        LOW_POWER,

        /**
         * Preferentially ensure that the first location is time-consuming.
         * @syscap SystemCapability.Location.Location.Core
         * @since 9
         */
        FIRST_FIX,
    }

    /**
     * Enum for location scenario.
     * @enum { number }
     * @syscap SystemCapability.Location.Location.Core
     * @since 9
     */
    export enum LocationRequestScenario {
        /**
         * Default scenario.
         * @syscap SystemCapability.Location.Location.Core
         * @since 9
         */
        UNSET = 0x300,

        /**
         * Navigation scenario. High positioning precision and real-time performance are required.
         * @syscap SystemCapability.Location.Location.Core
         * @since 9
         */
        NAVIGATION,

        /**
         * Trajectory tracking scenario. High positioning precision is required.
         * @syscap SystemCapability.Location.Location.Core
         * @since 9
         */
        TRAJECTORY_TRACKING,

        /**
         * Car hailing scenario. High positioning precision and real-time performance are required.
         * @syscap SystemCapability.Location.Location.Core
         * @since 9
         */
        CAR_HAILING,

        /**
         * Daily life scenarios. Low requirements on positioning precision and real-time performance.
         * @syscap SystemCapability.Location.Location.Core
         * @since 9
         */
        DAILY_LIFE_SERVICE,

        /**
         * Power saving scenarios.
         * @syscap SystemCapability.Location.Location.Core
         * @since 9
         */
        NO_POWER,
    }

    /**
     * Enum for location privacy type.
     * @enum { number }
     * @syscap SystemCapability.Location.Location.Core
     * @systemapi
     * @since 9
     */
    export enum LocationPrivacyType {
        /**
         * Other scenarios.
         * @syscap SystemCapability.Location.Location.Core
         * @systemapi
         * @since 9
         */
        OTHERS = 0,

        /**
         * Privacy agreement for the startup wizard scenario.
         * @syscap SystemCapability.Location.Location.Core
         * @systemapi
         * @since 9
         */
        STARTUP,

        /**
         * Privacy agreement pop-up when network location is enabled.
         * @syscap SystemCapability.Location.Location.Core
         * @systemapi
         * @since 9
         */
        CORE_LOCATION,
    }

    /**
     * Location subsystem command structure.
     * @typedef LocationCommand
     * @syscap SystemCapability.Location.Location.Core
     * @since 9
     */
    export interface LocationCommand {
        /**
         * Information about the scenario where the command is sent.
         * @type { LocationRequestScenario }
         * @since 9
         */
        scenario: LocationRequestScenario;

        /**
         * Sent command content.
         * @type { string }
         * @since 9
         */
        command: string;
    }

    /**
     * Country code structure.
     * @typedef CountryCode
     * @syscap SystemCapability.Location.Location.Core
     * @since 9
     */
    export interface CountryCode {
        /**
         * Country code character string.
         * @type { string }
         * @since 9
         */
        country: string;

        /**
         * Country code source.
         * @type { CountryCodeType }
         * @since 9
         */
        type: CountryCodeType;
    }

    /**
     * Enum for country code type.
     * @enum { number }
     * @syscap SystemCapability.Location.Location.Core
     * @since 9
     */
    export enum CountryCodeType {
        /**
         * Country code obtained from the locale setting.
         * @syscap SystemCapability.Location.Location.Core
         * @since 9
         */
        COUNTRY_CODE_FROM_LOCALE = 1,

        /**
         * Country code obtained from the SIM information.
         * @syscap SystemCapability.Location.Location.Core
         * @since 9
         */
        COUNTRY_CODE_FROM_SIM,

        /**
         * Obtains the current location for geocoded query and obtains the country code from the result.
         * @syscap SystemCapability.Location.Location.Core
         * @since 9
         */
        COUNTRY_CODE_FROM_LOCATION,

        /**
         * Obtain the country code from the cell registration information.
         * @syscap SystemCapability.Location.Location.Core
         * @since 9
         */
        COUNTRY_CODE_FROM_NETWORK,
    }
}

export default geoLocationManager;
