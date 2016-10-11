"use strict"

const BotkitSMS = require("botkit-sms");
const controller = BotkitSMS({
  account_sid: process.env.TWILIO_ACCOUNT_SID,
  auth_token: process.env.TWILIO_AUTH_TOKEN,
  twilio_number: process.env.TWILIO_NUMBER
});

let bot = controller.spawn();

controller.setupWebserver(process.env.PORT, function (err, webserver) {
  controller.createWebhookEndpoints(controller.webserver, bot, function () {
    console.log("Fred is in your neighborhood!");
  })
})
