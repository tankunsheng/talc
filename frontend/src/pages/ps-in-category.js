import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import './about.scss';
import { Typography, Card, List, Avatar, Button, Skeleton } from 'antd';
const { Title } = Typography;
import axios from '../libs/axios';
export default () => {
  let { category } = useParams();
  const [productServices, setProductServices] = useState();
  useEffect(() => {
    axios.get(`business/product-service/${category}`).then((res) => {
      console.log(res);
      setProductServices(res.data);
    });
  }, []);
  const history = useHistory();
  return (
    <div>
      <Title className="title" level={3}>
        {category}
      </Title>
      <List
        className="demo-loadmore-list"
        // loading={initLoading}
        itemLayout="horizontal"
        // loadMore={loadMore}
        dataSource={productServices}
        renderItem={(item) => (
          <List.Item actions={[<a key="list-loadmore-edit">View Profile</a>]}>
            <Skeleton avatar title={true} loading={false} active>
              <List.Item.Meta
                avatar={
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                }
                title={
                  <a href="https://ant.design">{item.productServiceName}</a>
                }
                description="Description here"
              />
              <div>content</div>
            </Skeleton>
          </List.Item>
        )}
      />
      {/* <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 4,
          lg: 4,
          xl: 6,
          xxl: 6,
        }}
        dataSource={productServices}
        renderItem={(item) => (
          <List.Item>
            <Card
              style={{ cursor: 'pointer' }}
              onClick={() => {
                console.log(item);
                history.push(`/directory/${item.name}`);
              }}
              title={item.productServiceName}
            >
              content
            </Card>
          </List.Item>
        )}
      /> */}
      ,
    </div>
  );
};
