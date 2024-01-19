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
 * Provides interfaces for initiating location requests, ending the location service,
 * and obtaining the location result cached by the system.
 *
 * @since 7
 * @syscap SystemCapability.Location.Location.Core
 * @permission ohos.permission.LOCATION
 * @deprecated since 9
 */
declare namespace geolocation {
    /**
     * subscribe location changed
     *
     * @since 7
     * @syscap SystemCapability.Location.Location.Core
     * @permission ohos.permission.LOCATION
     * @param request Indicates the location request parameters.
     * @param callback Indicates the callback for reporting the location result.
     * @deprecated since 9
     * @useinstead ohos.geoLocationManager/geoLocationManager.on#event:locationChange
     */
    function on(type: 'locationChange', request: LocationRequest, callback: Callback<Location>): void;

    /**
     * unsubscribe location changed
     *
     * @since 7
     * @syscap SystemCapability.Location.Location.Core
     * @permission ohos.permission.LOCATION
     * @param callback Indicates the callback for reporting the location result.
     * @deprecated since 9
     * @useinstead ohos.geoLocationManager/geoLocationManager.off#event:locationChange
     */
    function off(type: 'locationChange', callback?: Callback<Location>): void;

    /**
     * subscribe location switch changed
     *
     * @since 7
     * @syscap SystemCapability.Location.Location.Core
     * @permission ohos.permission.LOCATION
     * @param callback Indicates the callback for reporting the location result.
     * @deprecated since 9
     * @useinstead ohos.geoLocationManager/geoLocationManager.on#event:locationEnabledChange
     */
    function on(type: 'locationServiceState', callback: Callback<boolean>): void;

    /**
     * unsubscribe location switch changed
     *
     * @since 7
     * @syscap SystemCapability.Location.Location.Core
     * @permission ohos.permission.LOCATION
     * @param callback Indicates the callback for reporting the location result.
     * @deprecated since 9
     * @useinstead ohos.geoLocationManager/geoLocationManager.off#event:locationEnabledChange
     */
    function off(type: 'locationServiceState', callback?: Callback<boolean>): void;

    /**
     * subscribe to cache GNSS locations update messages
     *
     * @since 8
     * @syscap SystemCapability.Location.Location.Gnss
     * @permission ohos.permission.LOCATION
     * @param request Indicates the cached GNSS locations request parameters.
     * @param callback Indicates the callback for reporting the cached GNSS locations.
     * @deprecated since 9
     * @useinstead ohos.geoLocationManager/geoLocationManager.on#event:cachedGnssLocationsChange
     */
    function on(type: 'cachedGnssLocationsReporting', request: CachedGnssLocationsRequest, callback: Callback<Array<Location>>): void;

    /**
     * unsubscribe to cache GNSS locations update messages
     *
     * @since 8
     * @syscap SystemCapability.Location.Location.Gnss
     * @permission ohos.permission.LOCATION
     * @param callback Indicates the callback for reporting the cached gnss locations.
     * @deprecated since 9
     * @useinstead ohos.geoLocationManager/geoLocationManager.off#event:cachedGnssLocationsChange
     */
    function off(type: 'cachedGnssLocationsReporting', callback?: Callback<Array<Location>>): void;

    /**
     * subscribe gnss status changed
     *
     * @since 8
     * @syscap SystemCapability.Location.Location.Gnss
     * @permission ohos.permission.LOCATION
     * @param callback Indicates the callback for reporting the gnss status change.
     * @deprecated since 9
     * @useinstead ohos.geoLocationManager/geoLocationManager.on#event:satelliteStatusChange
     */
    function on(type: 'gnssStatusChange', callback: Callback<SatelliteStatusInfo>): void;

    /**
     * unsubscribe gnss status changed
     *
     * @since 8
     * @syscap SystemCapability.Location.Location.Gnss
     * @permission ohos.permission.LOCATION
     * @param callback Indicates the callback for reporting the gnss status change.
     * @deprecated since 9
     * @useinstead ohos.geoLocationManager/geoLocationManager.off#event:satelliteStatusChange
     */
    function off(type: 'gnssStatusChange', callback?: Callback<SatelliteStatusInfo>): void;

    /**
     * subscribe nmea message changed
     *
     * @since 8
     * @syscap SystemCapability.Location.Location.Gnss
     * @permission ohos.permission.LOCATION
     * @param callback Indicates the callback for reporting the nmea message.
     * @deprecated since 9
     * @useinstead ohos.geoLocationManager/geoLocationManager.on#event:nmeaMessage
     */
    function on(type: 'nmeaMessageChange', callback: Callback<string>): void;

