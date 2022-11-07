/// <reference types="@astrojs/image/client" />

import { AnalyticTracker } from "@common/analytic-tracker/src/index";

declare global {
  interface Window {
    AnalyticTracker?: AnalyticTracker;
  }
}
