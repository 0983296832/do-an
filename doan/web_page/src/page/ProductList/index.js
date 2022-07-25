import React, { useEffect, useState } from "react";
import "../../assets/css/product-list.css";
import ProductView from "../../components/ProductView";
import Sort from "./Sort";
import FilterByPrice from "./FilterByPrice";
import FilterBySize from "./FilterBySize";
import FilterByColor from "./FilterByColor";
// import FilterByGender from "./FilterByGender";

import { useParams } from "react-router-dom";
import Toast from "../../components/Toast";
import Products from "../../services/productServices";
import queryString from "query-string";
import { Divider } from "antd";
import Loading from "../../components/Loading";

const ProductList = () => {
  const sumQuery = queryString.parse(window.location.search);
  const { type } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [sort, setSort] = useState("mặc định");
  const [priceFilter, setPriceFilter] = useState([10, 5000]);
  const [sizeFilter, setSizeFilter] = useState("");
  const [colorFilter, setColorFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [expandedColor, setExpandedColor] = useState(false);
  const [expandedSize, setExpandedSize] = useState(false);
  const [expandedPrice, setExpandedPrice] = useState(false);

  const getData = async (pageNum) => {
    if (JSON.stringify(sumQuery) !== JSON.stringify({})) {
      setLoading(true);
      try {
        let params;
        if (sumQuery.name !== "undefined") {
          params = {
            page: pageNum,
            limit: 12,
            ["brand[regex]"]: sumQuery.brand == "tất cả" ? "" : sumQuery.brand,
            ["name[regex]"]: sumQuery.name,
            sort: sort === "mặc định" ? "" : sort,
            ["price[gte]"]: priceFilter[0] * 1000,
            ["price[lte]"]: priceFilter[1] * 1000,
            ["detailsSize[elemMatch]"]: sizeFilter,
            ["detailsColor[elemMatch]"]: colorFilter,
            sort: sumQuery.sort || "",
          };
        } else {
          params = {
            page: pageNum,
            limit: 12,
            ["brand[regex]"]: sumQuery.brand == "tất cả" ? "" : sumQuery.brand,
            sort: sort === "mặc định" ? "" : sort,
            ["price[gte]"]: priceFilter[0] * 1000,
            ["price[lte]"]: priceFilter[1] * 1000,
            ["detailsSize[elemMatch]"]: sizeFilter,
            ["detailsColor[elemMatch]"]: colorFilter,
            sort: sumQuery.sort || "",
          };
        }

        const { data } = await Products.getProducts(params);
        setPageCount(Math.ceil(data.count / 12));
        setData(
          data.data.map((item) => {
            return {
              id: item._id,
              title: item.name,
              product_code: item.product_code,
              image: item.image,
              price: item.price,
              category: item.category,
              rate: item.rate || 0,
              sale: item.discount > 0,
              discount: item.discount,
              priceSale: item.price * ((100 - item.discount) / 100),
              size: [...new Set(item.details.map((i) => i.size))],
              color: [...new Set(item.details.map((i) => i.color))],
              brand: item.brand,
              category: item.category,
            };
          })
        );
      } catch (error) {
        Toast("error", error.message);
      }
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      let params = {
        page: pageNum,
        limit: 12,
        ["product_code[regex]"]: type,
        // ["gender[regex]"]: genderFilter,
        sort: sort === "mặc định" ? "" : sort,
        ["price[gte]"]: priceFilter[0] * 1000,
        ["price[lte]"]: priceFilter[1] * 1000,
        ["detailsSize[elemMatch]"]: sizeFilter,
        ["detailsColor[elemMatch]"]: colorFilter,
      };
      const { data } = await Products.getProducts(params);
      setPageCount(Math.ceil(data.count / 12));
      setData(
        data.data.map((item) => {
          return {
            id: item._id,
            title: item.name,
            product_code: item.product_code,
            image: item.image,
            price: item.price,
            category: item.category,
            rate: item.rate || 0,
            sale: item.discount > 0,
            discount: item.discount,
            priceSale: item.price * ((100 - item.discount) / 100),
            size: [...new Set(item.details.map((i) => i.size))],
            color: [...new Set(item.details.map((i) => i.color))],
            brand: item.brand,
            category: item.category,
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
  }, [page, type, sort, priceFilter, sizeFilter, colorFilter, genderFilter]);
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
            expandedPrice={expandedPrice}
            setExpandedPrice={setExpandedPrice}
          />
          <Divider orientation="left" plain>
            Bộ Lọc Theo Size
          </Divider>
          <FilterBySize
            setSizeFilter={setSizeFilter}
            sizeFilter={sizeFilter}
            expandedSize={expandedSize}
            setExpandedSize={setExpandedSize}
          />
          <Divider orientation="left" plain>
            Bộ Lọc Theo Màu
          </Divider>
          <FilterByColor
            colorFilter={colorFilter}
            setColorFilter={setColorFilter}
            expandedColor={expandedColor}
            setExpandedColor={setExpandedColor}
          />
          {/* <Divider orientation="left" plain>
            Bộ Lọc Theo Giới Tính
          </Divider>
          <FilterByGender
            genderFilter={genderFilter}
            setGenderFilter={setGenderFilter}
          /> */}
        </div>
        <div className="list-right">
          <ProductView
            title={`Giày ${type || ""}`}
            data={data}
            btn={false}
            pagination
            pageCount={pageCount}
            setPage={setPage}
            page={page}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductList;
