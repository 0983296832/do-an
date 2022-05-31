import React, { useState, useEffect } from "react";
import { Button, Input, InputNumber } from "antd";
import "../../../assets/css/product-detail.css";
import ImgUpload from "../../../components/ImageUpload";
import { useParams } from "react-router-dom";
import _ from "lodash";
import ChartComponent from "../../../components/ChartComponent";
import { EditOutlined, SaveOutlined } from "@ant-design/icons";
import Toast from "../../../components/Toast";
import Products from "../../../services/productServices";

const { TextArea } = Input;
const ProductDetail = () => {
  const { id } = useParams();
  const [disabled, setDisabled] = useState(true);
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [fileList, setFileList] = useState([]);
  const [discount, setDiscount] = useState();
  const [views, setViews] = useState();
  const [sales, setSales] = useState();
  const [desc, setDesc] = useState();
  const [votes, setVotes] = useState();

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
  };

  useEffect(() => {
    let isCancel = false;
    const getProductDetails = async () => {
      setLoading(true);
      try {
        const { data } = await Products.getProductDetails(id);

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
      } catch (error) {
        Toast("error", error.message);
      }
      setLoading(false);
    };
    getProductDetails();
    return () => {
      isCancel = true;
    };
  }, []);

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
      await Products.updateProduct(id, { views, sales, discount, desc, votes });
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
          <ChartComponent title="Last 6 Months (Revenue)" aspect={3 / 1} />
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
              <Input
                placeholder="Basic usage"
                disabled
                defaultValue={product?.category}
              />
            </div>
            <div className="formInput-product">
              <label>Description</label>
              <TextArea
                maxLength={100}
                style={{
                  height: 100,
                }}
                placeholder="Description of product"
                allowClear
                disabled={disabled}
                defaultValue={desc || ""}
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>
            <div className="formInput-product short-input">
              <label>Views</label>
              <InputNumber
                placeholder="Basic usage"
                disabled={disabled}
                min={0}
                value={views}
                onChange={(value) => setViews(value)}
              />
            </div>
            <div className="formInput-product short-input">
              <label>Votes</label>
              <InputNumber
                placeholder="Basic usage"
                disabled={disabled}
                min={0}
                max={5}
                value={votes}
                onChange={(value) => setVotes(value)}
              />
            </div>
            <div className="formInput-product short-input">
              <label>Sales</label>
              <InputNumber
                placeholder="Basic usage"
                disabled={disabled}
                min={0}
                value={sales}
                onChange={(value) => setSales(value)}
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
              />
            </div>
            <div className="formInput-product short-input">
              <label>Gender</label>
              <Input
                placeholder="Basic usage"
                disabled
                defaultValue={product.gender}
              />
            </div>
            <div className="formInput-product">
              <label>Created</label>
              <Input
                placeholder="Basic usage"
                disabled
                defaultValue={product.createdAt}
              />
            </div>
            <div className="formInput-product">
              <label>Discount</label>
              <InputNumber
                placeholder="Basic usage"
                disabled={disabled}
                value={discount}
                onChange={(value) => setDiscount(value)}
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
