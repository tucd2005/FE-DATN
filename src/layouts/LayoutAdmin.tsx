import React, { useState } from 'react';
import { useNavigate, useLocation, Outlet, Link } from 'react-router-dom';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  AppstoreOutlined,
  DashboardOutlined,
  TagsOutlined,
  PictureOutlined,
  GiftOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  BgColorsOutlined,
  BranchesOutlined,
  LogoutOutlined,
  WalletOutlined,
  StarOutlined,
  PhoneOutlined,
  CarOutlined,

  FileTextOutlined,
  MessageOutlined,

} from '@ant-design/icons';
import { Button, Menu } from 'antd';

const { SubMenu } = Menu;

export default function LayoutAdmin() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const selectedKey = location.pathname;

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken'); // Nếu có
    sessionStorage.removeItem('accessToken'); // Nếu có dùng session
    navigate('/admin/login');
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`bg-slate-900 text-white transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'
          } flex flex-col`}
      >
        <div className="h-16 flex items-center justify-center font-bold text-xl border-b border-slate-700">
          {collapsed ? 'A' : 'Admin Panel'}
        </div>

        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
          onClick={({ key }) => navigate(key)}
          className="flex-1"
          style={{ fontSize: '16px' }}
        >
          {/* 1. Dashboard */}
          <Menu.Item key="/admin" icon={<DashboardOutlined style={{ fontSize: 18 }} />}>
            Thống kê
          </Menu.Item>

          {/* 2. Quản lý sản phẩm */}
          <Menu.Item key="/admin/danh-muc" icon={<AppstoreOutlined style={{ fontSize: 18 }} />}>
            Danh mục
          </Menu.Item>
          <Menu.Item key="/admin/san-pham" icon={<TagsOutlined style={{ fontSize: 18 }} />}>
            Sản phẩm
          </Menu.Item>
          {/* <Menu.Item key="/admin/bien-the" icon={<BranchesOutlined style={{ fontSize: 18 }} />}>
          Biến thể
        </Menu.Item> */}
          <Menu.Item key="/admin/thuoc-tinh" icon={<BgColorsOutlined style={{ fontSize: 18 }} />}>
            Thuộc tính
          </Menu.Item>

          {/* 3. Mã giảm giá & Banner */}
          <Menu.Item key="/admin/ma-giam-gia" icon={<GiftOutlined style={{ fontSize: 18 }} />}>
            Mã giảm giá
          </Menu.Item>
          <Menu.Item key="/admin/banners" icon={<PictureOutlined style={{ fontSize: 18 }} />}>
            Banner
          </Menu.Item>
          <Menu.Item key="/admin/chat-bot" icon={<MessageOutlined style={{ fontSize: 18 }} />}>
            Nhắn tin với khách hàng
          </Menu.Item>
          <Menu.Item key="/admin/van_chuyen" icon={<CarOutlined style={{ fontSize: 18 }} />}>
            vận chuyển
          </Menu.Item>

          {/* 4. Quản lý đơn hàng & đánh giá */}
          <Menu.Item key="/admin/don-hang" icon={<ShoppingCartOutlined style={{ fontSize: 18 }} />}>
            Đơn hàng
          </Menu.Item>
          <Menu.Item key="/admin/danh-gia" icon={<StarOutlined style={{ fontSize: 18 }} />}>
            Đánh giá
          </Menu.Item>
          <Menu.Item key="/admin/vi_tien" icon={<WalletOutlined style={{ fontSize: 18 }} />}>
            Ví tiền
          </Menu.Item>
          <Menu.Item key="/admin/bai_viet" icon={<FileTextOutlined style={{ fontSize: 18 }} />}>
            Bài viết
          </Menu.Item>
          <Menu.Item key="/admin/lien-he" icon={<PhoneOutlined style={{ fontSize: 18 }} />}>
            Liên hệ
          </Menu.Item>

          {/* 5. Tài khoản */}
          <SubMenu
            key="account"
            icon={<UserOutlined style={{ fontSize: 18 }} />}
            title={<span className="text-base">Tài khoản</span>}
          >
            <Menu.Item key="/admin/account_admin">Admin</Menu.Item>
            <Menu.Item key="/admin/account_user">Khách hàng</Menu.Item>
          
          </SubMenu>
        </Menu>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 bg-white shadow flex items-center px-4">
  <Button
    type="text"
    icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
    onClick={() => setCollapsed(!collapsed)}
    className="mr-4 text-xl"
  />
  <h1 className="text-lg md:text-xl font-semibold">Trang quản trị</h1>

  {/* Đẩy 2 nút sang bên phải */}
  <div className="ml-auto flex items-center gap-2">
    <Link to="/admin/thong_tin">
      <Button
        type="link"
        icon={<UserOutlined />}
        className="text-blue-500 hover:text-blue-700 text-base"
      >
        Hồ sơ cá nhân
      </Button>
    </Link>

    <Button
      type="text"
      icon={<LogoutOutlined />}
      onClick={handleLogout}
      className="text-red-500 hover:text-red-700 text-base"
    >
      Đăng xuất
    </Button>
  </div>
</header>


        {/* Content */}
        <main className="p-4">
          <div className="bg-white rounded-xl shadow p-6 min-h-[calc(100vh-4rem-2rem)]">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
