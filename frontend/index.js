import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import 'antd/dist/antd.css';
import './src/styles/style.scss';
import { Layout, Menu, Typography } from 'antd';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Home from './src/pages/general/home';
import Login from './src/pages/general/login';
import About from './src/pages/general/about';
import Faqs from './src/pages/general/faq';
import ProductServiceDirectory from './src/pages/ps-directory';
import ProductServiceInCategory from './src/pages/ps-in-category';
import BusinessDetail from './src/pages/business-detail';
import ProductServiceDetail from './src/pages/ps-detail';
import axios from './src/libs/axios';
import { BusinessProfile, Store } from './src/pages/business-partner';
import { UserContext, BusinessContext } from './src/app-context';
import { UserOutlined, EyeOutlined } from '@ant-design/icons';
const { Title } = Typography;
const { Header, Content, Sider, Footer } = Layout;
const { SubMenu } = Menu;
const history = createBrowserHistory();

const App = () => {
  const [user, setUser] = useState();
  const [mode, setMode] = useState('user');
  useEffect(() => {
    axios.get('/app').then((res) => {
      setUser(res);
    });
  }, []);
  const logout = async () => {
    await axios.get('app/logout');
    window.location = '/';
    message.success('Successfuly logged out!');
  };

  return mode === 'user' ? (
    <UserContext.Provider
      value={{
        user,
        // user: user,
        setUser,
      }}
    >
      <Router>
        <Layout id="page-container">
          <Header
            style={{ backgroundColor: 'white', padding: '10' }}
            className="header"
          >
            <UserContext.Consumer>
              {({ user }) => {
                console.log(user);
                return (
                  <Menu
                    theme="light"
                    mode="horizontal"
                  // defaultSelectedKeys={['2']}
                  >
                    <Menu.Item className="logo" style={{ float: 'left' }}>
                      <Title level={4}>
                        <Link to="/">The Afterlife Company</Link>
                      </Title>
                    </Menu.Item>
                    <Menu.Item key="1" style={{ float: 'right' }}>
                      Language
                    </Menu.Item>
                    <Menu.Item key="2" style={{ float: 'right' }}>
                      Country
                    </Menu.Item>
                    {!user && (
                      <Menu.Item key="3" style={{ float: 'right' }}>
                        <Link to="/login">Log In/Sign Up</Link>
                      </Menu.Item>
                    )}
                    {user && (
                      <SubMenu
                        style={{ float: 'right' }}
                        key="sub2"
                        icon={<UserOutlined />}
                        title="User"
                      >
                        <Menu.ItemGroup>
                          <Menu.Item key="1">Profile</Menu.Item>
                          <Menu.Item key="2" onClick={logout}>
                            Log out
                          </Menu.Item>
                        </Menu.ItemGroup>
                      </SubMenu>
                    )}
                    {user && (
                      <SubMenu key="sub1" icon={<EyeOutlined />} title="Mode">
                        <Menu.ItemGroup>
                          <Menu.Item
                            key="1"
                            onClick={() => {
                              setMode('business');
                              history.push('/bp/store');
                            }}
                          >
                            Business
                          </Menu.Item>
                          <Menu.Item
                            key="2"
                            onClick={() => {
                              setMode('user');
                              history.push('/about');
                            }}
                          >
                            User
                          </Menu.Item>
                        </Menu.ItemGroup>
                      </SubMenu>
                    )}
                  </Menu>
                );
              }}
            </UserContext.Consumer>
          </Header>
          <Layout>
            <Sider width={250} className="site-layout-background">
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
                  <Link to="/directory">PRODUCTS/SERVICES DIRECTORY</Link>
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
                  <Route path="/directory" exact>
                    <ProductServiceDirectory />
                  </Route>
                  <Route path="/directory/:category" exact>
                    <ProductServiceInCategory />
                  </Route>
                  <Route path="/directory/:category/:business/:productService?">
                    <BusinessDetail />
                  </Route>
                  {/* <Route path="/directory/:category/:business/:productService">
                    <ProductServiceDetail />
                  </Route> */}

                </Switch>
              </Content>
            </Layout>
          </Layout>
          <Footer id="footer" style={{ textAlign: 'center' }}>
            TALC@2020 Created by Quintant
          </Footer>
        </Layout>
      </Router>
    </UserContext.Provider>
  ) : (
      <BusinessContext.Provider
        value={{
          user,
          setUser,
        }}
      >
        <Router>
          <Layout id="page-container">
            <Header
              style={{ backgroundColor: 'white', padding: '10' }}
              className="header"
            >
              <BusinessContext.Consumer>
                {({ user }) => {
                  console.log(user);
                  return (
                    <Menu
                      theme="light"
                      mode="horizontal"
                    // defaultSelectedKeys={['2']}
                    >
                      <Menu.Item className="logo" style={{ float: 'left' }}>
                        <Title level={4}>
                          <Link to="/">The Afterlife Company (Business)</Link>
                        </Title>
                      </Menu.Item>

                      {!user && (
                        <Menu.Item key="3" style={{ float: 'right' }}>
                          <Link to="/login">Log In/Sign Up</Link>
                        </Menu.Item>
                      )}
                      {user && (
                        <SubMenu
                          style={{ float: 'right' }}
                          key="sub2"
                          icon={<UserOutlined />}
                          title="User"
                        >
                          <Menu.ItemGroup>
                            <Menu.Item key="1">Profile</Menu.Item>
                            <Menu.Item key="2" onClick={logout}>
                              Log out
                          </Menu.Item>
                          </Menu.ItemGroup>
                        </SubMenu>
                      )}
                      {user && (
                        <SubMenu
                          key="sub1"
                          icon={<EyeOutlined />}
                          title="Mode"
                          selectedKeys={[1]}
                        >
                          <Menu.ItemGroup>
                            <Menu.Item
                              key="1"
                              onClick={() => {
                                setMode('business');
                                history.push('/bp/store');
                              }}
                            >
                              Business
                          </Menu.Item>
                            <Menu.Item
                              key="2"
                              onClick={() => {
                                setMode('user');
                                history.push('/about');
                              }}
                            >
                              User
                          </Menu.Item>
                          </Menu.ItemGroup>
                        </SubMenu>
                      )}
                    </Menu>
                  );
                }}
              </BusinessContext.Consumer>
            </Header>
            <Layout>
              <Sider width={250} className="site-layout-background">
                <Menu
                  mode="inline"
                  defaultOpenKeys={['sub1']}
                  style={{ height: '100%', borderRight: 0 }}
                >
                  <Menu.Item key="1">
                    <Link to="/bp/profile">Business Profile</Link>
                  </Menu.Item>
                  <Menu.Item key="2">
                    <Link to="/bp/store">My Store</Link>
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
                    <Route path="/bp/profile">
                      <BusinessProfile />
                    </Route>
                    <Route path="/bp/store">
                      <Store />
                    </Route>
                  </Switch>
                </Content>
              </Layout>
            </Layout>
            <Footer id="footer" style={{ textAlign: 'center' }}>
              TALC@2020 Created by Quintant
          </Footer>
          </Layout>
        </Router>
      </BusinessContext.Provider>
    );
};

render(<App />, document.getElementById('root'));
