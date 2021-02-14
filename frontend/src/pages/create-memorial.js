import React, { useState } from 'react';
import {
  Row,
  Col,
  Form,
  Input,
  Button,
  Typography,
  notification,
  Upload,
  message,
  DatePicker,
  Modal,
  Empty,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import axios from '../libs/axios';
const { RangePicker } = DatePicker;
const { Title } = Typography;
const layout = {
  labelCol: { span: 10 },
  wrapperCol: { span: 24 },
};
const tailLayout = {
  wrapperCol: { offset: 10, span: 16 },
};
export default () => {
  const [form] = Form.useForm();
  const [previewVisible, setPreviewVisisble] = useState(false);
  const [previewImage, setPreviewImage] = useState();
  const [imageList, setImageList] = useState([]);
  const dateFormat = 'YYYY/MM/DD';
  const onSubmit = async (values) => {
    console.log(values);
    message.warn('To Be Implemented');
    axios
      .put('memorial', values)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          notification.open({
            message: `Memorial created for ${res.data.name}`,
            duration: 10,
          });
          form.resetFields();
        }
      })
      .catch((err) => {
        message.error(err.response.data.message);
      });
  };
  const onReset = () => {
    form.resetFields();
  };
  const checkFile = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };
  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewVisisble(true);
  };
  const handleCancel = () => setPreviewVisisble(false);
  const handleChange = ({ file, fileList }) => {
    if (file.status === 'done' && checkFile(file)) {
      setImageList(imageList.concat([file]));
    }
    console.log(fileList);
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <div>
      <Row>
        <Col span={14} offset={6}>
          <Title>Create Memorial</Title>
          <Form
            layout="vertical"
            {...layout}
            form={form}
            onFinish={onSubmit}
            validateMessages={{
              required: "'${label}' is Required!",
            }}
          >
            <Row gutter={[8]}>
              <Col span={12}>
                <Form.Item
                  name="name"
                  label="Name"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input placeholder="Name" />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  name="dateOfPassing"
                  label="Date of Passing"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <DatePicker
                    format={dateFormat}
                    disabledDate={(currentDate) => currentDate > Date.now()}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={24}>
                <Form.Item
                  name="description"
                  label="Description"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input.TextArea
                    placeholder="Description of loved one"
                    autoSize={{ minRows: 6, maxRows: 8 }}
                  />
                </Form.Item>
              </Col>
            </Row>
            {/* <Row>
              <Upload
                listType="picture-card"
                fileList={imageList}
                onPreview={handlePreview}
                customRequest={({ file, onSuccess }) => {
                  setTimeout(() => {
                    onSuccess('ok');
                  }, 0);
                }}
                onChange={handleChange}
              >
                {imageList.length > 4 ? null : uploadButton}
              </Upload>
              <Modal
                visible={previewVisible}
                footer={null}
                onCancel={handleCancel}
              >
                <img
                  alt="example"
                  style={{ width: '100%' }}
                  src={previewImage}
                />
              </Modal>
            </Row> */}

            <Title level={3}>Wake Details</Title>
            <Row gutter={[8]}>
              <Col span={14}>
                <Form.Item
                  name="wakeLocation"
                  label="Location"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input placeholder="Name" />
                </Form.Item>
              </Col>
              <Col span={10}>
                <Form.Item
                  name="wakeDateRange"
                  label="Date Range"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <RangePicker showTime />
                </Form.Item>
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
