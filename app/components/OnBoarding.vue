<template>
	<Page :class="pageClass" actionBarHidden="true" backgroundSpanUnderStatusBar="true">
		<!-- <Page :class="pageClass"> -->
		<GridLayout rows="40, *">
			<GridLayout columns="23, * , 23" class="action-bar-custom content-page" row="0">
				<Image src="res://s_left_white" height="18" width="23" col="0" @tap="$navigateBack()"/>
				<Image src="res://s_way" height="29" col="1"/>
			</GridLayout>
			<GridLayout row="1" rows="150, 50, 150, *" class="content-page" v-show="!sent_verification_code">
				<Label text="Oppgi telefonnummeret ditt" row="0" class="instruction larger" @tap="checkDevice()"/>
				<GridLayout row="1" columns="auto, 10, auto, auto" class="input-country">
					<Image src="res://s_norway" height="20" col="0"/>
					<Image src="res://triangle" height="4" col="1"/>
					<TextField :text="countryCode" class="instruction large medium-weight" col="2"/>
					<TextField v-model="phoneNumber" hint="Ditt telefonnummer"
					           style.placeholderColor="rgba(255,255,255,0.5)" class="instruction large left-align"
					           keyboardType="phone" col="3" @returnPress="getCode"/>
				</GridLayout>
				<GridLayout row="2" columns="*, 100, 10">
					<Button :text="'fa-long-arrow-alt-right' | fonticon" col="1" class="circular-next fa fa-black" :isEnabled="isPhoneNumber" @tap="getCode"/>
				</GridLayout>
			</GridLayout>
			<GridLayout row="1" rows="150, 50, 50, 150, *" v-show="sent_verification_code">
				<Label row="0" text="Vennligst vent" class="instruction larger" @tap="checkDevice()"/>
				<Label row="1" text="Oppgi kode fra SMS ved behov" class="instruction small"/>
				<TextField ref="vCode" row="2" v-model="code" class="instruction largest input-country left-align"
				           style="letter-spacing: 0.5ch; text-align: center;" keyboardType="phone" maxLength="6" col="0"
				           @returnPress="verifyCode" />
				<GridLayout row="3" columns="*, 100, 10">
					<Button :text="'fa-long-arrow-alt-right' | fonticon" col="1" class="circular-next fa fa-black" :isEnabled="isCode" @tap="verifyCode"/>
				</GridLayout>
			</GridLayout>
		</GridLayout>
	</Page>
</template>
<script>
	import * as firebase from "nativescript-plugin-firebase";
	//import { firebaseInit } from "../firebaseapp";

	let applicationSettings = require("application-settings");

	const platformModule = require("tns-core-modules/platform");
	const observableModule = require("tns-core-modules/data/observable");

	const observableObject = new observableModule.Observable();

	firebase["requestPhoneAuthVerificationCode"] = onRequestPhoneAuthVerificationCode;

	// this will be called when the plugin asks for the sms code
	function onRequestPhoneAuthVerificationCode(
		onUserResponse,
		verificationPrompt) {
		// ... this is where you can write your code to open your prompt, or do whatever you like
		console.log("WAITING FOR CODE EVENT.");
		observableObject.on("phoneVerificationCode", function (eventData) {
			console.log("EVENT FIRED");
			console.log("Object", eventData);
			console.log("Event" + eventData.object.code);
			onUserResponse(eventData.object.code)
		});
	}

	export default {
		data() {
			return {
				// code: "0123",
				countryCode: "+39",
				phoneNumber: "3892011307",
				code: "",
				sent_verification_code: false,
			};
		},
		created() {
			/**
			firebaseInit().then(
				instance => {
					console.log("firebase.init done");
				},
				error => {
					console.log(`firebase.init error: ${error}`);
				}
			);
			 */
			/**
			firebase.init({
				onMessageReceivedCallback: function(message) {
					console.log("Title: " + message.title);
					console.log("Body: " + message.body);
				}
			}).then(
				instance => {
					console.log("firebase.init done");
				},
				error => {
					console.log(`firebase.init error: ${error}`);
				}
			);
			 */
		},
		computed: {
			pageClass() {
				console.log('STH HERE', platformModule.screen.mainScreen.widthDIPs < 350);
				return {
					'small-screen': platformModule.screen.mainScreen.widthDIPs < 350,
					'normal-screen': platformModule.screen.mainScreen.widthDIPs >= 350,
				}
			},
			isPhoneNumber() {
				if(this.phoneNumber.length > 7) {
					return true;
				} else {
					return false;
				}
			},
			isCode() {
				if (this.code.length > 5) {
					return true;
				} else {
					return false;
				}
			}
		},
		methods: {
			getCode: function () {
				let wholeNumber = this.countryCode + this.phoneNumber;
				console.log("RUNNING GET CODE");
				this.phoneLogin(wholeNumber);
				this.sent_verification_code = true;
				this.$refs.vCode.nativeView.focus();
			},
			verifyCode: function () {
				console.log("TRYING TO VERIFY CODE.", this.code);
				observableObject.notify({
					eventName: "phoneVerificationCode",
					object: {code: this.code}
				});
			},
			phoneLogin: (phoneNumber) => {
				firebase.login({
					type: firebase.LoginType.PHONE,
					phoneOptions: {
						phoneNumber: phoneNumber,
						verificationPrompt: "The received verification code" // default "Verification code"
					}
				}).then(
					function (result) {
						JSON.stringify(result);
						console.log('SEND VERIFICATION CODE');
						console.log(result);
					},
					function (errorMessage) {
						console.log('ERROR VERIFICATION');
						console.log(errorMessage);
					}
				);
			},
			checkDevice() {
				console.log(platformModule.device.model);
				console.log(platformModule.device.deviceType);
				console.log(platformModule.device.os);
				console.log(platformModule.device.osVersion);
				console.log(platformModule.device.sdkVersion);
				console.log(platformModule.device.language);
				console.log(platformModule.device.manufacturer);
				console.log(platformModule.device.uuid);
				console.log(platformModule.screen.mainScreen.heightDIPs);
				console.log(platformModule.screen.mainScreen.heightPixels);
				console.log(platformModule.screen.mainScreen.scale);
				console.log(platformModule.screen.mainScreen.widthDIPs);
				console.log(platformModule.screen.mainScreen.widthPixels);
			},
		}
	};
</script>

<style lang="scss" scoped>
	@import "./boarding.scss";

	.action-bar {
		background-color: #4C575B;
	}

	.circular-next {
		background-color: #9e9e9e;
		width: 70;
		height: 70;
		color: white;
		border-radius: 100;
	}

	.circular-next:disabled {
		background-color: #6b6b6b;
	}

</style>
