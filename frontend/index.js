import React from 'react';
import { render } from 'react-dom';
import 'antd/dist/antd.css';
import './src/styles/style.scss';
import { Layout, Menu } from 'antd';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

// import  NotificationOutlined,'@ant-design/icons';
import About from './src/pages/about';
import Faqs from './src/pages/faq';

const { Header, Content, Sider } = Layout;
const App = () => {
  console.log(About);
  return (
    <Router>
      <Layout>
        <Header
          style={{ backgroundColor: 'white', padding: '0' }}
          className="header"
        >
          <div className="logo" />
          <Menu
            theme="light"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            style={{ float: 'right' }}
          >
            <Menu.Item key="1">Log In/Sign Up</Menu.Item>
            <Menu.Item key="2">Language</Menu.Item>
            <Menu.Item key="3">Country</Menu.Item>
          </Menu>
        </Header>
        <Layout>
          <Sider width={200} className="site-layout-background">
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%', borderRight: 0 }}
            >
              <Menu.Item key="1">
                <Link to="/about">ABOUT US</Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/faq">FAQs</Link>
              </Menu.Item>
              <Menu.Item key="3">PRODUCTS/SERVICES DIRECTORY</Menu.Item>
              <Menu.Item key="4">OBITUARY</Menu.Item>

              {/* <SubMenu
              key="sub3"
              icon={<NotificationOutlined />}
              title="subnav 3"
            >
              <Menu.Item key="9">option9</Menu.Item>
              <Menu.Item key="10">option10</Menu.Item>
              <Menu.Item key="11">option11</Menu.Item>
              <Menu.Item key="12">option12</Menu.Item>
            </SubMenu> */}
            </Menu>
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              <Switch>
                <Route path="/about">
                  <About />
                </Route>
                <Route path="/faq">
                  <Faqs />
                </Route>
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </Router>
  );
};

render(<App />, document.getElementById('root'));
