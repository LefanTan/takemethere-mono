import { atom, map } from "nanostores";

export type AppInfo = {
  uid?: string;
  /**
   * Is the app in production mode (localhost vs takeme.blog)
   */
  prod?: boolean;
  /**
   * Is this app being used in a preview context?
   */
  isPreview?: boolean;
};

export const appStore = map<AppInfo>({});
