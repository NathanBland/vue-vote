let mongoose = require('mongoose')

let optionSchema = mongoose.Schema({
  option: { type: String, required: true, index: { unique: false } }
})

let pollSchema = mongoose.Schema({
  creator_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
    index: true
  },
  question: { type: String, required: true, index: { unique: false } },
  options: [optionSchema]
}, {
  timestamps: true
})

let Polls = mongoose.model('poll', pollSchema)

module.exports = Polls