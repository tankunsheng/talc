import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Typography, List, Skeleton } from 'antd';
const { Title, Paragraph } = Typography;
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
  return (
    <div>
      <Title className="title" level={3}>
        {category}
      </Title>
      <List
        className="demo-loadmore-list"
        itemLayout="vertical"
        dataSource={productServices}
        renderItem={(item) => (
          <List.Item>
            <Skeleton title={true} loading={false} active>
              <List.Item.Meta
                title={
                  <Link
                    to={`/directory/${item.catName}/${item.productService.business.businessId}/${item.productServiceName}`}
                  >
                    {item.productServiceName}
                  </Link>
                }
                description={
                  <Link
                    to={`/directory/${item.catName}/${item.productService.business.businessId}`}
                  >
                    {item.productService.business.name}
                  </Link>
                }
              />
              <Paragraph
                ellipsis={{ rows: 3, expandable: true, symbol: 'more' }}
              >
                {item.productService.description}
              </Paragraph>
              <div></div>
            </Skeleton>
          </List.Item>
        )}
      />
    </div>
  );
};
