import Vue from 'nativescript-vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';

import app from './modules/app';
import auth from './modules/auth';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';
const plugins = debug ? [createLogger({})] : [];

const store = new Vuex.Store({
  modules: {
      app,
      auth

  },
  strict: debug,
    plugins,
});

Vue.prototype.$store = store;

export default store;
