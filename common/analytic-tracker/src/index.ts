/// <reference lib="dom" />

/**
 * Represents a db entry holding information about an analytic record
 */
export class AnalyticRecord {
  // Implicitly creates these fields
  constructor(
    public readonly appId: string,
    public readonly propertyId: string,
    public readonly eventId: string,
    public readonly sessionId: string,
    public readonly userAgent: string,
    public readonly referrer: string,
    public readonly eventProperties?: object
  ) {}

  /**
   * Human-readable description of the record
   * @returns
   */
  toString() {
    return `
        appId - ${this.appId}
        propertyId - ${this.propertyId}
        eventId - ${this.eventId}
        eventProperties - ${JSON.stringify(this.eventProperties)}
        sessionId - ${this.sessionId}
        userAgent - ${this.userAgent}
        referrer - ${this.referrer}
    `;
  }

  /**
   * Data format to be sent to a POST endpoint
   * @returns
   */
  format() {
    return JSON.stringify(this);
  }
}

/**
 * Actual tracker that will be initialized in a browser context.
 */
export class AnalyticTracker {
  private readonly ua: string;
  private readonly referrer: string;
  private readonly sessionId: string;
  private readonly isFirstTime: boolean;

  constructor(
    public readonly appId: string,
    public readonly propertyId: string,
    public readonly endpoint: string,
    public readonly devMode?: boolean
  ) {
    // Initialize session
    this.ua = navigator.userAgent;
    this.referrer = document.referrer;

    // Check if a cookie exists
    let sessionCookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${appId}_${propertyId}=`))
      ?.split("=")[1];

    if (!sessionCookieValue) {
      // Set cookie expiry date to be X minutes from now
      // Which means that PageVisit event will only fire once every X minutes
      const expiryDate = new Date();
      expiryDate.setTime(new Date().getTime() + 3 * 60 * 1000);

      this.sessionId = crypto.randomUUID();

      document.cookie = `${appId}_${propertyId}=${
        this.sessionId
      }; expires=${expiryDate.toUTCString()}; Secure; SameSite=Strict;`;

      this.isFirstTime = true;

      // Fire FirstPageVisit event once
      this.logAnalytic("FirstPageVisit");
    } else {
      this.isFirstTime = false;
      this.sessionId = sessionCookieValue;
    }

    // Remove cookie on unload
    window.addEventListener("beforeunload", () => {
      /**
       * Fromn w3schools:
       * You should define the cookie path to ensure that you delete the right cookie.
       * Some browsers will not let you delete a cookie if you don't specify the path.
       */
      document.cookie = `${appId}_session=${this.sessionId}; expires=Thu, 01 Jan 1970 00:00:00 UTC; Secure; SameSite=Strict; path=/`;
    });
  }

  /**
   * Create a post request given the specified data
   * @param eventId
   * @param eventProperties
   */
  logAnalytic(eventId: string, eventProperties?: object) {
    const record = new AnalyticRecord(
      this.appId,
      this.propertyId,
      eventId,
      this.sessionId,
      this.ua,
      this.referrer,
      eventProperties
    );
    navigator.sendBeacon(this.endpoint, record.format());

    if (this.devMode) console.log("Sent Analytic: " + record.toString());
  }

  /**
   * Check if the current session is new (First time user visits this origin)
   * @returns
   */
  isNewSession(): boolean {
    return this.isFirstTime;
  }
}
