import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';

interface ProductProps {
  id: number;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
}

const Product: React.FC<ProductProps> = ({ id, title, description, price, imageUrl }) => {
  return (
    <div key={id}>
      <img src={imageUrl} alt={title} />
      <h2>{title}</h2>
      <p>{description}</p>
      <p>${price}</p>
      <FaShoppingCart className="cart-icon" />
    </div>
  );
}

export default Product;