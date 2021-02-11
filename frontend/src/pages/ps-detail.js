import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Typography, List, Skeleton } from 'antd';
const { Title } = Typography;
import axios from '../libs/axios';
export default () => {
  let { category, business, productService } = useParams();
  const [productServices, setProductServices] = useState();
  // useEffect(() => {
  //   axios.get(`business/product-service/${category}`).then((res) => {
  //     console.log(res);
  //     setProductServices(res.data);
  //   });
  // }, []);
  // const history = useHistory();
  return (
    <div style={{ "textAlign": "center" }}>
      <Title className="title" level={1}>
        {`${category} `}
      </Title>
      <Title style={{ "textAlign": "left" }}  level={4}>
        {`${category} > ${business} > ${productService}`}
      </Title>
      <Title className="title" level={2}>
        {business}
      </Title>
      <Title level={3}>
        {productService}
      </Title>
    </div>
  );
};
