import React from 'react'

function TablesProduct() {
    
  return (
    <>
      <div className="w-full px-6 py-6 mx-auto">
        <div className="flex flex-wrap -mx-3">
          <div className="w-full px-3 mb-4">
            {/* Tìm kiếm */}
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              className="border p-2 w-full rounded"
            />
          </div>



          <div className="w-full max-w-full px-3">
            <div className="relative flex flex-col min-w-0 mb-6 break-words bg-white border-0 border-transparent border-solid shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
              <div className="p-6 pb-0 mb-0 border-b-0 border-b-solid rounded-t-2xl border-b-transparent">
                <h6 className="dark:text-white">Danh sách sản phẩm</h6>
              </div>
              <div className="flex-auto px-0 pt-0 pb-2">
                <div className="p-0 overflow-x-auto">
                  <table className="items-center w-full mb-0 align-top border-collapse dark:border-white/40 text-slate-500">
                    <thead className="align-bottom">
                      <tr>
                        <th className="px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-collapse shadow-none dark:border-white/40 dark:text-white text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Ảnh</th>
                        <th className="px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-collapse shadow-none dark:border-white/40 dark:text-white text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Mô tả</th>
                        <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-collapse shadow-none dark:border-white/40 dark:text-white text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Giá</th>
                        <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-collapse shadow-none dark:border-white/40 dark:text-white text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Danh mục</th>
                        <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-collapse shadow-none dark:border-white/40 dark:text-white text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Trạng thái</th>
                        <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-collapse shadow-none dark:border-white/40 dark:text-white text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Kho</th>
                        <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-collapse shadow-none dark:border-white/40 dark:text-white text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Ngày tạo</th>
                        <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-collapse shadow-none dark:border-white/40 dark:text-white text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Thao tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Example product row */}
                      <tr>
                        <td className="p-2 align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                          <div className="flex px-2 py-1">
                            <div>
                              <img src="../assets/img/team-2.jpg" className="inline-flex items-center justify-center mr-4 text-sm text-white transition-all duration-200 ease-in-out h-9 w-9 rounded-xl" alt="product" />
                            </div>
                            <div className="flex flex-col justify-center">
                              <h6 className="mb-0 text-sm leading-normal dark:text-white">Sản phẩm 1</h6>
                            </div>
                          </div>
                        </td>
                        <td className="p-2 align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                          <p className="mb-0 text-xs font-semibold leading-tight dark:text-white dark:opacity-80">Mô tả sản phẩm</p>
                        </td>
                        <td className="p-2 text-center align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                          <span className="text-xs font-semibold leading-tight dark:text-white dark:opacity-80 text-slate-400">10.000đ</span>
                        </td>
                        <td className="p-2 text-center align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                          <span className="text-xs font-semibold leading-tight dark:text-white dark:opacity-80 text-slate-400">Áo</span>
                        </td>
                        <td className="p-2 text-sm leading-normal text-center align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                          <span className="bg-gradient-to-tl from-emerald-500 to-teal-400 px-2.5 text-xs rounded-1.8 py-1.4 inline-block whitespace-nowrap text-center align-baseline font-bold uppercase leading-none text-white">còn hàng</span>
                        </td>
                        <td className="p-2 text-center align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                          <span className="text-xs font-semibold leading-tight dark:text-white dark:opacity-80 text-slate-400">30</span>
                        </td>
                        <td className="p-2 text-center align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                          <span className="text-xs font-semibold leading-tight dark:text-white dark:opacity-80 text-slate-400">20/3/2025</span>
                        </td>
                        <td className="p-2 align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                          <div className="ml-auto text-right">
                            <a className="inline-block px-4 py-2.5 mb-0 font-bold text-center align-middle transition-all rounded-lg cursor-pointer text-sm leading-normal bg-white text-yellow-500 hover:bg-yellow-50 hover:-translate-y-px active:opacity-85">
                              <i className="fas fa-eye mr-2" /> View details
                            </a>
                            <a className="relative z-10 inline-block px-4 py-2.5 mb-0 font-bold text-center text-transparent align-middle transition-all border-0 rounded-lg shadow-none cursor-pointer leading-normal text-sm ease-in bg-150 bg-gradient-to-tl from-red-600 to-orange-600 hover:-translate-y-px active:opacity-85 bg-x-25 bg-clip-text" href="javascript:;">
                              <i className="mr-2 far fa-trash-alt bg-150 bg-gradient-to-tl from-red-600 to-orange-600 bg-x-25 bg-clip-text" />Delete</a>
                            <a href='/admin/edit-san-pham' className="inline-block dark:text-white px-4 py-2.5 mb-0 font-bold text-center align-middle transition-all bg-transparent border-0 rounded-lg shadow-none cursor-pointer leading-normal text-sm ease-in bg-150 hover:-translate-y-px active:opacity-85 bg-x-25 text-slate-700" >
                              <i className="mr-2 fas fa-pencil-alt text-slate-700" />Edit</a>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="p-2 align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                          <div className="flex px-2 py-1">
                            <div>
                              <img src="../assets/img/team-2.jpg" className="inline-flex items-center justify-center mr-4 text-sm text-white transition-all duration-200 ease-in-out h-9 w-9 rounded-xl" alt="product" />
                            </div>
                            <div className="flex flex-col justify-center">
                              <h6 className="mb-0 text-sm leading-normal dark:text-white">Sản phẩm 1</h6>
                            </div>
                          </div>
                        </td>
                        <td className="p-2 align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                          <p className="mb-0 text-xs font-semibold leading-tight dark:text-white dark:opacity-80">Mô tả sản phẩm</p>
                        </td>
                        <td className="p-2 text-center align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                          <span className="text-xs font-semibold leading-tight dark:text-white dark:opacity-80 text-slate-400">10.000đ</span>
                        </td>
                        <td className="p-2 text-center align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                          <span className="text-xs font-semibold leading-tight dark:text-white dark:opacity-80 text-slate-400">Áo</span>
                        </td>
                        <td className="p-2 text-sm leading-normal text-center align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                          <span className="bg-gradient-to-tl from-emerald-500 to-teal-400 px-2.5 text-xs rounded-1.8 py-1.4 inline-block whitespace-nowrap text-center align-baseline font-bold uppercase leading-none text-white">còn hàng</span>
                        </td>
                        <td className="p-2 text-center align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                          <span className="text-xs font-semibold leading-tight dark:text-white dark:opacity-80 text-slate-400">30</span>
                        </td>
                        <td className="p-2 text-center align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                          <span className="text-xs font-semibold leading-tight dark:text-white dark:opacity-80 text-slate-400">20/3/2025</span>
                        </td>
                        <td className="p-2 align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                          <div className="ml-auto text-right">
                            <a className="inline-block px-4 py-2.5 mb-0 font-bold text-center align-middle transition-all rounded-lg cursor-pointer text-sm leading-normal bg-white text-yellow-500 hover:bg-yellow-50 hover:-translate-y-px active:opacity-85">
                              <i className="fas fa-eye mr-2" /> View details
                            </a>
                            <a className="relative z-10 inline-block px-4 py-2.5 mb-0 font-bold text-center text-transparent align-middle transition-all border-0 rounded-lg shadow-none cursor-pointer leading-normal text-sm ease-in bg-150 bg-gradient-to-tl from-red-600 to-orange-600 hover:-translate-y-px active:opacity-85 bg-x-25 bg-clip-text" href="javascript:;">
                              <i className="mr-2 far fa-trash-alt bg-150 bg-gradient-to-tl from-red-600 to-orange-600 bg-x-25 bg-clip-text" />Delete</a>
                            <a href='/admin/edit-san-pham' className="inline-block dark:text-white px-4 py-2.5 mb-0 font-bold text-center align-middle transition-all bg-transparent border-0 rounded-lg shadow-none cursor-pointer leading-normal text-sm ease-in bg-150 hover:-translate-y-px active:opacity-85 bg-x-25 text-slate-700" >
                              <i className="mr-2 fas fa-pencil-alt text-slate-700" />Edit</a>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="p-2 align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                          <div className="flex px-2 py-1">
                            <div>
                              <img src="../assets/img/team-2.jpg" className="inline-flex items-center justify-center mr-4 text-sm text-white transition-all duration-200 ease-in-out h-9 w-9 rounded-xl" alt="product" />
                            </div>
                            <div className="flex flex-col justify-center">
                              <h6 className="mb-0 text-sm leading-normal dark:text-white">Sản phẩm 1</h6>
                            </div>
                          </div>
                        </td>
                        <td className="p-2 align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                          <p className="mb-0 text-xs font-semibold leading-tight dark:text-white dark:opacity-80">Mô tả sản phẩm</p>
                        </td>
                        <td className="p-2 text-center align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                          <span className="text-xs font-semibold leading-tight dark:text-white dark:opacity-80 text-slate-400">10.000đ</span>
                        </td>
                        <td className="p-2 text-center align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                          <span className="text-xs font-semibold leading-tight dark:text-white dark:opacity-80 text-slate-400">Áo</span>
                        </td>
                        <td className="p-2 text-sm leading-normal text-center align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                          <span className="bg-gradient-to-tl from-slate-600 to-slate-300 px-2.5 text-xs rounded-1.8 py-1.4 inline-block whitespace-nowrap text-center align-baseline font-bold uppercase leading-none text-white">
                           hết hàng
                          </span>
                        </td>

                        <td className="p-2 text-center align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                          <span className="text-xs font-semibold leading-tight dark:text-white dark:opacity-80 text-slate-400">30</span>
                        </td>
                        <td className="p-2 text-center align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                          <span className="text-xs font-semibold leading-tight dark:text-white dark:opacity-80 text-slate-400">20/3/2025</span>
                        </td>
                        <td className="p-2 align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                          <div className="ml-auto text-right">
                            <a className="inline-block px-4 py-2.5 mb-0 font-bold text-center align-middle transition-all rounded-lg cursor-pointer text-sm leading-normal bg-white text-yellow-500 hover:bg-yellow-50 hover:-translate-y-px active:opacity-85">
                              <i className="fas fa-eye mr-2" /> View details
                            </a>
                            <a className="relative z-10 inline-block px-4 py-2.5 mb-0 font-bold text-center text-transparent align-middle transition-all border-0 rounded-lg shadow-none cursor-pointer leading-normal text-sm ease-in bg-150 bg-gradient-to-tl from-red-600 to-orange-600 hover:-translate-y-px active:opacity-85 bg-x-25 bg-clip-text" href="javascript:;">
                              <i className="mr-2 far fa-trash-alt bg-150 bg-gradient-to-tl from-red-600 to-orange-600 bg-x-25 bg-clip-text" />Delete</a>
                            <a href='/admin/edit-san-pham' className="inline-block dark:text-white px-4 py-2.5 mb-0 font-bold text-center align-middle transition-all bg-transparent border-0 rounded-lg shadow-none cursor-pointer leading-normal text-sm ease-in bg-150 hover:-translate-y-px active:opacity-85 bg-x-25 text-slate-700" >
                              <i className="mr-2 fas fa-pencil-alt text-slate-700" />Edit</a>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="p-2 align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                          <div className="flex px-2 py-1">
                            <div>
                              <img src="../assets/img/team-2.jpg" className="inline-flex items-center justify-center mr-4 text-sm text-white transition-all duration-200 ease-in-out h-9 w-9 rounded-xl" alt="product" />
                            </div>
                            <div className="flex flex-col justify-center">
                              <h6 className="mb-0 text-sm leading-normal dark:text-white">Sản phẩm 1</h6>
                            </div>
                          </div>
                        </td>
                        <td className="p-2 align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                          <p className="mb-0 text-xs font-semibold leading-tight dark:text-white dark:opacity-80">Mô tả sản phẩm</p>
                        </td>
                        <td className="p-2 text-center align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                          <span className="text-xs font-semibold leading-tight dark:text-white dark:opacity-80 text-slate-400">10.000đ</span>
                        </td>
                        <td className="p-2 text-center align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                          <span className="text-xs font-semibold leading-tight dark:text-white dark:opacity-80 text-slate-400">Áo</span>
                        </td>
                        <td className="p-2 text-sm leading-normal text-center align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                          <span className="bg-gradient-to-tl from-emerald-500 to-teal-400 px-2.5 text-xs rounded-1.8 py-1.4 inline-block whitespace-nowrap text-center align-baseline font-bold uppercase leading-none text-white">còn hàng</span>
                        </td>
                        <td className="p-2 text-center align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                          <span className="text-xs font-semibold leading-tight dark:text-white dark:opacity-80 text-slate-400">30</span>
                        </td>
                        <td className="p-2 text-center align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                          <span className="text-xs font-semibold leading-tight dark:text-white dark:opacity-80 text-slate-400">20/3/2025</span>
                        </td>
                        <td className="p-2 align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
                          <div className="ml-auto text-right">
                            <a className="inline-block px-4 py-2.5 mb-0 font-bold text-center align-middle transition-all rounded-lg cursor-pointer text-sm leading-normal bg-white text-yellow-500 hover:bg-yellow-50 hover:-translate-y-px active:opacity-85">
                              <i className="fas fa-eye mr-2" /> View details
                            </a>
                            <a className="relative z-10 inline-block px-4 py-2.5 mb-0 font-bold text-center text-transparent align-middle transition-all border-0 rounded-lg shadow-none cursor-pointer leading-normal text-sm ease-in bg-150 bg-gradient-to-tl from-red-600 to-orange-600 hover:-translate-y-px active:opacity-85 bg-x-25 bg-clip-text" href="javascript:;">
                              <i className="mr-2 far fa-trash-alt bg-150 bg-gradient-to-tl from-red-600 to-orange-600 bg-x-25 bg-clip-text" />Delete</a>
                            <a href='/admin/edit-san-pham' className="inline-block dark:text-white px-4 py-2.5 mb-0 font-bold text-center align-middle transition-all bg-transparent border-0 rounded-lg shadow-none cursor-pointer leading-normal text-sm ease-in bg-150 hover:-translate-y-px active:opacity-85 bg-x-25 text-slate-700" >
                              <i className="mr-2 fas fa-pencil-alt text-slate-700" />Edit</a>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Phân trang */}
            <div className="flex justify-center py-4">
              <button className="px-4 py-2 text-white bg-blue-500 rounded-l">Previous</button>
              <span className="px-4 py-2">1</span>
              <button className="px-4 py-2 text-white bg-blue-500 rounded-r">Next</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default TablesProduct;
