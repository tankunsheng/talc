import React from 'react';
import { render } from 'react-dom';
import 'antd/dist/antd.css';
import './src/styles/style.scss';
import { Layout, Menu } from 'antd';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Typography } from 'antd';
import Home from './src/pages/home';
import Login from './src/pages/login';
import About from './src/pages/about';
import Faqs from './src/pages/faq';
const { Title } = Typography;
const { Header, Content, Sider, Footer } = Layout;
const App = () => {
  console.log(About);
  return (
    <Router>
      <Layout id="page-container">
        <Header
          style={{ backgroundColor: 'white', padding: '10' }}
          className="header"
        >
          <Menu theme="light" mode="horizontal" defaultSelectedKeys={['2']}>
            <Menu.Item className="logo" style={{ float: 'left' }}>
              <Title level={4}>
                <Link to="/">The Afterlife Company TEST</Link>
              </Title>
            </Menu.Item>

            <Menu.Item key="1" style={{ float: 'right' }}>
              Language
            </Menu.Item>
            <Menu.Item key="2" style={{ float: 'right' }}>
              Country
            </Menu.Item>
            <Menu.Item key="3" style={{ float: 'right' }}>
              <Link to="/login">Log In/Sign Up</Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Layout>
          <Sider width={200} className="site-layout-background">
            <Menu
              mode="inline"
              // defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%', borderRight: 0 }}
            >
              <Menu.Item key="1">
                <Link to="/about">ABOUT US</Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/faq/general">FAQs</Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to="/products">PRODUCTS/SERVICES DIRECTORY</Link>
              </Menu.Item>
              <Menu.Item key="4">
                <Link to="/obituary">OBITUARY</Link>
              </Menu.Item>
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
                <Route path="/" exact>
                  <Home />
                </Route>
                <Route path="/login" exact>
                  <Login />
                </Route>
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
        <Footer id="footer" style={{ textAlign: 'center' }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Router>
  );
};

render(<App />, document.getElementById('root'));
