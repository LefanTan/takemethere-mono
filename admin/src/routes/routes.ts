import { RouteRecordRaw } from "vue-router";

/**
 * Base Path will be takeme.blog/admin, routed from HTTP proxy
 */

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("@layouts/HomeLayout.vue"),
    children: [
      {
        path: "/",
        name: "home",
        component: () => import("@components/pages/HomePage.vue"),
      },
      {
        path: "/appearance",
        name: "appearance",
        component: () => import("@components/pages/AppearancePage.vue"),
      },
      {
        path: "/settings",
        name: "settings",
        component: () => import("@components/pages/SettingsPage.vue"),
      },
    ],
  },
  {
    path: "/login",
    component: () => import("@layouts/LoginLayout.vue"),
  },
];

export default routes;
