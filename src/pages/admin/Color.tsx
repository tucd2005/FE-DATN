import React from 'react';

interface ColorVariant {
    id: number;
    name: string;
    hexCode: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

const Color: React.FC = () => {
    const colorVariants: ColorVariant[] = [
        {
            id: 1,
            name: 'Đỏ',
            hexCode: '#FF0000',
            isActive: true,
            createdAt: '05/27/2025, 10:30 PM',
            updatedAt: '05/27/2025, 10:40 PM',
        },
        {
            id: 2,
            name: 'Xanh dương',
            hexCode: '#0000FF',
            isActive: true,
            createdAt: '05/27/2025, 10:35 PM',
            updatedAt: '05/27/2025, 10:45 PM',
        },
        {
            id: 3,
            name: 'Vàng',
            hexCode: '#FFFF00',
            isActive: false,
            createdAt: '05/27/2025, 10:20 PM',
            updatedAt: '05/27/2025, 10:45 PM',
        },
    ];

    return (
        <div className="flex min-h-screen font-sans antialiased">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-100 text-gray-700 p-4 flex flex-col">
                <div className="text-blue-600 font-bold text-lg mb-6">SHOP QUẦN ÁO THỂ THAO</div>
                <nav className="space-y-2">
                    <a href="#" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-200">
                        <span className="text-blue-500">🏠</span>
                        <span>home</span>
                    </a>
                    <a href="#" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-200">
                        <span className="text-orange-500">📦</span>
                        <span>Quản lý sản phẩm</span>
                    </a>
                    <a href="#" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-200">
                        <span className="text-orange-500">📜</span>
                        <span>Quản lý banner</span>
                    </a>
                    <a href="#" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-200">
                        <span className="text-orange-500">📋</span>
                        <span>Quản lý danh mục</span>
                    </a>
                    <a href="#" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-200">
                        <span className="text-pink-500">👤</span>
                        <span>Quản lý tài khoản nhân viên</span>
                    </a>
                    <a href="#" className="flex items-center space-x-2 p-2 rounded bg-gray-200">
                        <span className="text-purple-500">🎨</span>
                        <span>Quản lý biến thể màu sắc</span>
                    </a>
                    <a href="#" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-200">
                        <span className="text-purple-500">💬</span>
                        <span>Quản lý bình luận</span>
                    </a>
                    <a href="#" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-200">
                        <span className="text-green-500">💳</span>
                        <span>Billing</span>
                    </a>
                    <a href="#" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-200">
                        <span className="text-red-500">⚙️</span>
                        <span>RTL</span>
                    </a>
                </nav>
                <div className="mt-auto">
                    <div className="text-gray-500 font-semibold mt-8 mb-2">ACCOUNT PAGES</div>
                    <a href="#" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-200">
                        <span className="text-gray-500">👤</span>
                        <span>Profile</span>
                    </a>
                    <a href="#" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-200">
                        <span className="text-orange-500">🔒</span>
                        <span>Sign In</span>
                    </a>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold">ADMIN</h1>
                        <h2 className="text-lg">DANH SÁCH BIẾN THỂ MÀU SẮC</h2>
                    </div>
                    <div className="flex items-center space-x-4">
                        <input
                            type="text"
                            placeholder="Type here..."
                            className="px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
                        />
                        <a href="#" className="text-white hover:underline">
                            SIGN IN
                        </a>
                    </div>
                </header>

                {/* Color Variant Table */}
                <div className="p-6">
                    <div className="flex justify-end mb-4">
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200 flex items-center space-x-2">
                            <span>+</span>
                            <span>Thêm biến thể màu sắc</span>
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-gray-100 text-gray-700 text-sm">
                                    <th className="p-3 text-left">#</th>
                                    <th className="p-3 text-left">Tên màu</th>
                                    <th className="p-3 text-left">Mã màu (Hex)</th>
                                    <th className="p-3 text-left">Mẫu màu</th>
                                    <th className="p-3 text-left">Trạng thái hiển thị</th>
                                    <th className="p-3 text-left">Ngày tạo</th>
                                    <th className="p-3 text-left">Ngày cập nhật</th>
                                    <th className="p-3 text-left">Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {colorVariants.map((color, index) => (
                                    <tr key={color.id} className="border-b hover:bg-gray-50">
                                        <td className="p-3">{index + 1}</td>
                                        <td className="p-3">{color.name}</td>
                                        <td className="p-3">{color.hexCode}</td>
                                        <td className="p-3">
                                            <div
                                                className="w-6 h-6 rounded-full border border-gray-300"
                                                style={{ backgroundColor: color.hexCode }}
                                            ></div>
                                        </td>
                                        <td className="p-3">
                                            <div className="flex items-center space-x-2">
                                                <span className={`text-sm ${color.isActive ? 'text-green-600' : 'text-red-600'}`}>
                                                    {color.isActive ? 'Hiển' : 'Ẩn'}
                                                </span>
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        className="sr-only peer"
                                                        checked={color.isActive}
                                                        onChange={() => { }}
                                                    />
                                                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 transition-all duration-200"></div>
                                                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
                                                </label>
                                            </div>
                                        </td>
                                        <td className="p-3">{color.createdAt}</td>
                                        <td className="p-3">{color.updatedAt}</td>
                                        <td className="p-3 flex space-x-2">
                                            <button className="text-blue-600 hover:underline">Sửa</button>
                                            <button className="text-red-600 hover:underline">Xóa</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-center mt-6">
                        <div className="flex space-x-2">
                            <button className="px-3 py-1 border rounded-lg text-gray-600 hover:bg-gray-100">1</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Color;