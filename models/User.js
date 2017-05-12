let mongoose = require('mongoose')

let userSchema = mongoose.Schema({
  username: { type: String, required: true, index: { unique: true } },
  displayName: { type: String, required: true, index: { unique: false } },
  password: { type: String, required: true },
  description: {
    type: String,
    required: false
  }
}, {
  timestamps: true
})

let Users = mongoose.model('user', userSchema)

module.exports = Users