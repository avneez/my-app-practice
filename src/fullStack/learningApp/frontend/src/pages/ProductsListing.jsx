import { useEffect, useReducer } from 'react'
import axios from 'axios'
import { cartReducer } from '../reducers/cartReducer'
import Products from '../components/products/Products'
import Cart from '../components/cart/Cart'

const ProductsListing = () => {
  const [state, dispatch] = useReducer(cartReducer, {
    products: [],
    cart: [],
  }); 

  const PORT = 3000
  const url = `http://localhost:${PORT}`

  const fetchData = async () => {
    const { data } = await axios.get(`${url}/api/products`);
  
    dispatch({
      type: "ADD_PRODUCTS",
      payload: data.data
    })
  }
  useEffect(() => {
    fetchData();
  }, []);

  return (
      <div style={{display: 'flex'}}>
        <Products state={state} dispatch={dispatch}/>
        <Cart state={state} dispatch={dispatch}/>
      </div>
  )
}

export default ProductsListing