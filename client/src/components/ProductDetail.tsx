import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface ProductData {
  id: number;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
}

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductData | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/find/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
      <img src={product.imageUrl} alt={product.title} className="w-full h-64 object-cover rounded-lg mb-4" />
      <p className="text-lg">{product.description}</p>
      <p className="text-2xl font-bold mt-4">${product.price}</p>
    </div>
  );
}

export default ProductDetail;