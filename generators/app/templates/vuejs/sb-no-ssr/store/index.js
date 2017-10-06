import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';
import actions from './actions';


Vue.use(Vuex);

const dev = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
  state: {},
  mutations,
  actions,
  strict: dev
});

// Setup HMR, don't remove
if (module.hot) {
  module.hot.accept(['./mutations', './getters', './actions'], () => {
    store.hotUpdate({
      mutations: require('./mutations').default,
      getters: require('./getters').default,
      actions: require('./mutations').default
    });
  });
}

export default store;
