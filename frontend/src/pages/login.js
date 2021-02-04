import React from 'react';
import './about.scss';
import { Row, Col } from 'antd';
import { Tabs } from 'antd';
const { TabPane } = Tabs;
import { Form, Input, Button, Select, DatePicker } from 'antd';
import './login.scss';
import axios from '../libs/axios';

function callback(key) {
  console.log(key);
}
const { Option } = Select;

const layout = {
  labelCol: { span: 10 },
  wrapperCol: { span: 14 },
};
const loginLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export default () => {
  const [form] = Form.useForm();
  const onGenderChange = (value) => {
    switch (value) {
      case 'male':
        form.setFieldsValue({
          note: 'Hi, man!',
        });
        return;

      case 'female':
        form.setFieldsValue({
          note: 'Hi, lady!',
        });
        return;
    }
  };
  const onSubmit = async (values) => {
    console.log(values);
    const test = await axios.get('app/signup');
    console.log(test);
  };
  const onReset = () => {
    form.resetFields();
  };
  return (
    <div>
      <Row>
        <Col span={9}></Col>
        <Col span={6}>
          <Tabs defaultActiveKey="2" onChange={callback}>
            <TabPane tab="Log In" key="1">
              <Form
                layout="horizontal"
                {...loginLayout}
                form={form}
                name="control-ref"
                onFinish={onSubmit}
              >
                <Form.Item
                  name="username"
                  label="Username"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input placeholder="username" />
                </Form.Item>
                <Form.Item
                  name="password"
                  label="Password"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input placeholder="password" />
                </Form.Item>

                <Form.Item {...tailLayout}>
                  <Button type="primary" htmlType="submit">
                    Log In
                  </Button>
                </Form.Item>
              </Form>
            </TabPane>
            <TabPane tab="Sign Up" key="2">
              <Form
                layout="horizontal"
                {...layout}
                form={form}
                name="control-ref"
                onFinish={onSubmit}
              >
                <Form.Item
                  name="username"
                  label="Username"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input placeholder="username" />
                </Form.Item>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    {
                      required: true,
                    },
                    () => {
                      return {
                        validator: (_, value) => {
                          console.log(value);
                          if (value.includes('@')) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            'Please enter a valid email address!',
                          );
                        },
                      };
                    },
                  ]}
                >
                  <Input placeholder="email" />
                </Form.Item>
                <Form.Item
                  name="password"
                  label="Password"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your password!',
                    },
                  ]}
                >
                  <Input.Password placeholder="password" />
                </Form.Item>
                <Form.Item
                  name="confirmPassword"
                  label="Confirm Password"
                  rules={[
                    {
                      required: true,
                      message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          'The two passwords that you entered do not match!',
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password placeholder="confirm password" />
                </Form.Item>

                <Form.Item name="dob" label="Date of Birth and Gender">
                  <DatePicker placeholder="date of birth" />
                  <Form.Item
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Select placeholder="Gender" onChange={onGenderChange}>
                      <Option value="male">male</Option>
                      <Option value="female">female</Option>
                    </Select>
                  </Form.Item>
                </Form.Item>

                <Form.Item {...tailLayout}>
                  <Button type="primary" htmlType="submit">
                    Sign Up
                  </Button>
                  <Button htmlType="button" onClick={onReset}>
                    Reset
                  </Button>
                </Form.Item>
              </Form>
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    </div>
  );
};
