import React, {useState, useEffect} from 'react'
import './cart.css'

const Cart = ({state, dispatch}) => {
  const {cart} = state;
  const [total, setTotal] = useState(0)

  useEffect(()=> {
    let total = 0;
    cart.forEach(item => {total += item.price * item.qty})
    setTotal(total)
  },[cart])

  const changeQty = (id, qty) => dispatch({
    type: "CHANGE_CART_QTY",
    payload: {
      id: id,
      qty: qty,
    },
  })

  return (
    <div className='cartContainer'>
      <b className='cartTitle'>Cart</b>
      <b style={{alignSelf: "center"}}>Subtotal: ${total}</b>
      <div className='cartItems'>
        {cart.length > 0 ? (
          cart.map((product) => {
            return (
              <div key={product.id} className='cartItem'>
                <div style={{display: "flex"}}>
                  <div className='cartImageContainer'>
                    <img className='cartImage' src={product.image} alt={product.name} />
                  </div>
                  <div style={{display: "flex", flexDirection: "column", justifyContent: "space-evenly"}}>
                    <span>{product.title}</span>
                    <b>${product.price}</b>
                  </div>
                </div>
                <div className='quantityContainer'>
                  <button style={{padding: "5px"}} onClick={() => changeQty(product.id, product.qty - 1)}>-</button>
                  <span>{product.qty}</span>
                  <button style={{padding: "5px"}} onClick={() => changeQty(product.id, product.qty + 1)}>+</button>
                </div>
              </div>
            )
          })
        ):(
          <span style={{padding: 20, alignSelf: "center"}}>Cart is empty</span>
        )}
      </div>
    </div>
  )
}

export default Cart