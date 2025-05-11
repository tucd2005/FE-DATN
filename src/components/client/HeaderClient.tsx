import React from 'react'

const HeaderClient = () => {
  return (
    <>
         <div className="bg-[#002733] text-white px-6 py-3 flex justify-between items-center w-full">
        <div className="w-4/5 mx-auto flex justify-between items-center">
          {/* Content area with 80% width */}
          <div className="flex items-center gap-4">
        
            <span className="text-2xl font-bold text-lime-400">
              SUDES <span className="text-white">SPORT</span>
            </span>
          </div>
          <div className="flex-1 mx-8">
            <input
              type="text"
              placeholder="Tìm sản phẩm..."
              className="w-full px-4 py-1 rounded border border-gray-300 text-black"
            />
          </div>
          <div className="flex items-center gap-6 text-sm">
            <div className="hidden md:block">
              <span>Hotline hỗ trợ:</span> <strong className="text-lime-400">1900 6750</strong>
            </div>
            <div className="hidden md:block">
              Hệ thống cửa hàng <br />
              <strong>7 cửa hàng</strong>
            </div>
            <div className="hidden md:block">
              Thông tin <br />
              <strong>Tài khoản</strong>
            </div>
            <div className="relative">
              <span className="absolute -top-1 -right-2 bg-lime-400 text-black text-xs rounded-full px-1">
                0
              </span>
              <span className="text-white">🛒</span> Giỏ hàng
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HeaderClient