import React from 'react';

interface CategoryItemProps {
    item: {
      id: number;
      title: string;
      img: string;
    };
  }

const CategoryItem: React.FC<CategoryItemProps> = ({ item }) => {
    return (
      <div className="flex flex-col items-center p-4 w-1/3 relative">
        <div className="w-full h-full relative">
        <img src={item.img} alt={item.title} className="w-full h-full object-cover rounded-lg" />
        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center mb-4">
          <button className="px-4 py-2 border border-white rounded-lg text-white bg-transparent hover:bg-white hover:text-gray-800 transition-colors duration-300">
          <h2 className="text-xl font-bold">{item.title}</h2>
        </button>
        </div>
        
        </div>
      </div>
    );
};

export default CategoryItem;