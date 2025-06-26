import React, { useState } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  AppstoreOutlined,
  DashboardOutlined,
  TagsOutlined,
  PictureOutlined,
  GiftOutlined,
  ShoppingCartOutlined,
  ExpandOutlined,
  UserOutlined,
  BgColorsOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import './LayoutAdmin.css'; // Có thể dùng nếu cần chỉnh global CSS

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

const LayoutAdmin = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const selectedKey = location.pathname;

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key);
  };

  return (
    <Layout className="h-screen">
      <Sider trigger={null} collapsible collapsed={collapsed} className="shadow-md">
        <div className="h-16 flex items-center justify-center bg-gray-900 text-white font-bold text-lg">
          {collapsed ? 'A' : 'Admin'}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
          onClick={handleMenuClick}
          style={{ fontSize: 16 }}
        >
          <Menu.Item key="/admin" icon={<DashboardOutlined />}>
            Dashboard
          </Menu.Item>
          <Menu.Item key="/admin/danh-muc" icon={<AppstoreOutlined />}>
            Quản lí danh mục
          </Menu.Item>
          <Menu.Item key="/admin/san-pham" icon={<TagsOutlined />}>
            Quản lí sản phẩm
          </Menu.Item>
          <SubMenu key="account" icon={<UserOutlined />} title="Tài khoản">
            <Menu.Item key="/admin/account_admin">Admin</Menu.Item>
            <Menu.Item key="/admin/account_user">Khách hàng</Menu.Item>
          </SubMenu>
          <Menu.Item key="/admin/banner" icon={<PictureOutlined />}>
            Quản lí banner
          </Menu.Item>
          <Menu.Item key="/admin/ma-giam-gia" icon={<GiftOutlined />}>
            Quản lí mã giảm giá
          </Menu.Item>
          <Menu.Item key="/admin/don-hang" icon={<ShoppingCartOutlined />}>
            Quản lí đơn hàng
          </Menu.Item>
          <Menu.Item key="/admin/kich-thuoc" icon={<ExpandOutlined />}>
            Quản lí kích thước
          </Menu.Item>
          <Menu.Item key="/admin/mau-sac" icon={<BgColorsOutlined />}>
            Quản lí màu sắc
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout>
        <Header
          style={{
            padding: '0 16px',
            background: colorBgContainer,
            height: 64,
            display: 'flex',
            alignItems: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            className="text-lg"
          />
          <h1 className="ml-4 text-xl font-semibold hidden md:block">Trang quản trị</h1>
        </Header>

        <Content style={{ height: 'calc(100vh - 64px)', overflow: 'auto', padding: 24 }}>
          <div className="bg-white rounded-xl shadow-sm p-6 min-h-full">
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutAdmin;
