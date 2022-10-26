import type { PageWithEntries } from "@common/types/client";

export const BASE_API_URL = import.meta.env.PROD
  ? "https://api.takeme.blog"
  : "http://localhost:5080";

/**
 * Grab a user's page, specifically all its page entries
 * @param username
 * @returns
 */
export async function fetchPageByUsername(username: string) {
  const pagePath = BASE_API_URL + "/page/" + username;

  // Usually we don't want to catch the errors here, but since Astro front matter doesn't allow
  try {
    const page: PageWithEntries = await fetch(pagePath).then((res) =>
      res.json()
    );

    return page;
  } catch {
    return null;
  }
}
