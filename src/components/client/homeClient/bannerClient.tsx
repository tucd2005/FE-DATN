import React, { useEffect, useState } from 'react'

const BannerClient = () => {
      // State to hold the current slide index
  const [currentSlide, setCurrentSlide] = useState(0);

  // Array of slide data including background image URL and text content
  const slides = [
    {
      image: "https://bizweb.dktcdn.net/100/490/431/themes/927074/assets/slider_1.jpg?1745145147644",
      title: "Mua đôi giảm bội",
      subtitle: "Flash Sale",
      description: "Áp dụng cho nhiều sản phẩm",
      buttonText: "Xem chi tiết →",
      overlayText: "SUPPER SALE",
    },
    {
      image: "https://bizweb.dktcdn.net/100/490/431/themes/927074/assets/slider_2.jpg?1745145147644",
      title: "Giảm giá cực hot",
      subtitle: "Summer Sale",
      description: "Giảm đến 50% cho sản phẩm mùa hè",
      buttonText: "Khám phá ngay",
      overlayText: "SUMMER SALE",
    },
    {
      image: "https://bizweb.dktcdn.net/100/490/431/themes/927074/assets/slider_3.jpg?1745145147644",
      title: "Sản phẩm mới",
      subtitle: "New Arrival",
      description: "Khám phá các sản phẩm mới nhất của chúng tôi",
      buttonText: "Mua ngay",
      overlayText: "NEW ARRIVAL",
    },
  ];

  // Function to move to the next slide
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length); // Loop back to the first slide
  };

  // Function to move to the previous slide
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length); // Loop back to the last slide
  };

  // Auto change the slide every 5 seconds
  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    return () => clearInterval(slideInterval); // Clear the interval on component unmount
  }, []);

  const current = slides[currentSlide]; // Get the current slide data

  return (
    <div
    className="relative bg-cover bg-center w-full transition-all duration-1000 ease-in-out"
    style={{
      backgroundImage: `url(${current.image})`, //
      height: "500px",
    }}
  >
    {/* Optional overlay */}
   

    {/* Content with flex center */}
    <div className="relative z-10 w-4/5 mx-auto text-white px-6 py-10 flex flex-col justify-center items-start h-full">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
           
          <p className="uppercase text-sm text-gray-200 mb-2">{current.subtitle}</p>  {/* {current.subtitle} */} 
          <h1 className="text-4xl font-bold text-white mb-4">{current.title}</h1>{/* {current.title} */} 
          <p className="mb-6 text-white">{current.description}</p>{/* {current.description} */} 
          <button className="bg-white text-black font-bold px-6 py-2 rounded hover:bg-gray-100">
          {current.buttonText} {/*   {current.buttonText} */} 
          </button>
        </div>
        <div className="relative">
          <h2 className="absolute bottom-4 right-0 text-7xl font-black text-gray-200 opacity-20 -rotate-45">
          {current.overlayText}{/* {current.overlayText} */} 
          </h2>
        </div>
      </div>

      {/* Navigation buttons */}
     
    </div>
  </div>
  )
}

export default BannerClient