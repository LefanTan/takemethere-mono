import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import { Quasar, Dialog, LoadingBar, Notify } from "quasar";

// Import icon libraries
import "@quasar/extras/material-icons/material-icons.css";
import "@quasar/extras/material-icons-outlined/material-icons-outlined.css";
import "@quasar/extras/material-icons-round/material-icons-round.css";
import "@quasar/extras/material-icons-sharp/material-icons-sharp.css";
import "@quasar/extras/material-symbols-outlined/material-symbols-outlined.css";
import "@quasar/extras/material-symbols-rounded/material-symbols-rounded.css";
import "@quasar/extras/material-symbols-sharp/material-symbols-sharp.css";
import "@quasar/extras/mdi-v6/mdi-v6.css";
import "@quasar/extras/fontawesome-v5/fontawesome-v5.css";
import "@quasar/extras/fontawesome-v6/fontawesome-v6.css";
import "@quasar/extras/ionicons-v4/ionicons-v4.css";
import "@quasar/extras/eva-icons/eva-icons.css";
import "@quasar/extras/themify/themify.css";
import "@quasar/extras/line-awesome/line-awesome.css";
import "@quasar/extras/bootstrap-icons/bootstrap-icons.css";

// Import Quasar css
import "quasar/src/css/index.sass";

import "./styles/index.css";

// Import Vue Router instance
import router from "./routes";
import setupAuthenticationNavguard from "./routes/navguard";

const app = createApp(App);
const pinia = createPinia();

app.use(Quasar, {
  plugins: { Dialog: Dialog, Notify: Notify, LoadingBar: LoadingBar }, // import Quasar plugins and add here
  config: {
    loadingBar: {
      size: "6px",
    },
    notify: {
      position: "top",
      type: "positive",
    },
  },
  build: {
    publicPath: "/admin/",
  },
});
app.use(pinia);
// Connect Vue Router
app.use(router);

/**
 * Router navguards
 */
setupAuthenticationNavguard(router);

app.mount("#app");
