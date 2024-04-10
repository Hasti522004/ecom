import { useState } from 'react'
import './App.css'
import CategoryPage from './components/category'
import ProductPage from './components/product'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <CategoryPage></CategoryPage>
      <ProductPage></ProductPage>
    </>
  )
}

export default App