    /**
     * unsubscribe nmea message changed
     *
     * @since 8
     * @syscap SystemCapability.Location.Location.Gnss
     * @permission ohos.permission.LOCATION
     * @param callback Indicates the callback for reporting the nmea message.
     * @deprecated since 9
     * @useinstead ohos.geoLocationManager/geoLocationManager.off#event:nmeaMessage
     */
    function off(type: 'nmeaMessageChange', callback?: Callback<string>): void;

    /**
     * add a geofence and subscribe geo fence status changed
     *
     * @since 8
     * @syscap SystemCapability.Location.Location.Geofence
     * @permission ohos.permission.LOCATION
     * @param request Indicates the Geo-fence configuration parameters.
     * @param callback Indicates the callback for reporting the fence status.
     * @deprecated since 9
     * @useinstead ohos.geoLocationManager/geoLocationManager.on#event:gnssFenceStatusChange
     */
    function on(type: 'fenceStatusChange', request: GeofenceRequest, want: WantAgent): void;

    /**
     * remove a geofence and unsubscribe geo fence status changed
     *
     * @since 8
     * @syscap SystemCapability.Location.Location.Geofence
     * @permission ohos.permission.LOCATION
     * @param request Indicates the Geo-fence configuration parameters.
     * @param callback Indicates the callback for reporting the remove fence result.
     * @deprecated since 9
     * @useinstead ohos.geoLocationManager/geoLocationManager.off#event:gnssFenceStatusChange
     */
    function off(type: 'fenceStatusChange', request: GeofenceRequest, want: WantAgent): void;

    /**
     * obtain current location
     *
     * @since 7
     * @syscap SystemCapability.Location.Location.Core
     * @permission ohos.permission.LOCATION
     * @param callback Indicates the callback for reporting the location result.
     * @deprecated since 9
     * @useinstead ohos.geoLocationManager/geoLocationManager.getCurrentLocation
     */
    function getCurrentLocation(request: CurrentLocationRequest, callback: AsyncCallback<Location>): void;
    function getCurrentLocation(callback: AsyncCallback<Location>): void;
    function getCurrentLocation(request?: CurrentLocationRequest): Promise<Location>;

    /**
     * obtain last known location
     *
     * @since 7
     * @syscap SystemCapability.Location.Location.Core
     * @permission ohos.permission.LOCATION
     * @param callback Indicates the callback for reporting the location result.
     * @deprecated since 9
     * @useinstead ohos.geoLocationManager/geoLocationManager.getLastLocation
     */
    function getLastLocation(callback: AsyncCallback<Location>): void;
    function getLastLocation(): Promise<Location>;

    /**
     * obtain current location switch status
     *
     * @since 7
     * @syscap SystemCapability.Location.Location.Core
     * @permission ohos.permission.LOCATION
     * @param callback Indicates the callback for reporting the location switch result.
     * @deprecated since 9
     * @useinstead ohos.geoLocationManager/geoLocationManager.isLocationEnabled
     */
    function isLocationEnabled(callback: AsyncCallback<boolean>): void;
    function isLocationEnabled(): Promise<boolean>;

    /**
     * request enable location
     *
     * @since 7
     * @syscap SystemCapability.Location.Location.Core
     * @permission ohos.permission.LOCATION
     * @param callback Indicates the callback for reporting the location switch status.
     * @deprecated since 9
     */
    function requestEnableLocation(callback: AsyncCallback<boolean>): void;
    function requestEnableLocation(): Promise<boolean>;

    /**
     * obtain address info from location
     *
     * @since 7
     * @syscap SystemCapability.Location.Location.Geocoder
     * @permission ohos.permission.LOCATION
     * @param callback Indicates the callback for reporting the address info.
     * @deprecated since 9
     * @useinstead ohos.geoLocationManager/geoLocationManager.getAddressesFromLocation
     */
    function getAddressesFromLocation(request: ReverseGeoCodeRequest, callback: AsyncCallback<Array<GeoAddress>>): void;
    function getAddressesFromLocation(request: ReverseGeoCodeRequest): Promise<Array<GeoAddress>>;

