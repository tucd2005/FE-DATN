import { Carousel } from "antd";
import instanceAxios from "../../../../utils/axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type TCategory = {
  id: number,
  ten: string,
  mo_ta: string,
  image: string,
  deleted_at: string | null
  created_at: string | null
  updated_at: string | null
}

export default function DanhMuc() {
  const [cate, setCate] = useState<TCategory[]>([]);

  useEffect(() => {
    const getCates = async () => {
      try {
        const { data } = await instanceAxios.get("/categories");
        console.log("Fetched categories:", data);
        setCate(data?.data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
    getCates()
  }, []);

  return (
    <section data-aos="fade-up" className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Danh mục thể thao</h2>
          <p className="text-gray-600">Khám phá các danh mục đồ thể thao đa dạng cho mọi hoạt động và phong cách</p>
        </div>
        <Carousel arrows infinite slidesToShow={5} autoplay autoplaySpeed={3000} swipeToSlide={true}>
          {cate?.map((e, index) => (
            <div key={e.ten + index} className="px-3">
              <Link to={'/san-pham?danhmuc=' + e.id} className="flex items-center rounded-[16px] p-2 border border-gray-200 shadow-sm hover:shadow-lg transition-shadow cursor-pointer">
                <img
                  src={`http://localhost:8000/storage/${e.image}`}
                  alt={e.ten}
                  className="h-16 aspect-square object-cover rounded-lg"
                />
                <span className="font-semibold mx-auto"> {e.ten}</span>
              </Link>
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
