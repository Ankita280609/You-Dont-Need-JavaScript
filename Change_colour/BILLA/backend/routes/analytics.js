const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authmid');
const Subscription = require('../models/Subscription');
const mongoose = require('mongoose');

router.use(protect);


router.get('/summary', async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);

    const categorySummary = await Subscription.aggregate([
      { $match: { user: userId } }, // Filter by the logged-in user
      {
        $group: {
          _id: '$category', 
          totalCost: { $sum: '$cost' }, 
          count: { $sum: 1 }, 
        },
      },
      {
        $project: {
      
          _id: 0,
          category: '$_id',
          totalCost: 1,
          count: 1,
        },
      },
      { $sort: { totalCost: -1 } }, 
    ]);


    const monthlyTotal = await Subscription.aggregate([
      {
        $match: {
          user: userId,
          billingCycle: 'Monthly',
        },
      },
      {
        $group: {
          _id: null, 
          total: { $sum: '$cost' },
        },
      },
      {
        $project: {
          _id: 0,
          total: 1,
        },
      },
    ]);
    
    const yearlyTotal = await Subscription.aggregate([
      {
        $match: {
          user: userId,
          billingCycle: 'Yearly',
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$cost' },
        },
      },
       {
        $project: {
          _id: 0,
          total: 1,
        },
      },
    ]);

    res.json({
      byCategory: categorySummary,
      totalMonthly: monthlyTotal.length > 0 ? monthlyTotal[0].total : 0,
      totalYearly: yearlyTotal.length > 0 ? yearlyTotal[0].total : 0,
      totalSubscriptions: await Subscription.countDocuments({ user: userId }),
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;