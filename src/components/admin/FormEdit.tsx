function FormEditSanPham() {
  return (
    <div className="w-full min-h-screen  p-6">
      <div className="w-full h-full">
        <div className="flex flex-wrap -mx-3">
          <div className="w-full px-3">
            <div className="relative flex flex-col bg-white shadow-xl rounded-2xl p-6">
              <form className="w-full">
                <p className="text-sm uppercase text-slate-700 mb-4">Sản phẩm ID: NQK</p>
                <div className="flex flex-wrap -mx-3">
                  {/* Tên sản phẩm */}
                  <div className="w-full md:w-6/12 px-3 mb-4">
                    <label className="block text-xs font-bold mb-2 text-slate-700">Tên sản phẩm</label>
                    <input
                      type="text"
                      name="username"
                      defaultValue="lucky.jesse"
                      className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  {/* Giá sản phẩm */}
                  <div className="w-full md:w-6/12 px-3 mb-4">
                    <label className="block text-xs font-bold mb-2 text-slate-700">Giá sản phẩm</label>
                    <input
                      type="number"
                      name="price"
                      defaultValue="100000"
                      min="0"
                      step="1000"
                      className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  {/* Kích cỡ */}
                  <div className="w-full md:w-6/12 px-3 mb-4">
                    <label className="block text-xs font-bold mb-2 text-slate-700">Kích cỡ</label>
                    <select name="size" className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:border-blue-500">
                      <option value="s">S</option>
                      <option value="m">M</option>
                      <option value="l">L</option>
                      <option value="xl">XL</option>
                      <option value="xxl">XXL</option>
                    </select>
                  </div>
                  {/* Danh mục */}
                  <div className="w-full md:w-6/12 px-3 mb-4">
                    <label className="block text-xs font-bold mb-2 text-slate-700">Danh mục</label>
                    <select name="category" className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:border-blue-500">
                      <option value="clothing">Quần áo</option>
                      <option value="accessories">Phụ kiện</option>
                      <option value="shoes">Giày dép</option>
                      <option value="bags">Túi xách</option>
                    </select>
                  </div>
                  {/* Ảnh sản phẩm */}
                  <div className="w-full px-3 mb-4">
                    <label className="block text-xs font-bold mb-2 text-slate-700">Hình ảnh</label>
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
                {/* Nút Submit */}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-500 text-white text-xs font-bold rounded-lg hover:bg-blue-600 transition"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default FormEditSanPham;