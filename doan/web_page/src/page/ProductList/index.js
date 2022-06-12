import React, { useEffect, useState } from "react";
import "../../assets/css/product-list.css";
import ProductView from "../../components/ProductView";
import giay from "../../assets/image/giay.jpg";
import Sort from "./Sort";
import FilterByPrice from "./FilterByPrice";
import FilterBySize from "./FilterBySize";
import FilterByColor from "./FilterByColor";
import { useParams } from "react-router-dom";
import Toast from "../../components/Toast";
import Products from "../../services/productServices";

import { Divider } from "antd";
import Loading from "../../components/Loading";

const ProductList = () => {
  const { type } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  const getData = async (pageNum) => {
    setLoading(true);

    try {
      let params = {
        page: pageNum,
        limit: 12,
        ["product_code[regex]"]: type,
      };
      const { data } = await Products.getProducts(params);
      setPageCount(Math.ceil(data.count / 10));
      setData(
        data.data.map((item) => {
          return {
            id: item._id,
            title: item.name,
            image: item.image[0].imageUrl,
            price: item.price,
            category: item.category,
            rate: item.rate || 0,
            sale: item.discount > 0,
            discount: item.discount,
            priceSale: item.price * ((100 - item.discount) / 100),
          };
        })
      );
    } catch (error) {
      Toast("error", error.message);
    }
    setLoading(false);
  };
  useEffect(() => {
    getData(page);
  }, [page, type]);
  if (loading) {
    return <Loading />;
  }
  return (
    <div className="list-container">
      <div className="list-left">
        <Sort />
        <Divider orientation="left" plain>
          Bộ Lọc Theo Giá
        </Divider>
        <FilterByPrice />
        <Divider orientation="left" plain>
          Bộ Lọc Theo Size
        </Divider>
        <FilterBySize />
        <Divider orientation="left" plain>
          Bộ Lọc Theo Màu
        </Divider>
        <FilterByColor />
      </div>
      <div className="list-right">
        <ProductView
          title="Giày Nike"
          data={data}
          btn={false}
          pagination
          pageCount={pageCount}
          setPage={setPage}
        />
      </div>
    </div>
  );
};

export default ProductList;
