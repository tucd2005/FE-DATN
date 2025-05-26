import axios from 'axios'
import React, { useEffect, useState } from 'react'

type Banner = {
  id: number
  title: string
  description: string
  status: string
  link: string
  image: string
}

const Banner = () => {
  const [banner, setBanner] = useState<Banner[]>([])
  const [error, setError] = useState<string>('')

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const res = await axios.get('http://localhost:3000/banner')
        setBanner(res.data)
      } catch (err) {
        console.error('Lỗi khi lấy dữ liệu banner:', err)
        setError('Không thể tải dữ liệu banner.')
      }
    }

    fetchBanner()
  }, [])

  return (
    <div className="w-full px-6 py-6 mx-auto">
      <div className="flex flex-wrap -mx-3">
        <div className="w-full max-w-full px-3">
          <div className="relative flex flex-col min-w-0 mb-6 break-words bg-white shadow-xl rounded-2xl">
            <div className="p-4">
              <a
                href="/admin/add-san-pham"
                className="inline-block bg-[rgb(94_114_228)] hover:bg-[rgb(74_94_208)] text-white rounded px-3 py-1"
              >
                Thêm sản phẩm
              </a>
            </div>

            <div className="flex-auto px-0 pt-0 pb-2">
              <div className="p-0 overflow-x-auto">
                <table className="items-center w-full mb-0 border-collapse text-slate-500">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left uppercase text-xs text-slate-400">Ảnh</th>
                      <th className="px-6 py-3 text-left uppercase text-xs text-slate-400">Tiêu đề</th>
                      <th className="px-6 py-3 text-left uppercase text-xs text-slate-400">Mô tả</th>
                      <th className="px-6 py-3 text-left uppercase text-xs text-slate-400">Trạng thái</th>
                      <th className="px-6 py-3 text-left uppercase text-xs text-slate-400">Liên kết</th>
                    </tr>
                  </thead>
                  <tbody>
                    {banner.length > 0 ? (
                      banner.map((item) => (
                        <tr key={item.id}>
                          <td className="p-4">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="h-16 w-28 object-cover rounded"
                            />
                          </td>
                          <td className="p-4 text-sm font-semibold text-gray-800">{item.title}</td>
                          <td className="p-4 text-sm text-gray-600">{item.description}</td>
                          <td className="p-4">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-bold text-white ${
                                item.status === 'active' ? 'bg-green-500' : 'bg-gray-400'
                              }`}
                            >
                              {item.status}
                            </span>
                          </td>
                          <td className="p-4 text-sm text-blue-500 underline">
                            <a href={item.link} target="_blank" rel="noopener noreferrer">
                              {item.link}
                            </a>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="text-center py-4 text-gray-400">
                          {error || 'Không có banner nào.'}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default Banner
