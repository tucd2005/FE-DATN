import React, { useState, useEffect } from 'react';
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
  LogoutOutlined,
  WalletOutlined,
  StarOutlined,
  PhoneOutlined,
  CarOutlined,
  FileTextOutlined,
  MessageOutlined,
} from '@ant-design/icons';
import { Button, Menu, Avatar } from 'antd';
import instanceAxios from '../utils/axios';


const { SubMenu } = Menu;

export default function LayoutAdmin() {
  const [collapsed, setCollapsed] = useState(false);
  const [profile, setProfile] = useState<{ email: string; anh_dai_dien?: string } | null>(null);

  const navigate = useNavigate();
  const location = useLocation();
  const selectedKey = location.pathname;

  // ✅ Lấy profile từ API
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await instanceAxios.get('/admin/profile');
        setProfile(res.data);
      } catch (err) {
        console.error('Lỗi lấy profile:', err);
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    sessionStorage.removeItem('accessToken');
    navigate('/admin/login');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`bg-slate-900 text-white transition-all duration-300 ${
          collapsed ? 'w-16' : 'w-64'
        } flex flex-col`}
      >
        {/* ✅ Header sidebar */}
        <div className="h-32 flex flex-col items-center justify-center border-b border-slate-700">
  {collapsed ? (
    // Khi collapse thì chỉ hiện avatar nhỏ
    <img
      src={
        profile?.anh_dai_dien
          ? `http://localhost:8000/storage/${profile.anh_dai_dien}`
          : "https://phunugioi.com/wp-content/uploads/2021/10/Hinh-anh-hacker-Anonymous-chat.jpg"
      }
      alt="avatar"
      className="w-10 h-10 rounded-full object-cover"
    />
  ) : (
    // Khi mở rộng thì avatar ở trên, email ở dưới
    <div className="flex flex-col items-center space-y-2">
      <img
        src={
          profile?.anh_dai_dien
            ? `http://localhost:8000/storage/${profile.anh_dai_dien}`
            : "https://phunugioi.com/wp-content/uploads/2021/10/Hinh-anh-hacker-Anonymous-chat.jpg"
        }
        alt="avatar"
        className="w-24 h-24 rounded-full object-cover border-2 border-slate-600"
      />
      <span className="text-sm font-medium text-center">
        {profile?.email || "Loading..."}
      </span>
    </div>
  )}
</div>



        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
          onClick={({ key }) => navigate(key)}
          className="flex-1"
          style={{ fontSize: '16px' }}
        >
          <Menu.Item key="/admin" icon={<DashboardOutlined style={{ fontSize: 18 }} />}>
            Thống kê
          </Menu.Item>
          <Menu.Item key="/admin/danh-muc" icon={<AppstoreOutlined style={{ fontSize: 18 }} />}>
            Danh mục
          </Menu.Item>
          <Menu.Item key="/admin/san-pham" icon={<TagsOutlined style={{ fontSize: 18 }} />}>
            Sản phẩm
          </Menu.Item>
          <Menu.Item key="/admin/thuoc-tinh" icon={<BgColorsOutlined style={{ fontSize: 18 }} />}>
            Thuộc tính
          </Menu.Item>
          <Menu.Item key="/admin/ma-giam-gia" icon={<GiftOutlined style={{ fontSize: 18 }} />}>
            Mã giảm giá
          </Menu.Item>
          <Menu.Item key="/admin/banners" icon={<PictureOutlined style={{ fontSize: 18 }} />}>
            Banner
          </Menu.Item>
          <Menu.Item key="/admin/chat-bot" icon={<MessageOutlined style={{ fontSize: 18 }} />}>
            Nhắn tin với khách hàng
          </Menu.Item>

          {/* <Menu.Item key="/admin/van_chuyen" icon={<CarOutlined style={{ fontSize: 18 }} />}>
            Vận chuyển
          </Menu.Item> */}

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
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white shadow flex items-center px-4 flex-shrink-0">
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            className="mr-4 text-xl"
          />
          <h1 className="text-lg md:text-xl font-semibold">Trang quản trị</h1>

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

        <main className="p-4 overflow-auto flex-1">
          <div className="bg-white rounded-xl shadow p-6 min-h-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