    /**
     * obtain latitude and longitude info from location address
     *
     * @since 7
     * @syscap SystemCapability.Location.Location.Geocoder
     * @permission ohos.permission.LOCATION
     * @param callback Indicates the callback for reporting the latitude and longitude result.
     * @deprecated since 9
     * @useinstead ohos.geoLocationManager/geoLocationManager.getAddressesFromLocationName
     */
    function getAddressesFromLocationName(request: GeoCodeRequest, callback: AsyncCallback<Array<GeoAddress>>): void;
    function getAddressesFromLocationName(request: GeoCodeRequest): Promise<Array<GeoAddress>>;

    /**
     * obtain geocode service status
     *
     * @since 7
     * @syscap SystemCapability.Location.Location.Geocoder
     * @permission ohos.permission.LOCATION
     * @param callback Indicates the callback for reporting the geocode service status.
     * @deprecated since 9
     * @useinstead ohos.geoLocationManager/geoLocationManager.isGeocoderAvailable
     */
    function isGeoServiceAvailable(callback: AsyncCallback<boolean>): void;
    function isGeoServiceAvailable(): Promise<boolean>;

    /**
     * obtain the number of cached GNSS locations reported at a time
     *
     * @since 8
     * @syscap SystemCapability.Location.Location.Gnss
     * @permission ohos.permission.LOCATION
     * @param callback Indicates the callback for reporting the cached GNSS locations size.
     * @deprecated since 9
     * @useinstead ohos.geoLocationManager/geoLocationManager.getCachedGnssLocationsSize
     */
    function getCachedGnssLocationsSize(callback: AsyncCallback<number>): void;
    function getCachedGnssLocationsSize(): Promise<number>;

    /**
     * all prepared GNSS locations are returned to the application through the callback function,
     * and the bottom-layer buffer is cleared.
     *
     * @since 8
     * @syscap SystemCapability.Location.Location.Gnss
     * @permission ohos.permission.LOCATION
     * @param callback Indicates the callback for reporting the result.
     * @deprecated since 9
     * @useinstead ohos.geoLocationManager/geoLocationManager.flushCachedGnssLocations
     */
    function flushCachedGnssLocations(callback: AsyncCallback<boolean>): void;
    function flushCachedGnssLocations(): Promise<boolean>;

    /**
     * send extended commands to location subsystem.
     *
     * @since 8
     * @syscap SystemCapability.Location.Location.Core
     * @permission ohos.permission.LOCATION
     * @param command Indicates the extended Command Message Body.
     * @param callback Indicates the callback for reporting the send command result.
     * @deprecated since 9
     * @useinstead ohos.geoLocationManager/geoLocationManager.sendCommand
     */
    function sendCommand(command: LocationCommand, callback: AsyncCallback<boolean>): void;
    function sendCommand(command: LocationCommand): Promise<boolean>;

    /**
     * satellite status information
     *
     * @since 8
     * @syscap SystemCapability.Location.Location.Gnss
     * @permission ohos.permission.LOCATION
     * @deprecated since 9
     * @useinstead ohos.geoLocationManager/geoLocationManager.SatelliteStatusInfo
     */
    export interface SatelliteStatusInfo {
        satellitesNumber: number;
        satelliteIds: Array<number>;
        carrierToNoiseDensitys: Array<number>;
        altitudes: Array<number>;
        azimuths: Array<number>;
        carrierFrequencies: Array<number>;
    }

    /**
     * parameters for requesting to report cache location information
     *
     * @since 8
     * @syscap SystemCapability.Location.Location.Gnss
     * @permission ohos.permission.LOCATION
     * @deprecated since 9
     * @useinstead ohos.geoLocationManager/geoLocationManager.CachedGnssLocationsRequest
     */
    export interface CachedGnssLocationsRequest {
        reportingPeriodSec: number;
        wakeUpCacheQueueFull: boolean;
    }

    /**
     * configuring parameters in geo fence requests
     *
     * @since 8
     * @syscap SystemCapability.Location.Location.Geofence
     * @permission ohos.permission.LOCATION
     * @deprecated since 9
     * @useinstead ohos.geoLocationManager/geoLocationManager.GeofenceRequest
     */
    export interface GeofenceRequest {
        priority: LocationRequestPriority;
        scenario: LocationRequestScenario;
        geofence: Geofence;
    }

