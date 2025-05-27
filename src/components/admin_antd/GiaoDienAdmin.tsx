import React, { useState } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom'; // Thêm Outlet
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';

const { Header, Sider, Content } = Layout;

interface MenuItem {
  key: string;
  icon: React.ReactNode;
  label: string;
  path: string;
}

const menuItems: MenuItem[] = [
  { key: '1', icon: <UserOutlined />, label: 'Tài khoản Admin', path: '/giaodien' },
  { key: '2', icon: <VideoCameraOutlined />, label: 'Dashboard', path: '/giaodien/trang-chu' },
  { key: '3', icon: <UploadOutlined />, label: 'Quản lí sản phẩm', path: '/giaodien/products' },
  { key: '4', icon: <UploadOutlined />, label: 'Quản lí danh mục', path: '/giaodien/categories' },
  { key: '5', icon: <UploadOutlined />, label: 'Quản lí biến thể', path: '/giaodien/variants' },
  { key: '6', icon: <UploadOutlined />, label: 'Quản lí tài khoản', path: '/giaodien/users' },
  { key: '7', icon: <UploadOutlined />, label: 'Quản lí banner', path: '/giaodien/banners' },
];

// Component chính cho giao diện admin với sidebar và content
const GiaoDienAdmin: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Để đồng bộ menu với route
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // Đồng bộ menu với route hiện tại
  const selectedKey = menuItems.find(item => item.path === location.pathname)?.key || '1';

  // Xử lý click menu để điều hướng
  const handleMenuClick = ({ key }: { key: string }) => {
    const selectedItem = menuItems.find(item => item.key === key);
    if (selectedItem?.path) {
      navigate(selectedItem.path);
    }
  };

  return (
    <Layout className="min-h-screen">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="h-16 bg-gray-800" /> {/* Logo placeholder */}
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
          items={menuItems}
          onClick={handleMenuClick}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            className="text-lg w-16 h-16"
          />
        </Header>
        <Content className="m-6 p-6 min-h-[280px] bg-white rounded-lg">
          {/* Render các route con tại đây */}
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default GiaoDienAdmin;