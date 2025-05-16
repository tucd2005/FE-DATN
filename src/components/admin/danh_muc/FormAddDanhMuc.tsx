function FormAddDanhMuc() {
    return (
      <div className="w-full min-h-screen p-6">
        <div className="w-full h-full">
          <div className="flex flex-wrap -mx-3">
            <div className="w-full px-3">
              <div className="relative flex flex-col bg-white shadow-xl rounded-2xl p-6">
                <form className="w-full">
                  
             
                
  
                    {/*  */}
                    <div className="w-full px-3 mb-4">
                      <label htmlFor="Tên danh mục  " className="block text-xs font-bold mb-2 text-slate-700">
                      Tên danh mục 
                      </label>
                      <input
                        type="text"
                        id="text"
                        name="text"className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div className="w-full px-3 mb-4">
                      <label htmlFor="Tên danh mục  " className="block text-xs font-bold mb-2 text-slate-700">
                     Mô tả
                      </label>
                      <input
                        type="text"
                        id="text"
                        name="text"className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:border-blue-500"
                      />
                    </div>

              
  
                  {/* Nút Submit */}
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-2 bg-blue-500 text-white text-xs font-bold rounded-lg hover:bg-blue-600 transition"
                    >
                     Thêm mới Danh mục   
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
  
  export default FormAddDanhMuc;
  