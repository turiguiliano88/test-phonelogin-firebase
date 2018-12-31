<template>
    <Page>
        <ActionBar title="Welcome to NativeScript-Vue!"/>
        <GridLayout columns="*" rows="*">
            <Label class="message" :text="msg" col="0" row="0"/>
            <Button text="Tap" @tap="sendVerificationCode" />
        </GridLayout>
    </Page>
</template>

<script>
  const firebase = require("nativescript-plugin-firebase");
  export default {
    data() {
      return {
        msg: 'Hello World!'
      }
    },
    created() {
        // firebase.init({
        //   // Optionally pass in properties for database, authentication and cloud messaging,
        //   // see their respective docs.
        //   onMessageReceivedCallback: function(message) {
        //       console.log("Title: " + message.title);
        //       console.log("Body: " + message.body);
        //       // if your server passed a custom property called 'foo', then do this:
        //     }
        // }).then(
        //   instance => {
        //     console.log("firebase.init done");
        //   },
        //   error => {
        //     console.log(`firebase.init error: ${error}`);
        //   }
        // );
    },
    methods: {
        sendVerificationCode: function() {
            firebase.login({
                type: firebase.LoginType.PHONE,
                phoneOptions: {
                  phoneNumber: '+393892011307',
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
        }
    }
  }
</script>

<style scoped>
    ActionBar {
        background-color: #53ba82;
        color: #ffffff;
    }

    .message {
        vertical-align: center;
        text-align: center;
        font-size: 20;
        color: #333333;
    }
</style>
