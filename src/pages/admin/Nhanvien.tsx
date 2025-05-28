import React from 'react';

interface Employee {
  id: number;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  joinDate: string;
  updatedAt: string;
}

const Nhanvien: React.FC = () => {
  const employees: Employee[] = [
    {
      id: 1,
      name: 'Nguyễn Văn A',
      email: 'nguyenvana@example.com',
      role: 'Nhân viên bán hàng',
      isActive: true,
      joinDate: '03/31/2025, 12:00 AM',
      updatedAt: '04/03/2025, 9:01 PM',
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
          <a href="#" className="flex items-center space-x-2 p-2 rounded bg-gray-200">
            <span className="text-pink-500">👤</span>
            <span>Quản lý tài khoản nhân viên</span>
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
            <h2 className="text-lg">DANH SÁCH TÀI KHOẢN NHÂN VIÊN</h2>
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

        {/* Employee Table */}
        <div className="p-6">
          <div className="flex justify-end mb-4">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200 flex items-center space-x-2">
              <span>+</span>
              <span>Thêm tài khoản nhân viên</span>
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-700 text-sm">
                  <th className="p-3 text-left">#</th>
                  <th className="p-3 text-left">Tên nhân viên</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Vai trò</th>
                  <th className="p-3 text-left">Trạng thái hoạt động</th>
                  <th className="p-3 text-left">Ngày tham gia</th>
                  <th className="p-3 text-left">Ngày cập nhật</th>
                  <th className="p-3 text-left">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee, index) => (
                  <tr key={employee.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3">{employee.name}</td>
                    <td className="p-3">{employee.email}</td>
                    <td className="p-3">{employee.role}</td>
                    <td className="p-3">
                      <div className="flex items-center space-x-2">
                        <span className={`text-sm ${employee.isActive ? 'text-green-600' : 'text-red-600'}`}>
                          {employee.isActive ? 'Hiển' : 'Ẩn'}
                        </span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={employee.isActive}
                            onChange={() => { }}
                          />
                          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 transition-all duration-200"></div>
                          <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
                        </label>
                      </div>
                    </td>
                    <td className="p-3">{employee.joinDate}</td>
                    <td className="p-3">{employee.updatedAt}</td>
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

export default Nhanvien;