    /**
     * configuring parameters in geo fence requests
     *
     * @since 8
     * @syscap SystemCapability.Location.Location.Geofence
     * @permission ohos.permission.LOCATION
     * @deprecated since 9
     * @useinstead ohos.geoLocationManager/geoLocationManager.Geofence
     */
    export interface Geofence {
        latitude: number;
        longitude: number;
        radius: number;
        expiration: number;
    }

    /**
     * configuring parameters in reverse geocode requests
     *
     * @since 7
     * @syscap SystemCapability.Location.Location.Geocoder
     * @permission ohos.permission.LOCATION
     * @deprecated since 9
     * @useinstead ohos.geoLocationManager/geoLocationManager.ReverseGeoCodeRequest
     */
    export interface ReverseGeoCodeRequest {
        locale?: string;
        latitude: number;
        longitude: number;
        maxItems?: number;
    }

    /**
     * configuring parameters in geocode requests
     *
     * @since 7
     * @syscap SystemCapability.Location.Location.Geocoder
     * @permission ohos.permission.LOCATION
     * @deprecated since 9
     * @useinstead ohos.geoLocationManager/geoLocationManager.GeoCodeRequest
     */
    export interface GeoCodeRequest {
        locale?: string;
        description: string;
        maxItems?: number;
        minLatitude?: number;
        minLongitude?: number;
        maxLatitude?: number;
        maxLongitude?: number;
    }

    /**
     * data struct describes geographic locations.
     *
     * @since 7
     * @syscap SystemCapability.Location.Location.Geocoder
     * @permission ohos.permission.LOCATION
     * @deprecated since 9
     * @useinstead ohos.geoLocationManager/geoLocationManager.GeoAddress
     */
    export interface GeoAddress {
        /**
         * Indicates latitude information.
         * A positive value indicates north latitude,
         * and a negative value indicates south latitude.
         * @since 7
         */
        latitude?: number;

        /**
         * Indicates longitude information.
         * A positive value indicates east longitude ,
         * and a negative value indicates west longitude .
         * @since 7
         */
        longitude?: number;

        /**
         * Indicates language used for the location description.
         * zh indicates Chinese, and en indicates English.
         * @since 7
         */
        locale?: string;

        /**
         * Indicates landmark of the location.
         * @since 7
         */
        placeName?: string;

        /**
         * Indicates country code.
         * @since 7
         */
        countryCode?: string;

        /**
         * Indicates country name.
         * @since 7
         */
        countryName?: string;

        /**
         * Indicates administrative region name.
         * @since 7
         */
        administrativeArea?: string;

        /**
         * Indicates sub-administrative region name.
         * @since 7
         */
        subAdministrativeArea?: string;

        /**
         * Indicates locality information.
         * @since 7
         */
        locality?: string;

        /**
         * Indicates sub-locality information.
         * @since 7
         */
        subLocality?: string;

        /**
         * Indicates road name.
         * @since 7
         */
        roadName?: string;

        /**
         * Indicates auxiliary road information.
         * @since 7
         */
        subRoadName?: string;

        /**
         * Indicates house information.
         * @since 7
         */
        premises?: string;

        /**
         * Indicates postal code.
         * @since 7
         */
        postalCode?: string;

        /**
         * Indicates phone number.
         * @since 7
         */
        phoneNumber?: string;

        /**
         * Indicates website URL.
         * @since 7
         */
        addressUrl?: string;

        /**
         * Indicates additional information.
         * @since 7
         */
        descriptions?: Array<string>;

        /**
         * Indicates the amount of additional descriptive information.
         * @since 7
         */
        descriptionsSize?: number;
    }

    /**
     * configuring parameters in location requests
     *
     * @since 7
     * @syscap SystemCapability.Location.Location.Core
     * @permission ohos.permission.LOCATION
     * @deprecated since 9
     * @useinstead ohos.geoLocationManager/geoLocationManager.LocationRequest
     */
    export interface LocationRequest {
        priority?: LocationRequestPriority;
        scenario?: LocationRequestScenario;
        timeInterval?: number;
        distanceInterval?: number;
        maxAccuracy?: number;
    }

    /**
     * configuring parameters in current location requests
     *
     * @since 7
     * @syscap SystemCapability.Location.Location.Core
     * @permission ohos.permission.LOCATION
     * @deprecated since 9
     * @useinstead ohos.geoLocationManager/geoLocationManager.CurrentLocationRequest
     */
    export interface CurrentLocationRequest {
        priority?: LocationRequestPriority;
        scenario?: LocationRequestScenario;
        maxAccuracy?: number;
        timeoutMs?: number;
    }

