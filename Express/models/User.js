const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  googleId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  imageUrl: String,
  usageCount: { type: Number, default: 3 }, // Add this field
})

module.exports = mongoose.model('User', UserSchema)
