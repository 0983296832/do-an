import React, { useState } from "react";
import "../../assets/css/product-list.css";
import ProductView from "../../components/ProductView";
import giay from "../../assets/image/giay.jpg";
import Sort from "./Sort";
import FilterByPrice from "./FilterByPrice";
import FilterBySize from "./FilterBySize";
import FilterByColor from "./FilterByColor";

import { Divider } from "antd";

const ProductList = () => {
  const [data, setData] = useState([
    {
      image: giay,
      title: "Giày Mlb Boston và phối đồ siêu đẹp Rep 1:1",
      sale: false,
      category: "Nike",
      rate: 5,
      price: 1200000,
      priceSale: 1200000,
    },
    {
      image: giay,
      title: "Giày Mlb Boston và phối đồ siêu đẹp Rep 1:1",
      sale: true,
      category: "Nike",
      rate: 5,
      price: 1200000,
      priceSale: 1200000,
    },
    {
      image: giay,
      title: "Giày Mlb Boston và phối đồ siêu đẹp Rep 1:1",
      sale: true,
      soldOut: true,
      category: "Nike",
      rate: 5,
      price: 1200000,
      priceSale: 1200000,
    },
    {
      image: giay,
      title: "Giày Mlb Boston và phối đồ siêu đẹp Rep 1:1",
      sale: true,
      category: "Nike",
      rate: 5,
      price: 1200000,
      priceSale: 1200000,
    },
    {
      image: giay,
      title: "Giày Mlb Boston và phối đồ siêu đẹp Rep 1:1",
      sale: false,
      category: "Nike",
      rate: 5,
      price: 1200000,
      priceSale: 1200000,
    },
    {
      image: giay,
      title: "Giày Mlb Boston và phối đồ siêu đẹp Rep 1:1",
      sale: true,
      soldOut: true,
      category: "Nike",
      rate: 5,
      price: 1200000,
      priceSale: 1200000,
    },
    {
      image: giay,
      title: "Giày Mlb Boston và phối đồ siêu đẹp Rep 1:1",
      sale: true,
      soldOut: true,
      category: "Nike",
      rate: 5,
      price: 1200000,
      priceSale: 1200000,
    },
    {
      image: giay,
      title: "Giày Mlb Boston và phối đồ siêu đẹp Rep 1:1",
      sale: true,
      category: "Nike",
      rate: 5,
      price: 1200000,
      priceSale: 1200000,
    },
    {
      image: giay,
      title: "Giày Mlb Boston và phối đồ siêu đẹp Rep 1:1",
      sale: true,
      category: "Nike",
      rate: 5,
      price: 1200000,
      priceSale: 1200000,
    },
    {
      image: giay,
      title: "Giày Mlb Boston và phối đồ siêu đẹp Rep 1:1",
      sale: false,
      category: "Nike",
      rate: 5,
      price: 1200000,
      priceSale: 1200000,
    },
  ]);

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
        <ProductView title="Giày Nike" data={data} btn={false} pagination />
      </div>
    </div>
  );
};

export default ProductList;
