'use client'
import { Button } from '@mui/material'
import React, { useCallback, useState, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { addProduct } from '@/app/server/actions/adding'
import { IoCloseCircleOutline } from 'react-icons/io5'
import { ReactSortable } from 'react-sortablejs'

const page = () => {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)  // Ensuring that it's only rendered on the client side
  }, [])

  const onDrop = useCallback(async (acceptedFiles) => {
    setLoading(true)
    const uploaded = []

    for (const file of acceptedFiles) {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('upload_preset', 'mahagrid') // Cloudinary preset

      try {
        const res = await axios.post(
          'https://api.cloudinary.com/v1_1/dcuicx8lo/image/upload',
          formData
        )
        uploaded.push(res.data.secure_url)
      } catch (err) {
        console.log(err)
      }
    }

    setImages((prev) => [...prev, ...uploaded])
    setLoading(false)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
  })

  const handleRemoveImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  const handleAddProduct = async (e) => {
    e.preventDefault()

    if (images.length === 0) {
      toast.error('Upload Product Image First!')
      return
    }

    const formData = new FormData(e.target)
    images.forEach((img) => formData.append('productimages', img))

    const res = await addProduct(formData)

    if (res?.error) {
      toast.error(res.error)
    } else {
      toast.success(res.success)
      e.target.reset()
      setImages([])
    }
  }

  return (
    <div className="container p-5 bg-secondary mx-auto rounded-md">
      <form onSubmit={handleAddProduct}>
        {/* Product Name & Description */}
        <div className="grid grid-cols-1 my-4 gap-3 md:grid-cols-2">
          <input className="bg-primary text-gray-500 p-3" type="text" placeholder="Product Name" name="productname" required />
          <input className="bg-primary text-gray-500 p-3" type="text" placeholder="Product Description" name="productdescription" required />
        </div>

        {/* Price & Discounted Price */}
        <div className="grid grid-cols-1 my-4 gap-3 md:grid-cols-2">
          <input className="bg-primary text-gray-500 p-3" type="number" placeholder="Product Base Price" name="productbaseprice" required />
          <input className="bg-primary text-gray-500 p-3" type="number" placeholder="Product Discounted Price" name="productdiscountedprice" />
        </div>

        {/* Gender & Category */}
        <div className="grid grid-cols-1 my-4 gap-3 md:grid-cols-2">
          <select className="bg-primary text-gray-500 p-3" name="productgender" defaultValue="" required>
            <option value="" disabled>Select Gender</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
          </select>

          <select className="bg-primary text-gray-500 p-3" name="productcategory" defaultValue="" required>
            <option value="" disabled>Select Product Category</option>
            <option value="Hoodie">Hoodie</option>
            <option value="Shirt">Shirt</option>
            <option value="Sweatshirt">Sweatshirt</option>
            <option value="Trouser">Trouser</option>
            <option value="Jeans">Jeans</option>
            <option value="Jacket">Jacket</option>
          </select>
        </div>

        {/* Image Upload */}
        <div {...getRootProps()} className="border-2 border-dashed text-white border-gray-400 p-10 text-center my-4 cursor-pointer">
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the images here ...</p>
          ) : (
            <p>Drag & Drop product images here, or click to select</p>
          )}
        </div>

        {/* Uploading Text */}
        {loading && <p className="text-center text-white">Uploading...</p>}

        {/* Image Preview with Reordering */}
        {isClient && images.length > 0 && (
          <div className="my-4">
            <ReactSortable
              list={images}
              setList={setImages}
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              {images.map((img, idx) => (
                <div key={img} className="relative group">
                  <img
                    src={img}
                    alt={`Uploaded ${idx}`}
                    className="w-full max-h-48 object-cover rounded"
                  />
                  <button
                    type="button"
                    className="absolute top-1 right-1 bg-black/70 rounded-full text-white p-1 hidden group-hover:block"
                    onClick={() => handleRemoveImage(idx)}
                    title="Remove"
                  >
                    <IoCloseCircleOutline size={22} />
                  </button>
                </div>
              ))}
            </ReactSortable>
          </div>
        )}

        {/* Submit Button */}
        <button type="submit" className="w-full bg-green-400 text-white py-3 hover:bg-gray-800 transition">
          Add Product
        </button>
      </form>
    </div>
  )
}

export default page
