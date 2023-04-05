import React, { useState, useEffect } from 'react'

const Product = ({ user }) => {
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/payment/create-checkout-session`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId: user.googleId }),
        }
      )

      if (!response.ok) {
        throw new Error('Failed to create checkout session')
      }

      const { url } = await response.json()
      window.location.assign(url)
    } catch (error) {
      console.error('Error creating checkout session:', error.message)
    }
  }
  return (
    <section>
      <div className="product">
        <img
          src="https://i.imgur.com/EHyR2nP.png"
          alt="The cover of Stubborn Attachments"
        />
        <div className="description">
          <h3>Stubborn Attachments</h3>
          <h5>$20.00</h5>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <input type="hidden" name="userId" value={user.googleId} />
        <button type="submit">Checkout</button>
      </form>
    </section>
  )
}

const Message = ({ message }) => (
  <section>
    <p>{message}</p>
  </section>
)

export default function ProductDisplay({ user }) {
  const [message, setMessage] = useState('')

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search)

    if (query.get('success')) {
      setMessage('Order placed! You will receive an email confirmation.')
    }

    if (query.get('canceled')) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      )
    }
  }, [])

  return message ? <Message message={message} /> : <Product user={user} />
}
