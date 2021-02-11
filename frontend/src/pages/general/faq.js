import React from 'react';
import { Layout, Menu } from 'antd';
import { Switch, Route, Link } from 'react-router-dom';
const { Content, Sider } = Layout;
export default () => {
  return (
    <div>
      <Layout>
        <Layout>
          <Sider width={200} className="site-layout-background">
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%', borderRight: 0 }}
            >
              <Menu.Item key="1">
                <Link to="/faq/general">General Information</Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/faq/steps">Step by Step Guide Checklist</Link>
              </Menu.Item>
              <Menu.Item key="3">
                Logistics Estate Matters Financial Matters Legal Matters
              </Menu.Item>
              <Menu.Item key="4">Personal Well Being</Menu.Item>
              <Menu.Item key="5">Additional Resources</Menu.Item>
              <Menu.Item key="6">
                Website Information Terms & Conditions Privacy Policy
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
                <Route path="/faq/general">
                  <iframe
                    width="560"
                    height="315"
                    src="https://www.youtube.com/embed/a9__D53WsUs"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  ></iframe>
                  <p>General Information</p>
                  <p>
                    Step 2: Lorem ipsum dolor sit amet, consectetur adipiscing
                    elit. Etiam elementum massa in arcu porta, cursus pharetra
                    neque lacinia. Suspendisse a felis vel neque cursus maximus
                    quis nec est.
                  </p>
                </Route>
                <Route path="/faq/steps">
                  <iframe
                    width="560"
                    height="315"
                    src="https://www.youtube.com/embed/a9__D53WsUs"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  ></iframe>
                  <p>
                    Step 1: Lorem ipsum dolor sit amet, consectetur adipiscing
                    elit. Etiam elementum massa in arcu porta, cursus pharetra
                    neque lacinia.
                  </p>
                  <p>
                    Step 2: Lorem ipsum dolor sit amet, consectetur adipiscing
                    elit. Etiam elementum massa in arcu porta, cursus pharetra
                    neque lacinia. Suspendisse a felis vel neque cursus maximus
                    quis nec est.
                  </p>
                  <p>
                    Step 3: Lorem ipsum dolor sit amet, consectetur adipiscing
                    elit. Etiam elementum massa in arcu porta, cursus pharetra
                    neque lacinia. Suspendisse a felis vel neque cursus maximus
                    quis nec est. Proin in dui consectetur placerat... Read more
                    Click on this link to view directory of services.
                  </p>
                </Route>
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </div>
  );
};