    /**
     * provides information about geographic locations
     *
     * @since 7
     * @syscap SystemCapability.Location.Location.Core
     * @permission ohos.permission.LOCATION
     * @deprecated since 9
     * @useinstead ohos.geoLocationManager/geoLocationManager.Location
     */
    export interface Location {
        /**
         * Indicates latitude information.
         * A positive value indicates north latitude,
         * and a negative value indicates south latitude.
         * @since 7
         */
        latitude: number;

        /**
         * Indicates Longitude information.
         * A positive value indicates east longitude ,
         * and a negative value indicates west longitude .
         * @since 7
         */
        longitude: number;

        /**
         * Indicates location altitude, in meters.
         * @since 7
         */
        altitude: number;

        /**
         * Indicates location accuracy, in meters.
         * @since 7
         */
        accuracy: number;

        /**
         * Indicates speed, in m/s.
         * @since 7
         */
        speed: number;

        /**
         * Indicates location timestamp in the UTC format.
         * @since 7
         */
        timeStamp: number;

        /**
         * Indicates direction information.
         * @since 7
         */
        direction: number;

        /**
         * Indicates location timestamp since boot.
         * @since 7
         */
        timeSinceBoot: number;

        /**
         * Indicates additional information.
         * @since 7
         */
        additions?: Array<string>;

        /**
         * Indicates the amount of additional descriptive information.
         * @since 7
         */
        additionSize?: number;
    }

    /**
     * enum for location priority
     *
     * @since 7
     * @syscap SystemCapability.Location.Location.Core
     * @permission ohos.permission.LOCATION
     * @deprecated since 9
     * @useinstead ohos.geoLocationManager/geoLocationManager.LocationRequestPriority
     */
    export enum LocationRequestPriority {
        UNSET = 0x200,
        ACCURACY,
        LOW_POWER,
        FIRST_FIX,
    }

    /**
     * enum for location scenario
     *
     * @since 7
     * @syscap SystemCapability.Location.Location.Core
     * @permission ohos.permission.LOCATION
     * @deprecated since 9
     * @useinstead ohos.geoLocationManager/geoLocationManager.LocationRequestScenario
     */
    export enum LocationRequestScenario {
        UNSET = 0x300,
        NAVIGATION,
        TRAJECTORY_TRACKING,
        CAR_HAILING,
        DAILY_LIFE_SERVICE,
        NO_POWER,
    }

    /**
     * enum for error code
     *
     * @since 7
     * @syscap SystemCapability.Location.Location.Core
     * @permission ohos.permission.LOCATION
     * @deprecated since 9
     */
    export enum GeoLocationErrorCode {
        /**
         * Indicates input parameter error.
         * @since 7
         */
        INPUT_PARAMS_ERROR,

        /**
         * Indicates reverse geocode query failed.
         * @since 7
         */
        REVERSE_GEOCODE_ERROR,

        /**
         * Indicates geocode query failed.
         * @since 7
         */
        GEOCODE_ERROR,

        /**
         * Indicates positioning failed.
         * @since 7
         */
        LOCATOR_ERROR,

        /**
         * Indicates operation failure caused by abnormal location switch.
         * @since 7
         */
        LOCATION_SWITCH_ERROR,

        /**
         * Indicates failed to get the last known location.
         * @since 7
         */
        LAST_KNOWN_LOCATION_ERROR,

        /**
         * Indicates location request timeout.
         * @since 7
         */
        LOCATION_REQUEST_TIMEOUT_ERROR,
    }

    /**
     * enum for location privacy type
     *
     * @since 8
     * @syscap SystemCapability.Location.Location.Core
     * @permission ohos.permission.LOCATION
     * @deprecated since 9
     * @useinstead ohos.geoLocationManager/geoLocationManager.LocationPrivacyType
     */
    export enum LocationPrivacyType {
        OTHERS = 0,
        STARTUP,
        CORE_LOCATION,
    }

    /**
     * Location subsystem command structure
     *
     * @since 8
     * @syscap SystemCapability.Location.Location.Core
     * @permission ohos.permission.LOCATION
     * @deprecated since 9
     * @useinstead ohos.geoLocationManager/geoLocationManager.LocationCommand
     */
    export interface LocationCommand {
        scenario: LocationRequestScenario;
        command: string;
    }
}

export default geolocation;
