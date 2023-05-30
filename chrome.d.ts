// Obligatory Copyright info:
// 
// Origin: https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/chrome/index.d.ts
//
// Contributors of origin: Matthew Kimber <https://github.com/matthewkimber>
//                         otiai10 <https://github.com/otiai10>
//                         sreimer15 <https://github.com/sreimer15>
//                         MatCarlson <https://github.com/MatCarlson>
//                         ekinsol <https://github.com/ekinsol>
//                         Brian Wilson <https://github.com/echoabstract>
//                         Sebastiaan Pasma <https://github.com/spasma>
//                         bdbai <https://github.com/bdbai>
//                         pokutuna <https://github.com/pokutuna>
//                         Jason Xian <https://github.com/JasonXian>
//                         userTim <https://github.com/usertim>
//                         Idan Zeierman <https://github.com/idan315>
//                         Nicolas Rodriguez <https://github.com/nicolas377>
//                         Ido Salomon <https://github.com/idosal>
//                         Federico Brigante <https://github.com/fregante>
// 
// This project is licensed under the MIT license.
// Copyrights are respective of each contributor listed at the beginning of each definition file.
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


/**
 * @file A minimial copy of DefinitelyTyped's file for Chrome extension APIs (which I've verified also function in Firefox), utilized by @ts-check along with JSdoc.
 * Other portions of the origin file may be copied here in future if needed
 */

export declare global {const chrome: chrome}
interface Window {chrome: typeof chrome}

/**
 * Use the chrome.storage API to store, retrieve, and track changes to user data.
 * Permissions:  "storage"
 * @since Chrome 20.
 */
declare namespace chrome.storage {
    export interface StorageArea {
        /**
         * Gets the amount of space (in bytes) being used by one or more items.
         * @param callback Callback with the amount of space being used by storage, or on failure (in which case runtime.lastError will be set).
         * Parameter bytesInUse: Amount of space being used in storage, in bytes.
         */
        getBytesInUse(callback: (bytesInUse: number) => void): void;
        /**
         * Gets the amount of space (in bytes) being used by one or more items.
         * @param keys Optional. A single key or list of keys to get the total usage for. An empty list will return 0. Pass in null to get the total usage of all of storage.
         * @return A Promise that resolves with a number
         * @since MV3
         */
        getBytesInUse(keys?: string | string[] | null): Promise<number>;
        /**
         * Gets the amount of space (in bytes) being used by one or more items.
         * @param keys Optional. A single key or list of keys to get the total usage for. An empty list will return 0. Pass in null to get the total usage of all of storage.
         * @param callback Callback with the amount of space being used by storage, or on failure (in which case runtime.lastError will be set).
         * Parameter bytesInUse: Amount of space being used in storage, in bytes.
         */
        getBytesInUse(keys: string | string[] | null, callback: (bytesInUse: number) => void): void;
        /**
         * Removes all items from storage.
         * @return A void Promise
         * @since MV3
         */
        clear(): Promise<void>;
        /**
         * Removes all items from storage.
         * @param callback Optional.
         * Callback on success, or on failure (in which case runtime.lastError will be set).
         */
        clear(callback: () => void): void;
        /**
         * Sets multiple items.
         * @param items An object which gives each key/value pair to update storage with. Any other key/value pairs in storage will not be affected.
         * Primitive values such as numbers will serialize as expected. Values with a typeof "object" and "function" will typically serialize to {}, with the exception of Array (serializes as expected), Date, and Regex (serialize using their String representation).
         * @return A void Promise
         * @since MV3
         */
        set(items: { [key: string]: any }): Promise<void>;
        /**
         * Sets multiple items.
         * @param items An object which gives each key/value pair to update storage with. Any other key/value pairs in storage will not be affected.
         * Primitive values such as numbers will serialize as expected. Values with a typeof "object" and "function" will typically serialize to {}, with the exception of Array (serializes as expected), Date, and Regex (serialize using their String representation).
         * @param callback Optional.
         * Callback on success, or on failure (in which case runtime.lastError will be set).
         */
        set(items: { [key: string]: any }, callback: () => void): void;
        /**
         * Removes one or more items from storage.
         * @param keys A single key or a list of keys for items to remove.
         * @param callback Optional.
         * @return A void Promise
         * @since MV3
         */
        remove(keys: string | string[]): Promise<void>;
        /**
         * Removes one or more items from storage.
         * @param keys A single key or a list of keys for items to remove.
         * @param callback Optional.
         * Callback on success, or on failure (in which case runtime.lastError will be set).
         */
        remove(keys: string | string[], callback: () => void): void;
        /**
         * Gets the entire contents of storage.
         * @param callback Callback with storage items, or on failure (in which case runtime.lastError will be set).
         * Parameter items: Object with items in their key-value mappings.
         */
        get(callback: (items: { [key: string]: any }) => void): void;
        /**
         * Gets one or more items from storage.
         * @param keys A single key to get, list of keys to get, or a dictionary specifying default values.
         * An empty list or object will return an empty result object. Pass in null to get the entire contents of storage.
         * @return A Promise that resolves with an object containing items
         * @since MV3
         */
        get(keys?: string | string[] | { [key: string]: any } | null): Promise<{ [key: string]: any }>;
        /**
         * Gets one or more items from storage.
         * @param keys A single key to get, list of keys to get, or a dictionary specifying default values.
         * An empty list or object will return an empty result object. Pass in null to get the entire contents of storage.
         * @param callback Callback with storage items, or on failure (in which case runtime.lastError will be set).
         * Parameter items: Object with items in their key-value mappings.
         */
        get(keys: string | string[] | { [key: string]: any } | null, callback: (items: { [key: string]: any }) => void): void;
        /**
         * Sets the desired access level for the storage area. The default will be only trusted contexts.
         * @param accessOptions An object containing an accessLevel key which contains the access level of the storage area.
         * @return A void Promise.
         * @since Chrome 102
         */
        setAccessLevel(accessOptions: { accessLevel: AccessLevel }): Promise<void>;
        /**
         * Sets the desired access level for the storage area. The default will be only trusted contexts.
         * @param accessOptions An object containing an accessLevel key which contains the access level of the storage area.
         * @param callback Optional.
         * @since Chrome 102
         */
        setAccessLevel(accessOptions: { accessLevel: AccessLevel }, callback: () => void): void;
        /**
         * Fired when one or more items change within this storage area.
         * @param keys A single key to get, list of keys to get, or a dictionary specifying default values.
         * An empty list or object will return an empty result object. Pass in null to get the entire contents of storage.
         * @param callback Callback with storage items, or on failure (in which case runtime.lastError will be set).
         * Parameter items: Object with items in their key-value mappings.
         */
        onChanged: StorageAreaChangedEvent;
    }

