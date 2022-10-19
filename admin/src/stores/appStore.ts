import { User } from "@models/user";
import { defineStore } from "pinia";

type AppState = {
  user?: User;
};

/**
 * App related global states
 */
const useAppStore = defineStore("appStore", {
  state: (): AppState => ({}),
  getters: {},
  actions: {},
});

export default useAppStore;
