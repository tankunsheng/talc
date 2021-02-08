import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Input, Button, Typography, notification } from 'antd';
import axios from '../../libs/axios';

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
  const [businessId, setBusinessId] = useState();
  useEffect(() => {
    axios.get('business/profile').then((res) => {
      console.log(res);
      setBusinessId(res.data.businessId);
      form.setFieldsValue(res.data);
    });
  }, []);
  const onBusinessProfileSubmit = async (values) => {
    console.log(values);
    if (businessId) {
      values.businessId = businessId;
      //do update here instead?
    }
    axios.put('business/profile', values).then((res) => {
      console.log(res);
      if (res.status === 200) {
        notification.open({
          message: 'Business profile created',
          description: `Business profile created/updated for ${res.data.name}`,
          duration: 10000,
        });
        setBusinessId(res.data.businessId);
      }
    });
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
                  name="name"
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
                  name="uen"
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
                  name="mainContactNumber"
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
                  name="address"
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
                  name="email"
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
                  name="description"
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
                {businessId ? 'Update' : 'Create'}
              </Button>
              {!businessId && (
                <Button htmlType="button" onClick={onReset}>
                  Reset
                </Button>
              )}
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};
