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
  message,
  Radio,
  Modal,
} from 'antd';
import { InboxOutlined, UploadOutlined, PlusOutlined } from '@ant-design/icons';
import axios from '../../libs/axios';

const { Title } = Typography;
const layout = {
  labelCol: { span: 10 },
  wrapperCol: { span: 24 },
};
const tailLayout = {
  wrapperCol: { offset: 10, span: 16 },
};
const fileList = [
  // {
  //   uid: '-4',
  //   name: 'image.png',
  //   status: 'done',
  //   url:
  //     'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  // },
];
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
    setImageList(fileList);
    //TODO business/profile if no business, serviceproduct creation
  }, []);
  const onSubmit = async (values) => {
    console.log(business);
    console.log(values);
    axios
      .put('business/product-service', {
        ...values,
        businessId: business.businessId,
      })
      .then((res) => {
        notification.open({
          message: `Added ${res.data.name}!`,
          duration: 5000,
        });
        form.resetFields();
      })
      .catch((err) => {
        message.error(err.response.data.message);
      });
    //https://stackoverflow.com/questions/51514757/action-function-is-required-with-antd-upload-control-but-i-dont-need-it
    let formData = new FormData();
    imageList.forEach((file) => {
      // formData.append('filess[]', file.originFileObj, file.name);
      // console.log(file);
      formData.append('filess', file.originFileObj, file.name);
      // formData.append('files', 'dsadas');
    });
    // for (var key of formData.entries()) {
    //   console.log(key[1]);
    //   console.log(key[0] + ', ' + JSON.stringify(key[1]));
    // }
    console.log(...formData);
    axios
      .post(`/business/product-service/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        console.log(`file upload response ${res}`);
      });
    axios
      .post(`/business/product-service/upload/files`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        console.log(`file upload response ${res}`);
      });

    // fetch(
    //   `http://localhost:3000/business/product-service/${business.businessId}/${values.name}`,
    //   {
    //     body: formData,
    //     method: 'post',
    //   },
    // );
    // fetch(
    //   `http://localhost:3000/business/product-service/${business.businessId}/${values.name}/asdasd`,
    //   {
    //     body: formData,
    //     method: 'post',
    //   },
    // );

    // You can use any AJAX library you like
    // reqwest({
    //   url: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    //   method: 'post',
    //   processData: false,
    //   data: formData,
    //   success: () => {
    //     this.setState({
    //       fileList: [],
    //       uploading: false,
    //     });
    //     message.success('upload successfully.');
    //   },
    //   error: () => {
    //     this.setState({
    //       uploading: false,
    //     });
    //     message.error('upload failed.');
    //   },
    // });
  };
  const onReset = () => {
    form.resetFields();
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

    // this.setState({
    //   previewImage: file.url || file.preview,
    //   previewVisible: true,
    //   previewTitle:
    //     file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    // });
    setPreviewImage(file.url || file.preview);
    setPreviewVisisble(true);
  };
  const handleCancel = () => setPreviewVisisble(false);
  const handleChange = ({ fileList }) => {
    console.log(fileList);
    setImageList(fileList);
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
                    //  required: true,
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
                      // required: true,
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
                  // rules={[
                  //   {
                  //     required: true,
                  //   },
                  // ]}
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
                      // required: true,
                    },
                  ]}
                >
                  <Select
                    mode="multiple"
                    allowClear
                    style={{ width: '100%' }}
                    placeholder="Please select"
                    defaultValue={[]}
                    // onChange={handleChange}
                  >
                    {[
                      //TODO get categories and not hard code, how to seed data into db?
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
                      // required: true,
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
                {imageList.length >= 8 ? null : uploadButton}
              </Upload>
              <Modal
                visible={previewVisible}
                title={'test'}
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
