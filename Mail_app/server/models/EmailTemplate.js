const mongoose = require('mongoose');

const emailTemplateSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  htmlContent: { type: String, required: true },
  recipient: { type: String, required: true },
  sender: { type: String, required: true },
  messageId: { type: String, required: true }, 
  sentAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('EmailTemplate', emailTemplateSchema);
