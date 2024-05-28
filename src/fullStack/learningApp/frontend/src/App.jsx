import React from 'react'
import './App.css'
import { Suspense } from 'react'
const ProductsListing = React.lazy(() => import('./pages/ProductsListing'))

function App() {

  return (
    <Suspense fallback={<p>Loading products...</p>}>
      <ProductsListing/>
    </Suspense>
  )
}

export default App
