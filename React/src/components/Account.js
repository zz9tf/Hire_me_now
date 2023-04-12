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
        {user ? (
          <>
            <h3>Welcome, {user.name}!</h3>
            <p>Pay $10 to use this app 10 times.</p>
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
