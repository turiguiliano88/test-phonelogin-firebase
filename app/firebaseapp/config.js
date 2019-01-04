import { messageReceivedHandler, pushTokenReceivedHandler } from "./fcm";
let applicationSettings = require("application-settings");
let platform = require("platform");

/**
 * @desc This is the config for the firestore database instance.
 * */
let firebaseConfig = {
	iOSEmulatorFlush: true,
	persist: true,
	onMessageReceivedCallback: messageReceivedHandler,
	onPushTokenReceivedCallback: pushTokenReceivedHandler,
	showNotifications: true,
	showNotificationsWhenInForeground: true

}

const firebaseAppConfig = {
	persist: true,
	timestampsInSnapshots: true
}

export {
	firebaseConfig,
	firebaseAppConfig
}