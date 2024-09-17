import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';

interface ProductProps {
  id: number;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
}

const Product: React.FC<ProductProps> = ({ id, title, description, price, imageUrl }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${id}`);
  };

  return (
    <div key={id} className="border rounded-lg shadow-lg p-4 cursor-pointer" onClick={handleClick}>
      <img src={imageUrl} alt={title} className="w-full h-48 object-cover rounded-t-lg" />
      <div className="mt-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-gray-600">{description}</p>
        <div className="flex justify-between items-center mt-4">
          <p className="text-lg font-bold">${price}</p>
          <FaShoppingCart className="text-2xl text-gray-600 cursor-pointer hover:text-gray-800" />
        </div>
      </div>
    </div>
  );
}

export default Product;