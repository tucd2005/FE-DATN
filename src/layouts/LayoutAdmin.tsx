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
  ExpandOutlined,
  UserOutlined,
  BgColorsOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';

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
    navigate(key); // key chính là path
  };

  return (
    <Layout className="h-screen overflow-hidden">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="h-16 bg-gray-800" />
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
          onClick={handleMenuClick}
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
        <Header style={{ padding: 0, background: colorBgContainer }} className="h-16 flex items-center">
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
