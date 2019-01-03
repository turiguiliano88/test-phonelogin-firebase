import Vue from 'nativescript-vue'
import App from './components/App'
// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')
const firebase = require("nativescript-plugin-firebase");
// require("nativescript-plugin-firebase");

// firebase.init({
//   // Optionally pass in properties for database, authentication and cloud messaging,
//   // see their respective docs.
//   onMessageReceivedCallback: function(message) {
// 	  console.log("Title: " + message.title);
// 	  console.log("Body: " + message.body);
// 	  // if your server passed a custom property called 'foo', then do this:
// 	}
// }).then(
//   instance => {
//     console.log("firebase.init done");
//   },
//   error => {
//     console.log(`firebase.init error: ${error}`);
//   }
// );

// firebase.login({
//     type: firebase.LoginType.PHONE,
//     phoneOptions: {
//       phoneNumber: "+393892011307",
//       verificationPrompt: "The received verification code" // default "Verification code"
//     }
//   }).then(
//       function (result) {
//         JSON.stringify(result);
//       },
//       function (errorMessage) {
//         console.log(errorMessage);
//       }
//   );
new Vue({
  render: h => h('frame', [h(App)])
}).$start()
