import React from "react"
import { Link } from "react-router-dom"

const PrivacyPolicy: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 flex items-center justify-center p-6 relative overflow-hidden">

            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-80 h-80 bg-pink-300 opacity-20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-300 opacity-20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-200 opacity-15 rounded-full blur-2xl animate-spin-slow"></div>
            </div>

            <div className="w-full max-w-3xl bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-purple-100/50">
                <div className="text-center mb-8">

                    <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Chính Sách Bảo Mật</h2>
                    <p className="text-gray-600 mt-2 text-sm">Chúng tôi cam kết bảo vệ thông tin cá nhân của bạn</p>
                </div>

                <div className="space-y-8 text-gray-700">
                    <section>
                        <h3 className="text-2xl font-semibold text-gray-900">1. Giới thiệu</h3>
                        <p className="mt-2 text-sm leading-relaxed">
                            Chào mừng bạn đến với Sportigo! Chúng tôi tôn trọng quyền riêng tư của bạn và cam kết bảo vệ thông tin cá nhân mà bạn cung cấp khi sử dụng website bán quần áo thể thao của chúng tôi. Chính sách bảo mật này giải thích cách chúng tôi thu thập, sử dụng, lưu trữ và bảo vệ thông tin của bạn.
                        </p>
                    </section>

                    <section>
                        <h3 className="text-2xl font-semibold text-gray-900">2. Thông tin chúng tôi thu thập</h3>
                        <p className="mt-2 text-sm leading-relaxed">
                            Chúng tôi có thể thu thập các thông tin sau:
                        </p>
                        <ul className="mt-2 list-disc list-inside text-sm leading-relaxed space-y-1">
                            <li><strong>Thông tin cá nhân</strong>: Họ tên, địa chỉ email, số điện thoại, địa chỉ giao hàng khi bạn đăng ký hoặc đặt hàng.</li>
                            <li><strong>Thông tin giao dịch</strong>: Chi tiết đơn hàng, lịch sử mua sắm, thông tin thanh toán (không bao gồm số thẻ tín dụng đầy đủ).</li>
                            <li><strong>Thông tin sử dụng</strong>: Dữ liệu về cách bạn tương tác với website, như lịch sử duyệt web, sản phẩm đã xem.</li>
                        </ul>
                    </section>

                    <section>
                        <h3 className="text-2xl font-semibold text-gray-900">3. Cách chúng tôi sử dụng thông tin</h3>
                        <p className="mt-2 text-sm leading-relaxed">
                            Thông tin của bạn được sử dụng để:
                        </p>
                        <ul className="mt-2 list-disc list-inside text-sm leading-relaxed space-y-1">
                            <li>Xử lý và giao hàng cho đơn hàng của bạn.</li>
                            <li>Cải thiện trải nghiệm người dùng và cá nhân hóa nội dung.</li>
                            <li>Gửi thông báo về khuyến mãi, sản phẩm mới (nếu bạn đồng ý).</li>
                            <li>Đảm bảo an toàn và bảo mật cho tài khoản của bạn.</li>
                        </ul>
                    </section>

                    <section>
                        <h3 className="text-2xl font-semibold text-gray-900">4. Chia sẻ thông tin</h3>
                        <p className="mt-2 text-sm leading-relaxed">
                            Chúng tôi không bán hoặc cho thuê thông tin cá nhân của bạn. Thông tin có thể được chia sẻ với:
                        </p>
                        <ul className="mt-2 list-disc list-inside text-sm leading-relaxed space-y-1">
                            <li>Đối tác vận chuyển để giao hàng.</li>
                            <li>Nhà cung cấp dịch vụ thanh toán để xử lý giao dịch.</li>
                            <li>Cơ quan pháp luật nếu được yêu cầu theo quy định.</li>
                        </ul>
                    </section>

                    <section>
                        <h3 className="text-2xl font-semibold text-gray-900">5. Bảo mật thông tin</h3>
                        <p className="mt-2 text-sm leading-relaxed">
                            Chúng tôi áp dụng các biện pháp bảo mật tiên tiến, bao gồm mã hóa SSL, để bảo vệ thông tin của bạn. Tuy nhiên, không có hệ thống nào an toàn tuyệt đối, và chúng tôi khuyến nghị bạn bảo vệ mật khẩu và không chia sẻ với người khác.
                        </p>
                    </section>

                    <section>
                        <h3 className="text-2xl font-semibold text-gray-900">6. Quyền của bạn</h3>
                        <p className="mt-2 text-sm leading-relaxed">
                            Bạn có quyền:
                        </p>
                        <ul className="mt-2 list-disc list-inside text-sm leading-relaxed space-y-1">
                            <li>Yêu cầu truy cập, chỉnh sửa hoặc xóa thông tin cá nhân.</li>
                            <li>Từ chối nhận email tiếp thị.</li>
                            <li>Liên hệ với chúng tôi để biết thêm chi tiết về dữ liệu của bạn.</li>
                        </ul>
                        <p className="mt-2 text-sm leading-relaxed">
                            Để thực hiện các quyền này, vui lòng liên hệ qua email: <a href="mailto:support@sportigo.com" className="text-blue-500 hover:text-blue-600">support@sportigo.com</a>.
                        </p>
                    </section>

                    <section>
                        <h3 className="text-2xl font-semibold text-gray-900">7. Thay đổi chính sách</h3>
                        <p className="mt-2 text-sm leading-relaxed">
                            Chúng tôi có thể cập nhật chính sách này định kỳ. Mọi thay đổi sẽ được thông báo trên website hoặc qua email. Vui lòng kiểm tra thường xuyên để cập nhật.
                        </p>
                    </section>

                    <section>
                        <h3 className="text-2xl font-semibold text-gray-900">8. Liên hệ</h3>
                        <p className="mt-2 text-sm leading-relaxed">
                            Nếu bạn có câu hỏi về chính sách bảo mật, vui lòng liên hệ:
                        </p>
                        <p className="mt-2 text-sm leading-relaxed">
                            Email: <a href="mailto:support@sportigo.com" className="text-blue-500 hover:text-blue-600">support@sportigo.com</a><br />
                            Hotline: 1800-123-456
                        </p>
                    </section>
                </div>

                <p className="text-center text-sm text-gray-600 mt-8">
                    <Link to="/login" className="text-blue-500 hover:text-blue-600 font-semibold transition-colors duration-200">
                        &larr; Quay lại đăng nhập
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default PrivacyPolicy