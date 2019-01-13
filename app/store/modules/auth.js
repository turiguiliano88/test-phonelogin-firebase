const firebase = require("nativescript-plugin-firebase");
import { firebaseDatabase } from "../../firebaseapp";
const usersCollection = firebaseDatabase.collection("users");
const usersPublicCollection = firebaseDatabase.collection("users_public");
let applicationSettings = require("application-settings");

const state = {
    loggedIn: false,
    error: false,
    errorMessage: "",
    uid: "",
	email: "",
	phone_number: "",
	push_token: "",
	listenersStarted: {},
	lat: 60.348716,
	lng: 9.167340,

};

const mutations = {
    setLoginCredentials (state, credentials) {
        state.loggedIn = true;
        state.uid = credentials.uid;
        if(credentials.email) {
        	state.email = credentials.email;
        }
        if (credentials.phoneNumber) {
        	state.phone_number = credentials.phoneNumber;
        }
        state.error = false;
        state.errorMessage = "";
    },
    setLoggedOut (state) {
        state.loggedIn = false;
        state.userId = "";
        state.error = false;
        state.errorMessage = "";
    },
    setError (state, error) {
        state.error = true;
        state.errorMessage = error;
    },
    setPhoneNumber(state, phoneNumber) {
        state.phone_number = phoneNumber;
    },
	updateUserLatLng(state, location) {
    	state.lat = location.latitude;
    	state.lng = location.longitude;
	},
	updatePushToken(state, token) {
		state.private.push_token = token;
	},
};

const actions = {
	/**
	 * @author Stian Michael Årsnes - stianmichael@gmail.com
	 * @desc Listen for auth state changes. Used to re-logon user when user revisits the app.
	 * */
    authChangeListener: ({commit, dispatch}) => {
        let authStateChangedListener = {
            onAuthStateChanged: function(data) {
                if (data.loggedIn) {
                    console.log("LOGGED IN: ", data.user);
                    commit("setLoginCredentials", data.user);
                } else {
	                console.log("NOT LOGGED IN");
                }
            },
            thisArg: this
        }
        firebase.addAuthStateListener(authStateChangedListener);
    },
	changePassword: ({commit, dispatch, state}, {oldpassword, newPassword}) => {
		return firebase.changePassword({
			email: state.email,
			oldPassword: oldpassword,
			newPassword: newPassword
		}).then(
			function () {
				// called when password change was successful
				return true;
			},
			function (errorMessage) {
				console.log(errorMessage);
				return false;
			}
		);
	},
    /**
     * @author Stian Michael Årsnes - stianmichael@gmail.com
     * @desc Phone authentication. Can only be tested on a real device.
     * */
    phoneLogin: ({commit}, phoneNumber) => {
        return firebase.login({
            type: firebase.LoginType.PHONE,
            phoneOptions: {
                phoneNumber: phoneNumber,
                verificationPrompt: "The received verification code" // default "Verification code"
            }
        }).then(result => {
                console.log("USER PHONE VERIFICATION SUCCEEEDED");
                console.log(result);
                //JSON.stringify(result);
                commit("setLoginCredentials", result);
	            applicationSettings.setBoolean("isLoggedIn", true);
                return result;
        }, errorMessage => {
        	console.log(errorMessage);
        	throw new Error(errorMessage);
        });
    },
    /**
     * @author Stian Michael Årsnes - stianmichael@gmail.com
     * @desc Logout user.
     * */
    logout: ({commit}) => {
        return firebase.logout().then(() => {
	        applicationSettings.setBoolean("isLoggedIn", false);
	        commit("setLoggedOut");
	        return true;
        });
    },
	setPushToken: ({commit, state, rootState, dispatch}, token) => {
		if (token === state.private.push_token) {
			return;
		}
		const uid = rootState.auth.uid;
	},
};

export default {
    state,
    mutations,
    actions,
};
