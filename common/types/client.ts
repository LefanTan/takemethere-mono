import { Blog, Link, Page, PageEntry } from "./index";

export type PageEntriesWithBlogAndLink = PageEntry & {
  blog?: Blog | null;
  link?: Link | null;
};

export type PageWithEntries = Page & {
  pageEntries: PageEntriesWithBlogAndLink[];
};
