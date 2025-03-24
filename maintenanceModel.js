const mongoose = require('mongoose');

const maintenanceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  productType: { type: String, required: true },
  productId: { type: String, required: true },
  phone: { type: String, required: true },
  message: { type: String, required: true },
});

const maintenancemodel = mongoose.model('maintenancemodel', maintenanceSchema);

module.exports = maintenancemodel;
