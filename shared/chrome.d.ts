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
 * @file A selective as-needed copy of DefinitelyTyped's file for Chrome extension APIs (which also functions in Firefox), utilized by @ts-check along with JSdoc.
 * (For completeness, whenever a copied API's type depended on another API I copied that other API in its entirety, which happened recursively and often added APIs with hundreds more lines than are being currently used. Might change my mind about these priorities in future, in which case all API types would be surgically debloated)
 */

interface Window {chrome: typeof chrome}

/**
 * Use the chrome.storage API to store, retrieve, and track changes to user data.
 * Permissions:  "storage"
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

////////////////////
// Tabs
////////////////////
/**
 * Use the chrome.tabs API to interact with the browser's tab system. You can use this API to create, modify, and rearrange tabs in the browser.
 * Permissions: The majority of the chrome.tabs API can be used without declaring any permission. However, the "tabs" permission is required in order to populate the url, title, and favIconUrl properties of Tab.
 * @since Chrome 5.
 */
declare namespace chrome.tabs {
    /**
     * Tab muted state and the reason for the last state change.
     * @since Chrome 46. Warning: this is the current Beta channel.
     */
    export interface MutedInfo {
        /** Whether the tab is prevented from playing sound (but hasn't necessarily recently produced sound). Equivalent to whether the muted audio indicator is showing. */
        muted: boolean;
        /**
         * Optional.
         * The reason the tab was muted or unmuted. Not set if the tab's mute state has never been changed.
         * "user": A user input action has set/overridden the muted state.
         * "capture": Tab capture started, forcing a muted state change.
         * "extension": An extension, identified by the extensionId field, set the muted state.
         */
        reason?: string | undefined;
        /**
         * Optional.
         * The ID of the extension that changed the muted state. Not set if an extension was not the reason the muted state last changed.
         */
        extensionId?: string | undefined;
    }

    export interface Tab {
        /**
         * Optional.
         * Either loading or complete.
         */
        status?: string | undefined;
        /** The zero-based index of the tab within its window. */
        index: number;
        /**
         * Optional.
         * The ID of the tab that opened this tab, if any. This property is only present if the opener tab still exists.
         * @since Chrome 18.
         */
        openerTabId?: number | undefined;
        /**
         * Optional.
         * The title of the tab. This property is only present if the extension's manifest includes the "tabs" permission.
         */
        title?: string | undefined;
        /**
         * Optional.
         * The URL the tab is displaying. This property is only present if the extension's manifest includes the "tabs" permission.
         */
        url?: string | undefined;
        /**
         * The URL the tab is navigating to, before it has committed.
         * This property is only present if the extension's manifest includes the "tabs" permission and there is a pending navigation.
         * @since Chrome 79.
         */
        pendingUrl?: string | undefined;
        /**
         * Whether the tab is pinned.
         * @since Chrome 9.
         */
        pinned: boolean;
        /**
         * Whether the tab is highlighted.
         * @since Chrome 16.
         */
        highlighted: boolean;
        /** The ID of the window the tab is contained within. */
        windowId: number;
        /**
         * Whether the tab is active in its window. (Does not necessarily mean the window is focused.)
         * @since Chrome 16.
         */
        active: boolean;
        /**
         * Optional.
         * The URL of the tab's favicon. This property is only present if the extension's manifest includes the "tabs" permission. It may also be an empty string if the tab is loading.
         */
        favIconUrl?: string | undefined;
        /**
         * Optional.
         * The ID of the tab. Tab IDs are unique within a browser session. Under some circumstances a Tab may not be assigned an ID, for example when querying foreign tabs using the sessions API, in which case a session ID may be present. Tab ID can also be set to chrome.tabs.TAB_ID_NONE for apps and devtools windows.
         */
        id?: number | undefined;
        /** Whether the tab is in an incognito window. */
        incognito: boolean;
        /**
         * Whether the tab is selected.
         * @deprecated since Chrome 33. Please use tabs.Tab.highlighted.
         */
        selected: boolean;
        /**
         * Optional.
         * Whether the tab has produced sound over the past couple of seconds (but it might not be heard if also muted). Equivalent to whether the speaker audio indicator is showing.
         * @since Chrome 45.
         */
        audible?: boolean | undefined;
        /**
         * Whether the tab is discarded. A discarded tab is one whose content has been unloaded from memory, but is still visible in the tab strip. Its content gets reloaded the next time it's activated.
         * @since Chrome 54.
         */
        discarded: boolean;
        /**
         * Whether the tab can be discarded automatically by the browser when resources are low.
         * @since Chrome 54.
         */
        autoDiscardable: boolean;
        /**
         * Optional.
         * Current tab muted state and the reason for the last state change.
         * @since Chrome 46. Warning: this is the current Beta channel.
         */
        mutedInfo?: MutedInfo | undefined;
        /**
         * Optional. The width of the tab in pixels.
         * @since Chrome 31.
         */
        width?: number | undefined;
        /**
         * Optional. The height of the tab in pixels.
         * @since Chrome 31.
         */
        height?: number | undefined;
        /**
         * Optional. The session ID used to uniquely identify a Tab obtained from the sessions API.
         * @since Chrome 31.
         */
        sessionId?: string | undefined;
        /**
         * The ID of the group that the tab belongs to.
         * @since Chrome 88
         */
        groupId: number;
    }

    /**
     * Defines how zoom changes in a tab are handled and at what scope.
     * @since Chrome 38.
     */
    export interface ZoomSettings {
        /**
         * Optional.
         * Defines how zoom changes are handled, i.e. which entity is responsible for the actual scaling of the page; defaults to "automatic".
         * "automatic": Zoom changes are handled automatically by the browser.
         * "manual": Overrides the automatic handling of zoom changes. The onZoomChange event will still be dispatched, and it is the responsibility of the extension to listen for this event and manually scale the page. This mode does not support per-origin zooming, and will thus ignore the scope zoom setting and assume per-tab.
         * "disabled": Disables all zooming in the tab. The tab will revert to the default zoom level, and all attempted zoom changes will be ignored.
         */
        mode?: string | undefined;
        /**
         * Optional.
         * Defines whether zoom changes will persist for the page's origin, or only take effect in this tab; defaults to per-origin when in automatic mode, and per-tab otherwise.
         * "per-origin": Zoom changes will persist in the zoomed page's origin, i.e. all other tabs navigated to that same origin will be zoomed as well. Moreover, per-origin zoom changes are saved with the origin, meaning that when navigating to other pages in the same origin, they will all be zoomed to the same zoom factor. The per-origin scope is only available in the automatic mode.
         * "per-tab": Zoom changes only take effect in this tab, and zoom changes in other tabs will not affect the zooming of this tab. Also, per-tab zoom changes are reset on navigation; navigating a tab will always load pages with their per-origin zoom factors.
         */
        scope?: string | undefined;
        /**
         * Optional.
         * Used to return the default zoom level for the current tab in calls to tabs.getZoomSettings.
         * @since Chrome 43.
         */
        defaultZoomFactor?: number | undefined;
    }

    export interface InjectDetails {
        /**
         * Optional.
         * If allFrames is true, implies that the JavaScript or CSS should be injected into all frames of current page. By default, it's false and is only injected into the top frame.
         */
        allFrames?: boolean | undefined;
        /**
         * Optional. JavaScript or CSS code to inject.
         * Warning: Be careful using the code parameter. Incorrect use of it may open your extension to cross site scripting attacks.
         */
        code?: string | undefined;
        /**
         * Optional. The soonest that the JavaScript or CSS will be injected into the tab.
         * One of: "document_start", "document_end", or "document_idle"
         * @since Chrome 20.
         */
        runAt?: string | undefined;
        /** Optional. JavaScript or CSS file to inject. */
        file?: string | undefined;
        /**
         * Optional.
         * The frame where the script or CSS should be injected. Defaults to 0 (the top-level frame).
         * @since Chrome 39.
         */
        frameId?: number | undefined;
        /**
         * Optional.
         * If matchAboutBlank is true, then the code is also injected in about:blank and about:srcdoc frames if your extension has access to its parent document. Code cannot be inserted in top-level about:-frames. By default it is false.
         * @since Chrome 39.
         */
        matchAboutBlank?: boolean | undefined;
        /**
         * Optional. The origin of the CSS to inject. This may only be specified for CSS, not JavaScript. Defaults to "author".
         * One of: "author", or "user"
         * @since Chrome 66.
         */
        cssOrigin?: string | undefined;
    }

    export interface CreateProperties {
        /** Optional. The position the tab should take in the window. The provided value will be clamped to between zero and the number of tabs in the window. */
        index?: number | undefined;
        /**
         * Optional.
         * The ID of the tab that opened this tab. If specified, the opener tab must be in the same window as the newly created tab.
         * @since Chrome 18.
         */
        openerTabId?: number | undefined;
        /**
         * Optional.
         * The URL to navigate the tab to initially. Fully-qualified URLs must include a scheme (i.e. 'http://www.google.com', not 'www.google.com'). Relative URLs will be relative to the current page within the extension. Defaults to the New Tab Page.
         */
        url?: string | undefined;
        /**
         * Optional. Whether the tab should be pinned. Defaults to false
         * @since Chrome 9.
         */
        pinned?: boolean | undefined;
        /** Optional. The window to create the new tab in. Defaults to the current window. */
        windowId?: number | undefined;
        /**
         * Optional.
         * Whether the tab should become the active tab in the window. Does not affect whether the window is focused (see windows.update). Defaults to true.
         * @since Chrome 16.
         */
        active?: boolean | undefined;
        /**
         * Optional. Whether the tab should become the selected tab in the window. Defaults to true
         * @deprecated since Chrome 33. Please use active.
         */
        selected?: boolean | undefined;
    }

    export interface MoveProperties {
        /** The position to move the window to. -1 will place the tab at the end of the window. */
        index: number;
        /** Optional. Defaults to the window the tab is currently in. */
        windowId?: number | undefined;
    }

    export interface UpdateProperties {
        /**
         * Optional. Whether the tab should be pinned.
         * @since Chrome 9.
         */
        pinned?: boolean | undefined;
        /**
         * Optional. The ID of the tab that opened this tab. If specified, the opener tab must be in the same window as this tab.
         * @since Chrome 18.
         */
        openerTabId?: number | undefined;
        /** Optional. A URL to navigate the tab to. */
        url?: string | undefined;
        /**
         * Optional. Adds or removes the tab from the current selection.
         * @since Chrome 16.
         */
        highlighted?: boolean | undefined;
        /**
         * Optional. Whether the tab should be active. Does not affect whether the window is focused (see windows.update).
         * @since Chrome 16.
         */
        active?: boolean | undefined;
        /**
         * Optional. Whether the tab should be selected.
         * @deprecated since Chrome 33. Please use highlighted.
         */
        selected?: boolean | undefined;
        /**
         * Optional. Whether the tab should be muted.
         * @since Chrome 45.
         */
        muted?: boolean | undefined;
        /**
         * Optional. Whether the tab should be discarded automatically by the browser when resources are low.
         * @since Chrome 54.
         */
        autoDiscardable?: boolean | undefined;
    }

    export interface CaptureVisibleTabOptions {
        /**
         * Optional.
         * When format is "jpeg", controls the quality of the resulting image. This value is ignored for PNG images. As quality is decreased, the resulting image will have more visual artifacts, and the number of bytes needed to store it will decrease.
         */
        quality?: number | undefined;
        /**
         * Optional. The format of an image.
         * One of: "jpeg", or "png"
         */
        format?: string | undefined;
    }

    export interface ReloadProperties {
        /** Optional. Whether using any local cache. Default is false. */
        bypassCache?: boolean | undefined;
    }

    export interface ConnectInfo {
        /** Optional. Will be passed into onConnect for content scripts that are listening for the connection event. */
        name?: string | undefined;
        /**
         * Open a port to a specific frame identified by frameId instead of all frames in the tab.
         * @since Chrome 41.
         */
        frameId?: number | undefined;
        /**
         * Optional. Open a port to a specific document identified by documentId instead of all frames in the tab.
         * @since Chrome 106.
         */
        documentId?: string;
    }

    export interface MessageSendOptions {
        /** Optional. Send a message to a specific frame identified by frameId instead of all frames in the tab. */
        frameId?: number | undefined;
        /**
         * Optional. Send a message to a specific document identified by documentId instead of all frames in the tab.
         * @since Chrome 106.
         */
        documentId?: string;
    }

    export interface GroupOptions {
        /** Optional. Configurations for creating a group. Cannot be used if groupId is already specified. */
        createProperties?: {
            /** Optional. The window of the new group. Defaults to the current window. */
            windowId?: number | undefined
        } | undefined,
        /** Optional. The ID of the group to add the tabs to. If not specified, a new group will be created. */
        groupId?: number | undefined;
        /** TOptional. he tab ID or list of tab IDs to add to the specified group. */
        tabIds?: number | number[] | undefined;
    }

    export interface HighlightInfo {
        /** One or more tab indices to highlight. */
        tabs: number | number[];
        /** Optional. The window that contains the tabs. */
        windowId?: number | undefined;
    }

    export interface QueryInfo {
        /**
         * Optional. Whether the tabs have completed loading.
         * One of: "loading", or "complete"
         */
        status?: 'loading' | 'complete' | undefined;
        /**
         * Optional. Whether the tabs are in the last focused window.
         * @since Chrome 19.
         */
        lastFocusedWindow?: boolean | undefined;
        /** Optional. The ID of the parent window, or windows.WINDOW_ID_CURRENT for the current window. */
        windowId?: number | undefined;
        /**
         * Optional. The type of window the tabs are in.
         * One of: "normal", "popup", "panel", "app", or "devtools"
         */
        windowType?: 'normal' | 'popup' | 'panel' | 'app' | 'devtools' | undefined;
        /** Optional. Whether the tabs are active in their windows. */
        active?: boolean | undefined;
        /**
         * Optional. The position of the tabs within their windows.
         * @since Chrome 18.
         */
        index?: number | undefined;
        /** Optional. Match page titles against a pattern. */
        title?: string | undefined;
        /** Optional. Match tabs against one or more URL patterns. Note that fragment identifiers are not matched. */
        url?: string | string[] | undefined;
        /**
         * Optional. Whether the tabs are in the current window.
         * @since Chrome 19.
         */
        currentWindow?: boolean | undefined;
        /** Optional. Whether the tabs are highlighted. */
        highlighted?: boolean | undefined;
        /**
         * Optional.
         * Whether the tabs are discarded. A discarded tab is one whose content has been unloaded from memory, but is still visible in the tab strip. Its content gets reloaded the next time it's activated.
         * @since Chrome 54.
         */
        discarded?: boolean | undefined;
        /**
         * Optional.
         * Whether the tabs can be discarded automatically by the browser when resources are low.
         * @since Chrome 54.
         */
        autoDiscardable?: boolean | undefined;
        /** Optional. Whether the tabs are pinned. */
        pinned?: boolean | undefined;
        /**
         * Optional. Whether the tabs are audible.
         * @since Chrome 45.
         */
        audible?: boolean | undefined;
        /**
         * Optional. Whether the tabs are muted.
         * @since Chrome 45.
         */
        muted?: boolean | undefined;
        /**
         * Optional. The ID of the group that the tabs are in, or chrome.tabGroups.TAB_GROUP_ID_NONE for ungrouped tabs.
         * @since Chrome 88
         */
        groupId?: number | undefined;
    }

    export interface TabHighlightInfo {
        windowId: number;
        tabIds: number[];
    }

    export interface TabRemoveInfo {
        /**
         * The window whose tab is closed.
         * @since Chrome 25.
         */
        windowId: number;
        /** True when the tab is being closed because its window is being closed. */
        isWindowClosing: boolean;
    }

    export interface TabAttachInfo {
        newPosition: number;
        newWindowId: number;
    }

    export interface TabChangeInfo {
        /** Optional. The status of the tab. Can be either loading or complete. */
        status?: string | undefined;
        /**
         * The tab's new pinned state.
         * @since Chrome 9.
         */
        pinned?: boolean | undefined;
        /** Optional. The tab's URL if it has changed. */
        url?: string | undefined;
        /**
         * The tab's new audible state.
         * @since Chrome 45.
         */
        audible?: boolean | undefined;
        /**
         * The tab's new discarded state.
         * @since Chrome 54.
         */
        discarded?: boolean | undefined;
        /**
         * The tab's new auto-discardable
         * @since Chrome 54.
         */
        autoDiscardable?: boolean | undefined;
        /**
         * The tab's new group.
         * @since Chrome 88
         */
        groupId?: number | undefined;
        /**
         * The tab's new muted state and the reason for the change.
         * @since Chrome 46. Warning: this is the current Beta channel.
         */
        mutedInfo?: MutedInfo | undefined;
        /**
         * The tab's new favicon URL.
         * @since Chrome 27.
         */
        favIconUrl?: string | undefined;
        /**
         * The tab's new title.
         * @since Chrome 48.
         */
        title?: string | undefined;
    }

    export interface TabMoveInfo {
        toIndex: number;
        windowId: number;
        fromIndex: number;
    }

    export interface TabDetachInfo {
        oldWindowId: number;
        oldPosition: number;
    }

    export interface TabActiveInfo {
        /** The ID of the tab that has become active. */
        tabId: number;
        /** The ID of the window the active tab changed inside of. */
        windowId: number;
    }

    export interface TabWindowInfo {
        /** The ID of the window of where the tab is located. */
        windowId: number;
    }

    export interface ZoomChangeInfo {
        tabId: number;
        oldZoomFactor: number;
        newZoomFactor: number;
        zoomSettings: ZoomSettings;
    }

    export interface TabHighlightedEvent extends chrome.events.Event<(highlightInfo: TabHighlightInfo) => void> { }

    export interface TabRemovedEvent extends chrome.events.Event<(tabId: number, removeInfo: TabRemoveInfo) => void> { }

    export interface TabUpdatedEvent
        extends chrome.events.Event<(tabId: number, changeInfo: TabChangeInfo, tab: Tab) => void> { }

    export interface TabAttachedEvent extends chrome.events.Event<(tabId: number, attachInfo: TabAttachInfo) => void> { }

    export interface TabMovedEvent extends chrome.events.Event<(tabId: number, moveInfo: TabMoveInfo) => void> { }

    export interface TabDetachedEvent extends chrome.events.Event<(tabId: number, detachInfo: TabDetachInfo) => void> { }

    export interface TabCreatedEvent extends chrome.events.Event<(tab: Tab) => void> { }

    export interface TabActivatedEvent extends chrome.events.Event<(activeInfo: TabActiveInfo) => void> { }

    export interface TabReplacedEvent extends chrome.events.Event<(addedTabId: number, removedTabId: number) => void> { }

    export interface TabSelectedEvent extends chrome.events.Event<(tabId: number, selectInfo: TabWindowInfo) => void> { }

    export interface TabZoomChangeEvent extends chrome.events.Event<(ZoomChangeInfo: ZoomChangeInfo) => void> { }

    /**
     * Injects JavaScript code into a page. For details, see the programmatic injection section of the content scripts doc.
     * @param details Details of the script or CSS to inject. Either the code or the file property must be set, but both may not be set at the same time.
     * @return The `executeScript` method provides its result via callback or returned as a `Promise` (MV3 only). The result of the script in every injected frame.
     */
    export function executeScript(details: InjectDetails): Promise<any[]>;
    /**
     * Injects JavaScript code into a page. For details, see the programmatic injection section of the content scripts doc.
     * @param details Details of the script or CSS to inject. Either the code or the file property must be set, but both may not be set at the same time.
     * @param callback Optional. Called after all the JavaScript has been executed.
     * Parameter result: The result of the script in every injected frame.
     */
    export function executeScript(details: InjectDetails, callback?: (result: any[]) => void): void;
    /**
     * Injects JavaScript code into a page. For details, see the programmatic injection section of the content scripts doc.
     * @param tabId Optional. The ID of the tab in which to run the script; defaults to the active tab of the current window.
     * @param details Details of the script or CSS to inject. Either the code or the file property must be set, but both may not be set at the same time.
     * @return The `executeScript` method provides its result via callback or returned as a `Promise` (MV3 only). The result of the script in every injected frame.
     */
    export function executeScript(tabId: number, details: InjectDetails): Promise<any[]>;
    /**
     * Injects JavaScript code into a page. For details, see the programmatic injection section of the content scripts doc.
     * @param tabId Optional. The ID of the tab in which to run the script; defaults to the active tab of the current window.
     * @param details Details of the script or CSS to inject. Either the code or the file property must be set, but both may not be set at the same time.
     * @param callback Optional. Called after all the JavaScript has been executed.
     * Parameter result: The result of the script in every injected frame.
     */
    export function executeScript(tabId: number, details: InjectDetails, callback?: (result: any[]) => void): void;
    /** Retrieves details about the specified tab. */
    export function get(tabId: number, callback: (tab: Tab) => void): void;
    /**
     * Retrieves details about the specified tab.
     * @return The `get` method provides its result via callback or returned as a `Promise` (MV3 only).
     */
    export function get(tabId: number): Promise<Tab>;
    /**
     * Gets details about all tabs in the specified window.
     * @deprecated since Chrome 33. Please use tabs.query {windowId: windowId}.
     */
    export function getAllInWindow(callback: (tab: Tab) => void): void;
    /**
     * Gets details about all tabs in the specified window.
     * @return The `getAllInWindow` method provides its result via callback or returned as a `Promise` (MV3 only).
     * @deprecated since Chrome 33. Please use tabs.query {windowId: windowId}.
     */
    export function getAllInWindow(): Promise<Tab>;
    /**
     * Gets details about all tabs in the specified window.
     * @deprecated since Chrome 33. Please use tabs.query {windowId: windowId}.
     * @param windowId Optional. Defaults to the current window.
     */
    export function getAllInWindow(windowId: number, callback: (tab: Tab) => void): void;
    /**
     * Gets details about all tabs in the specified window.
     * @deprecated since Chrome 33. Please use tabs.query {windowId: windowId}.
     * @param windowId Optional. Defaults to the current window.
     * @return The `getAllInWindow` method provides its result via callback or returned as a `Promise` (MV3 only).
     */
    export function getAllInWindow(windowId: number): Promise<Tab>;
    /** Gets the tab that this script call is being made from. May be undefined if called from a non-tab context (for example: a background page or popup view). */
    export function getCurrent(callback: (tab?: Tab) => void): void;
    /**
     * Gets the tab that this script call is being made from. May be undefined if called from a non-tab context (for example: a background page or popup view).
     * @return The `getCurrent` method provides its result via callback or returned as a `Promise` (MV3 only).
     */
    export function getCurrent(): Promise<Tab | undefined>;
    /**
     * Gets the tab that is selected in the specified window.
     * @deprecated since Chrome 33. Please use tabs.query {active: true}.
     */
    export function getSelected(callback: (tab: Tab) => void): void;
    /**
     * Gets the tab that is selected in the specified window.
     * @return The `getSelected` method provides its result via callback or returned as a `Promise` (MV3 only).
     * @deprecated since Chrome 33. Please use tabs.query {active: true}.
     */
    export function getSelected(): Promise<Tab>;
    /**
     * Gets the tab that is selected in the specified window.
     * @deprecated since Chrome 33. Please use tabs.query {active: true}.
     * @param windowId Optional. Defaults to the current window.
     */
    export function getSelected(windowId: number, callback: (tab: Tab) => void): void;
    /**
     * Gets the tab that is selected in the specified window.
     * @deprecated since Chrome 33. Please use tabs.query {active: true}.
     * @param windowId Optional. Defaults to the current window.
     * @return The `getSelected` method provides its result via callback or returned as a `Promise` (MV3 only).
     */
    export function getSelected(windowId: number): Promise<Tab>;
    /**
     * Creates a new tab.
     * @return The `create` method provides its result via callback or returned as a `Promise` (MV3 only). Details about the created tab. Will contain the ID of the new tab.
     */
    export function create(createProperties: CreateProperties): Promise<Tab>;
    /**
     * Creates a new tab.
     * @param callback Optional.
     * Parameter tab: Details about the created tab. Will contain the ID of the new tab.
     */
    export function create(createProperties: CreateProperties, callback: (tab: Tab) => void): void;
    /**
     * Moves one or more tabs to a new position within its window, or to a new window. Note that tabs can only be moved to and from normal (window.type === "normal") windows.
     * @param tabId The tab to move.
     * @return The `move` method provides its result via callback or returned as a `Promise` (MV3 only). Details about the moved tab.
     */
    export function move(tabId: number, moveProperties: MoveProperties): Promise<Tab>;
    /**
     * Moves one or more tabs to a new position within its window, or to a new window. Note that tabs can only be moved to and from normal (window.type === "normal") windows.
     * @param tabId The tab to move.
     * @param callback Optional.
     * Parameter tab: Details about the moved tab.
     */
    export function move(tabId: number, moveProperties: MoveProperties, callback: (tab: Tab) => void): void;
    /**
     * Moves one or more tabs to a new position within its window, or to a new window. Note that tabs can only be moved to and from normal (window.type === "normal") windows.
     * @param tabIds The tabs to move.
     * @return The `move` method provides its result via callback or returned as a `Promise` (MV3 only). Details about the moved tabs.
     */
    export function move(tabIds: number[], moveProperties: MoveProperties): Promise<Tab[]>;
    /**
     * Moves one or more tabs to a new position within its window, or to a new window. Note that tabs can only be moved to and from normal (window.type === "normal") windows.
     * @param tabIds The tabs to move.
     * @param callback Optional.
     * Parameter tabs: Details about the moved tabs.
     */
    export function move(tabIds: number[], moveProperties: MoveProperties, callback: (tabs: Tab[]) => void): void;
    /**
     * Modifies the properties of a tab. Properties that are not specified in updateProperties are not modified.
     * @return The `update` method provides its result via callback or returned as a `Promise` (MV3 only). Details about the updated tab. The tabs.Tab object doesn't contain url, title and favIconUrl if the "tabs" permission has not been requested.
     */
    export function update(updateProperties: UpdateProperties): Promise<Tab>;
    /**
     * Modifies the properties of a tab. Properties that are not specified in updateProperties are not modified.
     * @param callback Optional.
     * Optional parameter tab: Details about the updated tab. The tabs.Tab object doesn't contain url, title and favIconUrl if the "tabs" permission has not been requested.
     */
    export function update(updateProperties: UpdateProperties, callback: (tab?: Tab) => void): void;
    /**
     * Modifies the properties of a tab. Properties that are not specified in updateProperties are not modified.
     * @param tabId Defaults to the selected tab of the current window.
     * @return The `update` method provides its result via callback or returned as a `Promise` (MV3 only). Details about the updated tab. The tabs.Tab object doesn't contain url, title and favIconUrl if the "tabs" permission has not been requested.
     */
    export function update(tabId: number, updateProperties: UpdateProperties): Promise<Tab>;
    /**
     * Modifies the properties of a tab. Properties that are not specified in updateProperties are not modified.
     * @param tabId Defaults to the selected tab of the current window.
     * @param callback Optional.
     * Optional parameter tab: Details about the updated tab. The tabs.Tab object doesn't contain url, title and favIconUrl if the "tabs" permission has not been requested.
     */
    export function update(tabId: number, updateProperties: UpdateProperties, callback: (tab?: Tab) => void): void;
    /**
     * Closes a tab.
     * @param tabId The tab to close.
     * @return The `remove` method provides its result via callback or returned as a `Promise` (MV3 only). It has no parameters.
     */
    export function remove(tabId: number): Promise<void>;
    /**
     * Closes a tab.
     * @param tabId The tab to close.
     */
    export function remove(tabId: number, callback: Function): void;
    /**
     * Closes several tabs.
     * @param tabIds The list of tabs to close.
     * @return The `remove` method provides its result via callback or returned as a `Promise` (MV3 only). It has no parameters.
     */
    export function remove(tabIds: number[]): Promise<void>;
    /**
     * Closes several tabs.
     * @param tabIds The list of tabs to close.
     */
    export function remove(tabIds: number[], callback: Function): void;
    /**
     * Captures the visible area of the currently active tab in the specified window. You must have <all_urls> permission to use this method.
     * @param callback
     * Parameter dataUrl: A data URL which encodes an image of the visible area of the captured tab. May be assigned to the 'src' property of an HTML Image element for display.
     */
    export function captureVisibleTab(callback: (dataUrl: string) => void): void;
    /**
     * Captures the visible area of the currently active tab in the specified window. You must have <all_urls> permission to use this method.
     * @return The `captureVisibleTab` method provides its result via callback or returned as a `Promise` (MV3 only). A data URL which encodes an image of the visible area of the captured tab. May be assigned to the 'src' property of an HTML Image element for display.
     */
    export function captureVisibleTab(): Promise<string>;
    /**
     * Captures the visible area of the currently active tab in the specified window. You must have <all_urls> permission to use this method.
     * @param windowId Optional. The target window. Defaults to the current window.
     * @param callback
     * Parameter dataUrl: A data URL which encodes an image of the visible area of the captured tab. May be assigned to the 'src' property of an HTML Image element for display.
     */
    export function captureVisibleTab(windowId: number, callback: (dataUrl: string) => void): void;
    /**
     * Captures the visible area of the currently active tab in the specified window. You must have <all_urls> permission to use this method.
     * @param windowId Optional. The target window. Defaults to the current window.
     * @return The `captureVisibleTab` method provides its result via callback or returned as a `Promise` (MV3 only). A data URL which encodes an image of the visible area of the captured tab. May be assigned to the 'src' property of an HTML Image element for display.
     */
    export function captureVisibleTab(windowId: number): Promise<string>;
    /**
     * Captures the visible area of the currently active tab in the specified window. You must have <all_urls> permission to use this method.
     * @param options Optional. Details about the format and quality of an image.
     * @return The `captureVisibleTab` method provides its result via callback or returned as a `Promise` (MV3 only). A data URL which encodes an image of the visible area of the captured tab. May be assigned to the 'src' property of an HTML Image element for display.
     */
    export function captureVisibleTab(options: CaptureVisibleTabOptions): Promise<string>;
    /**
     * Captures the visible area of the currently active tab in the specified window. You must have <all_urls> permission to use this method.
     * @param options Optional. Details about the format and quality of an image.
     * @param callback
     * Parameter dataUrl: A data URL which encodes an image of the visible area of the captured tab. May be assigned to the 'src' property of an HTML Image element for display.
     */
    export function captureVisibleTab(options: CaptureVisibleTabOptions, callback: (dataUrl: string) => void): void;
    /**
     * Captures the visible area of the currently active tab in the specified window. You must have <all_urls> permission to use this method.
     * @param windowId Optional. The target window. Defaults to the current window.
     * @param options Optional. Details about the format and quality of an image.
     * @return The `captureVisibleTab` method provides its result via callback or returned as a `Promise` (MV3 only). A data URL which encodes an image of the visible area of the captured tab. May be assigned to the 'src' property of an HTML Image element for display.
     */
    export function captureVisibleTab(
        windowId: number,
        options: CaptureVisibleTabOptions,
    ): Promise<string>;
    /**
     * Captures the visible area of the currently active tab in the specified window. You must have <all_urls> permission to use this method.
     * @param windowId Optional. The target window. Defaults to the current window.
     * @param options Optional. Details about the format and quality of an image.
     * @param callback
     * Parameter dataUrl: A data URL which encodes an image of the visible area of the captured tab. May be assigned to the 'src' property of an HTML Image element for display.
     */
    export function captureVisibleTab(
        windowId: number,
        options: CaptureVisibleTabOptions,
        callback: (dataUrl: string) => void,
    ): void;
    /**
     * Reload a tab.
     * @since Chrome 16.
     * @param tabId The ID of the tab to reload; defaults to the selected tab of the current window.
     * @return The `reload` method provides its result via callback or returned as a `Promise` (MV3 only). It has no parameters.
     */
    export function reload(tabId: number, reloadProperties?: ReloadProperties): Promise<void>;
    /**
     * Reload a tab.
     * @since Chrome 16.
     * @param tabId The ID of the tab to reload; defaults to the selected tab of the current window.
     */
    export function reload(tabId: number, reloadProperties?: ReloadProperties, callback?: () => void): void;
    /**
     * Reload the selected tab of the current window.
     * @since Chrome 16.
     * @return The `reload` method provides its result via callback or returned as a `Promise` (MV3 only). It has no parameters.
     */
    export function reload(reloadProperties: ReloadProperties): Promise<void>;
    /**
     * Reload the selected tab of the current window.
     * @since Chrome 16.
     */
    export function reload(reloadProperties: ReloadProperties, callback: () => void): void;
    /**
     * Reload the selected tab of the current window.
     * @since Chrome 16.
     * @return The `reload` method provides its result via callback or returned as a `Promise` (MV3 only). It has no parameters.
     */
    export function reload(): Promise<void>;
    /**
     * Reload the selected tab of the current window.
     * @since Chrome 16.
     */
    export function reload(callback: () => void): void;
    /**
     * Duplicates a tab.
     * @since Chrome 23.
     * @param tabId The ID of the tab which is to be duplicated.
     * @return The `duplicate` method provides its result via callback or returned as a `Promise` (MV3 only).
     */
    export function duplicate(tabId: number): Promise<Tab | undefined>;
    /**
     * Duplicates a tab.
     * @since Chrome 23.
     * @param tabId The ID of the tab which is to be duplicated.
     * @param callback Optional.
     * Optional parameter tab: Details about the duplicated tab. The tabs.Tab object doesn't contain url, title and favIconUrl if the "tabs" permission has not been requested.
     */
    export function duplicate(tabId: number, callback: (tab?: Tab) => void): void;
    /**
     * Sends a single message to the content script(s) in the specified tab, with an optional callback to run when a response is sent back. The runtime.onMessage event is fired in each content script running in the specified tab for the current extension.
     * @since Chrome 20.
     */
    export function sendMessage<M = any, R = any>(tabId: number, message: M, responseCallback: (response: R) => void): void;
    /**
     * Sends a single message to the content script(s) in the specified tab, with an optional callback to run when a response is sent back. The runtime.onMessage event is fired in each content script running in the specified tab for the current extension.
     * @since Chrome 41.
     * @param responseCallback Optional.
     * Parameter response: The JSON response object sent by the handler of the message. If an error occurs while connecting to the specified tab, the callback will be called with no arguments and runtime.lastError will be set to the error message.
     */
    export function sendMessage<M = any, R = any>(
        tabId: number,
        message: M,
        options: MessageSendOptions,
        responseCallback: (response: R) => void,
    ): void;
    /**
     * Sends a single message to the content script(s) in the specified tab, with an optional callback to run when a response is sent back. The runtime.onMessage event is fired in each content script running in the specified tab for the current extension.
     * @since Chrome 99
     */
    export function sendMessage<M = any, R = any>(tabId: number, message: M): Promise<R>;
    /**
     * Sends a single message to the content script(s) in the specified tab, with an optional callback to run when a response is sent back. The runtime.onMessage event is fired in each content script running in the specified tab for the current extension.
     * @since Chrome 99
     */
    export function sendMessage<M = any, R = any>(
        tabId: number,
        message: M,
        options: MessageSendOptions
    ): Promise<R>;
    /**
     * Sends a single request to the content script(s) in the specified tab, with an optional callback to run when a response is sent back. The extension.onRequest event is fired in each content script running in the specified tab for the current extension.
     * @deprecated since Chrome 33. Please use runtime.sendMessage.
     * @param responseCallback Optional.
     * Parameter response: The JSON response object sent by the handler of the request. If an error occurs while connecting to the specified tab, the callback will be called with no arguments and runtime.lastError will be set to the error message.
     */
    export function sendRequest<Request = any, Response = any>(tabId: number, request: Request, responseCallback?: (response: Response) => void): void;
    /** Connects to the content script(s) in the specified tab. The runtime.onConnect event is fired in each content script running in the specified tab for the current extension. */
    export function connect(tabId: number, connectInfo?: ConnectInfo): runtime.Port;
    /**
     * Injects CSS into a page. For details, see the programmatic injection section of the content scripts doc.
     * @param details Details of the script or CSS to inject. Either the code or the file property must be set, but both may not be set at the same time.
     * @return The `insertCSS` method provides its result via callback or returned as a `Promise` (MV3 only). It has no parameters.
     */
    export function insertCSS(details: InjectDetails): Promise<void>;
    /**
     * Injects CSS into a page. For details, see the programmatic injection section of the content scripts doc.
     * @param details Details of the script or CSS to inject. Either the code or the file property must be set, but both may not be set at the same time.
     * @param callback Optional. Called when all the CSS has been inserted.
     */
    export function insertCSS(details: InjectDetails, callback: Function): void;
    /**
     * Injects CSS into a page. For details, see the programmatic injection section of the content scripts doc.
     * @param tabId Optional. The ID of the tab in which to insert the CSS; defaults to the active tab of the current window.
     * @param details Details of the script or CSS to inject. Either the code or the file property must be set, but both may not be set at the same time.
     * @return The `insertCSS` method provides its result via callback or returned as a `Promise` (MV3 only). It has no parameters.
     */
    export function insertCSS(tabId: number, details: InjectDetails): Promise<void>;
    /**
     * Injects CSS into a page. For details, see the programmatic injection section of the content scripts doc.
     * @param tabId Optional. The ID of the tab in which to insert the CSS; defaults to the active tab of the current window.
     * @param details Details of the script or CSS to inject. Either the code or the file property must be set, but both may not be set at the same time.
     * @param callback Optional. Called when all the CSS has been inserted.
     */
    export function insertCSS(tabId: number, details: InjectDetails, callback: Function): void;
    /**
     * Highlights the given tabs.
     * @since Chrome 16.
     * @return The `highlight` method provides its result via callback or returned as a `Promise` (MV3 only). Contains details about the window whose tabs were highlighted.
     */
    export function highlight(highlightInfo: HighlightInfo): Promise<chrome.windows.Window>;
    /**
     * Highlights the given tabs.
     * @since Chrome 16.
     * @param callback Optional.
     * Parameter window: Contains details about the window whose tabs were highlighted.
     */
    export function highlight(highlightInfo: HighlightInfo, callback: (window: chrome.windows.Window) => void): void;
    /**
     * Gets all tabs that have the specified properties, or all tabs if no properties are specified.
     * @since Chrome 16.
     */
    export function query(queryInfo: QueryInfo, callback: (result: Tab[]) => void): void;
    /**
     * Gets all tabs that have the specified properties, or all tabs if no properties are specified.
     * @since Chrome 16.
     * @return The `query` method provides its result via callback or returned as a `Promise` (MV3 only).
     */
    export function query(queryInfo: QueryInfo): Promise<Tab[]>;
    /**
     * Detects the primary language of the content in a tab.
     * @param callback
     * Parameter language: An ISO language code such as en or fr. For a complete list of languages supported by this method, see kLanguageInfoTable. The 2nd to 4th columns will be checked and the first non-NULL value will be returned except for Simplified Chinese for which zh-CN will be returned. For an unknown language, und will be returned.
     */
    export function detectLanguage(callback: (language: string) => void): void;
    /**
     * Detects the primary language of the content in a tab.
     * @return The `detectLanguage` method provides its result via callback or returned as a `Promise` (MV3 only). An ISO language code such as en or fr. For a complete list of languages supported by this method, see kLanguageInfoTable. The 2nd to 4th columns will be checked and the first non-NULL value will be returned except for Simplified Chinese for which zh-CN will be returned. For an unknown language, und will be returned.
     */
    export function detectLanguage(): Promise<string>;
    /**
     * Detects the primary language of the content in a tab.
     * @param tabId Optional. Defaults to the active tab of the current window.
     * @param callback
     * Parameter language: An ISO language code such as en or fr. For a complete list of languages supported by this method, see kLanguageInfoTable. The 2nd to 4th columns will be checked and the first non-NULL value will be returned except for Simplified Chinese for which zh-CN will be returned. For an unknown language, und will be returned.
     */
    export function detectLanguage(tabId: number, callback: (language: string) => void): void;
    /**
     * Detects the primary language of the content in a tab.
     * @param tabId Optional. Defaults to the active tab of the current window.
     * @return The `detectLanguage` method provides its result via callback or returned as a `Promise` (MV3 only). An ISO language code such as en or fr. For a complete list of languages supported by this method, see kLanguageInfoTable. The 2nd to 4th columns will be checked and the first non-NULL value will be returned except for Simplified Chinese for which zh-CN will be returned. For an unknown language, und will be returned.
     */
    export function detectLanguage(tabId: number): Promise<string>;
    /**
     * Zooms a specified tab.
     * @since Chrome 42.
     * @param zoomFactor The new zoom factor. Use a value of 0 here to set the tab to its current default zoom factor. Values greater than zero specify a (possibly non-default) zoom factor for the tab.
     * @return The `setZoom` method provides its result via callback or returned as a `Promise` (MV3 only). It has no parameters.
     */
    export function setZoom(zoomFactor: number): Promise<void>;
    /**
     * Zooms a specified tab.
     * @since Chrome 42.
     * @param zoomFactor The new zoom factor. Use a value of 0 here to set the tab to its current default zoom factor. Values greater than zero specify a (possibly non-default) zoom factor for the tab.
     * @param callback Optional. Called after the zoom factor has been changed.
     */
    export function setZoom(zoomFactor: number, callback: () => void): void;
    /**
     * Zooms a specified tab.
     * @since Chrome 42.
     * @param tabId Optional. The ID of the tab to zoom; defaults to the active tab of the current window.
     * @param zoomFactor The new zoom factor. Use a value of 0 here to set the tab to its current default zoom factor. Values greater than zero specify a (possibly non-default) zoom factor for the tab.
     * @return The `setZoom` method provides its result via callback or returned as a `Promise` (MV3 only). It has no parameters.
     */
    export function setZoom(tabId: number, zoomFactor: number): Promise<void>;
    /**
     * Zooms a specified tab.
     * @since Chrome 42.
     * @param tabId Optional. The ID of the tab to zoom; defaults to the active tab of the current window.
     * @param zoomFactor The new zoom factor. Use a value of 0 here to set the tab to its current default zoom factor. Values greater than zero specify a (possibly non-default) zoom factor for the tab.
     * @param callback Optional. Called after the zoom factor has been changed.
     */
    export function setZoom(tabId: number, zoomFactor: number, callback: () => void): void;
    /**
     * Gets the current zoom factor of a specified tab.
     * @since Chrome 42.
     * @param callback Called with the tab's current zoom factor after it has been fetched.
     * Parameter zoomFactor: The tab's current zoom factor.
     */
    export function getZoom(callback: (zoomFactor: number) => void): void;
    /**
     * Gets the current zoom factor of a specified tab.
     * @since Chrome 42.
     * @return The `getZoom` method provides its result via callback or returned as a `Promise` (MV3 only). The tab's current zoom factor.
     */
    export function getZoom(): Promise<number>;
    /**
     * Gets the current zoom factor of a specified tab.
     * @since Chrome 42.
     * @param tabId Optional. The ID of the tab to get the current zoom factor from; defaults to the active tab of the current window.
     * @param callback Called with the tab's current zoom factor after it has been fetched.
     * Parameter zoomFactor: The tab's current zoom factor.
     */
    export function getZoom(tabId: number, callback: (zoomFactor: number) => void): void;
    /**
     * Gets the current zoom factor of a specified tab.
     * @since Chrome 42.
     * @param tabId Optional. The ID of the tab to get the current zoom factor from; defaults to the active tab of the current window.
     * @return The `getZoom` method provides its result via callback or returned as a `Promise` (MV3 only). The tab's current zoom factor.
     */
    export function getZoom(tabId: number): Promise<number>;
    /**
     * Sets the zoom settings for a specified tab, which define how zoom changes are handled. These settings are reset to defaults upon navigating the tab.
     * @since Chrome 42.
     * @param zoomSettings Defines how zoom changes are handled and at what scope.
     * @return The `setZoomSettings` method provides its result via callback or returned as a `Promise` (MV3 only). It has no parameters.
     */
    export function setZoomSettings(zoomSettings: ZoomSettings): Promise<void>;
    /**
     * Sets the zoom settings for a specified tab, which define how zoom changes are handled. These settings are reset to defaults upon navigating the tab.
     * @since Chrome 42.
     * @param zoomSettings Defines how zoom changes are handled and at what scope.
     * @param callback Optional. Called after the zoom settings have been changed.
     */
    export function setZoomSettings(zoomSettings: ZoomSettings, callback: () => void): void;
    /**
     * Sets the zoom settings for a specified tab, which define how zoom changes are handled. These settings are reset to defaults upon navigating the tab.
     * @since Chrome 42.
     * @param tabId Optional. The ID of the tab to change the zoom settings for; defaults to the active tab of the current window.
     * @param zoomSettings Defines how zoom changes are handled and at what scope.
     * @return The `setZoomSettings` method provides its result via callback or returned as a `Promise` (MV3 only). It has no parameters.
     */
    export function setZoomSettings(tabId: number, zoomSettings: ZoomSettings): Promise<void>;
    /**
     * Sets the zoom settings for a specified tab, which define how zoom changes are handled. These settings are reset to defaults upon navigating the tab.
     * @since Chrome 42.
     * @param tabId Optional. The ID of the tab to change the zoom settings for; defaults to the active tab of the current window.
     * @param zoomSettings Defines how zoom changes are handled and at what scope.
     * @param callback Optional. Called after the zoom settings have been changed.
     */
    export function setZoomSettings(tabId: number, zoomSettings: ZoomSettings, callback: () => void): void;
    /**
     * Gets the current zoom settings of a specified tab.
     * @since Chrome 42.
     * @param callback Called with the tab's current zoom settings.
     * Parameter zoomSettings: The tab's current zoom settings.
     */
    export function getZoomSettings(callback: (zoomSettings: ZoomSettings) => void): void;
    /**
     * Gets the current zoom settings of a specified tab.
     * @since Chrome 42.
     * @return The `getZoomSettings` method provides its result via callback or returned as a `Promise` (MV3 only). The tab's current zoom settings.
     */
    export function getZoomSettings(): Promise<ZoomSettings>;
    /**
     * Gets the current zoom settings of a specified tab.
     * @since Chrome 42.
     * @param tabId Optional. The ID of the tab to get the current zoom settings from; defaults to the active tab of the current window.
     * @param callback Called with the tab's current zoom settings.
     * Parameter zoomSettings: The tab's current zoom settings.
     */
    export function getZoomSettings(tabId: number, callback: (zoomSettings: ZoomSettings) => void): void;
    /**
     * Gets the current zoom settings of a specified tab.
     * @since Chrome 42.
     * @param tabId Optional. The ID of the tab to get the current zoom settings from; defaults to the active tab of the current window.
     * @return The `getZoomSettings` method provides its result via callback or returned as a `Promise` (MV3 only). The tab's current zoom settings.
     */
    export function getZoomSettings(tabId: number): Promise<ZoomSettings>;
    /**
     * Discards a tab from memory. Discarded tabs are still visible on the tab strip and are reloaded when activated.
     * @since Chrome 54.
     * @param tabId Optional. The ID of the tab to be discarded. If specified, the tab will be discarded unless it's active or already discarded. If omitted, the browser will discard the least important tab. This can fail if no discardable tabs exist.
     * @return The `discard` method provides its result via callback or returned as a `Promise` (MV3 only).
     */
    export function discard(tabId?: number): Promise<Tab>;
    /**
     * Discards a tab from memory. Discarded tabs are still visible on the tab strip and are reloaded when activated.
     * @since Chrome 54.
     * @param tabId Optional. The ID of the tab to be discarded. If specified, the tab will be discarded unless it's active or already discarded. If omitted, the browser will discard the least important tab. This can fail if no discardable tabs exist.
     * @param callback Called after the operation is completed.
     */
    export function discard(callback: (tab: Tab) => void): void;
    export function discard(tabId: number, callback: (tab: Tab) => void): void;
    /**
     * Go forward to the next page, if one is available.
     * @since Chrome 72.
     * @return The `goForward` method provides its result via callback or returned as a `Promise` (MV3 only). It has no parameters.
     */
    export function goForward(): Promise<void>;
    /**
     * Go forward to the next page, if one is available.
     * @since Chrome 72.
     * @param callback Optional. Called after the operation is completed.
     */
    export function goForward(callback: () => void): void;
    /**
     * Go forward to the next page, if one is available.
     * @since Chrome 72.
     * @param tabId Optional. The ID of the tab to navigate forward; defaults to the selected tab of the current window.
     * @return The `goForward` method provides its result via callback or returned as a `Promise` (MV3 only). It has no parameters.
     */
    export function goForward(tabId: number): Promise<void>;
    /**
     * Go forward to the next page, if one is available.
     * @since Chrome 72.
     * @param tabId Optional. The ID of the tab to navigate forward; defaults to the selected tab of the current window.
     * @param callback Optional. Called after the operation is completed.
     */
    export function goForward(tabId: number, callback: () => void): void;
    /**
     * Go back to the previous page, if one is available.
     * @since Chrome 72.
     * @return The `goBack` method provides its result via callback or returned as a `Promise` (MV3 only). It has no parameters.
     */
    export function goBack(): Promise<void>;
    /**
     * Go back to the previous page, if one is available.
     * @since Chrome 72.
     * @param callback Optional. Called after the operation is completed.
     */
    export function goBack(callback: () => void): void;
    /**
     * Go back to the previous page, if one is available.
     * @since Chrome 72.
     * @param tabId Optional. The ID of the tab to navigate back; defaults to the selected tab of the current window.
     * @return The `goBack` method provides its result via callback or returned as a `Promise` (MV3 only). It has no parameters.
     */
    export function goBack(tabId: number): Promise<void>;
    /**
     * Go back to the previous page, if one is available.
     * @since Chrome 72.
     * @param tabId Optional. The ID of the tab to navigate back; defaults to the selected tab of the current window.
     * @param callback Optional. Called after the operation is completed.
     */
    export function goBack(tabId: number, callback: () => void): void;
    /**
     * Adds one or more tabs to a specified group, or if no group is specified, adds the given tabs to a newly created group.
     * @since Chrome 88
     * @param options Configurations object
     * @return The `group` method provides its result via callback or returned as a `Promise` (MV3 only).
     */
    export function group(options: GroupOptions): Promise<number>;
    /**
     * Adds one or more tabs to a specified group, or if no group is specified, adds the given tabs to a newly created group.
     * @since Chrome 88
     * @param options Configurations object
     * @return The `group` method provides its result via callback or returned as a `Promise` (MV3 only).
     */
    export function group(options: GroupOptions): Promise<number>;
    /**
     * Adds one or more tabs to a specified group, or if no group is specified, adds the given tabs to a newly created group.
     * @since Chrome 88
     * @param options Configurations object
     * @param callback Optional.
     */
    export function group(options: GroupOptions, callback: (groupId: number) => void): void
    /**
     * Removes one or more tabs from their respective groups. If any groups become empty, they are deleted
     * @since Chrome 88
     * @param tabIds The tabs to ungroup.
     * @return The `ungroup` method provides its result via callback or returned as a `Promise` (MV3 only). It has no parameters.
     */
    export function ungroup(tabIds: number | number[]): Promise<void>;
    /**
     * Removes one or more tabs from their respective groups. If any groups become empty, they are deleted
     * @since Chrome 88
     * @param tabIds The tabs to ungroup.
     * @param callback Optional. Called after the operation is completed.
     */
    export function ungroup(tabIds: number | number[], callback: () => void): void
    /**
     * Fired when the highlighted or selected tabs in a window changes.
     * @since Chrome 18.
     */
    export var onHighlighted: TabHighlightedEvent;
    /** Fired when a tab is closed. */
    export var onRemoved: TabRemovedEvent;
    /** Fired when a tab is updated. */
    export var onUpdated: TabUpdatedEvent;
    /** Fired when a tab is attached to a window, for example because it was moved between windows. */
    export var onAttached: TabAttachedEvent;
    /**
     * Fired when a tab is moved within a window. Only one move event is fired, representing the tab the user directly moved. Move events are not fired for the other tabs that must move in response. This event is not fired when a tab is moved between windows. For that, see tabs.onDetached.
     */
    export var onMoved: TabMovedEvent;
    /** Fired when a tab is detached from a window, for example because it is being moved between windows. */
    export var onDetached: TabDetachedEvent;
    /** Fired when a tab is created. Note that the tab's URL may not be set at the time this event fired, but you can listen to onUpdated events to be notified when a URL is set. */
    export var onCreated: TabCreatedEvent;
    /**
     * Fires when the active tab in a window changes. Note that the tab's URL may not be set at the time this event fired, but you can listen to onUpdated events to be notified when a URL is set.
     * @since Chrome 18.
     */
    export var onActivated: TabActivatedEvent;
    /**
     * Fired when a tab is replaced with another tab due to prerendering or instant.
     * @since Chrome 26.
     */
    export var onReplaced: TabReplacedEvent;
    /**
     * @deprecated since Chrome 33. Please use tabs.onActivated.
     * Fires when the selected tab in a window changes.
     */
    export var onSelectionChanged: TabSelectedEvent;
    /**
     * @deprecated since Chrome 33. Please use tabs.onActivated.
     * Fires when the selected tab in a window changes. Note that the tab's URL may not be set at the time this event fired, but you can listen to tabs.onUpdated events to be notified when a URL is set.
     */
    export var onActiveChanged: TabSelectedEvent;
    /**
     * @deprecated since Chrome 33. Please use tabs.onHighlighted.
     * Fired when the highlighted or selected tabs in a window changes.
     */
    export var onHighlightChanged: TabHighlightedEvent;
    /**
     * Fired when a tab is zoomed.
     * @since Chrome 38.
     */
    export var onZoomChange: TabZoomChangeEvent;

    /**
     * An ID which represents the absence of a browser tab.
     * @since Chrome 46.
     */
    export var TAB_ID_NONE: -1;
}

/**
 * The chrome.events namespace contains common types used by APIs dispatching events to notify you when something interesting happens.
 * Availability: Since Chrome 21.
 */
declare namespace chrome.events {
    /** Filters URLs for various criteria. See event filtering. All criteria are case sensitive. */
    export interface UrlFilter {
        /** Optional. Matches if the scheme of the URL is equal to any of the schemes specified in the array.  */
        schemes?: string[] | undefined;
        /**
         * Optional.
         * Since Chrome 23.
         * Matches if the URL (without fragment identifier) matches a specified regular expression. Port numbers are stripped from the URL if they match the default port number. The regular expressions use the RE2 syntax.
         */
        urlMatches?: string | undefined;
        /** Optional. Matches if the path segment of the URL contains a specified string.  */
        pathContains?: string | undefined;
        /** Optional. Matches if the host name of the URL ends with a specified string.  */
        hostSuffix?: string | undefined;
        /** Optional. Matches if the host name of the URL starts with a specified string.  */
        hostPrefix?: string | undefined;
        /** Optional. Matches if the host name of the URL contains a specified string. To test whether a host name component has a prefix 'foo', use hostContains: '.foo'. This matches 'www.foobar.com' and 'foo.com', because an implicit dot is added at the beginning of the host name. Similarly, hostContains can be used to match against component suffix ('foo.') and to exactly match against components ('.foo.'). Suffix- and exact-matching for the last components need to be done separately using hostSuffix, because no implicit dot is added at the end of the host name.  */
        hostContains?: string | undefined;
        /** Optional. Matches if the URL (without fragment identifier) contains a specified string. Port numbers are stripped from the URL if they match the default port number.  */
        urlContains?: string | undefined;
        /** Optional. Matches if the query segment of the URL ends with a specified string.  */
        querySuffix?: string | undefined;
        /** Optional. Matches if the URL (without fragment identifier) starts with a specified string. Port numbers are stripped from the URL if they match the default port number.  */
        urlPrefix?: string | undefined;
        /** Optional. Matches if the host name of the URL is equal to a specified string.  */
        hostEquals?: string | undefined;
        /** Optional. Matches if the URL (without fragment identifier) is equal to a specified string. Port numbers are stripped from the URL if they match the default port number.  */
        urlEquals?: string | undefined;
        /** Optional. Matches if the query segment of the URL contains a specified string.  */
        queryContains?: string | undefined;
        /** Optional. Matches if the path segment of the URL starts with a specified string.  */
        pathPrefix?: string | undefined;
        /** Optional. Matches if the path segment of the URL is equal to a specified string.  */
        pathEquals?: string | undefined;
        /** Optional. Matches if the path segment of the URL ends with a specified string.  */
        pathSuffix?: string | undefined;
        /** Optional. Matches if the query segment of the URL is equal to a specified string.  */
        queryEquals?: string | undefined;
        /** Optional. Matches if the query segment of the URL starts with a specified string.  */
        queryPrefix?: string | undefined;
        /** Optional. Matches if the URL (without fragment identifier) ends with a specified string. Port numbers are stripped from the URL if they match the default port number.  */
        urlSuffix?: string | undefined;
        /** Optional. Matches if the port of the URL is contained in any of the specified port lists. For example [80, 443, [1000, 1200]] matches all requests on port 80, 443 and in the range 1000-1200.  */
        ports?: (number | number[])[] | undefined;
        /**
         * Optional.
         * Since Chrome 28.
         * Matches if the URL without query segment and fragment identifier matches a specified regular expression. Port numbers are stripped from the URL if they match the default port number. The regular expressions use the RE2 syntax.
         */
        originAndPathMatches?: string | undefined;
    }

    export interface BaseEvent<T extends Function> {
        addListener(callback: T, filter?: webRequest.RequestFilter): void;
        /**
         * Returns currently registered rules.
         * @param callback Called with registered rules.
         */
        getRules(
            callback: (
                /** Rules that were registered, the optional parameters are filled with values */
                rules: Rule[]
            ) => void
        ): void;
        /**
         * Returns currently registered rules.
         * @param ruleIdentifiers If an array is passed, only rules with identifiers contained in this array are returned.
         * @param callback Called with registered rules.
         */
        getRules(
            ruleIdentifiers: string[],
            callback: (
                /** Rules that were registered, the optional parameters are filled with values */
                rules: Rule[]
            ) => void
        ): void;
        /**
         * @param callback Listener whose registration status shall be tested.
         */
        hasListener(callback: T): boolean;
        /**
         * Unregisters currently registered rules.
         * @param ruleIdentifiers If an array is passed, only rules with identifiers contained in this array are unregistered.
         * @param callback Called when rules were unregistered.
         */
        removeRules(ruleIdentifiers?: string[], callback?: () => void): void;
        /**
         * Unregisters currently registered rules.
         * @param callback Called when rules were unregistered.
         */
        removeRules(callback?: () => void): void;
        /**
         * Registers rules to handle events.
         * @param rules Rules to be registered. These do not replace previously registered rules.
         * @param callback Called with registered rules.
         */
        addRules(
            rules: Rule[],
            callback?: (
                /** Rules that were registered, the optional parameters are filled with values */
                rules: Rule[]
            ) => void
        ): void;
        /**
         * Deregisters an event listener callback from an event.
         * @param callback Listener that shall be unregistered.
         */
        removeListener(callback: T): void;
        hasListeners(): boolean;
    }

    /** An object which allows the addition and removal of listeners for a Chrome event. */
    interface Event<T extends Function> extends BaseEvent<T> {
        /**
         * Registers an event listener callback to an event.
         * @param callback Called when an event occurs. The parameters of this function depend on the type of event.
         */
        addListener(callback: T): void;
    }
    export interface EventWithRequiredFilterInAddListener<T extends Function> extends BaseEvent<T> {
        addListener(callback: T, filter: webRequest.RequestFilter): void;
    }

    /** Description of a declarative rule for handling events. */
    export interface Rule {
        /** Optional. Optional priority of this rule. Defaults to 100.  */
        priority?: number | undefined;
        /** List of conditions that can trigger the actions. */
        conditions: any[];
        /** Optional. Optional identifier that allows referencing this rule.  */
        id?: string | undefined;
        /** List of actions that are triggered if one of the condtions is fulfilled. */
        actions: any[];
        /**
         * Optional.
         * Since Chrome 28.
         * Tags can be used to annotate rules and perform operations on sets of rules.
         */
        tags?: string[] | undefined;
    }
}

////////////////////
// Browser Action
////////////////////
/**
 * Use browser actions to put icons in the main Google Chrome toolbar, to the right of the address bar. In addition to its icon, a browser action can also have a tooltip, a badge, and a popup.
 * Availability: Since Chrome 5.
 * Manifest:  "browser_action": {...}
 */
declare namespace chrome.browserAction {
    export interface BadgeBackgroundColorDetails {
        /** An array of four integers in the range [0,255] that make up the RGBA color of the badge. For example, opaque red is [255, 0, 0, 255]. Can also be a string with a CSS value, with opaque red being #FF0000 or #F00. */
        color: string | ColorArray;
        /** Optional. Limits the change to when a particular tab is selected. Automatically resets when the tab is closed.  */
        tabId?: number | undefined;
    }

    export interface BadgeTextDetails {
        /** Any number of characters can be passed, but only about four can fit in the space. */
        text?: string | null | undefined;
        /** Optional. Limits the change to when a particular tab is selected. Automatically resets when the tab is closed.  */
        tabId?: number | undefined;
    }

    export type ColorArray = [number, number, number, number];

    export interface TitleDetails {
        /** The string the browser action should display when moused over. */
        title: string;
        /** Optional. Limits the change to when a particular tab is selected. Automatically resets when the tab is closed.  */
        tabId?: number | null;
    }

    export interface TabDetails {
        /** Optional. Specify the tab to get the information. If no tab is specified, the non-tab-specific information is returned.  */
        tabId?: number | null;
    }

    export interface TabIconDetails {
        /** Optional. Either a relative image path or a dictionary {size -> relative image path} pointing to icon to be set. If the icon is specified as a dictionary, the actual image to be used is chosen depending on screen's pixel density. If the number of image pixels that fit into one screen space unit equals scale, then image with size scale * 19 will be selected. Initially only scales 1 and 2 will be supported. At least one image must be specified. Note that 'details.path = foo' is equivalent to 'details.imageData = {'19': foo}'  */
        path?: string | { [index: string]: string } | undefined;
        /** Optional. Limits the change to when a particular tab is selected. Automatically resets when the tab is closed.  */
        tabId?: number | undefined;
        /** Optional. Either an ImageData object or a dictionary {size -> ImageData} representing icon to be set. If the icon is specified as a dictionary, the actual image to be used is chosen depending on screen's pixel density. If the number of image pixels that fit into one screen space unit equals scale, then image with size scale * 19 will be selected. Initially only scales 1 and 2 will be supported. At least one image must be specified. Note that 'details.imageData = foo' is equivalent to 'details.imageData = {'19': foo}'  */
        imageData?: ImageData | { [index: number]: ImageData } | undefined;
    }

    export interface PopupDetails {
        /** Optional. Limits the change to when a particular tab is selected. Automatically resets when the tab is closed.  */
        tabId?: number | null;
        /** The html file to show in a popup. If set to the empty string (''), no popup is shown. */
        popup: string;
    }

    export interface BrowserClickedEvent extends chrome.events.Event<(tab: chrome.tabs.Tab) => void> { }

    /**
     * Since Chrome 22.
     * Enables the browser action for a tab. By default, browser actions are enabled.
     * @param tabId The id of the tab for which you want to modify the browser action.
     * @return The `enable` method provides its result via callback or returned as a `Promise` (MV3 only). It has no parameters.
     */
    export function enable(tabId?: number | null): Promise<void>;
    /**
     * Since Chrome 22.
     * Enables the browser action for a tab. By default, browser actions are enabled.
     * @param tabId The id of the tab for which you want to modify the browser action.
     * @param callback Supported since Chrome 67
     */
    export function enable(callback?: () => void): void;
    export function enable(tabId: number | null | undefined, callback?: () => void): void;
    /**
     * Sets the background color for the badge.
     * @return The `setBadgeBackgroundColor` method provides its result via callback or returned as a `Promise` (MV3 only). It has no parameters.
     */
    export function setBadgeBackgroundColor(details: BadgeBackgroundColorDetails): Promise<void>;
    /**
     * Sets the background color for the badge.
     * @param callback Supported since Chrome 67
     */
    export function setBadgeBackgroundColor(details: BadgeBackgroundColorDetails, callback?: () => void): void;
    /**
     * Sets the badge text for the browser action. The badge is displayed on top of the icon.
     * @return The `setBadgeText` method provides its result via callback or returned as a `Promise` (MV3 only). It has no parameters.
     */
    export function setBadgeText(details: BadgeTextDetails): Promise<void>;
    /**
     * Sets the badge text for the browser action. The badge is displayed on top of the icon.
     * @param callback Supported since Chrome 67
     */
    export function setBadgeText(details: BadgeTextDetails, callback: () => void): void;
    /**
     * Sets the title of the browser action. This shows up in the tooltip.
     * @return The `setTitle` method provides its result via callback or returned as a `Promise` (MV3 only). It has no parameters.
     */
    export function setTitle(details: TitleDetails): Promise<void>;
    /**
     * Sets the title of the browser action. This shows up in the tooltip.
     * @param callback Supported since Chrome 67
     */
    export function setTitle(details: TitleDetails, callback: () => void): void;
    /**
     * Since Chrome 19.
     * Gets the badge text of the browser action. If no tab is specified, the non-tab-specific badge text is returned.
     * @param callback Supported since Chrome 67
     */
    export function getBadgeText(details: TabDetails, callback: (result: string) => void): void;
    /**
     * Since Chrome 19.
     * Gets the badge text of the browser action. If no tab is specified, the non-tab-specific badge text is returned.
     * @return The `getBadgeText` method provides its result via callback or returned as a `Promise` (MV3 only).
     */
    export function getBadgeText(details: TabDetails): Promise<string>;
    /**
     * Sets the html document to be opened as a popup when the user clicks on the browser action's icon.
     * @return The `setPopup` method provides its result via callback or returned as a `Promise` (MV3 only). It has no parameters.
     */
    export function setPopup(details: PopupDetails): Promise<void>;
    /**
     * Sets the html document to be opened as a popup when the user clicks on the browser action's icon.
     * @param callback Supported since Chrome 67
     */
    export function setPopup(details: PopupDetails, callback?: () => void): void;
    /**
     * Since Chrome 22.
     * Disables the browser action for a tab.
     * @param tabId The id of the tab for which you want to modify the browser action.
     * @return The `disable` method provides its result via callback or returned as a `Promise` (MV3 only). It has no parameters.
     */
    export function disable(tabId?: number | null): Promise<void>;
    /**
     * Since Chrome 22.
     * Disables the browser action for a tab.
     * @param tabId The id of the tab for which you want to modify the browser action.
     * @param callback Supported since Chrome 67
     */
    export function disable(callback: () => void): void;
    export function disable(tabId?: number | null, callback?: () => void): void;
    /**
     * Since Chrome 19.
     * Gets the title of the browser action.
     */
    export function getTitle(details: TabDetails, callback: (result: string) => void): void;
    /**
     * Since Chrome 19.
     * Gets the title of the browser action.
     * @return The `getTitle` method provides its result via callback or returned as a `Promise` (MV3 only).
     */
    export function getTitle(details: TabDetails): Promise<string>;
    /**
     * Since Chrome 19.
     * Gets the background color of the browser action.
     */
    export function getBadgeBackgroundColor(details: TabDetails, callback: (result: ColorArray) => void): void;
    /**
     * Since Chrome 19.
     * Gets the background color of the browser action.
     * @return The `getBadgeBackgroundColor` method provides its result via callback or returned as a `Promise` (MV3 only).
     */
    export function getBadgeBackgroundColor(details: TabDetails): Promise<ColorArray>;
    /**
     * Since Chrome 19.
     * Gets the html document set as the popup for this browser action.
     */
    export function getPopup(details: TabDetails, callback: (result: string) => void): void;
    /**
     * Since Chrome 19.
     * Gets the html document set as the popup for this browser action.
     * @return The `getPopup` method provides its result via callback or returned as a `Promise` (MV3 only).
     */
    export function getPopup(details: TabDetails): Promise<string>;
    /**
     * Sets the icon for the browser action. The icon can be specified either as the path to an image file or as the pixel data from a canvas element, or as dictionary of either one of those. Either the path or the imageData property must be specified.
     */
    export function setIcon(details: TabIconDetails, callback?: Function): void;

    /** Fired when a browser action icon is clicked. This event will not fire if the browser action has a popup. */
    export var onClicked: BrowserClickedEvent;
}

////////////////////
// Windows
////////////////////
/**
 * Use the chrome.windows API to interact with browser windows. You can use this API to create, modify, and rearrange windows in the browser.
 * Permissions: The chrome.windows API can be used without declaring any permission. However, the "tabs" permission is required in order to populate the url, title, and favIconUrl properties of Tab objects.
 * @since Chrome 5.
 */
declare namespace chrome.windows {
    export interface Window {
        /** Optional. Array of tabs.Tab objects representing the current tabs in the window. */
        tabs?: chrome.tabs.Tab[] | undefined;
        /** Optional. The offset of the window from the top edge of the screen in pixels. Under some circumstances a Window may not be assigned top property, for example when querying closed windows from the sessions API. */
        top?: number | undefined;
        /** Optional. The height of the window, including the frame, in pixels. Under some circumstances a Window may not be assigned height property, for example when querying closed windows from the sessions API. */
        height?: number | undefined;
        /** Optional. The width of the window, including the frame, in pixels. Under some circumstances a Window may not be assigned width property, for example when querying closed windows from the sessions API. */
        width?: number | undefined;
        /**
         * The state of this browser window.
         * @since Chrome 17.
         */
        state?: windowStateEnum | undefined;
        /** Whether the window is currently the focused window. */
        focused: boolean;
        /**
         * Whether the window is set to be always on top.
         * @since Chrome 19.
         */
        alwaysOnTop: boolean;
        /** Whether the window is incognito. */
        incognito: boolean;
        /**
         * The type of browser window this is.
         */
        type?: windowTypeEnum | undefined;
        /** Optional. The ID of the window. Window IDs are unique within a browser session. Under some circumstances a Window may not be assigned an ID, for example when querying windows using the sessions API, in which case a session ID may be present. */
        id?: number | undefined;
        /** Optional. The offset of the window from the left edge of the screen in pixels. Under some circumstances a Window may not be assigned left property, for example when querying closed windows from the sessions API. */
        left?: number | undefined;
        /**
         * Optional. The session ID used to uniquely identify a Window obtained from the sessions API.
         * @since Chrome 31.
         */
        sessionId?: string | undefined;
    }

    export interface QueryOptions {
        /**
         * Optional.
         * If true, the windows.Window object will have a tabs property that contains a list of the tabs.Tab objects.
         * The Tab objects only contain the url, pendingUrl, title and favIconUrl properties if the extension's manifest file includes the "tabs" permission.
         */
        populate?: boolean | undefined;
        /**
         * If set, the Window returned is filtered based on its type. If unset, the default filter is set to ['normal', 'popup'].
         */
        windowTypes?: windowTypeEnum[] | undefined;
    }

    export interface CreateData {
        /**
         * Optional. The id of the tab for which you want to adopt to the new window.
         * @since Chrome 10.
         */
        tabId?: number | undefined;
        /**
         * Optional.
         * A URL or array of URLs to open as tabs in the window. Fully-qualified URLs must include a scheme (i.e. 'http://www.google.com', not 'www.google.com'). Relative URLs will be relative to the current page within the extension. Defaults to the New Tab Page.
         */
        url?: string | string[] | undefined;
        /**
         * Optional.
         * The number of pixels to position the new window from the top edge of the screen. If not specified, the new window is offset naturally from the last focused window. This value is ignored for panels.
         */
        top?: number | undefined;
        /**
         * Optional.
         * The height in pixels of the new window, including the frame. If not specified defaults to a natural height.
         */
        height?: number | undefined;
        /**
         * Optional.
         * The width in pixels of the new window, including the frame. If not specified defaults to a natural width.
         */
        width?: number | undefined;
        /**
         * Optional. If true, opens an active window. If false, opens an inactive window.
         * @since Chrome 12.
         */
        focused?: boolean | undefined;
        /** Optional. Whether the new window should be an incognito window. */
        incognito?: boolean | undefined;
        /** Optional. Specifies what type of browser window to create. */
        type?: createTypeEnum | undefined;
        /**
         * Optional.
         * The number of pixels to position the new window from the left edge of the screen. If not specified, the new window is offset naturally from the last focused window. This value is ignored for panels.
         */
        left?: number | undefined;
        /**
         * Optional. The initial state of the window. The 'minimized', 'maximized' and 'fullscreen' states cannot be combined with 'left', 'top', 'width' or 'height'.
         * @since Chrome 44.
         */
        state?: windowStateEnum | undefined;
        /**
         * If true, the newly-created window's 'window.opener' is set to the caller and is in the same [unit of related browsing contexts](https://www.w3.org/TR/html51/browsers.html#unit-of-related-browsing-contexts) as the caller.
         * @since Chrome 64.
         */
        setSelfAsOpener?: boolean | undefined;
    }

    export interface UpdateInfo {
        /** Optional. The offset from the top edge of the screen to move the window to in pixels. This value is ignored for panels. */
        top?: number | undefined;
        /**
         * Optional. If true, causes the window to be displayed in a manner that draws the user's attention to the window, without changing the focused window. The effect lasts until the user changes focus to the window. This option has no effect if the window already has focus. Set to false to cancel a previous draw attention request.
         * @since Chrome 14.
         */
        drawAttention?: boolean | undefined;
        /** Optional. The height to resize the window to in pixels. This value is ignored for panels. */
        height?: number | undefined;
        /** Optional. The width to resize the window to in pixels. This value is ignored for panels. */
        width?: number | undefined;
        /**
         * Optional. The new state of the window. The 'minimized', 'maximized' and 'fullscreen' states cannot be combined with 'left', 'top', 'width' or 'height'.
         * @since Chrome 17.
         */
        state?: windowStateEnum | undefined;
        /**
         * Optional. If true, brings the window to the front. If false, brings the next window in the z-order to the front.
         * @since Chrome 8.
         */
        focused?: boolean | undefined;
        /** Optional. The offset from the left edge of the screen to move the window to in pixels. This value is ignored for panels. */
        left?: number | undefined;
    }

    export interface WindowEventFilter {
        /**
         * Conditions that the window's type being created must satisfy. By default it will satisfy ['app', 'normal', 'panel', 'popup'], with 'app' and 'panel' window types limited to the extension's own windows.
         */
        windowTypes: windowTypeEnum[];
    }

    export interface WindowIdEvent
        extends chrome.events.Event<(windowId: number) => void> {
        addListener(
            callback: (windowId: number) => void,
            filters?: WindowEventFilter,
        ): void;
    }

    export interface WindowReferenceEvent
        extends chrome.events.Event<(window: Window) => void> {
        addListener(
            callback: (window: Window) => void,
            filters?: WindowEventFilter,
        ): void;
    }

    /**
     * Specifies what type of browser window to create.
     * 'panel' is deprecated and is available only to existing whitelisted extensions on Chrome OS.
     * @since Chrome 44.
     */
    export type createTypeEnum = 'normal' | 'popup' | 'panel';

    /**
     * The state of this browser window.
     * In some circumstances a window may not be assigned a state property; for example, when querying closed windows from the sessions API.
     * @since Chrome 44.
     */
    export type windowStateEnum = 'normal' | 'minimized' | 'maximized' | 'fullscreen' | 'locked-fullscreen';

    /**
     * The type of browser window this is.
     * In some circumstances a window may not be assigned a type property; for example, when querying closed windows from the sessions API.
     * @since Chrome 44.
     */
    export type windowTypeEnum = 'normal' | 'popup' | 'panel' | 'app' | 'devtools';

    /**
     * The windowId value that represents the current window.
     * @since Chrome 18.
     */
    export var WINDOW_ID_CURRENT: -2;
    /**
     * The windowId value that represents the absence of a chrome browser window.
     * @since Chrome 6.
     */
    export var WINDOW_ID_NONE: -1;

    /** Gets details about a window. */
    export function get(windowId: number, callback: (window: chrome.windows.Window) => void): void;
    /**
     * Gets details about a window.
     * @return The `get` method provides its result via callback or returned as a `Promise` (MV3 only).
     */
    export function get(windowId: number): Promise<chrome.windows.Window>;
    /**
     * Gets details about a window.
     * @since Chrome 18.
     */
    export function get(windowId: number, queryOptions: QueryOptions, callback: (window: chrome.windows.Window) => void): void;
    /**
     * Gets details about a window.
     * @since Chrome 18.
     * @return The `get` method provides its result via callback or returned as a `Promise` (MV3 only).
     */
    export function get(windowId: number, queryOptions: QueryOptions): Promise<chrome.windows.Window>;
    /** Gets the current window. */
    export function getCurrent(callback: (window: chrome.windows.Window) => void): void;
    /**
     * Gets the current window.
     * @return The `getCurrent` method provides its result via callback or returned as a `Promise` (MV3 only).
     */
    export function getCurrent(): Promise<chrome.windows.Window>;
    /**
     * Gets the current window.
     * @param QueryOptions
     * @since Chrome 18.
     */
    export function getCurrent(queryOptions: QueryOptions, callback: (window: chrome.windows.Window) => void): void;
    /**
     * Gets the current window.
     * @param QueryOptions
     * @since Chrome 18.
     * @return The `getCurrent` method provides its result via callback or returned as a `Promise` (MV3 only).
     */
    export function getCurrent(queryOptions: QueryOptions): Promise<chrome.windows.Window>;
    /**
     * Creates (opens) a new browser with any optional sizing, position or default URL provided.
     * @return The `create` method provides its result via callback or returned as a `Promise` (MV3 only). Contains details about the created window.
     */
    export function create(): Promise<chrome.windows.Window>;
    /**
     * Creates (opens) a new browser with any optional sizing, position or default URL provided.
     * @param callback
     * Optional parameter window: Contains details about the created window.
     */
    export function create(callback: (window?: chrome.windows.Window) => void): void;
    /**
     * Creates (opens) a new browser with any optional sizing, position or default URL provided.
     * @param CreateData
     * @return The `create` method provides its result via callback or returned as a `Promise` (MV3 only). Contains details about the created window.
     */
    export function create(createData: CreateData): Promise<chrome.windows.Window>;
    /**
     * Creates (opens) a new browser with any optional sizing, position or default URL provided.
     * @param CreateData
     * @param callback
     * Optional parameter window: Contains details about the created window.
     */
    export function create(createData: CreateData, callback: (window?: chrome.windows.Window) => void): void;
    /**
     * Gets all windows.
     */
    export function getAll(callback: (windows: chrome.windows.Window[]) => void): void;
    /**
     * Gets all windows.
     * @return The `getAll` method provides its result via callback or returned as a `Promise` (MV3 only).
     */
    export function getAll(): Promise<chrome.windows.Window[]>;
    /**
     * Gets all windows.
     * @since Chrome 18.
     */
    export function getAll(queryOptions: QueryOptions, callback: (windows: chrome.windows.Window[]) => void): void;
    /**
     * Gets all windows.
     * @since Chrome 18.
     * @return The `getAll` method provides its result via callback or returned as a `Promise` (MV3 only).
     */
    export function getAll(queryOptions: QueryOptions): Promise<chrome.windows.Window[]>;
    /**
     * Updates the properties of a window. Specify only the properties that you want to change; unspecified properties will be left unchanged.
     * @return The `update` method provides its result via callback or returned as a `Promise` (MV3 only).
     */
    export function update(
        windowId: number,
        updateInfo: UpdateInfo,
    ): Promise<chrome.windows.Window>;
    /** Updates the properties of a window. Specify only the properties that you want to change; unspecified properties will be left unchanged. */
    export function update(
        windowId: number,
        updateInfo: UpdateInfo,
        callback: (window: chrome.windows.Window) => void,
    ): void;
    /**
     * Removes (closes) a window, and all the tabs inside it
     * @return The `remove` method provides its result via callback or returned as a `Promise` (MV3 only). It has no parameters.
     */
    export function remove(windowId: number): Promise<void>;
    /** Removes (closes) a window, and all the tabs inside it. */
    export function remove(windowId: number, callback: Function): void;
    /**
     * Gets the window that was most recently focused — typically the window 'on top'.
     */
    export function getLastFocused(callback: (window: chrome.windows.Window) => void): void;
    /**
     * Gets the window that was most recently focused — typically the window 'on top'.
     * @return The `getLastFocused` method provides its result via callback or returned as a `Promise` (MV3 only).
     */
    export function getLastFocused(): Promise<chrome.windows.Window>;
    /**
     * Gets the window that was most recently focused — typically the window 'on top'.
     * @since Chrome 18.
     */
    export function getLastFocused(queryOptions: QueryOptions, callback: (window: chrome.windows.Window) => void): void;
    /**
     * Gets the window that was most recently focused — typically the window 'on top'.
     * @since Chrome 18.
     * @return The `getLastFocused` method provides its result via callback or returned as a `Promise` (MV3 only).
     */
    export function getLastFocused(queryOptions: QueryOptions): Promise<chrome.windows.Window>;

    /** Fired when a window is removed (closed). */
    export var onRemoved: WindowIdEvent;
    /** Fired when a window is created. */
    export var onCreated: WindowReferenceEvent;
    /**
     * Fired when the currently focused window changes. Will be chrome.windows.WINDOW_ID_NONE if all chrome windows have lost focus.
     * Note: On some Linux window managers, WINDOW_ID_NONE will always be sent immediately preceding a switch from one chrome window to another.
     */
    export var onFocusChanged: WindowIdEvent;

    /**
     * Fired when a window has been resized; this event is only dispatched when the new bounds are committed, and not for in-progress changes.
     * @since Chrome 86.
     */
    export var onBoundsChanged: WindowReferenceEvent;
}

////////////////////
// Runtime
////////////////////
/**
 * Use the chrome.runtime API to retrieve the background page, return details about the manifest, and listen for and respond to events in the app or extension lifecycle. You can also use this API to convert the relative path of URLs to fully-qualified URLs.
 * @since Chrome 22
 */
declare namespace chrome.runtime {
    /** This will be defined during an API method callback if there was an error */
    export var lastError: LastError | undefined;
    /** The ID of the extension/app. */
    export var id: string;

    /** https://developer.chrome.com/docs/extensions/reference/runtime/#type-PlatformOs */
    export type PlatformOs = 'mac' | 'win' | 'android' | 'cros' | 'linux' | 'openbsd';
    /** https://developer.chrome.com/docs/extensions/reference/runtime/#type-PlatformArch */
    export type PlatformArch = 'arm' | 'arm64' | 'x86-32' | 'x86-64' | 'mips' | 'mips64';
    /** https://developer.chrome.com/docs/extensions/reference/runtime/#type-PlatformNaclArch */
    export type PlatformNaclArch = 'arm' | 'x86-32' | 'x86-64' | 'mips' | 'mips64';
    /** https://developer.chrome.com/docs/extensions/reference/runtime/#type-OnInstalledReason */
    export enum OnInstalledReason {
        INSTALL = 'install',
        UPDATE = 'update',
        CHROME_UPDATE = 'chrome_update',
        SHARED_MODULE_UPDATE = 'shared_module_update'
    }

    export interface LastError {
        /** Optional. Details about the error which occurred.  */
        message?: string | undefined;
    }

    export interface ConnectInfo {
        name?: string | undefined;
        includeTlsChannelId?: boolean | undefined;
    }

    export interface InstalledDetails {
        /**
         * The reason that this event is being dispatched.
         */
        reason: OnInstalledReason;
        /**
         * Optional.
         * Indicates the previous version of the extension, which has just been updated. This is present only if 'reason' is 'update'.
         */
        previousVersion?: string | undefined;
        /**
         * Optional.
         * Indicates the ID of the imported shared module extension which updated. This is present only if 'reason' is 'shared_module_update'.
         * @since Chrome 29.
         */
        id?: string | undefined;
    }

    export interface MessageOptions {
        /** Whether the TLS channel ID will be passed into onMessageExternal for processes that are listening for the connection event. */
        includeTlsChannelId?: boolean | undefined;
    }

    /**
     * An object containing information about the script context that sent a message or request.
     * @since Chrome 26.
     */
    export interface MessageSender {
        /** The ID of the extension or app that opened the connection, if any. */
        id?: string | undefined;
        /** The tabs.Tab which opened the connection, if any. This property will only be present when the connection was opened from a tab (including content scripts), and only if the receiver is an extension, not an app. */
        tab?: chrome.tabs.Tab | undefined;
        /** The name of the native application that opened the connection, if any.
         * @since Chrome 74
         */
        nativeApplication?: string | undefined;
        /**
         * The frame that opened the connection. 0 for top-level frames, positive for child frames. This will only be set when tab is set.
         * @since Chrome 41.
         */
        frameId?: number | undefined;
        /**
         * The URL of the page or frame that opened the connection. If the sender is in an iframe, it will be iframe's URL not the URL of the page which hosts it.
         * @since Chrome 28.
         */
        url?: string | undefined;
        /**
         * The TLS channel ID of the page or frame that opened the connection, if requested by the extension or app, and if available.
         * @since Chrome 32.
         */
        tlsChannelId?: string | undefined;
        /**
         * The origin of the page or frame that opened the connection. It can vary from the url property (e.g., about:blank) or can be opaque (e.g., sandboxed iframes). This is useful for identifying if the origin can be trusted if we can't immediately tell from the URL.
         * @since Chrome 80.
         */
        origin?: string | undefined;
        /**
         * The lifecycle the document that opened the connection is in at the time the port was created. Note that the lifecycle state of the document may have changed since port creation.
         * @since Chrome 106.
         */
        documentLifecycle?: DocumentLifecycle | undefined;
        /**
         * A UUID of the document that opened the connection.
         * @since Chrome 106.
         */
        documentId?: string | undefined;
    }

    /**
     * An object containing information about the current platform.
     * @since Chrome 36.
     */
    export interface PlatformInfo {
        /**
         * The operating system chrome is running on.
         */
        os: PlatformOs;
        /**
         * The machine's processor architecture.
         */
        arch: PlatformArch;
        /**
         * The native client architecture. This may be different from arch on some platforms.
         */
        nacl_arch: PlatformNaclArch;
    }

    /**
     * An object which allows two way communication with other pages.
     * @since Chrome 26.
     */
    export interface Port {
        postMessage: (message: any) => void;
        disconnect: () => void;
        /**
         * Optional.
         * This property will only be present on ports passed to onConnect/onConnectExternal listeners.
         */
        sender?: MessageSender | undefined;
        /** An object which allows the addition and removal of listeners for a Chrome event. */
        onDisconnect: PortDisconnectEvent;
        /** An object which allows the addition and removal of listeners for a Chrome event. */
        onMessage: PortMessageEvent;
        name: string;
    }

    export interface UpdateAvailableDetails {
        /** The version number of the available update. */
        version: string;
    }

    export interface UpdateCheckDetails {
        /** The version of the available update. */
        version: string;
    }

    /** Result of the update check. */
    export type RequestUpdateCheckStatus = 'throttled' | 'no_update' | 'update_available';

    /** Result of the update check. */
    export interface RequestUpdateCheckResult {
      /** The status of the update check. */
      status: RequestUpdateCheckStatus;
      /** The version of the available update. */
      version: string;
    }

    export interface PortDisconnectEvent extends chrome.events.Event<(port: Port) => void> { }

    export interface PortMessageEvent extends chrome.events.Event<(message: any, port: Port) => void> { }

    export interface ExtensionMessageEvent
        extends chrome.events.Event<
            (message: any, sender: MessageSender, sendResponse: (response?: any) => void) => void
        > { }

    export interface ExtensionConnectEvent extends chrome.events.Event<(port: Port) => void> { }

    export interface RuntimeInstalledEvent extends chrome.events.Event<(details: InstalledDetails) => void> { }

    export interface RuntimeEvent extends chrome.events.Event<() => void> { }

    export interface RuntimeRestartRequiredEvent extends chrome.events.Event<(reason: string) => void> { }

    export interface RuntimeUpdateAvailableEvent
        extends chrome.events.Event<(details: UpdateAvailableDetails) => void> { }

    export interface ManifestIcons {
        [size: number]: string;
    }

    export interface ManifestAction {
        default_icon?: ManifestIcons | undefined;
        default_title?: string | undefined;
        default_popup?: string | undefined;
    }

    // Source: https://developer.chrome.com/docs/extensions/mv3/declare_permissions/
    export type ManifestPermissions =
        | 'activeTab'
        | 'alarms'
        | 'background'
        | 'bookmarks'
        | 'browsingData'
        | 'certificateProvider'
        | 'clipboardRead'
        | 'clipboardWrite'
        | 'contentSettings'
        | 'contextMenus'
        | 'cookies'
        | 'debugger'
        | 'declarativeContent'
        | 'declarativeNetRequest'
        | 'declarativeNetRequestFeedback'
        | 'declarativeNetRequestWithHostAccess'
        | 'declarativeWebRequest'
        | 'desktopCapture'
        | 'documentScan'
        | 'downloads'
        | 'downloads.shelf'
        | 'downloads.ui'
        | 'enterprise.deviceAttributes'
        | 'enterprise.hardwarePlatform'
        | 'enterprise.networkingAttributes'
        | 'enterprise.platformKeys'
        | 'experimental'
        | 'favicon'
        | 'fileBrowserHandler'
        | 'fileSystemProvider'
        | 'fontSettings'
        | 'gcm'
        | 'geolocation'
        | 'history'
        | 'identity'
        | 'identity.email'
        | 'idle'
        | 'loginState'
        | 'management'
        | 'nativeMessaging'
        | 'notifications'
        | 'offscreen'
        | 'pageCapture'
        | 'platformKeys'
        | 'power'
        | 'printerProvider'
        | 'printing'
        | 'printingMetrics'
        | 'privacy'
        | 'processes'
        | 'proxy'
        | 'scripting'
        | 'search'
        | 'sessions'
        | 'sidePanel'
        | 'signedInDevices'
        | 'storage'
        | 'system.cpu'
        | 'system.display'
        | 'system.memory'
        | 'system.storage'
        | 'tabCapture'
        | 'tabGroups'
        | 'tabs'
        | 'topSites'
        | 'tts'
        | 'ttsEngine'
        | 'unlimitedStorage'
        | 'vpnProvider'
        | 'wallpaper'
        | 'webNavigation'
        | 'webRequest'
        | 'webRequestBlocking';

    export interface SearchProvider {
        name?: string | undefined;
        keyword?: string | undefined;
        favicon_url?: string | undefined;
        search_url: string;
        encoding?: string | undefined;
        suggest_url?: string | undefined;
        instant_url?: string | undefined;
        image_url?: string | undefined;
        search_url_post_params?: string | undefined;
        suggest_url_post_params?: string | undefined;
        instant_url_post_params?: string | undefined;
        image_url_post_params?: string | undefined;
        alternate_urls?: string[] | undefined;
        prepopulated_id?: number | undefined;
        is_default?: boolean | undefined;
    }

    export interface ManifestBase {
        // Required
        manifest_version: number;
        name: string;
        version: string;

        // Recommended
        default_locale?: string | undefined;
        description?: string | undefined;
        icons?: ManifestIcons | undefined;

        // Optional
        author?: string | undefined;
        background_page?: string | undefined;
        chrome_settings_overrides?: {
            homepage?: string | undefined;
            search_provider?: SearchProvider | undefined;
            startup_pages?: string[] | undefined;
        } | undefined;
        chrome_ui_overrides?: {
            bookmarks_ui?: {
                remove_bookmark_shortcut?: boolean | undefined;
                remove_button?: boolean | undefined;
            } | undefined;
        } | undefined;
        chrome_url_overrides?: {
            bookmarks?: string | undefined;
            history?: string | undefined;
            newtab?: string | undefined;
        } | undefined;
        commands?: {
            [name: string]: {
                suggested_key?: {
                    default?: string | undefined;
                    windows?: string | undefined;
                    mac?: string | undefined;
                    chromeos?: string | undefined;
                    linux?: string | undefined;
                } | undefined;
                description?: string | undefined;
                global?: boolean | undefined;
            };
        } | undefined;
        content_capabilities?: {
            matches?: string[] | undefined;
            permissions?: string[] | undefined;
        } | undefined;
        content_scripts?: {
            matches?: string[] | undefined;
            exclude_matches?: string[] | undefined;
            css?: string[] | undefined;
            js?: string[] | undefined;
            run_at?: string | undefined;
            all_frames?: boolean | undefined;
            match_about_blank?: boolean | undefined;
            include_globs?: string[] | undefined;
            exclude_globs?: string[] | undefined;
        }[] | undefined;
        converted_from_user_script?: boolean | undefined;
        current_locale?: string | undefined;
        devtools_page?: string | undefined;
        event_rules?: {
            event?: string | undefined;
            actions?: {
                type: string;
            }[] | undefined;
            conditions?: chrome.declarativeContent.PageStateMatcherProperties[] | undefined;
        }[] | undefined;
        externally_connectable?: {
            ids?: string[] | undefined;
            matches?: string[] | undefined;
            accepts_tls_channel_id?: boolean | undefined;
        } | undefined;
        file_browser_handlers?: {
            id?: string | undefined;
            default_title?: string | undefined;
            file_filters?: string[] | undefined;
        }[] | undefined;
        file_system_provider_capabilities?: {
            configurable?: boolean | undefined;
            watchable?: boolean | undefined;
            multiple_mounts?: boolean | undefined;
            source?: string | undefined;
        } | undefined;
        homepage_url?: string | undefined;
        import?: {
            id: string;
            minimum_version?: string | undefined;
        }[] | undefined;
        export?: {
            whitelist?: string[] | undefined;
        } | undefined;
        incognito?: string | undefined;
        input_components?: {
            name?: string | undefined;
            type?: string | undefined;
            id?: string | undefined;
            description?: string | undefined;
            language?: string[] | string | undefined;
            layouts?: string[] | undefined;
            indicator?: string | undefined;
        }[] | undefined;
        key?: string | undefined;
        minimum_chrome_version?: string | undefined;
        nacl_modules?: {
            path: string;
            mime_type: string;
        }[] | undefined;
        oauth2?: {
            client_id: string;
            scopes?: string[] | undefined;
        } | undefined;
        offline_enabled?: boolean | undefined;
        omnibox?: {
            keyword: string;
        } | undefined;
        options_page?: string | undefined;
        options_ui?: {
            page?: string | undefined;
            chrome_style?: boolean | undefined;
            open_in_tab?: boolean | undefined;
        } | undefined;
        platforms?: {
            nacl_arch?: string | undefined;
            sub_package_path: string;
        }[] | undefined;
        plugins?: {
            path: string;
        }[] | undefined;
        requirements?: {
            '3D'?: {
                features?: string[] | undefined;
            } | undefined;
            plugins?: {
                npapi?: boolean | undefined;
            } | undefined;
        } | undefined;
        sandbox?: {
            pages: string[];
            content_security_policy?: string | undefined;
        } | undefined;
        short_name?: string | undefined;
        spellcheck?: {
            dictionary_language?: string | undefined;
            dictionary_locale?: string | undefined;
            dictionary_format?: string | undefined;
            dictionary_path?: string | undefined;
        } | undefined;
        storage?: {
            managed_schema: string;
        } | undefined;
        tts_engine?: {
            voices: {
                voice_name: string;
                lang?: string | undefined;
                gender?: string | undefined;
                event_types?: string[] | undefined;
            }[];
        } | undefined;
        update_url?: string | undefined;
        version_name?: string | undefined;
        [key: string]: any;
    }

    export interface ManifestV2 extends ManifestBase {
        // Required
        manifest_version: 2;

        // Pick one (or none)
        browser_action?: ManifestAction | undefined;
        page_action?: ManifestAction | undefined;

        // Optional
        background?:
        | {
            scripts?: string[] | undefined;
            page?: string | undefined;
            persistent?: boolean | undefined;
        }
        | undefined;
        content_security_policy?: string | undefined;
        optional_permissions?: string[] | undefined;
        permissions?: string[] | undefined;
        web_accessible_resources?: string[] | undefined;
    }

    export interface ManifestV3 extends ManifestBase {
        // Required
        manifest_version: 3;

        // Optional
        action?: ManifestAction | undefined;
        background?:
        | {
            service_worker: string;
            type?: 'module'; // If the service worker uses ES modules
        }
        | undefined;
        content_security_policy?: {
            extension_pages?: string;
            sandbox?: string;
        };
        host_permissions?: string[] | undefined;
        optional_permissions?: ManifestPermissions[] | undefined;
        permissions?: ManifestPermissions[] | undefined;
        web_accessible_resources?: { resources: string[]; matches: string[] }[] | undefined;
    }

    export type Manifest = ManifestV2 | ManifestV3

    /**
     * Attempts to connect to connect listeners within an extension/app (such as the background page), or other extensions/apps. This is useful for content scripts connecting to their extension processes, inter-app/extension communication, and web messaging. Note that this does not connect to any listeners in a content script. Extensions may connect to content scripts embedded in tabs via tabs.connect.
     * @since Chrome 26.
     */
    export function connect(connectInfo?: ConnectInfo): Port;
    /**
     * Attempts to connect to connect listeners within an extension/app (such as the background page), or other extensions/apps. This is useful for content scripts connecting to their extension processes, inter-app/extension communication, and web messaging. Note that this does not connect to any listeners in a content script. Extensions may connect to content scripts embedded in tabs via tabs.connect.
     * @since Chrome 26.
     * @param extensionId Optional.
     * The ID of the extension or app to connect to. If omitted, a connection will be attempted with your own extension. Required if sending messages from a web page for web messaging.
     */
    export function connect(extensionId: string, connectInfo?: ConnectInfo): Port;
    /**
     * Connects to a native application in the host machine.
     * @since Chrome 28.
     * @param application The name of the registered application to connect to.
     */
    export function connectNative(application: string): Port;
    /** Retrieves the JavaScript 'window' object for the background page running inside the current extension/app. If the background page is an event page, the system will ensure it is loaded before calling the callback. If there is no background page, an error is set. */
    export function getBackgroundPage(callback: (backgroundPage?: Window) => void): void;
    /**
     * Returns details about the app or extension from the manifest. The object returned is a serialization of the full manifest file.
     * @return The manifest details.
     */
    export function getManifest(): Manifest;
    /**
     * Returns a DirectoryEntry for the package directory.
     * @since Chrome 29.
     */
    export function getPackageDirectoryEntry(callback: (directoryEntry: DirectoryEntry) => void): void;
    /**
     * Returns information about the current platform.
     * @since Chrome 29.
     * @param callback Called with results
     */
    export function getPlatformInfo(callback: (platformInfo: PlatformInfo) => void): void;
    /**
     * Returns information about the current platform.
     * @since Chrome 29.
     * @return The `getPlatformInfo` method provides its result via callback or returned as a `Promise` (MV3 only).
     */
    export function getPlatformInfo(): Promise<PlatformInfo>;
    /**
     * Converts a relative path within an app/extension install directory to a fully-qualified URL.
     * @param path A path to a resource within an app/extension expressed relative to its install directory.
     */
    export function getURL(path: string): string;
    /**
     * Reloads the app or extension.
     * @since Chrome 25.
     */
    export function reload(): void;
    /**
     * Requests an update check for this app/extension.
     * @since Chrome 109
     * @return This only returns a Promise when the callback parameter is not specified, and with MV3+.
     */
    export function requestUpdateCheck(): Promise<RequestUpdateCheckResult>;
    /**
     * Requests an update check for this app/extension.
     * @since Chrome 25.
     * @param callback
     * Parameter status: Result of the update check. One of: "throttled", "no_update", or "update_available"
     * Optional parameter details: If an update is available, this contains more information about the available update.
     */
    export function requestUpdateCheck(
        callback: (status: RequestUpdateCheckStatus, details?: UpdateCheckDetails) => void,
    ): void;
    /**
     * Restart the ChromeOS device when the app runs in kiosk mode. Otherwise, it's no-op.
     * @since Chrome 32.
     */
    export function restart(): void;
    /**
     * Restart the ChromeOS device when the app runs in kiosk mode after the
     * given seconds. If called again before the time ends, the reboot will
     * be delayed. If called with a value of -1, the reboot will be
     * cancelled. It's a no-op in non-kiosk mode. It's only allowed to be
     * called repeatedly by the first extension to invoke this API.
     * @since Chrome 53.
     * @param seconds
     * @param callback
     */
    export function restartAfterDelay(seconds: number, callback?: () => void): void;
    /**
     * Sends a single message to event listeners within your extension/app or a different extension/app. Similar to runtime.connect but only sends a single message, with an optional response. If sending to your extension, the runtime.onMessage event will be fired in each page, or runtime.onMessageExternal, if a different extension. Note that extensions cannot send messages to content scripts using this method. To send messages to content scripts, use tabs.sendMessage.
     * @since Chrome 26.
     * Parameter response: The JSON response object sent by the handler of the message. If an error occurs while connecting to the extension, the callback will be called with no arguments and runtime.lastError will be set to the error message.
     */
    export function sendMessage<M = any, R = any>(message: M, responseCallback: (response: R) => void): void;
    /**
     * Sends a single message to event listeners within your extension/app or a different extension/app. Similar to runtime.connect but only sends a single message, with an optional response. If sending to your extension, the runtime.onMessage event will be fired in each page, or runtime.onMessageExternal, if a different extension. Note that extensions cannot send messages to content scripts using this method. To send messages to content scripts, use tabs.sendMessage.
     * @since Chrome 32.
     * Parameter response: The JSON response object sent by the handler of the message. If an error occurs while connecting to the extension, the callback will be called with no arguments and runtime.lastError will be set to the error message.
     */
    export function sendMessage<M = any, R = any>(
        message: M,
        options: MessageOptions,
        responseCallback: (response: R) => void,
    ): void;
    /**
     * Sends a single message to event listeners within your extension/app or a different extension/app. Similar to runtime.connect but only sends a single message, with an optional response. If sending to your extension, the runtime.onMessage event will be fired in each page, or runtime.onMessageExternal, if a different extension. Note that extensions cannot send messages to content scripts using this method. To send messages to content scripts, use tabs.sendMessage.
     * @since Chrome 26.
     * @param extensionId The ID of the extension/app to send the message to. If omitted, the message will be sent to your own extension/app. Required if sending messages from a web page for web messaging.
     * Parameter response: The JSON response object sent by the handler of the message. If an error occurs while connecting to the extension, the callback will be called with no arguments and runtime.lastError will be set to the error message.
     */
    export function sendMessage<M = any, R = any>(extensionId: string | undefined | null, message: M, responseCallback: (response: R) => void): void;
    /**
     * Sends a single message to event listeners within your extension/app or a different extension/app. Similar to runtime.connect but only sends a single message, with an optional response. If sending to your extension, the runtime.onMessage event will be fired in each page, or runtime.onMessageExternal, if a different extension. Note that extensions cannot send messages to content scripts using this method. To send messages to content scripts, use tabs.sendMessage.
     * @since Chrome 32.
     * @param extensionId The ID of the extension/app to send the message to. If omitted, the message will be sent to your own extension/app. Required if sending messages from a web page for web messaging.
     * Parameter response: The JSON response object sent by the handler of the message. If an error occurs while connecting to the extension, the callback will be called with no arguments and runtime.lastError will be set to the error message.
     */
    export function sendMessage<Message = any, Response = any>(
        extensionId: string | undefined | null,
        message: Message,
        options: MessageOptions,
        responseCallback: (response: Response) => void,
    ): void;
    /**
     * Sends a single message to event listeners within your extension/app or a different extension/app. Similar to runtime.connect but only sends a single message, with an optional response. If sending to your extension, the runtime.onMessage event will be fired in each page, or runtime.onMessageExternal, if a different extension. Note that extensions cannot send messages to content scripts using this method. To send messages to content scripts, use tabs.sendMessage.
     * @since Chrome 26.
     */
    export function sendMessage<M = any, R = any>(message: M): Promise<R>;
    /**
     * Sends a single message to event listeners within your extension/app or a different extension/app. Similar to runtime.connect but only sends a single message, with an optional response. If sending to your extension, the runtime.onMessage event will be fired in each page, or runtime.onMessageExternal, if a different extension. Note that extensions cannot send messages to content scripts using this method. To send messages to content scripts, use tabs.sendMessage.
     * @since Chrome 32.
     */
    export function sendMessage<M = any, R = any>(
        message: M,
        options: MessageOptions,
    ): Promise<R>;
    /**
     * Sends a single message to event listeners within your extension/app or a different extension/app. Similar to runtime.connect but only sends a single message, with an optional response. If sending to your extension, the runtime.onMessage event will be fired in each page, or runtime.onMessageExternal, if a different extension. Note that extensions cannot send messages to content scripts using this method. To send messages to content scripts, use tabs.sendMessage.
     * @since Chrome 26.
     * @param extensionId The ID of the extension/app to send the message to. If omitted, the message will be sent to your own extension/app. Required if sending messages from a web page for web messaging.
     */
    export function sendMessage<M = any, R = any>(extensionId: string | undefined | null, message: M): Promise<R>;
    /**
     * Sends a single message to event listeners within your extension/app or a different extension/app. Similar to runtime.connect but only sends a single message, with an optional response. If sending to your extension, the runtime.onMessage event will be fired in each page, or runtime.onMessageExternal, if a different extension. Note that extensions cannot send messages to content scripts using this method. To send messages to content scripts, use tabs.sendMessage.
     * @since Chrome 32.
     * @param extensionId The ID of the extension/app to send the message to. If omitted, the message will be sent to your own extension/app. Required if sending messages from a web page for web messaging.
     */
    export function sendMessage<Message = any, Response = any>(
        extensionId: string | undefined | null,
        message: Message,
        options: MessageOptions,
    ): Promise<Response>;
    /**
     * Send a single message to a native application.
     * @since Chrome 28.
     * @param application The of the native messaging host.
     * @param message The message that will be passed to the native messaging host.
     * Parameter response: The response message sent by the native messaging host. If an error occurs while connecting to the native messaging host, the callback will be called with no arguments and runtime.lastError will be set to the error message.
     */
    export function sendNativeMessage(
        application: string,
        message: Object,
        responseCallback: (response: any) => void,
    ): void;
    /**
     * Send a single message to a native application.
     * @since Chrome 28.
     * @param application The of the native messaging host.
     * @param message The message that will be passed to the native messaging host.
     */
    export function sendNativeMessage(
        application: string,
        message: Object,
    ): Promise<any>;
    /**
     * Sets the URL to be visited upon uninstallation. This may be used to clean up server-side data, do analytics, and implement surveys. Maximum 255 characters.
     * @since Chrome 41.
     * @param url Since Chrome 34.
     * URL to be opened after the extension is uninstalled. This URL must have an http: or https: scheme. Set an empty string to not open a new tab upon uninstallation.
     * @param callback Called when the uninstall URL is set. If the given URL is invalid, runtime.lastError will be set.
     */
    export function setUninstallURL(url: string, callback?: () => void): void;
    /**
     * Open your Extension's options page, if possible.
     * The precise behavior may depend on your manifest's options_ui or options_page key, or what Chrome happens to support at the time. For example, the page may be opened in a new tab, within chrome://extensions, within an App, or it may just focus an open options page. It will never cause the caller page to reload.
     * If your Extension does not declare an options page, or Chrome failed to create one for some other reason, the callback will set lastError.
     * @since Chrome 42.
     */
    export function openOptionsPage(callback?: () => void): void;

    /**
     * Fired when a connection is made from either an extension process or a content script.
     * @since Chrome 26.
     */
    export var onConnect: ExtensionConnectEvent;
    /**
     * Fired when a connection is made from another extension.
     * @since Chrome 26.
     */
    export var onConnectExternal: ExtensionConnectEvent;
    /** Sent to the event page just before it is unloaded. This gives the extension opportunity to do some clean up. Note that since the page is unloading, any asynchronous operations started while handling this event are not guaranteed to complete. If more activity for the event page occurs before it gets unloaded the onSuspendCanceled event will be sent and the page won't be unloaded. */
    export var onSuspend: RuntimeEvent;
    /**
     * Fired when a profile that has this extension installed first starts up. This event is not fired when an incognito profile is started, even if this extension is operating in 'split' incognito mode.
     * @since Chrome 23.
     */
    export var onStartup: RuntimeEvent;
    /** Fired when the extension is first installed, when the extension is updated to a new version, and when Chrome is updated to a new version. */
    export var onInstalled: RuntimeInstalledEvent;
    /** Sent after onSuspend to indicate that the app won't be unloaded after all. */
    export var onSuspendCanceled: RuntimeEvent;
    /**
     * Fired when a message is sent from either an extension process or a content script.
     * @since Chrome 26.
     */
    export var onMessage: ExtensionMessageEvent;
    /**
     * Fired when a message is sent from another extension/app. Cannot be used in a content script.
     * @since Chrome 26.
     */
    export var onMessageExternal: ExtensionMessageEvent;
    /**
     * Fired when an app or the device that it runs on needs to be restarted. The app should close all its windows at its earliest convenient time to let the restart to happen. If the app does nothing, a restart will be enforced after a 24-hour grace period has passed. Currently, this event is only fired for Chrome OS kiosk apps.
     * @since Chrome 29.
     */
    export var onRestartRequired: RuntimeRestartRequiredEvent;
    /**
     * Fired when an update is available, but isn't installed immediately because the app is currently running. If you do nothing, the update will be installed the next time the background page gets unloaded, if you want it to be installed sooner you can explicitly call chrome.runtime.reload(). If your extension is using a persistent background page, the background page of course never gets unloaded, so unless you call chrome.runtime.reload() manually in response to this event the update will not get installed until the next time chrome itself restarts. If no handlers are listening for this event, and your extension has a persistent background page, it behaves as if chrome.runtime.reload() is called in response to this event.
     * @since Chrome 25.
     */
    export var onUpdateAvailable: RuntimeUpdateAvailableEvent;
    /**
     * @deprecated since Chrome 33. Please use chrome.runtime.onRestartRequired.
     * Fired when a Chrome update is available, but isn't installed immediately because a browser restart is required.
     */
    export var onBrowserUpdateAvailable: RuntimeEvent;
}

interface DirectoryEntry {
    /** `true` if the entry names a subdirectory, otherwise `false`. */
    isDirectory: boolean;

    /** Path of the file or subdirectory, relative to the directory being enumerated. */
    fileName: string;

    /** Full SphereFS path to the file or subdirectory. */
    fullPath: string;
}

////////////////////
// Declarative Content
////////////////////
/**
 * Use the chrome.declarativeContent API to take actions depending on the content of a page, without requiring permission to read the page's content.
 * Availability: Since Chrome 33.
 * Permissions:  "declarativeContent"
 */
declare namespace chrome.declarativeContent {
    export interface PageStateUrlDetails {
        /** Optional. Matches if the host name of the URL contains a specified string. To test whether a host name component has a prefix 'foo', use hostContains: '.foo'. This matches 'www.foobar.com' and 'foo.com', because an implicit dot is added at the beginning of the host name. Similarly, hostContains can be used to match against component suffix ('foo.') and to exactly match against components ('.foo.'). Suffix- and exact-matching for the last components need to be done separately using hostSuffix, because no implicit dot is added at the end of the host name.  */
        hostContains?: string | undefined;
        /** Optional. Matches if the host name of the URL is equal to a specified string.  */
        hostEquals?: string | undefined;
        /** Optional. Matches if the host name of the URL starts with a specified string.  */
        hostPrefix?: string | undefined;
        /** Optional. Matches if the host name of the URL ends with a specified string.  */
        hostSuffix?: string | undefined;
        /** Optional. Matches if the path segment of the URL contains a specified string.  */
        pathContains?: string | undefined;
        /** Optional. Matches if the path segment of the URL is equal to a specified string.  */
        pathEquals?: string | undefined;
        /** Optional. Matches if the path segment of the URL starts with a specified string.  */
        pathPrefix?: string | undefined;
        /** Optional. Matches if the path segment of the URL ends with a specified string.  */
        pathSuffix?: string | undefined;
        /** Optional. Matches if the query segment of the URL contains a specified string.  */
        queryContains?: string | undefined;
        /** Optional. Matches if the query segment of the URL is equal to a specified string.  */
        queryEquals?: string | undefined;
        /** Optional. Matches if the query segment of the URL starts with a specified string.  */
        queryPrefix?: string | undefined;
        /** Optional. Matches if the query segment of the URL ends with a specified string.  */
        querySuffix?: string | undefined;
        /** Optional. Matches if the URL (without fragment identifier) contains a specified string. Port numbers are stripped from the URL if they match the default port number.  */
        urlContains?: string | undefined;
        /** Optional. Matches if the URL (without fragment identifier) is equal to a specified string. Port numbers are stripped from the URL if they match the default port number.  */
        urlEquals?: string | undefined;
        /** Optional. Matches if the URL (without fragment identifier) matches a specified regular expression. Port numbers are stripped from the URL if they match the default port number. The regular expressions use the RE2 syntax.  */
        urlMatches?: string | undefined;
        /** Optional. Matches if the URL without query segment and fragment identifier matches a specified regular expression. Port numbers are stripped from the URL if they match the default port number. The regular expressions use the RE2 syntax.  */
        originAndPathMatches?: string | undefined;
        /** Optional. Matches if the URL (without fragment identifier) starts with a specified string. Port numbers are stripped from the URL if they match the default port number.  */
        urlPrefix?: string | undefined;
        /** Optional. Matches if the URL (without fragment identifier) ends with a specified string. Port numbers are stripped from the URL if they match the default port number.  */
        urlSuffix?: string | undefined;
        /** Optional. Matches if the scheme of the URL is equal to any of the schemes specified in the array.  */
        schemes?: string[] | undefined;
        /** Optional. Matches if the port of the URL is contained in any of the specified port lists. For example [80, 443, [1000, 1200]] matches all requests on port 80, 443 and in the range 1000-1200.  */
        ports?: (number | number[])[] | undefined;
    }

    export class PageStateMatcherProperties {
        /** Optional. Filters URLs for various criteria. See event filtering. All criteria are case sensitive.  */
        pageUrl?: PageStateUrlDetails | undefined;
        /** Optional. Matches if all of the CSS selectors in the array match displayed elements in a frame with the same origin as the page's main frame. All selectors in this array must be compound selectors to speed up matching. Note that listing hundreds of CSS selectors or CSS selectors that match hundreds of times per page can still slow down web sites.  */
        css?: string[] | undefined;
        /**
         * Optional.
         * Since Chrome 45. Warning: this is the current Beta channel. More information available on the API documentation pages.
         * Matches if the bookmarked state of the page is equal to the specified value. Requires the bookmarks permission.
         */
        isBookmarked?: boolean | undefined;
    }

    /** Matches the state of a web page by various criteria. */
    export class PageStateMatcher {
        constructor(options: PageStateMatcherProperties);
    }

    /**
     * Declarative event action that enables the extension's action while the corresponding conditions are met.
     * Manifest v3.
     */
    export class ShowAction { }

    /**
     * Declarative event action that shows the extension's page action while the corresponding conditions are met.
     * Manifest v2.
     */
    export class ShowPageAction { }

    /** Declarative event action that changes the icon of the page action while the corresponding conditions are met. */
    export class SetIcon {
        constructor(options?: { imageData?: ImageData | { [size: string]: ImageData } | undefined });
    }

    /** Provides the Declarative Event API consisting of addRules, removeRules, and getRules. */
    export interface PageChangedEvent extends chrome.events.Event<() => void> { }

    export var onPageChanged: PageChangedEvent;
}

/**
 * Use the chrome.webRequest API to observe and analyze traffic and to intercept, block, or modify requests in-flight.
 * Permissions:  "webRequest", host permissions
 * @since Chrome 17.
 */
declare namespace chrome.webRequest {
    /** How the requested resource will be used. */
    export type ResourceType =
        | 'main_frame'
        | 'sub_frame'
        | 'stylesheet'
        | 'script'
        | 'image'
        | 'font'
        | 'object'
        | 'xmlhttprequest'
        | 'ping'
        | 'csp_report'
        | 'media'
        | 'websocket'
        | 'other';

    export interface AuthCredentials {
        username: string;
        password: string;
    }

    /** An HTTP Header, represented as an object containing a key and either a value or a binaryValue. */
    export interface HttpHeader {
        name: string;
        value?: string | undefined;
        binaryValue?: ArrayBuffer | undefined;
    }

    /** Returns value for event handlers that have the 'blocking' extraInfoSpec applied. Allows the event handler to modify network requests. */
    export interface BlockingResponse {
        /** Optional. If true, the request is cancelled. Used in onBeforeRequest, this prevents the request from being sent. */
        cancel?: boolean | undefined;
        /**
         * Optional.
         * Only used as a response to the onBeforeRequest and onHeadersReceived events. If set, the original request is prevented from being sent/completed and is instead redirected to the given URL. Redirections to non-HTTP schemes such as data: are allowed. Redirects initiated by a redirect action use the original request method for the redirect, with one exception: If the redirect is initiated at the onHeadersReceived stage, then the redirect will be issued using the GET method.
         */
        redirectUrl?: string | undefined;
        /**
         * Optional.
         * Only used as a response to the onHeadersReceived event. If set, the server is assumed to have responded with these response headers instead. Only return responseHeaders if you really want to modify the headers in order to limit the number of conflicts (only one extension may modify responseHeaders for each request).
         */
        responseHeaders?: HttpHeader[] | undefined;
        /** Optional. Only used as a response to the onAuthRequired event. If set, the request is made using the supplied credentials. */
        authCredentials?: AuthCredentials | undefined;
        /**
         * Optional.
         * Only used as a response to the onBeforeSendHeaders event. If set, the request is made with these request headers instead.
         */
        requestHeaders?: HttpHeader[] | undefined;
    }

    /** An object describing filters to apply to webRequest events. */
    export interface RequestFilter {
        /** Optional. */
        tabId?: number | undefined;
        /**
         * A list of request types. Requests that cannot match any of the types will be filtered out.
         */
        types?: ResourceType[] | undefined;
        /** A list of URLs or URL patterns. Requests that cannot match any of the URLs will be filtered out. */
        urls: string[];

        /** Optional. */
        windowId?: number | undefined;
    }

    /**
     * Contains data uploaded in a URL request.
     * @since Chrome 23.
     */
    export interface UploadData {
        /** Optional. An ArrayBuffer with a copy of the data. */
        bytes?: ArrayBuffer | undefined;
        /** Optional. A string with the file's path and name. */
        file?: string | undefined;
    }

    export interface WebRequestBody {
        /** Optional. Errors when obtaining request body data. */
        error?: string | undefined;
        /**
         * Optional.
         * If the request method is POST and the body is a sequence of key-value pairs encoded in UTF8, encoded as either multipart/form-data, or application/x-www-form-urlencoded, this dictionary is present and for each key contains the list of all values for that key. If the data is of another media type, or if it is malformed, the dictionary is not present. An example value of this dictionary is {'key': ['value1', 'value2']}.
         */
        formData?: { [key: string]: string[] } | undefined;
        /**
         * Optional.
         * If the request method is PUT or POST, and the body is not already parsed in formData, then the unparsed request body elements are contained in this array.
         */
        raw?: UploadData[] | undefined;
    }

    export interface WebAuthChallenger {
        host: string;
        port: number;
    }

    export interface ResourceRequest {
        url: string;
        /** The ID of the request. Request IDs are unique within a browser session. As a result, they could be used to relate different events of the same request. */
        requestId: string;
        /** The value 0 indicates that the request happens in the main frame; a positive value indicates the ID of a subframe in which the request happens. If the document of a (sub-)frame is loaded (type is main_frame or sub_frame), frameId indicates the ID of this frame, not the ID of the outer frame. Frame IDs are unique within a tab. */
        frameId: number;
        /** ID of frame that wraps the frame which sent the request. Set to -1 if no parent frame exists. */
        parentFrameId: number;
        /** The ID of the tab in which the request takes place. Set to -1 if the request isn't related to a tab. */
        tabId: number;
        /**
         * How the requested resource will be used.
         */
        type: ResourceType;
        /** The time when this signal is triggered, in milliseconds since the epoch. */
        timeStamp: number;
        /** The origin where the request was initiated. This does not change through redirects. If this is an opaque origin, the string 'null' will be used.
         * @since Since Chrome 63.
         */
        initiator?: string | undefined;
    }

    export interface WebRequestDetails extends ResourceRequest {
        /** Standard HTTP method. */
        method: string;
    }

    export interface WebRequestHeadersDetails extends WebRequestDetails {
        /** Optional. The HTTP request headers that are going to be sent out with this request. */
        requestHeaders?: HttpHeader[] | undefined;
        documentId: string;
        documentLifecycle: DocumentLifecycle;
        frameType: FrameType;
        frameId: number;
        initiator?: string | undefined;
        parentDocumentId?: string | undefined;
        parentFrameId: number;
        requestId: string;
        tabId: number;
        timeStamp: number;
        type: ResourceType;
        url: string;
    }

    export interface WebRequestBodyDetails extends WebRequestDetails {
        /**
         * Contains the HTTP request body data. Only provided if extraInfoSpec contains 'requestBody'.
         * @since Chrome 23.
         */
        requestBody: WebRequestBody | null;
    }

    export interface WebRequestFullDetails extends WebRequestHeadersDetails, WebRequestBodyDetails { }

    export interface WebResponseDetails extends ResourceRequest {
        /** HTTP status line of the response or the 'HTTP/0.9 200 OK' string for HTTP/0.9 responses (i.e., responses that lack a status line). */
        statusLine: string;
        /**
         * Standard HTTP status code returned by the server.
         * @since Chrome 43.
         */
        statusCode: number;
    }

    export interface WebResponseHeadersDetails extends WebResponseDetails {
        /** Optional. The HTTP response headers that have been received with this response. */
        responseHeaders?: HttpHeader[] | undefined;
        method: string /** standard HTTP method i.e. GET, POST, PUT, etc. */;
    }

    export interface WebResponseCacheDetails extends WebResponseHeadersDetails {
        /**
         * Optional.
         * The server IP address that the request was actually sent to. Note that it may be a literal IPv6 address.
         */
        ip?: string | undefined;
        /** Indicates if this response was fetched from disk cache. */
        fromCache: boolean;
    }

    export interface WebRedirectionResponseDetails extends WebResponseCacheDetails {
        /** The new URL. */
        redirectUrl: string;
    }

    export interface WebAuthenticationChallengeDetails extends WebResponseHeadersDetails {
        /** The authentication scheme, e.g. Basic or Digest. */
        scheme: string;
        /** The authentication realm provided by the server, if there is one. */
        realm?: string | undefined;
        /** The server requesting authentication. */
        challenger: WebAuthChallenger;
        /** True for Proxy-Authenticate, false for WWW-Authenticate. */
        isProxy: boolean;
    }

    export interface WebResponseErrorDetails extends WebResponseCacheDetails {
        /** The error description. This string is not guaranteed to remain backwards compatible between releases. You must not parse and act based upon its content. */
        error: string;
    }

    export interface WebRequestBodyEvent
        extends chrome.events.EventWithRequiredFilterInAddListener<(details: WebRequestBodyDetails) => BlockingResponse | void> {
        addListener(
            callback: (details: WebRequestBodyDetails) => BlockingResponse | void,
            filter: RequestFilter,
            opt_extraInfoSpec?: string[],
        ): void;
    }

    export interface WebRequestHeadersSynchronousEvent
        extends chrome.events.EventWithRequiredFilterInAddListener<(details: WebRequestHeadersDetails) => BlockingResponse | void> {
        addListener(
            callback: (details: WebRequestHeadersDetails) => BlockingResponse | void,
            filter: RequestFilter,
            opt_extraInfoSpec?: string[],
        ): void;
    }

    export interface WebRequestHeadersEvent
        extends chrome.events.EventWithRequiredFilterInAddListener<(details: WebRequestHeadersDetails) => void> {
        addListener(
            callback: (details: WebRequestHeadersDetails) => void,
            filter: RequestFilter,
            opt_extraInfoSpec?: string[],
        ): void;
    }

    export interface _WebResponseHeadersEvent<T extends WebResponseHeadersDetails>
        extends chrome.events.EventWithRequiredFilterInAddListener<(details: T) => void> {
        addListener(callback: (details: T) => void, filter: RequestFilter, opt_extraInfoSpec?: string[]): void;
    }

    export interface WebResponseHeadersEvent
        extends chrome.events.EventWithRequiredFilterInAddListener<(details: WebResponseHeadersDetails) => BlockingResponse | void> {
        addListener(
            callback: (details: WebResponseHeadersDetails) => BlockingResponse | void,
            filter: RequestFilter,
            opt_extraInfoSpec?: string[],
        ): void;
    }

    export interface WebResponseCacheEvent extends _WebResponseHeadersEvent<WebResponseCacheDetails> { }

    export interface WebRedirectionResponseEvent extends _WebResponseHeadersEvent<WebRedirectionResponseDetails> { }

    export interface WebAuthenticationChallengeEvent
        extends chrome.events.EventWithRequiredFilterInAddListener<
            (details: WebAuthenticationChallengeDetails, callback?: (response: BlockingResponse) => void) => void
        > {
        addListener(
            callback: (
                details: WebAuthenticationChallengeDetails,
                callback?: (response: BlockingResponse) => void,
            ) => void,
            filter: RequestFilter,
            opt_extraInfoSpec?: string[],
        ): void;
    }

    export interface WebResponseErrorEvent extends _WebResponseHeadersEvent<WebResponseErrorDetails> { }

    /**
     * The maximum number of times that handlerBehaviorChanged can be called per 10 minute sustained interval. handlerBehaviorChanged is an expensive function call that shouldn't be called often.
     * @since Chrome 23.
     */
    export var MAX_HANDLER_BEHAVIOR_CHANGED_CALLS_PER_10_MINUTES: number;

    /** Needs to be called when the behavior of the webRequest handlers has changed to prevent incorrect handling due to caching. This function call is expensive. Don't call it often. */
    export function handlerBehaviorChanged(callback?: Function): void;

    /** Fired when a request is about to occur. */
    export var onBeforeRequest: WebRequestBodyEvent;
    /** Fired before sending an HTTP request, once the request headers are available. This may occur after a TCP connection is made to the server, but before any HTTP data is sent. */
    export var onBeforeSendHeaders: WebRequestHeadersSynchronousEvent;
    /** Fired just before a request is going to be sent to the server (modifications of previous onBeforeSendHeaders callbacks are visible by the time onSendHeaders is fired). */
    export var onSendHeaders: WebRequestHeadersEvent;
    /** Fired when HTTP response headers of a request have been received. */
    export var onHeadersReceived: WebResponseHeadersEvent;
    /** Fired when an authentication failure is received. The listener has three options: it can provide authentication credentials, it can cancel the request and display the error page, or it can take no action on the challenge. If bad user credentials are provided, this may be called multiple times for the same request. */
    export var onAuthRequired: WebAuthenticationChallengeEvent;
    /** Fired when the first byte of the response body is received. For HTTP requests, this means that the status line and response headers are available. */
    export var onResponseStarted: WebResponseCacheEvent;
    /** Fired when a server-initiated redirect is about to occur. */
    export var onBeforeRedirect: WebRedirectionResponseEvent;
    /** Fired when a request is completed. */
    export var onCompleted: WebResponseCacheEvent;
    /** Fired when an error occurs. */
    export var onErrorOccurred: WebResponseErrorEvent;
}

type DocumentLifecycle = 'prerender' | 'active' | 'cached' | 'pending_deletion';
type FrameType = 'outermost_frame' | 'fenced_frame' | 'sub_frame';