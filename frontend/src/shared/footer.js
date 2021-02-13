import React from 'react';
import { Layout, Row, Col } from 'antd';
const { Footer } = Layout;
export default () => {
  return (
    <Footer id="footer" style={{ textAlign: 'center' }}>
      <Row gutter={[24]}>
        <Col span={8}>
          <h3 style={{ color: 'white' }}>The Afterlife Company</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
            elementum massa in arcu porta, cursus pharetra neque lacinia.
            Suspendisse a felis vel neque cursus maximus quis nec est.... Read
            more
          </p>
        </Col>
        <Col span={4}>
          <h3 style={{ color: 'white' }}>ABOUT US</h3>
          <p>Blog</p>
          <p>Press Release</p>
        </Col>
        <Col span={4}>
          <h3 style={{ color: 'white' }}>TERMS OF USE</h3>
          <p>Terms and Conditions</p>
          <p>Privacy Policy</p>
        </Col>
        <Col span={4}>
          <h3 style={{ color: 'white' }}>User</h3>
        </Col>
        <Col span={4}>
          <h3 style={{ color: 'white' }}>Business</h3>
        </Col>
      </Row>
    </Footer>
  );
};
