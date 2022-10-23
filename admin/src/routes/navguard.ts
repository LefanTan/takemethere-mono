import { auth } from "@src/lib/firebase";
import useStore from "@src/stores";
import { Router } from "vue-router";

/**
 * Navguard that ensures authenticated routes required an authenticated user to be authorized - vice versa.
 * To be attached to vue-router.
 * @param router
 */
export default function setupAuthenticationNavguard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    const $store = useStore();

    // Wait for authStateChange to resolve/reject before moving on to check if user is logged in
    await new Promise((resolve, _) => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          $store.app.setUser(user);
        }
        resolve(0);
      });
    });

    // If route requires authentication but user is not yed logged in, redirect to /login
    if (
      to.matched.find((r) => r.meta.requireAuth === true) &&
      !$store.app.user
    ) {
      // If not logged in, redirect to /login
      return next({ path: "/login" });
    } else if (to.matched.find((r) => r.meta.unauthenticatedOnly === true)) {
      if ($store.app.user)
        // If arrived at a route that's only available for user that's not logged in, redirect them back to /
        return next({ path: "/" });
    }
    next();
  });
}
