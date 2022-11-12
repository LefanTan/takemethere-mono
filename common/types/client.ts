import type { Review, Link, Page, PageEntry, User, Blog } from "./index";

export type PageEntriesWithData = PageEntry & {
  review?: Review | null;
  link?: Link | null;
  blog?: Blog | null;
  click?: number;
};

export type PageWithEntries = Page & {
  pageEntries: PageEntriesWithData[];
};

export type UserWithPage = User & {
  page: PageWithEntries;
};
