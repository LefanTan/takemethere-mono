import type { Blog, Link, Page, PageEntry, User } from "./index";

export type PageEntriesWithBlogAndLink = PageEntry & {
  blog?: Blog | null;
  link?: Link | null;
};

export type PageWithEntries = Page & {
  pageEntries: PageEntriesWithBlogAndLink[];
};

export type UserWithPage = User & {
  page: PageWithEntries;
};
