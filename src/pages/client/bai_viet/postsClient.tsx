import { Calendar, User, TrendingUp, Eye } from "lucide-react";
import { usePostsClient } from "../../../hooks/usePost";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

export default function SportsNewsPage() {
  const { data: response, isLoading, isError } = usePostsClient(1);
  const allArticles = Array.isArray(response?.data?.data) ? response.data.data : [];

  const featuredArticle = allArticles.length > 0 ? allArticles[0] : null;
 const remainingArticles = allArticles.slice(1, 5);


  if (isLoading) return <div>Đang tải...</div>;
  if (isError) return <div>Lỗi khi tải bài viết.</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Nội dung chính */}
          <div className="lg:col-span-3">
            {/* Tin nổi bật */}
            {featuredArticle && (
              <section className="mb-12">
                <h2 className="text-3xl font-bold mb-6 text-gray-900">Tin nổi bật</h2>
                <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
                  <div className="relative">
                    <img
                      src={featuredArticle.anh_dai_dien || "/placeholder.svg"}
                      alt={featuredArticle.tieu_de}
                      className="w-full h-64 md:h-80 object-cover"
                    />
                    <span className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Bài viết
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-3 text-gray-900 line-clamp-2">
                      {featuredArticle.tieu_de}
                    </h3>
                    <p className="text-base mb-4 text-gray-600 line-clamp-3">{featuredArticle.mo_ta_ngan}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <User className="h-4 w-4" />
                          <span>nguyễn văn A</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{format(new Date(featuredArticle.created_at), "dd MMMM yyyy", { locale: vi })}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Eye className="h-4 w-4" />
                          <span>123 lượt xem</span>
                        </div>
                      </div>
                      <Link
                        to={`/bai_viet/${featuredArticle.id}`}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                      >
                        Đọc thêm
                      </Link>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Danh sách bài viết nhỏ */}
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Các bài viết khác</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {remainingArticles.map((article) => (
                  <div key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden border">
                    <img
                      src={article.anh_dai_dien || "/placeholder.svg"}
                      alt={article.tieu_de}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-bold text-gray-900 line-clamp-2">{article.tieu_de}</h3>
                      <p className="text-sm text-gray-600 mt-2 line-clamp-2">{article.mo_ta_ngan}</p>
                      <div className="mt-3 flex items-center justify-between text-sm text-gray-500">
                        <span>{format(new Date(article.created_at), "dd/MM/yyyy", { locale: vi })}</span>
                        <Link
                          to={`/bai_viet/${article.id}`}
                          className="text-blue-600 hover:underline font-medium"
                        >
                          Xem chi tiết
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md mb-6 border border-gray-200">
              <div className="px-6 py-4 border-b">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Xu hướng
                </h3>
              </div>
              <div className="p-6 space-y-4">
                {[
                  { title: "Top 10 giày chạy bộ tốt nhất 2025", views: "5.2K" },
                  { title: "Cách bảo quản đồ thể thao đúng cách", views: "4.8K" },
                  { title: "Xu hướng màu sắc trang phục thể thao", views: "4.1K" },
                  { title: "Đánh giá balo thể thao Under Armour", views: "3.9K" },
                ].map((news, index) => (
                  <div key={index}>
                    <a href="#" className="text-sm font-medium text-gray-900 hover:text-blue-600 block line-clamp-2">
                      {news.title}
                    </a>
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                      <Eye className="h-3 w-3 mr-1" />
                      <span>{news.views} lượt xem</span>
                    </div>
                    {index < 3 && <hr className="mt-3 border-gray-200" />}
                  </div>
                ))}
              </div>
            </div>

            {/* Đăng ký nhận tin */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200">
              <div className="px-6 py-4 border-b">
                <h3 className="text-lg font-semibold text-gray-900">Đăng ký nhận tin</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Nhận tin tức mới nhất về đồ thể thao qua email
                </p>
              </div>
              <div className="p-6 space-y-3">
                <input
                  placeholder="Email của bạn"
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
                  Đăng ký
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
