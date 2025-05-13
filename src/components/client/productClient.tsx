import React from 'react';

const Product = () => {
  return (
<div className="w-[80%] mx-auto px-4">{/* Center the content and set max width to 80% */}
      <div className="flex justify-between items-center mb-6">
        <div className="h-1 w-16 bg-lime-500 rounded-full" />
        <div className="flex space-x-2">
          <button className="p-2 border rounded hover:bg-gray-100">
            ←
          </button>
          <button className="p-2 border rounded hover:bg-gray-100">
            →
          </button>
        </div>
      </div>
      {/* Danh sách danh mục dạng lưới ngang cuộn được */}
      <div className="flex justify-around  space-x-6">
        {/* Mỗi ô danh mục */}
        <div className="flex-shrink-0 w-40 bg-gray-50 p-4 rounded-xl shadow text-center">
          <img src="https://bizweb.dktcdn.net/100/490/431/themes/927074/assets/image_cate_1.png?1745145147644" alt="Chạy bộ" className="w-20 h-20 mx-auto object-contain mb-3" />
          <h3 className="font-bold text-gray-800">Chạy bộ</h3>
          <p className="text-sm text-gray-600">9 sản phẩm</p>
        </div>
        <div className="flex-shrink-0 w-40 bg-gray-50 p-4 rounded-xl shadow text-center">
          <img src="https://bizweb.dktcdn.net/100/490/431/themes/927074/assets/image_cate_1.png?1745145147644" alt="Chạy bộ" className="w-20 h-20 mx-auto object-contain mb-3" />
          <h3 className="font-bold text-gray-800">Chạy bộ</h3>
          <p className="text-sm text-gray-600">9 sản phẩm</p>
        </div>
        <div className="flex-shrink-0 w-40 bg-gray-50 p-4 rounded-xl shadow text-center">
          <img src="https://bizweb.dktcdn.net/100/490/431/themes/927074/assets/image_cate_1.png?1745145147644" alt="Chạy bộ" className="w-20 h-20 mx-auto object-contain mb-3" />
          <h3 className="font-bold text-gray-800">Chạy bộ</h3>
          <p className="text-sm text-gray-600">9 sản phẩm</p>
        </div>
        <div className="flex-shrink-0 w-40 bg-gray-50 p-4 rounded-xl shadow text-center">
          <img src="https://bizweb.dktcdn.net/100/490/431/themes/927074/assets/image_cate_1.png?1745145147644" alt="Chạy bộ" className="w-20 h-20 mx-auto object-contain mb-3" />
          <h3 className="font-bold text-gray-800">Chạy bộ</h3>
          <p className="text-sm text-gray-600">9 sản phẩm</p>
        </div>
        <div className="flex-shrink-0 w-40 bg-gray-50 p-4 rounded-xl shadow text-center">
          <img src="https://bizweb.dktcdn.net/100/490/431/themes/927074/assets/image_cate_1.png?1745145147644" alt="Chạy bộ" className="w-20 h-20 mx-auto object-contain mb-3" />
          <h3 className="font-bold text-gray-800">Chạy bộ</h3>
          <p className="text-sm text-gray-600">9 sản phẩm</p>
        </div>
        <div className="flex-shrink-0 w-40 bg-gray-50 p-4 rounded-xl shadow text-center">
          <img src="https://bizweb.dktcdn.net/100/490/431/themes/927074/assets/image_cate_1.png?1745145147644" alt="Chạy bộ" className="w-20 h-20 mx-auto object-contain mb-3" />
          <h3 className="font-bold text-gray-800">Chạy bộ</h3>
          <p className="text-sm text-gray-600">9 sản phẩm</p>
        </div>
       
      </div>
    </div>
  );
};

export default Product;
