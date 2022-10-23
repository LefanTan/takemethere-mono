import { auth } from "@src/lib/firebase";
import router from "@src/routes";
import { OpenAPI, UsersService } from "@common/webapi";

import { signInWithEmailAndPassword, signOut, User } from "firebase/auth";
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
     * Set the current user of the global store
     * @param user
     */
    async setUser(user: User) {
      this.user = user;
      OpenAPI.TOKEN = await user.getIdToken();
    },

    /**
     * Sign up using Firebase Authenticated
     * @param username
     * @param email
     * @param password
     */
    async signup(username: string, email: string, password: string) {
      const user = await UsersService.postUsersCreate({
        username,
        email,
        password,
      });

      console.log("Signup Success!");
      return user;
    },

    /**
     * Sign in the user
     * @param username
     */
    async signin(username: string, password: string) {
      const user = await UsersService.getUsersEmail(username);
      if (!user.email) throw new Error("No email found for user");

      const response = await signInWithEmailAndPassword(
        auth,
        user.email,
        password
      );

      if (response) this.setUser(response.user);
      else throw new Error("Signin failed");

      console.log("Login Success!");
      router.push({ name: "home" });
    },

    /**
     * Logout of Firebase and set User global object to null
     */
    async logout() {
      await signOut(auth);

      this.user = undefined;
      OpenAPI.TOKEN = undefined;

      router.replace("/login");
    },
  },
});

export default useAppStore;
