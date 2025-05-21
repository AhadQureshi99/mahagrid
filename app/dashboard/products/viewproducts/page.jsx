'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { IoCloseCircleOutline } from 'react-icons/io5'

const ViewProductsPage = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('/api/products')  // Fetching products from the backend API
        if (res.status === 200) {
          setProducts(res.data)
        } else {
          toast.error('Failed to fetch products')
        }
      } catch (err) {
        console.error(err)
        toast.error('Error fetching products')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`/api/products/${id}`)
      if (res.status === 200) {
        setProducts(products.filter((product) => product._id !== id))
        toast.success('Product deleted successfully')
      } else {
        toast.error('Failed to delete product')
      }
    } catch (err) {
      console.error(err)
      toast.error('Error deleting product')
    }
  }

  return (
    <div className="container p-5 bg-secondary mx-auto rounded-md">
      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {products.length === 0 ? (
            <p>No products available</p>
          ) : (
            products.map((product) => (
              <div key={product._id} className="bg-white rounded-md shadow-md p-4">
                <img
                  src={product.productimages[0]}
                  alt={product.productname}
                  className="w-full h-40 object-cover rounded-md"
                />
                <h3 className="font-bold text-lg mt-3">{product.productname}</h3>
                <p>{product.productdescription}</p>
                <div className="flex justify-between mt-3">
                  <p className="font-semibold text-green-500">${product.productdiscountedprice}</p>
                  <button
                    className="text-red-500"
                    onClick={() => handleDelete(product._id)}  // Delete the product
                  >
                    <IoCloseCircleOutline size={20} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}

export default ViewProductsPage
