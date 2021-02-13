import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
  message,
  Radio,
  Modal,
  Empty,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import axios from '../../libs/axios';

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
  const [business, setBusiness] = useState();
  const [previewVisible, setPreviewVisisble] = useState(false);
  const [previewImage, setPreviewImage] = useState();
  const [imageList, setImageList] = useState([]);
  useEffect(async () => {
    const response = await axios('business/profile');
    console.log(`my business is ${response.data}`);
    if (response.data) {
      setBusiness(response.data);
    } else {
      console.log('no business, create a business profile first');
    }
  }, []);
  const onSubmit = async (values) => {
    console.log(business);
    console.log(values);

    //https://stackoverflow.com/questions/51514757/action-function-is-required-with-antd-upload-control-but-i-dont-need-it
    let formData = new FormData();
    imageList.forEach((file) => {
      formData.append('images', file.originFileObj, file.name);
    });
    console.log(...formData);
    const imageUploadResponse = await axios
      .post(
        `/business/product-service/${business.businessId}/${values.name}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      )
      .catch((err) => {
        console.log(err);
        message.error(err.response.data.message);
      });
    if (imageUploadResponse) {
      axios
        .put('business/product-service', {
          ...values,
          businessId: business.businessId,
          imageLinks: imageUploadResponse.data.map(
            (eachImage) => eachImage.Location,
          ),
        })
        .then((res) => {
          notification.open({
            message: `Added ${res.data.name}!`,
            duration: 5000,
          });
          form.resetFields();
          setImageList([]);
        })
        .catch((err) => {
          message.error(err.response.data.message);
        });
    }
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
  const noBusinessProfile = (
    <Empty
      image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
      imageStyle={{
        height: 60,
      }}
      description={
        //TODO set selectedKeys of left menu bar to set to business profile highlighted on click
        <span>
          You need to <Link to="/bp/profile">register a business profile</Link>{' '}
          before you can setup your store
        </span>
      }
    ></Empty>
  );
  return !business ? (
    noBusinessProfile
  ) : (
    <div>
      <Row>
        <Col span={6}></Col>
        <Col span={14}>
          <Title>Store</Title>
          <Form
            layout="vertical"
            {...layout}
            initialValues={{ type: 'service', price: 0 }}
            form={form}
            onFinish={onSubmit}
          >
            <Row>
              <Form.Item
                name="type"
                label="Type"
                rules={[
                  {
                    required: true,
                    message: 'Please pick a type!',
                  },
                ]}
              >
                <Radio.Group>
                  <Radio.Button value="service">Service</Radio.Button>
                  <Radio.Button value="product">Product</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Row>
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
                    defaultValue={[]}
                  >
                    {[
                      //TODO fetch categories from db instead of hardcoding
                      <Option key={'Funeral Director'}>
                        {'Funeral Director'}
                      </Option>,
                      <Option key={'Catering'}>{'Catering'}</Option>,
                      <Option key={'Legal Services'}>
                        {'Legal Services'}
                      </Option>,
                      <Option key={'Venue Rental'}>{'Venue Rental'}</Option>,
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
