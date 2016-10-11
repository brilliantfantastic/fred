"use strict"

const BotkitSMS = require("botkit-sms");
const controller = BotkitSMS({
  account_sid: process.env.TWILIO_ACCOUNT_SID,
  auth_token: process.env.TWILIO_AUTH_TOKEN,
  twilio_number: process.env.TWILIO_NUMBER
});

let bot = controller.spawn();

controller.setupWebserver(process.env.PORT, function (err, webserver) {
  if (err) { console.log(err); }
  controller.createWebhookEndpoints(controller.webserver, bot, function () {
    console.log("Fred is in your neighborhood!");
  })
});

controller.hears(["hi", "hello"], "message_received", (bot, message) => {
  console.log("received a message " + message);
  bot.startConversation(message, (err, convo) => {
    convo.say("Hi, I am Fred, an SMS bot! :D");
    convo.ask("What is your name?", (res, convo) => {
      convo.say(`Nice to meet you, ${res.text}!`);
      convo.next();
    })
  })
});
