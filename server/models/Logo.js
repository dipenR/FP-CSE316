var mongoose = require('mongoose');

var LogoSchema = new mongoose.Schema({
  id: String,
  text: String,
  color: String,
  fontSize: { type: Number, min: 2, max: 60 },
  bgcolor: String,
  brcolor: String,
  brradius: { type: Number, min: 0, max: 80 },
  brwidth: { type: Number, min: 5, max: 80 },
  padding: { type: Number, min: 0, max: 50 },
  margin: { type: Number, min: 0, max: 50 },
  lastUpdate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Logo', LogoSchema);