    export interface StorageChange {
        /** Optional. The new value of the item, if there is a new value. */
        newValue?: any;
        /** Optional. The old value of the item, if there was an old value. */
        oldValue?: any;
    }

    export interface LocalStorageArea extends StorageArea {
        /** The maximum amount (in bytes) of data that can be stored in local storage, as measured by the JSON stringification of every value plus every key's length. This value will be ignored if the extension has the unlimitedStorage permission. Updates that would cause this limit to be exceeded fail immediately and set runtime.lastError. */
        QUOTA_BYTES: number;
    }

    export interface SyncStorageArea extends StorageArea {
        /** @deprecated since Chrome 40. The storage.sync API no longer has a sustained write operation quota. */
        MAX_SUSTAINED_WRITE_OPERATIONS_PER_MINUTE: number;
        /** The maximum total amount (in bytes) of data that can be stored in sync storage, as measured by the JSON stringification of every value plus every key's length. Updates that would cause this limit to be exceeded fail immediately and set runtime.lastError. */
        QUOTA_BYTES: number;
        /** The maximum size (in bytes) of each individual item in sync storage, as measured by the JSON stringification of its value plus its key length. Updates containing items larger than this limit will fail immediately and set runtime.lastError. */
        QUOTA_BYTES_PER_ITEM: number;
        /** The maximum number of items that can be stored in sync storage. Updates that would cause this limit to be exceeded will fail immediately and set runtime.lastError. */
        MAX_ITEMS: number;
        /**
         * The maximum number of set, remove, or clear operations that can be performed each hour. This is 1 every 2 seconds, a lower ceiling than the short term higher writes-per-minute limit.
         * Updates that would cause this limit to be exceeded fail immediately and set runtime.lastError.
         */
        MAX_WRITE_OPERATIONS_PER_HOUR: number;
        /**
         * The maximum number of set, remove, or clear operations that can be performed each minute. This is 2 per second, providing higher throughput than writes-per-hour over a shorter period of time.
         * Updates that would cause this limit to be exceeded fail immediately and set runtime.lastError.
         * @since Chrome 40.
         */
        MAX_WRITE_OPERATIONS_PER_MINUTE: number;
    }

    export interface SessionStorageArea extends StorageArea {
        /** The maximum amount (in bytes) of data that can be stored in memory, as measured by estimating the dynamically allocated memory usage of every value and key. Updates that would cause this limit to be exceeded fail immediately and set runtime.lastError. */
        QUOTA_BYTES: number;
    }

    export interface StorageAreaChangedEvent
        extends chrome.events.Event<(changes: { [key: string]: StorageChange }) => void> { }

    type AreaName = keyof Pick<typeof chrome.storage, 'sync' | 'local' | 'managed' | 'session'>;
    export interface StorageChangedEvent
        extends chrome.events.Event<(changes: { [key: string]: StorageChange }, areaName: AreaName) => void> { }

    type AccessLevel = keyof typeof AccessLevel;

    /** The storage area's access level. */
    export var AccessLevel: {
        TRUSTED_AND_UNTRUSTED_CONTEXTS: 'TRUSTED_AND_UNTRUSTED_CONTEXTS',
        TRUSTED_CONTEXTS: 'TRUSTED_CONTEXTS'
    };

    /** Items in the local storage area are local to each machine. */
    export var local: LocalStorageArea;
    /** Items in the sync storage area are synced using Chrome Sync. */
    export var sync: SyncStorageArea;

    /**
     * Items in the managed storage area are set by the domain administrator, and are read-only for the extension; trying to modify this namespace results in an error.
     * @since Chrome 33.
     */
    export var managed: StorageArea;

    /**
     * Items in the session storage area are stored in-memory and will not be persisted to disk.
     * @since Chrome 102.
     */
    export var session: SessionStorageArea;

    /** Fired when one or more items change. */
    export var onChanged: StorageChangedEvent;
}
