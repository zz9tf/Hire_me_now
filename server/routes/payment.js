const express = require('express')
const router = express.Router()
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const User = require('../models/User')

router.post('/create-checkout-session', async (req, res) => {
  const { userId } = req.body

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price: 'price_1Mta8yGpioqUIppnsVONSzUU',
          quantity: 1,
        },
      ],
      metadata: {
        userId,
      },
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/?success=true`,
      cancel_url: `${process.env.FRONTEND_URL}/?canceled=true`,
    })

    // res.redirect(303, session.url)
    // res.status(200).json({ id: session.id })
    res.status(200).json({ url: session.url })
  } catch (error) {
    console.log('Error creating checkout session:', error)
    res.status(500).json({ error: 'Failed to create checkout session' })
  }
})

module.exports = router
