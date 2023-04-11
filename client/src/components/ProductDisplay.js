import React, { useState, useEffect } from 'react'

const Product = ({ user }) => {
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      console.log('USER in frontend:', user)
      console.log('googleId in frontend:', user.id)
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/payment/create-checkout-session`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ googleId: user.id }),
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
        <div className="description">
          <h5 style={{ color: "#565656", marginTop:"30px", marginBottom:"40px"}}
          >Hi, <span style={{ color: "#4cb4b4", fontWeight: "bold" }}>{user.name}</span></h5>
          <h3>You have {user.usageCount} left</h3>
          
          <h5
            style={{color:"#4cb4b4", fontSize:"12pt", marginBottom:"5px"}}
          >Wanna more usage?</h5>
          <h5
            style={{ color: "#565656", fontSize: "18pt" }}>Pay
            <span style={{ fontWeight: "bold", fontSize: "20pt" }}> $3.00</span> for
            <span style={{fontWeight:"bold", fontSize:"20pt"}}> 3</span> more times</h5>
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
