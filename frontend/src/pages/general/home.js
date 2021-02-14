import React from 'react';
import './about.scss';
import { Link } from 'react-router-dom';
import { Row, Col } from 'antd';
import { Button } from 'antd';
import './home.scss';
export default () => {
  const ButtonSize = 'large';
  return (
    <div className="aboutus">
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/grr7V8Qt6fw"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <br /> <br />
      <Row>
        <Col span={6}></Col>
        <Col span={6}>
          <Button className="home-btn right" size={ButtonSize}>
            <Link to="/directory/Funeral%20Director">
              Contact a Funeral Director Now
            </Link>
          </Button>
        </Col>
        <Col span={6}>
          <Button className="home-btn left" size={ButtonSize}>
            <Link to="/faq/general">FAQs About Funeral Planning</Link>
          </Button>
        </Col>
      </Row>
      <br />
      <Row>
        <Col span={6}></Col>
        <Col span={6}>
          <Button className="home-btn right" size={ButtonSize}>
            <Link to="/faq/steps">Pre and Post Death Planning</Link>
          </Button>
        </Col>
        <Col span={6}>
          <Button className="home-btn left" size={ButtonSize}>
            <Link to="/create-memorial">Create an Online Memorial Page</Link>
          </Button>
        </Col>
      </Row>
    </div>
  );
};
