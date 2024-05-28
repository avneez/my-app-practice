import { useEffect, useReducer } from 'react'
import axios from 'axios'
import { cartReducer } from '../reducers/cartReducer'

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

  console.log(state)

  useEffect(() => {
    fetchData();
  }, []);

  return (
      <>
        Products
      </>
  )
}

export default ProductsListing