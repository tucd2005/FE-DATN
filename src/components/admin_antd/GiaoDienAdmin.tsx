import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DashboardOutlined,
  AppstoreOutlined,
  ShoppingOutlined,
  UserOutlined,
  OrderedListOutlined,
  FileTextOutlined,
  SafetyOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { useNavigate, Outlet } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

// Menu items vhieenr thị bên sadebar
const menuItems = [
  {
    key: 'dashboard',
    icon: <DashboardOutlined />,
    label: 'Dashboard',
    path: '/admin/dashboard',
  },
  {
    key: 'categories',
    icon: <AppstoreOutlined />,
    label: 'Quản lí Danh mục',
    path: '/admin/categories',
  },
  {
    key: 'products',
    icon: <ShoppingOutlined />,
    label: 'Quản lí Sản phẩm',
    path: '/admin/products',
  },
  {
    key: 'users',
    icon: <UserOutlined />,
    label: 'Quản lý người dùng',
    path: '/admin/users',
  },
  {
    key: 'orders',
    icon: <OrderedListOutlined />,
    label: 'Quản lý đơn hàng',
    path: '/admin/orders',
  },
  {
    key: 'posts',
    icon: <FileTextOutlined />,
    label: 'Quản lý bài viết / tin tức',
    path: '/admin/posts',
  },
  {
    key: 'roles',
    icon: <SafetyOutlined />,
    label: 'Quản lý quyền & vai trò',
    path: '/admin/roles',
  },
];

const GiaoDienAdmin: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();

  return (
    <Layout className='min-h-screen'>     {/*để kiểu này cho nó dài đủ của màn hình   */}
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)' }} />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['dashboard']}
          onClick={({ key }) => {
            const item = menuItems.find((item) => item.key === key);
            if (item) navigate(item.path);
          }}
          items={menuItems.map(({ key, icon, label }) => ({
            key,
            icon,
            label,
          }))}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default GiaoDienAdmin;
