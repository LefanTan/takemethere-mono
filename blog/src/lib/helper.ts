/**
 * Loosely validate a URL `string`.
 * Taken from: https://github.com/segmentio/is-url
 *
 * RegExps.
 * A URL must match #1 and then at least one of #2/#3.
 * Use two levels of REs to avoid REDOS.
 * @return
 */
export function isUrl(url?: string) {
  const protocolAndDomainRE = /^(?:\w+:)?\/\/(\S+)$/;

  const localhostDomainRE = /^localhost[\:?\d]*(?:[^\:?\d]\S*)?$/;
  const nonLocalhostDomainRE = /^[^\s\.]+\.\S{2,}$/;

  if (typeof url !== "string") {
    return false;
  }

  var match = url.match(protocolAndDomainRE);
  if (!match) {
    return false;
  }

  var everythingAfterProtocol = match[1];
  if (!everythingAfterProtocol) {
    return false;
  }

  if (
    localhostDomainRE.test(everythingAfterProtocol) ||
    nonLocalhostDomainRE.test(everythingAfterProtocol)
  ) {
    return true;
  }

  return false;
}

/**
 * Get the current domain depending on environment of the server
 * @returns
 */
export function getDomain() {
  return import.meta.env.PROD ? "https://takeme.blog" : "http://localhost:3000";
}

/**
 * Extract the first img src from a HTML string
 */
export function getFeaturedImageFromHtml(html: string) {
  const match = /<img[^>]+src="([^">]+)"/g.exec(html);
  return match?.[1];
}
