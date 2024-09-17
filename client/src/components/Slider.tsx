import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const slides = [
  {
    id: 1,
    img: 'https://res.cloudinary.com/ddx2rkawo/image/upload/v1726595766/c93d9854b54cba83eabde2e09087797c_tqhomc.jpg',
    title: 'Summer Casual Set',
    description: `Shine with our summer casual set. Light, breezy, and stylish—perfect for any sunny day`,
  },
  {
    id: 2,
    img: 'https://res.cloudinary.com/ddx2rkawo/image/upload/v1726596637/73f7141117d01db5c9c53cf3a765ee2e_r2fhcm.jpg',
    title: 'Must-Have Denim Skirt',
    description: 'Refresh your wardrobe with our must-have denim skirt. Versatile, trendy, and perfect for any season.',
  },
  {
    id: 3,
    img: 'https://res.cloudinary.com/ddx2rkawo/image/upload/v1726590469/d4245806458d4177c8f0ef15d2733522_dfwpeg.jpg',
    title: 'Sleek & Modern Pants',
    description: `Upgrade your essentials with our sleek and modern pants.
     Streamlined design and superior comfort for a fresh look`,
  },
];

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNextSlide();
    }, 3000); // Cambia de imagen cada 3 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-screen flex relative bg-white">
      {/* Botón de navegación izquierda */}
      <div
        onClick={handlePrevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center cursor-pointer shadow-lg opacity-75 hover:opacity-100 transition-opacity duration-300 z-10"
      >
        <FaChevronLeft className="text-lg text-white" />
      </div>

      {/* Botón de navegación derecha */}
      <div
        onClick={handleNextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center cursor-pointer shadow-lg opacity-75 hover:opacity-100 transition-opacity duration-300 z-10"
      >
        <FaChevronRight className="text-lg text-white" />
      </div>

      {/* Contenido del carrusel */}
      <div className="w-full h-full overflow-hidden relative">
        <div
          className="flex transition-transform duration-1000"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide) => (
            <div
              key={slide.id}
              className="w-full h-full flex-shrink-0 flex items-center justify-center"
            >
              {/* Imagen */}
              <div className="w-1/2 h-full flex items-center justify-center">
                <img
                  src={slide.img}
                  alt={`Slide ${slide.id}`}
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
              {/* Texto */}
              <div className="w-1/2 h-full flex flex-col items-start justify-center p-8 transform translate-x-16">
                <h2 className="text-4xl font-bold mb-4">{slide.title}</h2>
                <p className="text-lg mb-4 w-1/2">{slide.description}</p>
                <button className="px-4 py-2 border border-black rounded-lg text-black bg-transparent hover:bg-white hover:text-gray-800 transition-colors duration-300">
                  SHOW NOW
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;