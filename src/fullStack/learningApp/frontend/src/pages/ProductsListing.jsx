import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'

const ProductsListing = () => {
  const [products, setProducts] = useState([])

  const PORT = 3000
  const url = `http://localhost:${PORT}`

  const fetchData = useCallback(() => {
    axios.get(`${url}/api/products`)
      .then((response) => setProducts(response.data.data))
      .catch((error) => console.error(error))
  },[url])

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  
  return (
      <>
        {
          (products?.length === 0) ? <div>No Products  Yet...</div>
          :
          <>
            <div>
              <h3>My Products ({products?.length})</h3>
            </div>
            { products?.map((product, index) => {
                return (
                  <div key={product.id} style={{ width: "100%", borderBottom: "solid" }}>
                    <div>{`${index + 1}. ${product.name} - ${product.price}`}</div>
                    <div>{product.description}</div>
                  </div>
                )
              })
            }
          </>
        } 
      </>
  )
}

export default ProductsListing