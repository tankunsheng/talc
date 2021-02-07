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
          <Title>Business Profile</Title>
          <Form
            layout="vertical"
            {...layout}
            form={form}
            onFinish={onBusinessProfileSubmit}
          >
            <Row>
              <Col span={12}>
                <Form.Item
                  name="businessName"
                  label="Business Name"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input placeholder="Business name" />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  name="uenNum"
                  label="UEN No."
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input placeholder="UEN number" />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item
                  name="mainContactName"
                  label="Main Contact Name"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input placeholder="Name of the main contact person" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="mainContactNum"
                  label="Main Contact Number"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input placeholder="Contact no. of the main contact person" />
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={12}>
                <Form.Item
                  name="businessAddress"
                  label="Business Address"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input.TextArea
                    placeholder="Business address"
                    autoSize={{ minRows: 2, maxRows: 4 }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="businessEmail"
                  label="Business Email"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input placeholder="Business Email" />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Form.Item
                  name="businessDescription"
                  label="Business Description"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input.TextArea
                    placeholder="Describe your business"
                    autoSize={{ minRows: 2, maxRows: 4 }}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Create/Update
              </Button>
              <Button htmlType="button" onClick={onReset}>
                Reset
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};
