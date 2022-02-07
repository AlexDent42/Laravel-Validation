// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import VueTouch from 'vue-touch';
import { ClientTable } from 'vue-tables-2';
import VueTextareaAutosize from 'vue-textarea-autosize';
import axios from 'axios';
import Toasted from 'vue-toasted';
import vSelect from 'vue-select';
import DatePicker from 'vue2-datepicker';

import store from './store';
import router from './Routes';
import App from './App';
import layoutMixin from './mixins/layout';
import { AuthMixin } from './mixins/auth';
import config from './config';
import Widget from './components/Widget/Widget';

axios.defaults.baseURL = config.baseURLApi;
axios.defaults.headers.common['Content-Type'] = 'application/json';
const token = localStorage.getItem('token');
if (token) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
}

Vue.use(BootstrapVue);
Vue.use(VueTouch);
Vue.use(ClientTable, { theme: 'bootstrap4' });
Vue.use(VueTextareaAutosize);
Vue.use(Toasted, { duration: 10000 });

Vue.mixin(layoutMixin);
Vue.mixin(AuthMixin);

Vue.component('Widget', Widget);
Vue.component('v-select', vSelect);
Vue.component('DatePicker', DatePicker);

Vue.config.productionTip = false;
store.dispatch('auth/doInit');

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: (h) => h(App),
});
