import './polyfill';
import Vue from 'vue';
import store from './store';
import router from './router';

Vue.config.performance = true;

new Vue({ // eslint-disable-line
  el: '#app',
  store,
  router,
  render: h => h('router-view')
});
