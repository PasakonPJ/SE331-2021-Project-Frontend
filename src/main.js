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
import upperFirst from "lodash/upperFirst";
import camelCase from "lodash/camelCase";

const requireComponent = require.context(
  "./components",
  false,
  /Base[A-Z]\w+\.(vue|js)$/
);

const app = createApp(App);
requireComponent.keys().forEach((fileName) => {
  const componentConfig = requireComponent(fileName);

  const componentName = upperFirst(
    camelCase(fileName.replace(/^\.\/(.*)\.\w+$/, "$1"))
  );

  app.component(componentName, componentConfig.default || componentConfig);
});

app
  .use(VueChartkick)
  .use(router)
  .component("font-awesome-icon", FontAwesomeIcon)
  .use(FlashMessage)
  .provide("Global_Store", Gstore)
  .mount("#app");
