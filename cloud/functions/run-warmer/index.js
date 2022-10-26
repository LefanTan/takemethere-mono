import fetch from "node-fetch";

/**
 * Triggered from a message on a Cloud Pub/Sub topic.
 *
 * @param {!Object} event Event payload.
 * @param {!Object} context Metadata for the event.
 */
export function invokeGoogleRun(event, context) {
  // Query webapi
  const webApiTask = fetch("https://api.takeme.blog/");

  // Query Blog page
  const blogTask = fetch("https://takeme.blog/");

  Promise.all([webApiTask, blogTask])
    .then(() => {
      console.log("Success!");
    })
    .catch((err) => console.error(err));
}
