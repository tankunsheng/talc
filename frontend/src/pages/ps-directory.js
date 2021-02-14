import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Typography, Card, List } from 'antd';
const { Title } = Typography;
import axios from '../libs/axios';
export default () => {
  const [categories, setCategories] = useState();
  useEffect(() => {
    axios.get('category/list').then((res) => {
      console.log(res);
      setCategories(res.data);
    });
  }, []);
  return (
    <div>
      <Title className="title" level={2}>
        Products/Services Directory
      </Title>
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 4,
          lg: 4,
          xl: 6,
          xxl: 6,
        }}
        dataSource={categories}
        renderItem={(item) => (
          <List.Item>
            <Link to={`/directory/${item.name}`}>
              <Card style={{ cursor: 'pointer' }} title={item.name}>
                content
              </Card>
              {item.productServiceName}
            </Link>
          </List.Item>
        )}
      />
      ,
    </div>
  );
};
