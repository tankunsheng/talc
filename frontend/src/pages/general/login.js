import React from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../app-context';
import './about.scss';
import { Row, Col, Tabs } from 'antd';
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
import axios from '../../libs/axios';

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
    const response = await axios
      .post('app/signup', {
        ...values,
      })
      .catch((err) => {
        console.log(err.response.data.message);
        message.error(err.response.data.message);
      });
    console.log(response);
    if (response && response.status === 201) {
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
    if (response && response.status === 201) {
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
            <Col span={6}></Col>
            <Col span={12}>
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
                  Test users:
                  <ol>
                    <li>talc_business (business) password: Talc1234</li>
                    <li>talc_user (user) password: Talc1234</li>
                  </ol>
                </TabPane>

                <TabPane tab="Sign Up" key="2">
                  <Form
                    layout="horizontal"
                    {...layout}
                    form={form}
                    name="control-ref"
                    onFinish={onSignUpSubmit}
                  >
                    <p>
                      {' '}
                      "Confirmation email can only be sent to registered emails
                      for now.{' '}
                      <b>Contact the admin to add your email addresses</b> in
                      order to test the complete sign up to email confirmation
                      flow or login with pre-created accounts"
                    </p>

                    <br />
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
                              if (value.includes('@') && value.length > 5) {
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
                        () => {
                          return {
                            validator: (_, value) => {
                              if (
                                !value.match(
                                  '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})',
                                )
                              ) {
                                return Promise.reject(
                                  'Password must be at least 8 characters, contains at least 1 lower case, 1 upper case letter and 1 number',
                                );
                              }
                              return Promise.resolve();
                            },
                          };
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
