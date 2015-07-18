var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ProjectSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    latitude: Number,
    longitude: Number,
    address: String
  },
  description: {
    type: String,
    required: true
  },
  participants: [String],
  images: [String],
  category: {
    type: String,
    required: true
  },
  status: String
});

module.exports = mongoose.model('Project', ProjectSchema);