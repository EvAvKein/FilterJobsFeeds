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