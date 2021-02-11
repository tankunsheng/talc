import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography } from 'antd';
import ProductServiceDetail from './ps-detail'
const { Title } = Typography;
import axios from '../libs/axios';
export default () => {
    const { category, businessId, productService } = useParams();
    const [business, setBusiness] = useState("");
    const productServiceNavText = productService ? `> ${productService}` : ""
    console.log(productService)
    // const [productServices, setProductServices] = useState();
    useEffect(() => {
        axios.get(`business/profile/${businessId}`).then((res) => {
            console.log(res);
            setBusiness(res.data);
        });
    }, []);
    return (
        <div style={{ "textAlign": "center" }}>
            <Title className="title" level={1}>
                {`${category} `}
            </Title>
            <Title style={{ "textAlign": "left" }} level={4}>
                {`${category} > ${business.name} ${productServiceNavText}`}
            </Title>
            <Title className="title" level={2}>
                {business.name}
            </Title>
            {
                productService ? <ProductServiceDetail />
                    : <div>
                        About {business.name}
                        <p>
                            {business.description}
                        </p>
                    </div>
            }
        </div>
    );
};
