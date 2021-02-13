import React from 'react';
import './about.scss';
import { Typography, Row, Col } from 'antd';

const { Title } = Typography;
import talc_logo from '../../assets/talc_aboutus.png';
import b2bIcon from '../../assets/b2b_icon.png';
import psIcon from '../../assets/ps_dir_icon.png';
import obIcon from '../../assets/obituaries_icon.png';
import cspIcon from '../../assets/csp_icon.png';
export default () => {
  return (
    <div className="aboutus">
      <img src={talc_logo} />
      <br />
      <br />
      <Title className="title" level={4}>
        Vision
      </Title>
      <p>Making everything easier, one loss at a time</p>
      <Title className="title" level={4}>
        Mission
      </Title>
      <p>
        To create a comprehensive directory of products and services to simplify
        the bereavement process
      </p>
      <p>
        We cannot fathom the anguish of the loss of a loved one. We sincerely
        hope that one need not use our services.
      </p>
      <p>In an event that you do;</p>
      <p>
        We are here for you and will do everything we can to make it as easy as
        possible.
      </p>
      <br />
      <br />
      <Row>
        <Col span={3} offset={6}>
          <img src={psIcon} />
          <p> Full directory of products & services</p>
        </Col>
        <Col span={3}>
          <img src={obIcon} />
          <p>Public obituary</p>
        </Col>
        <Col span={3}>
          <img src={cspIcon} />
          <p> Custom service page for your loved one</p>
        </Col>
        <Col span={3}>
          <img src={b2bIcon} />
          <p>B2B listing platform</p>
        </Col>
      </Row>
    </div>
  );
};
