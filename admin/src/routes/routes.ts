import { RouteRecordRaw } from "vue-router";

/**
 * Base Path will be takeme.blog/admin, routed from HTTP proxy
 */

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("@layouts/HomeLayout.vue"),
    meta: { requireAuth: true },
    children: [
      {
        path: "",
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
        children: [
          {
            path: "/test",
            component: () => import("@components/pages/TestPage.vue"),
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    component: () => import("@layouts/LoginLayout.vue"),
    meta: { unauthenticatedOnly: true },
    children: [
      {
        path: "",
        name: "login",
        component: () => import("@components/pages/auth/LoginPage.vue"),
      },
      {
        path: "/signup",
        name: "signup",
        component: () => import("@components/pages/auth/SignUpPage.vue"),
      },
    ],
  },
];

export default routes;
