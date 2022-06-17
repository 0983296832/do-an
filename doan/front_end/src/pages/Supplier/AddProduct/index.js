import { AutoComplete, Button, Form, Input, InputNumber, Select } from "antd";
import { useEffect, useState } from "react";
import Toast from "../../../components/Toast";
import Products from "../../../services/productServices";
import Supplier from "../../../services/supplierServices";

const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 12,
  },
};
/* eslint-disable no-template-curly-in-string */

const validateMessages = {
  required: "${label} is required!",
};
/* eslint-enable no-template-curly-in-string */

const AddProduct = () => {
  const [form] = Form.useForm();
  const [formValue, setFormValue] = useState({});
  const [options, setOptions] = useState([]);

  useEffect(() => form.resetFields(), [formValue]);
  const onSearch = async (searchText) => {
    try {
      const search = searchText;
      const params = {
        page: 1,
        limit: 10000,
        "product_code[regex]": search,
      };

      const { data } = await Products.getProducts(params);

      setOptions(
        !searchText
          ? []
          : data.map((item) => {
              return { value: item.product_code };
            })
      );
    } catch (error) {
      Toast("error", error.message);
    }
  };

  const onSelect = async (data) => {
    try {
      const params = {
        limit: 1,
        page: 1,
        "product_code[regex]": data,
      };
      const dataSearch = await Supplier.getSupplier(params);

      setFormValue({
        product_code: dataSearch.data[0].product_code,
        supplier_name: dataSearch.data[0].supplier_name,
        address: dataSearch.data[0].address,
        phone: dataSearch.data[0].phone,
        name: dataSearch.data[0].name,
        price: dataSearch.data[0].price,
        brand: dataSearch.data[0].brand,
        category: dataSearch.data[0].category,
        gender: dataSearch.data[0].gender,
      });
    } catch (error) {
      Toast("error", error.message);
    }
  };
  const onFinish = async (values) => {
    try {
      const data = await Products.addProduct({
        ...values,
        price: values.price + values.price / 2,
      });
      if (data) {
        Toast("success", " Add new product success");
      } else {
        Toast("error", " Failed to add new product");
      }
    } catch (error) {
      Toast("error", error.message);
    }
  };

  return (
    <div>
      <div className="top">
        <h1>Add new product</h1>
      </div>
      <Form
        initialValues={formValue}
        {...layout}
        form={form}
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        <Form.Item
          name="product_code"
          label="Product Code"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <AutoComplete
            options={options}
            style={{
              width: 200,
            }}
            onSearch={onSearch}
            onSelect={onSelect}
            allowClear
          />
        </Form.Item>
        <Form.Item
          name="supplier_name"
          label="Supplier Name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="address"
          label="Address"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Phone"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="name"
          label="Product Name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
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
            min={0}
            style={{ width: "40%" }}
            formatter={(value) =>
              `đ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => value.replace(/\đ\s?|(,*)/g, "")}
          />
        </Form.Item>
        <Form.Item
          name="color"
          label="Color"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="gender"
          label="Gender"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            style={{
              width: 120,
            }}
            allowClear
          >
            <Select.Option value="male">Male</Select.Option>
            <Select.Option value="female">Female</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="category"
          label="Category"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="brand"
          label="Brand"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="size"
          label="Size"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item
          name="quantity"
          label="Quantity"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            Add new product
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddProduct;
