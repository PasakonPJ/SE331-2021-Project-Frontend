import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Gstore from "./store";
import "nprogress/nprogress.css";
import VueChartkick from "vue-chartkick";
import "chartkick/chart.js";
import FlashMessage from "@smartweb/vue-flash-message";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "./plugins/font-awesome";
createApp(App)
  .use(VueChartkick)
  .use(router)
  .component("font-awesome-icon", FontAwesomeIcon)
  .use(FlashMessage)
  .provide("Global_Store", Gstore)
  .mount("#app");
