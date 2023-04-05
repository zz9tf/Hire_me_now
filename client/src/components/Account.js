import React from 'react'
import { useSelector } from 'react-redux'
import { Card, Button } from 'reactstrap' // You can use another UI library if you want
import ProductDisplay from './ProductDisplay'

function Account() {
  const user = useSelector((state) => state.google.profile)

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Card style={{ width: '30rem', padding: '2rem', textAlign: 'center' }}>
        <h1>Account</h1>
        {user ? (
          <>
            <p>Welcome, {user.name}!</p>
            <p>Pay $10 to use this app 10 times.</p>
            {/* <Button color="primary" onClick={handlePayment}>
              Pay $10
            </Button> */}
            <ProductDisplay user={user} />
          </>
        ) : (
          <p>Please log in to view your account information.</p>
        )}
      </Card>
    </div>
  )
}

export default Account
