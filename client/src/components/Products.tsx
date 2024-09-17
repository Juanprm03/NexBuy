import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Product from './Product';

interface ProductData {
  id: number;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
}

const Products = () => {
  const [products, setProducts] = useState<ProductData[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map(product => (
          <Product
            key={product.id}
            id={product.id}
            title={product.title}
            description={product.description}
            price={product.price}
            imageUrl={product.imageUrl}
          />
        ))}
      </ul>
    </div>
  );
}

export default Products;