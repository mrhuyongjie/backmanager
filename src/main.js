import Vue from 'vue';
import App from './App.vue';
import ElementUI, { MessageBox } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from '../router';
import VCharts from 'v-charts';
import store from '../store';
import './assets/less/index.less';
import '../api/mock.js';
import http from 'axios';
Vue.use(VCharts);
Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.prototype.$http = http;
Vue.prototype.$confirm = MessageBox.confirm;

router.beforeEach((to, from, next) => {
  store.commit('getToken');
  const token = store.state.user.token;
  if (!token && to.name !== 'login') {
    next({ name: 'login' });
  } else if (token && to.name === 'login') {
    next({ name: 'home' });
  } else {
    next();
  }
});

new Vue({
  store,
  router,
  render: h => h(App),
  created() {
    store.commit('addMenu', router);
  }
}).$mount('#app');
