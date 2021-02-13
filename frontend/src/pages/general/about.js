import React from 'react';
import './about.scss';
import { Typography } from 'antd';

const { Title } = Typography;
// import test from '../../assets/talc_aboutus.PNG';
export default () => {
  return (
    <div className="aboutus">
      {/* <img src={test} /> */}
      <img src="https://upload.wikimedia.org/wikipedia/commons/8/85/Logo-Test.png" />
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
    </div>
  );
};
