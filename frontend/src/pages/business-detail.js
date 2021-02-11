import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Typography, List, Skeleton } from 'antd';
import ProductServiceDetail from './ps-detail'
const { Title } = Typography;
import axios from '../libs/axios';
export default () => {
    const { category, business, productService } = useParams();
    const productServiceNavText = productService ? `> ${productService}` : ""
    console.log(productService)
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
            <Title style={{ "textAlign": "left" }} level={4}>
                {`${category} > ${business} ${productServiceNavText}`}
            </Title>
            <Title className="title" level={2}>
                {business}
            </Title>
            {productService && <ProductServiceDetail />}
        </div>
    );
};
