const fetch = require("node-fetch");

/**
 * Triggered from a message on a Cloud Pub/Sub topic.
 *
 * @param {!Object} event Event payload.
 * @param {!Object} context Metadata for the event.
 */
exports.invokeGoogleRun = async (event, context) => {
  const fetch = require("node-fetch");

  try {
    // Query webapi
    await fetch("https://api.takeme.blog/");

    // Query Blog page
    await fetch("https://takeme.blog/");

    console.log("Success!");
  } catch (err) {
    console.error(err);
  }
};
