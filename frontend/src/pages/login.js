import React from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../app-context';
import './about.scss';
import { Row, Col } from 'antd';
import { Tabs } from 'antd';
const { TabPane } = Tabs;
import {
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  notification,
  message,
} from 'antd';
import './login.scss';
import axios from '../libs/axios';

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
  const [loginForm] = Form.useForm();
  const history = useHistory();
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
  const openNotification = () => {
    notification.open({
      message: 'Please verify your email address',
      description:
        'Thank you for signing up. In order to access all services, please verify the email address used for registration by clicking on the link in the confirmation mail sent to the address.',
      onClick: () => {
        console.log('Notification Clicked!');
      },
      duration: 0,
    });
    history.push('/');
  };
  const onSignUpSubmit = async (values) => {
    console.log(values);
    const response = await axios.post('app/signup', {
      ...values,
    });
    console.log(response);
    if (response.status === 201) {
      openNotification();
    }
  };
  const onLoginSubmit = async (values, setUser) => {
    const response = await axios
      .post('app/login', {
        ...values,
      })
      .catch((err) => {
        console.log(err.response.data.message);
        message.error(err.response.data.message);
      });
    console.log(response);
    if (response.status === 201) {
      message.success('Successfuly logged in!');
      setUser(response.data);
      history.push('/');
    }
  };
  const onReset = () => {
    form.resetFields();
  };
  return (
    <UserContext.Consumer>
      {({ setUser }) => (
        <div>
          <Row>
            <Col span={9}></Col>
            <Col span={6}>
              <Tabs defaultActiveKey="1">
                <TabPane tab="Log In" key="1">
                  <Form
                    layout="horizontal"
                    {...loginLayout}
                    form={loginForm}
                    name="control-ref"
                    onFinish={(values) => {
                      onLoginSubmit(values, setUser);
                    }}
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
                      <Input.Password placeholder="password" />
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
                    onFinish={onSignUpSubmit}
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
                              // console.log(value);
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
      )}
    </UserContext.Consumer>
  );
};
