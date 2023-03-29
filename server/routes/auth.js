const express = require('express')
const router = express.Router()
const User = require('../models/User')
const jwt = require('jsonwebtoken')

router.post('/google', async (req, res) => {
  const { googleId, email, name, imageUrl } = req.body

  try {
    // Check if the user already exists in the database
    let user = await User.findOne({ googleId })

    // If the user doesn't exist, create a new user
    if (!user) {
      user = new User({ googleId, email, name, imageUrl })
      await user.save()
    }

    // Create JWT token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    })

    res.json({ token, user })
  } catch (error) {
    res
      .status(400)
      .json({ error: 'Google authentication failed', details: error.message })
  }
})


module.exports = router
