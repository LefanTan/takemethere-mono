import { AnalyticTracker } from "@common/analytic-tracker/src/index";
// import { AnalyticTracker } from "analytic-tracker";

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
    prod
      ? "https://api.takeme.blog/analytic/submit"
      : "http://localhost:5080/analytic/submit",
    !prod
  );
};
