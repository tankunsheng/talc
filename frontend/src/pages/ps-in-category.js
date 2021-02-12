import React, { useEffect, useState } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import './general/about.scss';
import { Typography, List, Skeleton } from 'antd';
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
        itemLayout="vertical"
        // loadMore={loadMore}
        dataSource={productServices}
        renderItem={(item) => (
          <List.Item
          // actions={[<a key="list-loadmore-edit">View Profile</a>]}
          >
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
              {item.productService.description}
              <div></div>
            </Skeleton>
          </List.Item>
        )}
      />
    </div>
  );
};
