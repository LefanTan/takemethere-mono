import type { Review, Link, Page, PageEntry, User } from "./index";

export type PageEntriesWithData = PageEntry & {
  review?: Review | null;
  link?: Link | null;
  click?: number;
};

export type PageWithEntries = Page & {
  pageEntries: PageEntriesWithData[];
};

export type UserWithPage = User & {
  page: PageWithEntries;
};
