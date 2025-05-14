import axios from 'axios'
import React, { useEffect, useState } from 'react'

const banner = [
  {
    id: 1,
    title: "Khuyến mãi hè 2025",
    description: "Giảm giá lên đến 50% cho tất cả sản phẩm!",
    image: "https://images.unsplash.com/photo-1606813909028-870162e109ba?auto=format&fit=crop&w=1200&q=80",
    status: "active",
    link: "/sale-mua-he"
  },
  {
    id: 2,
    title: "Thú cưng siêu đáng yêu",
    description: "Mua thú cưng tặng kèm phụ kiện",
    image: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=1200&q=80",
    status: "inactive",
    link: "/thu-cung"
  },
  {
    id: 3,
    title: "Hè năng động cùng bạn bốn chân",
    description: "Đăng ký nhận quà tặng trị giá 200K",
    image: "https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=1200&q=80",
    status: "active",
    link: "/uu-dai-dac-biet"
  }
]

const Banner = () => {

  const [banner, setBanner] = useState([])
  useEffect (() => {
    const fetchBanner = async () => {
      const res = await axios.get(`http://localhost:3000/banner`)

      setBanner (res.data)
      // try {
      //   return res
        
      // } catch (error) {
        
      // }

    }
    fetchBanner()
  }, [])
  return (
    <div className='w-full px-6 py-6 mx-auto'>
      <div className='flex flex-wrap -mx-3'>
        <div className='w-full max-w-full px-3'>
          <div className='relative flex flex-col min-w-0 mb-6 break-words bg-white shadow-xl rounded-2xl'>

            <div className='flex-auto px-0 pt-0 pb-2'>
              <div className='p-0 overflow-x-auto'>
                <table className='items-center w-full mb-0 border-collapse text-slate-500'>
                  <thead>
                    <tr>
                      <th className='px-6 py-3 text-left uppercase text-xs text-slate-400'>Ảnh</th>
                      <th className='px-6 py-3 text-left uppercase text-xs text-slate-400'>Tiêu đề</th>
                      <th className='px-6 py-3 text-left uppercase text-xs text-slate-400'>Mô tả</th>
                      <th className='px-6 py-3 text-left uppercase text-xs text-slate-400'>Trạng thái</th>
                      <th className='px-6 py-3 text-left uppercase text-xs text-slate-400'>Liên kết</th>
                    </tr>
                  </thead>
                  <tbody>
                    {banner.map((banner) => (
                      <tr key={banner.id}>
                        <td className='p-4'>
                          <img src={banner.image} alt={banner.title} className='h-16 w-28 object-cover rounded' />
                        </td>
                        <td className='p-4 text-sm font-semibold text-gray-800'>{banner.title}</td>
                        <td className='p-4 text-sm text-gray-600'>{banner.description}</td>
                        <td className='p-4'>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${banner.status === 'active' ? 'bg-green-500' : 'bg-gray-400'}`}>
                            {banner.status}
                          </span>
                        </td>
                        <td className='p-4 text-sm text-blue-500 underline'>
                          <a href={banner.link} target="_blank" rel="noopener noreferrer">{banner.link}</a>
                        </td>
                      </tr>
                    ))}
                    {banner.length === 0 && (
                      <tr>
                        <td colSpan={5} className="text-center py-4 text-gray-400">
                          Không có banner nào.
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
