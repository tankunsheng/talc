import React from 'react';
import { Typography, Row, Col, Form, Input, Button, message } from 'antd';
const { Title } = Typography;
const layout = {
  labelCol: { span: 10 },
  wrapperCol: { span: 24 },
};

export default () => {
  const [form] = Form.useForm();
  const onContactusSubmit = async (values) => {
    console.log(values);
  };
  return (
    <div>
      <Title className="title" level={2}>
        Get in Touch
      </Title>
      <Row>
        <Col span={8}>
          <p>Sample Address 35 Orchard Rd, Singapore 238823</p>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.7807513749503!2d103.84091151525598!3d1.3067092620752983!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da199538dcd8ff%3A0x2725370a3ff36cd0!2sThe%20Istana!5e0!3m2!1sen!2ssg!4v1613224475392!5m2!1sen!2ssg"
            width="100%"
            height="100%"
            frameborder="0"
            style={{ border: 0, paddingRight: '5em' }}
            allowfullscreen=""
            aria-hidden="false"
            tabindex="0"
          ></iframe>
        </Col>
        <Col span={12}>
          <Title className="title" level={4}>
            Send us a message
          </Title>
          <Form
            layout="vertical"
            {...layout}
            form={form}
            onFinish={onContactusSubmit}
          >
            <Row gutter={[8]}>
              <Col span={12}>
                <Form.Item
                  name="name"
                  rules={[
                    {
                      required: true,
                      max: 100,
                    },
                  ]}
                >
                  <Input placeholder="Name" />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  name="contact"
                  rules={[
                    {
                      required: true,
                      max: 50,
                    },
                  ]}
                >
                  <Input placeholder="Contact Number" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[8]}>
              <Col span={12}>
                <Form.Item
                  name="email"
                  rules={[
                    {
                      max: 100,
                      required: true,
                    },
                  ]}
                >
                  <Input placeholder="Email" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="mainContactNumber"
                  rules={[
                    {
                      len: 8,
                      required: true,
                    },
                  ]}
                >
                  <Input placeholder="Contact no. of the main contact person" />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  name="feedback"
                  label=""
                  rules={[
                    {
                      required: true,
                      max: 5000,
                    },
                  ]}
                >
                  <Input.TextArea
                    placeholder=""
                    autoSize={{ minRows: 6, maxRows: 8 }}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col offset={20} span={4}>
                <Form.Item style={{ textAlign: 'right' }}>
                  <Button
                    size="large"
                    type="primary"
                    htmlType="submit"
                    onClick={() =>
                      message.warning(
                        'To Be Implemented. To decide on where to send the message to.',
                      )
                    }
                  >
                    SEND
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </div>
  );
};
