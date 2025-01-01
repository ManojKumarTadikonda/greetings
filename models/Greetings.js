const mongoose = require('mongoose');

const GreetingSchema = new mongoose.Schema({
  recipientEmail: { type: String, required: true },
  greetingType: { type: String, required: true },
  customMessage: { type: String, required: true },
  imagePath: String,
  dateSent: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Greeting', GreetingSchema);
