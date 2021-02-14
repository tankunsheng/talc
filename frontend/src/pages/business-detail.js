import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Typography } from 'antd';
import ProductServiceDetail from './ps-detail';
const { Title } = Typography;
import axios from '../libs/axios';
export default () => {
  const { category, businessId, productService } = useParams();
  const [business, setBusiness] = useState('');
  const productServiceNavText = productService ? `> ${productService}` : '';
  console.log(productService);
  // const [productServices, setProductServices] = useState();
  useEffect(() => {
    axios.get(`business/profile/${businessId}`).then((res) => {
      console.log(res);
      setBusiness(res.data);
    });
  }, []);
  const createLinkBreadcrumbs = () => {
    return (
      <div>
        <Link to={`/directory/${category}`}>{category}</Link>
        {' > '}
        <Link to={`/directory/${category}/${business.businessId}`}>
          {business.name}
        </Link>
        {productServiceNavText && ' > '}
        {productServiceNavText && (
          <Link
            to={`/directory/${category}/${business.businessId}/${productService}`}
          >
            {productService}
          </Link>
        )}
      </div>
    );
  };
  return (
    <div style={{ textAlign: 'center' }}>
      <Title className="title" level={1}>
        {`${category} `}
      </Title>
      <Title style={{ textAlign: 'left' }} level={4}>
        {createLinkBreadcrumbs()}
      </Title>
      <Title level={2}>{business.name}</Title>
      {productService ? (
        <ProductServiceDetail />
      ) : (
        <div>
          About {business.name}
          <p>{business.description}</p>
        </div>
      )}
    </div>
  );
};
