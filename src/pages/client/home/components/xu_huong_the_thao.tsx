import { useEffect, useState } from "react"
import instanceAxios from "../../../../utils/axios"
import { Link } from "react-router-dom"

type TPostClient = {
  id: number
  tieu_de: string
  mo_ta_ngan: string
  anh_dai_dien: string
  created_at: string
}

const BANNER_PREFIX = 'http://127.0.0.1:8000/storage/'


export default function XuHuongTheThao() {
  const [posts, setPosts] = useState<TPostClient[]>([])

  useEffect(() => {
    const getBlogs = async () => {
      try {

        const response = await instanceAxios.get("/posts")
        setPosts(response?.data.data.data)
      } catch (error) {
        console.error("Error fetching posts:", error)
      }
    }
    getBlogs()
  }, []);


  return (
    <section data-aos="fade-up" className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-blue-500 to-green-500 text-white text-sm font-medium rounded-full">
            Xu hướng thể thao
          </span>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Thể thao đang hot</h2>
          <p className="text-gray-600">Cập nhật những xu hướng thể thao mới nhất và được ưa chuộng nhất hiện nay</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts?.map((trend, index) => (
            <Link
              to={`/bai_viet/${trend.id}`}
              key={index}
              className="relative overflow-hidden rounded-lg border border-gray-200 shadow-sm hover:shadow-lg transition-shadow"
            >
              <img
                data-aos="fade-up"
                src={BANNER_PREFIX + trend.anh_dai_dien}
                alt={trend.tieu_de}
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40"></div>
              {/* <span className="absolute top-4 right-4 bg-green-500 text-white px-2 py-1 text-xs font-medium rounded">
                {trend.growth}
              </span> */}
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-lg font-bold mb-1 line-clamp-1">{trend.tieu_de}</h3>
                <p className="text-sm opacity-90 line-clamp-2">{trend.mo_ta_ngan}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-8">
          <button className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-8 py-3 rounded-md font-medium">
            Khám phá xu hướng
          </button>
        </div>
      </div>
    </section>
  )
}
