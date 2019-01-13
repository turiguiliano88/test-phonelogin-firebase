import Vue from 'nativescript-vue'
import OnBoarding from "./components/OnBoarding"
import { firebaseAppInstance } from "./firebaseapp";

import store from "./store"
// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')

new Vue({
  render: h => h('frame', [h(OnBoarding)]),
    store,
	created() {
		/**
		 * SHOULD ALTERNATIVELY BE HERE?
		 * */

		this.$store.dispatch("authChangeListener");
	},
}).$start()
