import React from 'react';
import {
  Row,
  Col,
  Form,
  Input,
  Button,
  Typography,
  Select,
  notification,
  message,
} from 'antd';
const { Title } = Typography;
const layout = {
  labelCol: { span: 10 },
  wrapperCol: { span: 20 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export default () => {
  const [form] = Form.useForm();
  const onBusinessProfileSubmit = async (values) => {
    console.log(values);
  };
  const onReset = () => {
    form.resetFields();
  };
  return (
    <div>
      <Row>
        <Col span={6}></Col>
        <Col span={14}>
          <Title>Store</Title>
          <Form
            layout="vertical"
            {...layout}
            form={form}
            onFinish={onBusinessProfileSubmit}
          >
            <Row>
              <Col span={12}></Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </div>
  );
};
