/// <reference types="@astrojs/image/client" />

import { AnalyticTracker } from "analytic-tracker";

declare global {
  interface Window {
    AnalyticTracker?: AnalyticTracker;
    /**
     * UID of the TakeMe's Link User
     */
    production?: boolean;
    /**
     * Is the app in production mode (localhost vs takeme.blog)
     */
    uid?: string;
    /**
     * Function that initializes the tracker
     * @param uid
     * @param prod
     * @param isPreview
     * @returns
     */
    initializeTracker: (uid: string, prod: boolean, isPreview: boolean) => void;
  }
}
