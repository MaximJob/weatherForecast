import Vue from "vue";
import App from "./App.vue";
import { registerSW } from "virtual:pwa-register";
import axios from "axios";
import "./assets/scss/main.scss";

const updateSW = registerSW({
  onNeedRefresh() {
  },
  onOfflineReady() {
  }
});

Vue.config.productionTip = false;

Vue.use({
  install(v) {
    v.prototype.$http = axios;
  }
});
axios.defaults.baseURL = "https://api.openweathermap.org/";
const key = "&appid=40d29b94156ded9cf61cbd2c85b44f5c";

axios.interceptors.request.use(
  function(config) {
    config.url += key;
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

new Vue({
  render: (h) => h(App)
}).$mount("#app");
