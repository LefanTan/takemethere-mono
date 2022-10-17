import { createApp } from "vue";
import "./styles/index.css";

import App from "./App.vue";

import { createPinia } from "pinia";

import { Quasar, Dialog, LoadingBar, Notify } from "quasar";

// Import icon libraries
import "@quasar/extras/material-icons/material-icons.css";
import "@quasar/extras/material-icons-outlined/material-icons-outlined.css";
import "@quasar/extras/eva-icons/eva-icons.css";

import router from "./routes";

const app = createApp(App);
const pinia = createPinia();

app.use(Quasar, {
  plugins: { Dialog: Dialog, Notify: Notify, LoadingBar: LoadingBar }, // import Quasar plugins and add here
});

app.use(pinia);

// Connect Vue Router
app.use(router);

app.mount("#app");
