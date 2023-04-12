const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()
router.use(bodyParser.json({ verify: (req, res, buf) => (req.rawBody = buf) }))

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const User = require('../models/User')

router.post('/create-checkout-session', async (req, res) => {
  const { googleId } = req.body
  try {
    console.log('googleId before creating session:', googleId)

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price: 'price_1MvRpyGpioqUIppnLp47tyT6',
          quantity: 1,
        },
      ],
      metadata: {
        googleId: googleId,
      },

      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/?success=true`,
      cancel_url: `${process.env.FRONTEND_URL}/?canceled=true`,
    })

    res.status(200).json({ url: session.url })
  } catch (error) {
    console.log('Error creating checkout session:', error)
    res.status(500).json({ error: 'Failed to create checkout session' })
  }
})

router.post(
  '/webhook',

  async (req, res) => {
    const sig = req.headers['stripe-signature']

    let event

    try {
      event = stripe.webhooks.constructEvent(
        req.rawBody,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      )
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`, err.message)
      res.status(400).send(`Webhook Error: ${err.message}`)
      return
    }

    console.log(`Received event: ${event.type}`) // Add this line

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object
      const googleId = session.metadata.googleId
      console.log('Retrieved metadata:', session.metadata)

      console.log('Retrieved googleId:', googleId)

      try {
        const user = await User.findOne({ googleId: googleId })
        if (!user) {
          res.status(400).send('User not found')
          return
        }

        user.usageCount += 3
        await user.save()

        console.log('Usage tokens updated successfully')
      } catch (error) {
        console.error('Error updating usage tokens:', error)
        res.status(400).send('Error updating usage tokens')
        return
      }
    }

    res.status(200).send('Webhook received')
  }
)

module.exports = router
