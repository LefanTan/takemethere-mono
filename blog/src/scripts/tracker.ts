import { AnalyticTracker } from "analytic-tracker";

/**
 * @param uid
 * @param prod
 * @param isPreview
 * @returns
 */
window.initializeTracker = function initializeTracker(
  uid: string,
  prod: boolean,
  isPreview: boolean
) {
  // Don't initialize tracking script if it's in preview mode
  if (isPreview) return;

  window.AnalyticTracker = new AnalyticTracker(
    "takeme-blog",
    uid,
    prod ? "https://api.takeme.blog/" : "http://localhost:5080"
  );
};
