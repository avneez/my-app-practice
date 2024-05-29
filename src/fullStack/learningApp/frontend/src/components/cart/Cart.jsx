/* eslint-disable react/prop-types */
import React, {useState} from 'react'
import './cart.css'

const Cart = ({state, dispatch}) => {
  const {cart} = state;
  const [total, setTotal] = useState(0)

  return (
    <div className='cartContainer'>
      <b className='cartTitle'>Cart</b>
      <b style={{alignSelf: "center"}}>Subtotal: ${total}</b>

      {cart.length > 0 ? (
        cart.map((product) => {
          {console.log('productCart', product)}
          return (
            <div key={product.id} className='cartItem'>
              <div style={{display: "flex", gap: "10px"}}>
                <div className='cartImageContainer'>
                  <img className='cartImage' src={product.image} alt={product.name} />
                </div>
                <div style={{display: "flex", flexDirection: "column", justifyContent: "space-evenly"}}>
                  <span>{product.title}</span>
                  <b>${product.price}</b>
                </div>
              </div>
            </div>
          )
        })
      ):(
        <span style={{padding: 20, alignSelf: "center"}}>Cart is empty</span>
      )}
    </div>
  )
}

export default Cart