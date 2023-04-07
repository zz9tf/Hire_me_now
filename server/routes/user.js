const express = require('express')
const router = express.Router()
const User = require('../models/User')

router.put('/decrementUsageCount', async (req, res) => {
  const { googleId } = req.body
  try {
    const user = await User.findOne({ googleId })
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    user.usageCount -= 1
    await user.save()
    res.status(200).json({ message: 'usageCount decremented', user })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
})

module.exports = router
