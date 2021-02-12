import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography } from 'antd';
const { Title } = Typography;
import axios from '../libs/axios';
export default () => {
  let { businessId, productService } = useParams();
  const [productServiceDetail, setProductServiceDetail] = useState();
  useEffect(() => {
    axios
      .get(`business/product-service/${businessId}/${productService}`)
      .then((res) => {
        console.log(res);
        setProductServiceDetail(res.data);
      });
  }, []);
  return (
    <div style={{ textAlign: 'center' }}>
      <Title className="title" level={1}>
        Product details here
      </Title>
      {productServiceDetail && (
        <div>
          <h2>{productServiceDetail.name}</h2>
          <p> ${productServiceDetail.price}</p>
          <p>{productServiceDetail.description}</p>
        </div>
      )}
    </div>
  );
};
