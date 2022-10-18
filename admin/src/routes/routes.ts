import { RouteRecordRaw } from "vue-router";

/**
 * Base Path will be takeme.blog/admin, routed from HTTP proxy
 */

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("@layouts/HomeLayout.vue"),
  },
  {
    path: "/login",
    component: () => import("@layouts/LoginLayout.vue"),
  },
];

export default routes;
