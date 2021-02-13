import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Card, List } from 'antd';
const { Title } = Typography;
import axios from '../libs/axios';
export default () => {
  return (
    <div>
      <Link to="/create-memorial">Create a memorial for a loved one</Link>
    </div>
  );
};
