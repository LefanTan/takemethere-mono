import { defineStore } from "pinia";
import { v4 as uuid } from "uuid";
import useStore from ".";
import { PageWithEntries } from "@common/types/client";
import { PagesService } from "@common/webapi";
import { deepCopy } from "@src/lib/helpers";

export type PageState = {
  /**
   * Most up to date Page
   */
  page: PageWithEntries;
  oldPage?: PageWithEntries;
};

const usePageStore = defineStore("pageStore", {
  state: (): PageState => ({ page: {} as PageWithEntries }),
  actions: {
    /**
     * Load Page given the logged in user's JWT
     * Store a copy in oldPage
     */
    async loadPage() {
      const loadedPage: PageWithEntries = await PagesService.getPage();

      this.page = loadedPage;
      this.page.pageEntries.sort((a, b) => (b.order ?? 0) - (a.order ?? 0));

      this.oldPage = deepCopy(this.page);
    },

    /**
     * Update the current page on db, and update the preview
     */
    async updatePage() {
      const $store = useStore();

      const orderedEntries = this.page.pageEntries.map((entry, i) => ({
        ...entry,
        order: this.page!.pageEntries.length - i,
      }));

      const result = await PagesService.putPagePageEntries(undefined, {
        pageEntries: orderedEntries,
      });

      $store.app.updatePreview();
      this.oldPage = deepCopy(this.page);

      console.log("Saved", result);
    },

    /**
     * Add a new PageEntry to the current page
     */
    async addEntry(type: "Link" | "Review" | "Title") {
      if (!this.page.id) return;

      const newId = uuid();
      const newEntryId = uuid();
      const newOrder = this.page.pageEntries.length + 1;

      if (type === "Review") {
        this.page.pageEntries.push({
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
        this.page.pageEntries.push({
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
      } else {
        this.page.pageEntries.push({
          id: newEntryId,
          pageId: this.page.id,
          title: "",
          order: newOrder,
        });
      }

      // Sort by createdAt, descending order
      this.page.pageEntries.sort((a, b) => (b.order ?? 0) - (a.order ?? 0));
    },

    /**
     * Delete an entry given its id
     * @param entryId
     * @returns
     */
    async deleteEntry(entryId: string) {
      if (!this.page.id) return;

      // Remove in db
      await PagesService.deletePagePageEntry(this.page.id, entryId);

      // Remove in cache
      this.page.pageEntries = this.page.pageEntries.filter(
        (entry) => entry.id !== entryId
      );
    },
  },
});

export default usePageStore;
