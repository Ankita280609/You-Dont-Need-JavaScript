const mongoose = require('mongoose');

const SubscriptionSchema = new mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: [true, 'Please add a subscription name'],
    trim: true,
  },
  cost: {
    type: Number,
    required: [true, 'Please add a cost'],
  },
  billingCycle: {
    type: String,
    required: true,
    enum: ['Monthly', 'Yearly', 'One-Time'],
    default: 'Monthly',
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    trim: true,
    default: 'General',
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Subscription', SubscriptionSchema);