import React from "react"

const WarrantyProduct: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 flex items-center justify-center p-6 relative overflow-hidden">

            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-80 h-80 bg-pink-300 opacity-20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-300 opacity-20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-200 opacity-15 rounded-full blur-2xl animate-spin-slow"></div>
            </div>

            <div className="w-full max-w-3xl bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-purple-100/50">
                <div className="text-center mb-8">

                    <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">Chính Sách Bảo Hành</h2>
                    <p className="text-gray-600 mt-2 text-sm">Cam kết chất lượng sản phẩm từ Sportigo</p>
                </div>

                <div className="space-y-8 text-gray-700">
                    <section>
                        <h3 className="text-2xl font-semibold text-gray-900">1. Giới thiệu</h3>
                        <p className="mt-2 text-sm leading-relaxed">
                            Tại Sportigo, chúng tôi cam kết cung cấp sản phẩm quần áo thể thao chất lượng cao. Chính sách bảo hành này được thiết kế để đảm bảo quyền lợi của bạn khi mua sắm tại website của chúng tôi. Chính sách này áp dụng cho tất cả sản phẩm được mua từ Sportigo.
                        </p>
                    </section>

                    <section>
                        <h3 className="text-2xl font-semibold text-gray-900">2. Phạm vi bảo hành</h3>
                        <p className="mt-2 text-sm leading-relaxed">
                            Sản phẩm được bảo hành trong các trường hợp sau:
                        </p>
                        <ul className="mt-2 list-disc list-inside text-sm leading-relaxed space-y-1">
                            <li><strong>Lỗi sản xuất</strong>: Các lỗi về đường may, vải rách, phai màu do lỗi sản xuất (không bao gồm hao mòn tự nhiên).</li>
                            <li><strong>Thời gian bảo hành</strong>: 6 tháng kể từ ngày mua hàng (dựa trên hóa đơn hoặc thông tin đơn hàng).</li>
                            <li><strong>Loại sản phẩm</strong>: Áp dụng cho quần áo thể thao, giày dép và phụ kiện (trừ sản phẩm khuyến mãi hoặc hàng giảm giá cuối mùa).</li>
                        </ul>
                    </section>

                    <section>
                        <h3 className="text-2xl font-semibold text-gray-900">3. Điều kiện bảo hành</h3>
                        <p className="mt-2 text-sm leading-relaxed">
                            Để được bảo hành, sản phẩm cần đáp ứng các điều kiện sau:
                        </p>
                        <ul className="mt-2 list-disc list-inside text-sm leading-relaxed space-y-1">
                            <li>Sản phẩm còn trong thời hạn bảo hành (6 tháng).</li>
                            <li>Có hóa đơn mua hàng hoặc mã đơn hàng hợp lệ.</li>
                            <li>Sản phẩm gặp lỗi do nhà sản xuất, không phải do sử dụng sai cách (như giặt không đúng hướng dẫn, sử dụng hóa chất mạnh).</li>
                            <li>Sản phẩm chưa được sửa chữa bởi bên thứ ba.</li>
                        </ul>
                    </section>

                    <section>
                        <h3 className="text-2xl font-semibold text-gray-900">4. Quy trình bảo hành</h3>
                        <p className="mt-2 text-sm leading-relaxed">
                            Để yêu cầu bảo hành, bạn cần thực hiện các bước sau:
                        </p>
                        <ul className="mt-2 list-decimal list-inside text-sm leading-relaxed space-y-1">
                            <li>Liên hệ bộ phận hỗ trợ qua email <a href="mailto:support@sportigo.com" className="text-blue-500 hover:text-blue-600">support@sportigo.com</a> hoặc hotline 1800-123-456.</li>
                            <li>Cung cấp thông tin đơn hàng, mô tả lỗi sản phẩm, và hình ảnh minh họa (nếu cần).</li>
                            <li>Gửi sản phẩm về địa chỉ kho của Sportigo (sẽ được cung cấp khi liên hệ).</li>
                            <li>Chúng tôi sẽ kiểm tra và xử lý yêu cầu bảo hành trong 7-10 ngày làm việc.</li>
                        </ul>
                    </section>

                    <section>
                        <h3 className="text-2xl font-semibold text-gray-900">5. Kết quả bảo hành</h3>
                        <p className="mt-2 text-sm leading-relaxed">
                            Tùy thuộc vào tình trạng sản phẩm, chúng tôi sẽ:
                        </p>
                        <ul className="mt-2 list-disc list-inside text-sm leading-relaxed space-y-1">
                            <li><strong>Sửa chữa</strong>: Sửa chữa miễn phí nếu lỗi thuộc phạm vi bảo hành.</li>
                            <li><strong>Thay thế</strong>: Đổi sản phẩm mới tương đương nếu không thể sửa chữa.</li>
                            <li><strong>Hoàn tiền</strong>: Hoàn 100% giá trị sản phẩm nếu không thể sửa chữa hoặc thay thế, qua chuyển khoản hoặc ví điện tử trong 7 ngày.</li>
                        </ul>
                        <p className="mt-2 text-sm leading-relaxed">
                            Chi phí vận chuyển gửi hàng bảo hành do khách hàng chịu, trừ trường hợp lỗi do Sportigo.
                        </p>
                    </section>

                    <section>
                        <h3 className="text-2xl font-semibold text-gray-900">6. Trường hợp không được bảo hành</h3>
                        <p className="mt-2 text-sm leading-relaxed">
                            Bảo hành không áp dụng cho:
                        </p>
                        <ul className="mt-2 list-disc list-inside text-sm leading-relaxed space-y-1">
                            <li>Hư hỏng do sử dụng sai cách, tai nạn, hoặc thiên tai.</li>
                            <li>Sản phẩm hết hạn bảo hành hoặc không có hóa đơn hợp lệ.</li>
                            <li>Sản phẩm khuyến mãi, giảm giá cuối mùa, hoặc cá nhân hóa.</li>
                        </ul>
                    </section>

                    <section>
                        <h3 className="text-2xl font-semibold text-gray-900">7. Liên hệ hỗ trợ</h3>
                        <p className="mt-2 text-sm leading-relaxed">
                            Nếu bạn có thắc mắc về chính sách bảo hành, vui lòng liên hệ:<br />
                            Email: <a href="mailto:support@sportigo.com" className="text-blue-500 hover:text-blue-600">support@sportigo.com</a><br />
                            Hotline: 1800-123-456<br />
                            Chúng tôi luôn sẵn sàng hỗ trợ bạn!
                        </p>
                    </section>
                </div>


            </div>
        </div>
    )
}

export default WarrantyProduct