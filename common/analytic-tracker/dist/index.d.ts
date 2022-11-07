/// <reference lib="dom" />
/**
 * Represents a db entry holding information about an analytic record
 */
export declare class AnalyticRecord {
    readonly appId: string;
    readonly eventId: string;
    readonly sessionId: string;
    readonly userAgent: string;
    readonly referrer: string;
    readonly eventProperties?: object | undefined;
    constructor(appId: string, eventId: string, sessionId: string, userAgent: string, referrer: string, eventProperties?: object | undefined);
    /**
     * Human-readable description of the record
     * @returns
     */
    toString(): string;
    /**
     * Data format to be sent to a POST endpoint
     * @returns
     */
    format(): string;
}
/**
 * Actual tracker that will be initialized in a browser context.
 */
export declare class AnalyticTracker {
    appId: string;
    readonly endpoint: string;
    private readonly ua;
    private readonly referrer;
    private readonly sessionId;
    constructor(appId: string, endpoint: string);
    /**
     * Create a post request given the specified data
     * @param eventId
     * @param eventProperties
     */
    logAnalytic(eventId: string, eventProperties?: object): void;
    /**
     * Check if the c urrent session is new (First time user visits this origin)
     * @returns
     */
    isNewSession(): boolean;
}
