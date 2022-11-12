import { defineStore } from "pinia";
import { v4 as uuid } from "uuid";
import { Dialog } from "quasar";
import useStore from ".";

import { PageEntriesWithData, PageWithEntries } from "@common/types/client";
import { PagesService } from "@common/webapi";
import { deepCopy } from "@src/lib/helpers";
import { Page } from "@common/types";

export type PageState = {
  /**
   * Page without page entries
   */
  page: Page;
  /**
   * Most up to date Page entries
   */
  pageEntries: PageEntriesWithData[];
  oldPageEntries?: PageEntriesWithData[];
};

const usePageStore = defineStore("pageStore", {
  state: (): PageState => ({ page: {} as PageWithEntries, pageEntries: [] }),
  actions: {
    /**
     * Load Page given the logged in user's JWT
     * Store a copy in oldPage
     */
    async loadPage() {
      const page: Page = await PagesService.getPage();
      this.page = page;

      const entries = await PagesService.getPageEntries(page.id!);

      this.pageEntries = entries;
      this.pageEntries.sort((a, b) => (b.order ?? 0) - (a.order ?? 0));

      this.oldPageEntries = deepCopy(this.pageEntries);
    },

    /**
     * Update the current page on db, and update the preview
     */
    async updatePage() {
      const $store = useStore();

      const orderedEntries = this.pageEntries.map((entry, i) => ({
        ...entry,
        order: this.pageEntries.length - i,
      }));

      const result = await PagesService.putPagePageEntries(undefined, {
        pageEntries: orderedEntries,
      });

      $store.app.updatePreview();
      this.oldPageEntries = deepCopy(this.pageEntries);

      console.log("Saved", result);
    },

    /**
     * Add a new PageEntry to the current page
     */
    async addEntry(type: "Link" | "Review" | "Title" | "Blog") {
      if (!this.page.id) return;

      const newId = uuid();
      const newEntryId = uuid();
      const newOrder = this.pageEntries.length + 1;

      if (type === "Review") {
        this.pageEntries.push({
          id: newEntryId,
          pageId: this.page.id,
          review: {
            id: newId,
            name: "",
            pageEntryId: newEntryId,
          },
          order: newOrder,
        });
      } else if (type === "Link") {
        this.pageEntries.push({
          id: newEntryId,
          pageId: this.page.id,
          link: {
            id: newId,
            displayText: "",
            link: "",
            pageEntryId: newEntryId,
          },
          order: newOrder,
        });
      } else if (type === "Blog") {
        this.pageEntries.push({
          id: newEntryId,
          pageId: this.page.id,
          blog: {
            id: newId,
            title: "",
            description: "",
            content: "",
            pageEntryId: newEntryId,
          },
          order: newOrder,
        });
      } else {
        this.pageEntries.push({
          id: newEntryId,
          pageId: this.page.id,
          title: "",
          order: newOrder,
        });
      }

      // Sort by createdAt, descending order
      this.pageEntries.sort((a, b) => (b.order ?? 0) - (a.order ?? 0));
    },

    /**
     * Delete an entry given its id
     * @param entryId
     * @returns
     */
    deleteEntry(entryId: string) {
      Dialog.create({
        title: "Are you sure?",
        message:
          "This is an irreversible operation, do you want to delete this item?",
        cancel: true,
      }).onOk(async () => {
        if (!this.page.id) return;

        // Remove in db
        await PagesService.deletePagePageEntry(this.page.id, entryId);

        // Remove in cache
        this.pageEntries = this.pageEntries.filter(
          (entry) => entry.id !== entryId
        );
      });
    },
  },
});

export default usePageStore;
