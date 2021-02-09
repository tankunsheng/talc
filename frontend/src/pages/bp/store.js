import React, { useEffect, useState } from 'react';
import {
  Row,
  Col,
  Form,
  Input,
  Button,
  Typography,
  notification,
  Select,
  InputNumber,
  Upload,
} from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import axios from '../../libs/axios';
const { Dragger } = Upload;
const { Title } = Typography;
const layout = {
  labelCol: { span: 10 },
  wrapperCol: { span: 24 },
};
const tailLayout = {
  wrapperCol: { offset: 10, span: 16 },
};
//name, type, price, description
export default () => {
  const [form] = Form.useForm();
  const onBusinessProfileSubmit = async (values) => {
    notification.open({
      message: 'To be Implemented',
      description: '',
      onClick: () => {
        console.log('Notification Clicked!');
      },
      duration: 0,
    });
  };
  const onReset = () => {
    form.resetFields();
  };
  const props = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  return (
    <div>
      <Row>
        <Col span={6}></Col>
        <Col span={14}>
          <Title>Store (To Be Implemented)</Title>
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
                  label="Service Name"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input placeholder="Product Name" />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  name="price"
                  label="Price"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <InputNumber
                    defaultValue={0}
                    formatter={(value) =>
                      `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                    }
                    parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Form.Item
                  name="categories"
                  label="Categories"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Select
                    mode="multiple"
                    allowClear
                    style={{ width: '100%' }}
                    placeholder="Please select"
                    defaultValue={['a10', 'c12']}
                    // onChange={handleChange}
                  >
                    {[
                      <Option key={'test'}>{'test'}</Option>,
                      <Option key={'test1'}>{'test1'}</Option>,
                      <Option key={'test2'}>{'test'}</Option>,
                    ]}
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={24}>
                <Form.Item
                  name="description"
                  label="Service Description"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input.TextArea
                    placeholder="Describe your service"
                    autoSize={{ minRows: 2, maxRows: 4 }}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Dragger {...props}>
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">
                    Click or drag file to this area to upload
                  </p>
                  <p className="ant-upload-hint">
                    Support for a single or bulk upload. Strictly prohibit from
                    uploading company data or other band files
                  </p>
                </Dragger>
                ,
              </Col>
            </Row>

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Create
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
