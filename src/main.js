import Vue from 'vue';
import App from './App.vue';

import axios from "axios";
import "./assets/scss/main.scss";

Vue.config.productionTip = false;

Vue.use({
  install(v) {
    v.prototype.$http = axios;
  },
});
axios.defaults.baseURL = "https://api.openweathermap.org/";
const key = "40d29b94156ded9cf61cbd2c85b44f5c";

axios.interceptors.request.use(
  function (config) {
    config.url += "&appid=" + key;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

new Vue({
  render: (h) => h(App),
}).$mount('#app');
