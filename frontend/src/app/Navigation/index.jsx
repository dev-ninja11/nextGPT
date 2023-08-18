import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button, Drawer, Layout, Menu } from 'antd';

import { useAppContext } from '@/context/appContext';
import logoIcon from '@/style/images/logo-icon.svg';
import logoText from '@/style/images/logo-text.svg';
import history from '@/utils/history';

import {
  SettingOutlined,
  CustomerServiceOutlined,
  FileTextOutlined,
  FileSyncOutlined,
  DashboardOutlined,
  TeamOutlined,
  UserOutlined,
  CreditCardOutlined,
  MenuOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;
const { SubMenu } = Menu;

export default function Navigation() {
  return (
    <>
      <div className="sidebar-wraper">
        <Sidebar collapsible={true} />
      </div>
      <MobileSidebar />
    </>
  );
}

function Sidebar({ collapsible }) {
  let location = useLocation();

  const { state: stateApp, appContextAction } = useAppContext();
  const { isNavMenuClose } = stateApp;
  const { navMenu } = appContextAction;
  const [showLogoApp, setLogoApp] = useState(isNavMenuClose);
  const [currentPath, setCurrentPath] = useState(location.pathname);

  useEffect(() => {
    if (location) if (currentPath !== location.pathname) setCurrentPath(location.pathname);
  }, [location, currentPath]);

  useEffect(() => {
    if (isNavMenuClose) {
      setLogoApp(isNavMenuClose);
    }
    const timer = setTimeout(() => {
      if (!isNavMenuClose) {
        setLogoApp(isNavMenuClose);
      }
    }, 200);
    return () => clearTimeout(timer);
  }, [isNavMenuClose]);
  const onCollapse = () => {
    navMenu.collapse();
  };

  return (
    <>
      <Sider
        collapsible={collapsible}
        collapsed={collapsible ? isNavMenuClose : collapsible}
        onCollapse={onCollapse}
        className="navigation"
      >
        <div className="logo" onClick={() => history.push('/')} style={{ cursor: 'pointer' }}>
          <img src={logoIcon} alt="Logo" style={{ height: '32px' }} />

          {!showLogoApp && (
            <img
              src={logoText}
              alt="Logo"
              style={{ marginTop: '3px', marginLeft: '10px', height: '29px' }}
            />
          )}
        </div>
        <Menu mode="inline" selectedKeys={[currentPath]}>
          <Menu.Item key={'/'} icon={<DashboardOutlined />}>
            <Link to={'/'} />
            Dashboard
          </Menu.Item>
          <Menu.Item key={'/customer'} icon={<CustomerServiceOutlined />}>
            <Link to={'/customer'} />
            Customer
          </Menu.Item>
          <Menu.Item key={'/invoice'} icon={<FileTextOutlined />}>
            <Link to={'/invoice'} />
            Invoice
          </Menu.Item>
          <Menu.Item key={'/quote'} icon={<FileSyncOutlined />}>
            <Link to={'/quote'} />
            Quote
          </Menu.Item>
          <Menu.Item key={'/payment/invoice'} icon={<CreditCardOutlined />}>
            <Link to={'/payment/invoice'} />
            Payment Invoice
          </Menu.Item>
          <Menu.Item key={'/employee'} icon={<UserOutlined />}>
            <Link to={'/employee'} />
            Employee
          </Menu.Item>
          <Menu.Item key={'/admin'} icon={<TeamOutlined />}>
            <Link to={'/admin'} />
            Admin
          </Menu.Item>
          <SubMenu key={'Settings'} icon={<SettingOutlined />} title={'Settings'}>
            <Menu.Item key={'/settings'}>
              <Link to={'/settings'} />
              General Settings
            </Menu.Item>
            <Menu.Item key={'/payment/mode'}>
              <Link to={'/payment/mode'} />
              Payment Mode
            </Menu.Item>
            <Menu.Item key={'/role'}>
              <Link to={'/role'} />
              Role
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
    </>
  );
}

function MobileSidebar() {
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  return (
    <>
      <Button type="text" size="large" onClick={showDrawer} className="mobile-sidebar-btn">
        <MenuOutlined />
      </Button>
      <Drawer
        width={200}
        placement="left"
        closable={false}
        onClose={onClose}
        visible={visible}
        className="mobile-sidebar-wraper"
      >
        <Sidebar collapsible={false} />
      </Drawer>
    </>
  );
}
