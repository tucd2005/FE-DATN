import React from "react";

const brandLogos = [
  {
    name: "Puma",
    url: "https://bizweb.dktcdn.net/100/490/431/themes/927074/assets/img_brand_1.png?1745145147644",
  },
  {
    name: "Adidas",
    url: "https://bizweb.dktcdn.net/100/490/431/themes/927074/assets/img_brand_2.png?1745145147644",
  },
  {
    name: "Nike",
    url: "https://bizweb.dktcdn.net/100/490/431/themes/927074/assets/img_brand_3.png?1745145147644",
  },
  {
    name: "Vans",
    url: "https://bizweb.dktcdn.net/100/490/431/themes/927074/assets/img_brand_4.png?1745145147644",
  },
  {
    name: "New Balance",
    url: "https://bizweb.dktcdn.net/100/490/431/themes/927074/assets/img_brand_5.png?1745145147644",
  },
  {
    name: "Asics",
    url: "https://bizweb.dktcdn.net/100/490/431/themes/927074/assets/img_brand_6.png?1745145147644",
  },
  {
    name: "FILA",
    url: "https://bizweb.dktcdn.net/100/490/431/themes/927074/assets/img_brand_7.png?1745145147644",
  },
  {
    name: "Converse",
    url: "https://bizweb.dktcdn.net/100/490/431/themes/927074/assets/img_brand_8.png?1745145147644",
  },
];

const FeaturedBrands = () => {
  return (
    <div className="w-[90%] mx-auto py-10 border-t border-lime-400">
      <h2 className="text-2xl font-extrabold uppercase text-neutral-800">
        Thương hiệu nổi bật
      </h2>
      <div className="w-16 h-[3px] bg-lime-400 mt-1 mb-6" />

      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-8 gap-6 place-items-center">
        {brandLogos.map((brand, idx) => (
          <div key={idx} className="w-24 h-16 flex items-center justify-center">
            <img
              src={brand.url}
              alt={brand.name}
              className="max-h-full max-w-full object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedBrands;
