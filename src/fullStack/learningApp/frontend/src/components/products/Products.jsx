import React from 'react'
import './products.css'

const Products = ({state, dispatch}) => {
  const {products, cart} = state;

  const handleAddToCart = (product) => { 
    dispatch({
      type : "ADD_TO_CART",
      payload : {
        id: product.product_id,
        title: product.name,
        image: product.image,
        qty: 1,
        price: product.price,
      }
    })
  }

  const handleRemoveFromCart = (product) => {
    dispatch({
      type: "REMOVE_FROM_CART", 
      payload : product
    })
  }
  
  return (
    <div className='productsContainer'>
      {products.map((product) =>{
        return (
          <div key={product.product_id} className='product'>
            <div className='productImageContainer'>
              <img className='productImage' src={product.image} alt={product.image} />
            </div>
            <div style={{display: "flex", justifyContent: "space-between"}}>
              <span>{product.name}</span>
              <b>${product.price}</b>
            </div>
            {
              cart.some(prod => prod.id === product.product_id) ?
                <button className='cartButton' style={{ backgroundColor: "crimson" }} onClick={() => handleRemoveFromCart(product)}>
                  Remove from Cart
                </button>
                :
                <button className='cartButton' style={{ backgroundColor: "green" }} onClick={() => handleAddToCart(product)}>
                  Add to Cart
                </button>
            }
          </div>
        )
      })}
    </div>
  )
}

export default Products