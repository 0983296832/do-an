import React, { useEffect, useState } from "react";
import "../../assets/css/product-list.css";
import ProductView from "../../components/ProductView";
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
  // const [searchBy, setSearchBy] = useState("");
  const [sort, setSort] = useState("mặc định");
  const [priceFilter, setPriceFilter] = useState([10, 3000]);
  const [sizeFilter, setSizeFilter] = useState("");
  const [colorFilter, setColorFilter] = useState("");

  const getData = async (pageNum) => {
    setLoading(true);

    try {
      let params = {
        page: pageNum,
        limit: 12,
        ["product_code[regex]"]: type,
        sort: sort === "mặc định" ? "" : sort,
        ["price[gte]"]: priceFilter[0] * 1000,
        ["price[lte]"]: priceFilter[1] * 1000,
        ["detailsSize[elemMatch]"]: sizeFilter,
        ["detailsColor[elemMatch]"]: colorFilter,
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
  }, [page, type, sort, priceFilter, sizeFilter, colorFilter]);
  if (loading) {
    return <Loading />;
  }
  return (
    <div>
      <div className="list-container">
        <div className="list-left">
          <Sort sort={sort} setSort={setSort} />
          <Divider orientation="left" plain>
            Bộ Lọc Theo Giá
          </Divider>
          <FilterByPrice
            setPriceFilter={setPriceFilter}
            priceFilter={priceFilter}
          />
          <Divider orientation="left" plain>
            Bộ Lọc Theo Size
          </Divider>
          <FilterBySize setSizeFilter={setSizeFilter} sizeFilter={sizeFilter} />
          <Divider orientation="left" plain>
            Bộ Lọc Theo Màu
          </Divider>
          <FilterByColor
            colorFilter={colorFilter}
            setColorFilter={setColorFilter}
          />
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
    </div>
  );
};

export default ProductList;
