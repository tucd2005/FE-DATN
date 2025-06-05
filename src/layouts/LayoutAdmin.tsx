import React, { useState } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  AppstoreOutlined,
  DashboardOutlined,
  TagsOutlined,
  BranchesOutlined,
  TeamOutlined,
  PictureOutlined,
  GiftOutlined,
  ShoppingCartOutlined,
  ExpandOutlined, // Replaced ResizeOutlined with ExpandOutlined
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
  { key: '1', icon: <DashboardOutlined />, label: 'Dashboard', path: '/admin' },
  { key: '2', icon: <AppstoreOutlined />, label: 'Quản lí danh mục', path: '/admin/danh-muc' },
  { key: '3', icon: <TagsOutlined />, label: 'Quản lí sản phẩm', path: '/admin/san-pham' },
  { key: '4', icon: <BranchesOutlined />, label: 'Quản lí biến thể', path: '/admin/bien-the' },
  { key: '5', icon: <TeamOutlined />, label: 'Quản lí tài khoản', path: '/admin/tai-khoan' },
  { key: '6', icon: <PictureOutlined />, label: 'Quản lí banner', path: '/admin/banner' },
  { key: '7', icon: <GiftOutlined />, label: 'Quản lí mã giảm giá', path: '/admin/ma-giam-gia' },
  { key: '8', icon: <ShoppingCartOutlined />, label: 'Quản lí đơn hàng', path: '/admin/don-hang' },
  { key: '9', icon: <ExpandOutlined />, label: 'Quản lí kích thước', path: '/admin/kich-thuoc' }, // Updated icon
  { key: '10', icon: <ExpandOutlined />, label: 'Quản lí màu sắc', path: '/admin/mau-sac' }, // Updated icon
];

const LayoutAdmin: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const selectedKey =
    menuItems.find((item) => location.pathname.startsWith(item.path))?.key || '2';

  const handleMenuClick = ({ key }: { key: string }) => {
    const selectedItem = menuItems.find((item) => item.key === key);
    if (selectedItem?.path) {
      navigate(selectedItem.path);
    }
  };

  return (
    <Layout className="h-screen overflow-hidden">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="h-16 bg-gray-800" />
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
          items={menuItems}
          onClick={handleMenuClick}
        />
      </Sider>
      <Layout>
        <Header
          style={{ padding: 0, background: colorBgContainer }}
          className="h-16 flex items-center"
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            className="text-lg w-16 h-16"
          />
        </Header>
        <Content style={{ padding: 0 }}>
          <div
            style={{
              height: 'calc(100vh - 64px)',
              overflow: 'auto',
            }}
            className="p-6 bg-white rounded-lg"
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutAdmin;