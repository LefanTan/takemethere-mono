import { User } from "@models/User";
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
