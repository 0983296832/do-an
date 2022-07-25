import React, { useState, useEffect } from "react";
import { Button, Input, InputNumber, Select, Table } from "antd";
import "../../../assets/css/product-detail.css";
import ImgUpload from "../../../components/ImageUpload";
import { useParams } from "react-router-dom";
import _ from "lodash";
import ChartComponent from "../../../components/ChartComponent";
import { EditOutlined, SaveOutlined } from "@ant-design/icons";
import Toast from "../../../components/Toast";
import Products from "../../../services/productServices";
import Orders from "../../../services/orderServices";
import moment from "moment";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";

const { TextArea } = Input;
const ProductDetail = () => {
  const { id } = useParams();
  const [chartData, setChartData] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [fileList, setFileList] = useState([]);
  const [discount, setDiscount] = useState();
  const [views, setViews] = useState();
  const [sales, setSales] = useState();
  const [desc, setDesc] = useState("");
  const [votes, setVotes] = useState();
  const [price, setPrice] = useState();
  const [category, setCategory] = useState();
  const [columns, setColumns] = useState([
    {
      title: "Color",
      dataIndex: "color",
      key: "color",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
    },
  ]);
  const [dataTable, setDataTable] = useState([]);

  const handleSave = () => {
    upload();
    setDisabled(!disabled);
  };
  const handleCancel = () => {
    setViews(product.views);
    setSales(product.sales);
    setDiscount(product.discount);
    setDesc(product.desc);
    setVotes(product.votes);
    setDisabled(!disabled);
    setPrice(product.price);
    setCategory(product.category);
  };

  useEffect(() => {
    let isCancel = false;
    const getProductDetails = async () => {
      setLoading(true);
      try {
        const { data } = await Products.getProductDetails(id);
        const result = await Orders.getRevenueProductByHalfYear(id);
        setChartData(result.data);
        setDataTable(
          data.product.details
            .map((item, index) => {
              return {
                ...item,
                key: index,
              };
            })
            .sort((a, b) => a.color.localeCompare(b.color))
        );
        setProduct({
          ...data.product,
          image: data.product.image.map((item) => {
            return {
              ...item,
              url: item.imageUrl,
            };
          }),
        });
        setFileList(
          data.product.image.map((item) => {
            return {
              ...item,
              url: item.imageUrl,
            };
          })
        );
        setViews(data.product.views);
        setSales(data.product.sales);
        setDiscount(data.product.discount);
        setDesc(data.product.desc);
        setVotes(data.product.votes);
        setPrice(data.product.price);
        setCategory(data.product.category);
      } catch (error) {
        Toast("error", error.message);
      }
      setLoading(false);
    };
    getProductDetails();
    return () => {
      isCancel = true;
    };
  }, [id]);

  const upload = async () => {
    try {
      const imageValid = fileList.filter((file) => !file.url).length;
      if (imageValid > 0) {
        const formData = new FormData();
        _.forEach(fileList, (file) => {
          if (!file.url) formData.append("image", file.originFileObj);
        });
        await Products.uploadImages(id, formData);
      }
      await Products.updateProduct(id, {
        views,
        sales,
        discount,
        desc,
        votes,
        price,
        category,
      });
      Toast("success", "Product updated successfully");
    } catch (error) {
      Toast("error", error.message);
    }
  };


  if (loading) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="detail-container">
        <div
          className="revenue__chart"
          style={{ width: "100%", height: "auto" }}
        >
          <ChartComponent
            title="Last 6 Months (Revenue)"
            aspect={3 / 1}
            data={chartData.slice(0, 6)}
          />
        </div>
        <div className="top">
          <h1>Detail product</h1>
        </div>

        <div className="center">
          <div className="detail-left">
            <div className="formInput-product">
              <label>Product Code</label>
              <Input
                placeholder="Basic usage"
                disabled
                defaultValue={product?.product_code}
              />
            </div>
            <div className="formInput-product">
              <label>Name</label>
              <Input
                placeholder="Basic usage"
                disabled
                defaultValue={product?.name}
              />
            </div>
            <div className="formInput-product">
              <label>Category</label>
              {/* <Input
                placeholder="Basic usage"
                disabled
                defaultValue={product?.category}
              /> */}
              <Select
                style={{
                  width: 220,
                }}
                allowClear
                defaultValue={category}
                onChange={(value) => setCategory(value)}
                disabled={disabled}
              >
                <Select.Option value="giày thể thao">
                  Giày thể thao
                </Select.Option>
                <Select.Option value="giày thời trang">
                  Giày thời trang
                </Select.Option>
              </Select>
            </div>

            <div className="formInput-product">
              <label>Views</label>
              <InputNumber
                placeholder="Basic usage"
                disabled={disabled}
                min={0}
                value={views}
                onChange={(value) => setViews(value)}
                style={{ width: "40%" }}
              />
            </div>
            <div className="formInput-product ">
              <label>Votes</label>
              <InputNumber
                placeholder="Basic usage"
                disabled={disabled}
                min={0}
                max={5}
                value={votes}
                onChange={(value) => setVotes(value)}
                style={{ width: "40%" }}
              />
            </div>
            <div className="formInput-product ">
              <label>Sales</label>
              <InputNumber
                placeholder="Basic usage"
                disabled={disabled}
                min={0}
                value={sales}
                onChange={(value) => setSales(value)}
                style={{ width: "40%" }}
              />
            </div>
            <div className="formInput-product ">
              <label>Price</label>
              <InputNumber
                placeholder="Basic usage"
                min={0}
                value={price}
                formatter={(value) =>
                  `đ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) => value.replace(/\đ\s?|(,*)/g, "")}
                disabled={disabled}
                onChange={(value) => setPrice(value)}
                style={{ width: "40%" }}
              />
            </div>
            <div
              className="formInput-product"
              style={{ width: "600px", maxWidth: "600px" }}
            >
              <label>Description</label>
              {/* <TextArea
                maxLength={100}
                style={{
                  height: 100,
                }}
                placeholder="Description of product"
                allowClear
                disabled={disabled}
                defaultValue={desc || ""}
                onChange={(e) => setDesc(e.target.value)}
              /> */}
              <CKEditor
                editor={ClassicEditor}
                data={desc}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setDesc(data);
                }}
              />
            </div>
          </div>
          <div className="detail-right">
            <div className="image-product">
              <label>Image</label>
              <ImgUpload
                disable={disabled}
                fileList={fileList}
                setFileList={setFileList}
                length={5}
              />
            </div>
            <div className="formInput-product ">
              <label>Gender</label>
              <Input
                placeholder="Basic usage"
                disabled
                defaultValue={product.gender}
              />
            </div>
            <div className="formInput-product ">
              <label>Brand</label>
              <Input
                placeholder="Basic usage"
                disabled
                defaultValue={product.brand || ""}
              />
            </div>
            <div className="formInput-product">
              <label>Created</label>
              <Input
                placeholder="Basic usage"
                disabled
                defaultValue={moment(product.createdAt)
                  .zone("+07:00")
                  .format("DD/MM/YYYY")}
              />
            </div>
            <div className="formInput-product ">
              <label>Discount</label>
              <InputNumber
                placeholder="Basic usage"
                disabled={disabled}
                value={discount}
                onChange={(value) => setDiscount(value)}
                style={{ width: "40%" }}
              />
            </div>
            <div className="formInput-product">
              <label>Supplier</label>
              <Input
                placeholder="Basic usage"
                disabled
                defaultValue={product.supplier[0].supplier_name}
              />
            </div>
            <div className="table__details-product">
              <label>Details</label>
              <Table
                className="box-shadow"
                columns={columns}
                dataSource={[...dataTable]}
                pagination={false}
                scroll={{
                  y: 200,
                }}
              />
            </div>
          </div>
        </div>

        <div className="center-div">
          {!disabled ? (
            <div>
              <Button
                className="icon-btn"
                type="primary"
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button
                className="icon-btn"
                type="primary"
                icon={<SaveOutlined />}
                onClick={handleSave}
              >
                Save
              </Button>
            </div>
          ) : (
            <Button
              className="icon-btn"
              type="primary"
              icon={<EditOutlined />}
              onClick={() => setDisabled(!disabled)}
            >
              Edit
            </Button>
          )}
        </div>
      </div>
    );
  }
};

export default ProductDetail;
