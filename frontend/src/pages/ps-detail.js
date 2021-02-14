import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Image } from 'antd';
const { Title } = Typography;
import axios from '../libs/axios';
export default () => {
  let { businessId, productService } = useParams();
  const [productServiceDetail, setProductServiceDetail] = useState();
  const [images, setImages] = useState();
  useEffect(() => {
    axios
      .get(`business/product-service/${businessId}/${productService}`)
      .then((res) => {
        console.log(res);
        setProductServiceDetail(res.data);
        const images = res.data.productServiceImages.map((eachImage) => {
          return (
            <Image
              width={150}
              height={150}
              src={eachImage.imageLink}
              style={{ objectFit: 'contain' }}
            />
          );
        });
        setImages(images);
      });
  }, []);
  return (
    <div style={{ textAlign: 'center' }}>
      {/* <Title className="title" level={1}>
        Product details here
      </Title> */}
      {productServiceDetail && (
        <div>
          <h3>{productServiceDetail.name}</h3>
          <Image.PreviewGroup>{images}</Image.PreviewGroup>
          <p>
            <b> ${productServiceDetail.price}</b>
          </p>
          <p>{productServiceDetail.description}</p>
        </div>
      )}
    </div>
  );
};
