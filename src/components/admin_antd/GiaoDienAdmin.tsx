import React, { useState } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  AppstoreOutlined,
  DashboardOutlined,
  ShoppingOutlined,
  TagsOutlined,
  BranchesOutlined,
  TeamOutlined,
  PictureOutlined,
} from '@ant-design/icons';

import { Button, Layout, Menu, theme } from 'antd';

const { Header, Sider, Content } = Layout;

interface MenuItem {
  key: string;
  icon: React.ReactNode;
  label: string;
  path: string;
}

// 🛠️ Sửa lại key trùng nhau và cập nhật path đúng
const menuItems: MenuItem[] = [
  { key: '1', icon: <AppstoreOutlined />, label: 'Tài khoản Admin', path: '/giaodien' },
  { key: '2', icon: <DashboardOutlined />, label: 'Dashboard', path: '/giaodien/trang-chu' },
  { key: '3', icon: <ShoppingOutlined />, label: 'Quản lí sản phẩm', path: '/giaodien/products' },
  { key: '4', icon: <TagsOutlined />, label: 'Quản lí danh mục', path: '/giaodien/categories' },
  { key: '5', icon: <BranchesOutlined />, label: 'Quản lí biến thể', path: '/giaodien/variants' },
  { key: '6', icon: <TeamOutlined />, label: 'Quản lí tài khoản', path: '/giaodien/users' },
  { key: '7', icon: <PictureOutlined />, label: 'Quản lí banner', path: '/giaodien/banners' },
  { key: '8', icon: <PictureOutlined />, label: 'Quản lí mã giảm giá', path: '/giaodien/vouchers' },
  { key: '9', icon: <PictureOutlined />, label: 'Quản lí đơn hàng', path: '/giaodien/orders' },
  { key: '10', icon: <PictureOutlined />, label: 'Quản lí kích thước', path: '/giaodien/sizes' },
  { key: '11', icon: <PictureOutlined />, label: 'Quản lí bình luận', path: '/giaodien/comments' },
];

const GiaoDienAdmin: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const selectedKey = menuItems.find(item => item.path === location.pathname)?.key || '1';

  const handleMenuClick = ({ key }: { key: string }) => {
    const selectedItem = menuItems.find(item => item.key === key);
    if (selectedItem?.path) {
      navigate(selectedItem.path);
    }
  };

  return (
    <Layout className="h-screen overflow-hidden"> {/* 🧱 Layout cố định, không cuộn */}
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

        {/* ✅ Chỉ phần nội dung cuộn */}
        <Content style={{ padding: 0 }}>
          <div
            style={{
              height: 'calc(100vh - 64px)', // trừ chiều cao Header
              overflow: 'auto',             // chỉ cuộn ở đây
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

export default GiaoDienAdmin;
