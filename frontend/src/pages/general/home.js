import React from 'react';
import './about.scss';
import { Typography } from 'antd';
import { Row, Col } from 'antd';
import { Button } from 'antd';
import './home.scss';
const { Title } = Typography;
export default () => {
  const ButtonSize = 'large';
  return (
    <div className="aboutus">
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/lbSOLBMUvIE"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
      <br /> <br />
      <Row>
        <Col span={6}></Col>
        <Col span={6}>
          <Button className="home-btn right" size={ButtonSize}>
            Contact a Funeral Director Now
          </Button>
        </Col>
        <Col span={6}>
          <Button className="home-btn left" size={ButtonSize}>
            FAQs About Funeral Planning
          </Button>
        </Col>
      </Row>
      <br />
      <Row>
        <Col span={6}></Col>
        <Col span={6}>
          <Button className="home-btn right" size={ButtonSize}>
            Pre and Post Death Planning
          </Button>
        </Col>
        <Col span={6}>
          <Button className="home-btn left" size={ButtonSize}>
            Create an Online Memorial Page
          </Button>
        </Col>
      </Row>
    </div>
  );
};
