import { defineStore } from "pinia";
import { v4 as uuid } from "uuid";
import { Dialog } from "quasar";
import useStore from ".";

import { PageEntriesWithData, PageWithEntries } from "@common/types/client";
import { BlogService, PagesService } from "@common/webapi";
import { deepCopy } from "@src/lib/helpers";
import { Blog, Page } from "@common/types";

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
  /**
   * Current blog being edited/viewed
   */
  blog: Blog;
  oldBlog?: Blog;
};

const usePageStore = defineStore("pageStore", {
  state: (): PageState => ({
    page: {} as PageWithEntries,
    pageEntries: [],
    blog: {} as Blog,
  }),
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
    async addEntry(
      type: "Link" | "Review" | "Title" | "Blog" | "AudioSnippet"
    ) {
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
            title: "New Blog",
            description: "",
            content: "",
            pageEntryId: newEntryId,
          },
          order: newOrder,
        });
      } else if (type === "AudioSnippet") {
        this.pageEntries.push({
          id: newEntryId,
          pageId: this.page.id,
          audioSnippet: {
            id: newId,
            text: "",
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

    /**
     * Get a Blog from cache given a id, retrieve from network if doesn't exist
     */
    async retrieveBlog(blogId: string) {
      // If current blog is not available, find it in pageEntries or load from network
      if (this.blog.id !== blogId)
        this.blog =
          this.pageEntries.find((entry) => entry.blog?.id === blogId)?.blog ??
          (await BlogService.getBlog(blogId));

      console.log(this.blog);

      this.oldBlog = deepCopy(this.blog);

      return this.blog;
    },
    /**
     * Update a Blog
     */
    async updateBlog(blog: Blog) {
      await BlogService.putBlogUpdateBlog(
        blog.pageEntryId,
        blog.id,
        undefined,
        { blog: this.blog }
      );

      this.oldBlog = deepCopy(this.blog);
    },
  },
});

export default usePageStore;
