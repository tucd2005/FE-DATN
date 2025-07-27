// pages/client/articles/ArticleDetailPage.tsx
import { Eye } from "lucide-react";
import { useParams, Link } from "react-router-dom";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { useEffect } from "react";
import { usePostDetailClient, usePostsClient } from "../../../hooks/usePost";

export default function ArticleDetailPage() {
  const { id } = useParams();
  const numericId = Number(id);

  const { data: articleData, isLoading: loadingArticle, isError } = usePostDetailClient(numericId);
  const article = articleData?.data;

  const { data: relatedData, isLoading: loadingRelated } = usePostsClient(1);
  const relatedArticles = relatedData?.data?.data?.filter((post) => post.id !== numericId) || [];


  useEffect(() => {
    console.log("📄 Article:", article);
  }, [article]);

  if (loadingArticle) return <div className="p-8">Đang tải bài viết...</div>;
  if (isError || !article) {
    return <div className="p-8 text-red-500">Không thể tải bài viết.</div>;
  }

  const formattedDate =
    article.created_at && !isNaN(new Date(article.created_at).getTime())
      ? format(new Date(article.created_at), "dd/MM/yyyy", { locale: vi })
      : "Không rõ";

  const content = article.noi_dung || "<p>Không có nội dung</p>";
console.log("Related posts:", relatedData);

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Nội dung chính */}
          <article className="lg:col-span-3">
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-6 text-gray-900">{article.tieu_de}</h1>
              <div className="text-sm text-gray-500 mb-4">Ngày đăng: {formattedDate}</div>
            </div>

            <div className="prose prose-lg max-w-none">
              <div
                className="text-gray-700 leading-relaxed space-y-6"
                dangerouslySetInnerHTML={{
                  __html: content
                    .replace(/<h2>/g, '<h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">')
                    .replace(/<p>/g, '<p class="mb-4 text-gray-700 leading-relaxed">')
                    .replace(/<ul>/g, '<ul class="list-disc list-inside space-y-2 mb-4 ml-4">')
                    .replace(/<li>/g, '<li class="text-gray-700">'),
                }}
              />
            </div>
          </article>

          {/* Sidebar bài viết liên quan */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Bài viết liên quan</h3>
              </div>
              <div className="p-6 space-y-4">
                {loadingRelated ? (
                  <p>Đang tải...</p>
                ) : relatedArticles.length === 0 ? (
                  <p>Không có bài viết liên quan.</p>
                ) : (
                  relatedArticles.map((ra) => (
                    <Link to={`/bai_viet/${ra.id}`} key={ra.id} className="flex space-x-3 group">
                      <img
                        src={ra.anh_dai_dien || "https://via.placeholder.com/80x60?text=No+Image"}
                        alt={ra.tieu_de}
                        className="w-20 h-15 rounded object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-900 group-hover:text-blue-600 line-clamp-2">
                          {ra.tieu_de}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {format(new Date(ra.created_at), "dd/MM/yyyy", { locale: vi })}
                        </div>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
