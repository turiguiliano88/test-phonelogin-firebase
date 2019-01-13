import { firebaseAppConfig, firebaseConfig } from "./config";
const firebaseApp = require("nativescript-plugin-firebase/app");
//import firebase from "nativescript-plugin-firebase";

/**
 * @author Stian Michael Årsnes - stianmichael@gmail.com
 * @desc Firebase initialization. See nativescript-plugin-firebase for more details.
 * */
/**
function firebaseInit() {
	return firebase.init(firebaseConfig);
}
 */

/**
 * App instance used for firestore etc...
 * TODO: Make a better documentation.
 * */
const firebaseAppInstance = firebaseApp.initializeApp(firebaseConfig);


/**
 * Firestore instance so you don't have to repeat yourself.
 * TODO: Make a better documentation.
 * */
const firebaseDatabase = firebaseApp.firestore();

//const firebaseFunctions = firebaseApp.functions();

export { firebaseAppInstance, firebaseDatabase };
