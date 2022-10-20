import { auth } from "@src/lib/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import { defineStore } from "pinia";

type AppState = {
  /**
   * Google Authenticated User
   */
  user?: User;
};

/**
 * App related global states
 */
const useAppStore = defineStore("appStore", {
  state: (): AppState => ({}),
  getters: {},
  actions: {
    /**
     * Sign up using Firebase Authenticated
     * @param email
     * @param password
     */
    async signup(email: string, password: string) {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (response) this.$state.user = response.user;
      else throw new Error("Signup failed");
    },

    /**
     * Sign in using Firebase Authenticated
     * @param email
     */
    async signin(email: string, password: string) {
      const response = await signInWithEmailAndPassword(auth, email, password);

      if (response) this.$state.user = response.user;
      else throw new Error("Signin failed");
    },

    /**
     * Logout of Firebase and set User global object to null
     */
    async logout() {
      await signOut(auth);

      this.$state.user = undefined;
    },
  },
});

export default useAppStore;
