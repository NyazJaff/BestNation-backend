import "@babel/polyfill";
import "mutationobserver-shim";
import Vue from "vue";
import "./plugins/bootstrap-vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { firebaseApp } from "@/firebase";

Vue.config.productionTip = false;

firebaseApp.auth().onAuthStateChanged(user => {
  store.dispatch("fetchUser", user);
});

Vue.filter("truncate", function(text, stop, clamp) {
  if (text) {
    return text.slice(0, stop) + (stop < text.length ? clamp || "..." : "");
  }
  return "";
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
