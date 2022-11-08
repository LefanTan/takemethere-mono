/// <reference types="@astrojs/image/client" />

import { AnalyticTracker } from "analytic-tracker";

declare global {
  interface Window {
    AnalyticTracker?: AnalyticTracker;
  }
}
