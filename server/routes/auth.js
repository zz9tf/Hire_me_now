const express = require('express')
const router = express.Router()

router.post('/google', async (req, res) => {
  const { googleId, email, name, imageUrl } = req.body

  try {
    // Save the user in your database here.
    // If the user logs in using the same email, they will only be saved once.

    res.json({
      googleId,
      email,
      name,
      imageUrl,
    })
  } catch (error) {
    res
      .status(400)
      .json({ error: 'Google authentication failed', details: error.message })
  }
})

module.exports = router
