const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const GigSchema = new Schema({
  title: {
    type: String
  },
  technologies: {
    type: Array
  },
  description: {
    type: String
  },
  budget: {
    type: String
  },
  contact_email: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = Gig = mongoose.model('gigs', GigSchema);