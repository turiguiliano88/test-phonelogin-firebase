/**
 * @author Stian Michael Årsnes - stianmichael@gmail.com
 * @desc Handle incoming push notifications while user is inapp.
 * TODO: Properly handle messages as they come in while you are inapp.
 * */
export function messageReceivedHandler(message) {
	console.log("Title: " + message.title);
	console.log("Body: " + message.body);
	// if your server passed a custom property called 'foo', then do this:
	console.log("Value of 'foo': " + message.data.foo);
};

export function pushTokenReceivedHandler(token) {
	console.log("Firebase push token: " + token);
}
