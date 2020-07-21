import Vue from 'vue'
import App from './App.vue'
import router from "./router"
import Vant,{Lazyload} from 'vant';
import 'vant/lib/index.css';

Vue.use(Lazyload);
Vue.use(Vant);

Vue.config.productionTip = false

new Vue({
  el: "#app",
  router,
  render: (h) => h(App),
});
