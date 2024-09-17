import React from 'react';
import CategoryItem from './CategoryItem';

// Definir la interfaz para las categorías
interface Category {
    id: number;
    title: string;
    img: string;
  }
  
  // Definir la lista de categorías
  const categories: Category[] = [
    { id: 1, title: 'FASHION', img: 'https://res.cloudinary.com/ddx2rkawo/image/upload/v1726599403/684323ffa921aa50e7721be8f016e4d9_qvsf7m.jpg' },
    { id: 2, title: 'MAN', img: 'https://res.cloudinary.com/ddx2rkawo/image/upload/v1726599687/07f4ce327308baf42643ffed5edd0ba9_cvk3xq.jpg' },
    { id: 3, title: 'WOMEN', img: 'https://res.cloudinary.com/ddx2rkawo/image/upload/v1726599927/d6ab6afe4df3820636c337796e0a3dd5_phgvb3.jpg' },
  ];
  
  const Categories: React.FC = () => {
    return (
      <div className='flex p-5'>
          {categories.map((item: Category) => (
              <CategoryItem item={item} key={item.id} />
          ))}
      </div>
    )
  }

export default Categories;