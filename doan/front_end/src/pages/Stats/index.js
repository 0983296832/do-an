import { Card, DatePicker } from "antd";
import React, { useEffect, useState } from "react";
import PieChart from "./PieChart";
import moment from "moment";
import Products from "../../services/productServices";
import Toast from "../../components/Toast";

const Stats = () => {
  const [data, setData] = useState([]);
  const [selectDate, setSelectDate] = useState({
    month: moment(new Date()).format("M"),
    year: moment(new Date()).format("Y"),
  });
  const [loading, setLoading] = useState(false);
  const [pieData, setPieData] = useState([
    {
      id: "c",
      label: "c",
      value: 243,
    },
    {
      id: "css",
      label: "css",
      value: 108,
    },
    {
      id: "rust",
      label: "rust",
      value: 401,
    },
  ]);
  console.log(selectDate);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data = await Products.getStockByMonth(selectDate);
        setPieData([
          { id: 1, label: "product", value: data.product.quantity },
          { id: 2, label: "order", value: data.order.quantity },
          { id: 3, label: "supplier", value: data.supplier.quantity },
        ]);
      } catch (error) {
        Toast("error", error.message);
      }
      setLoading(false);
    })();
  }, [selectDate]);

  const onChange = (data) => {
    setSelectDate({
      month: moment(data).format("M"),
      year: moment(data).format("Y"),
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <Card
        size="small"
        title="Inventory"
        headStyle={{ color: "gray" }}
        extra={
          <DatePicker
            onChange={onChange}
            picker="month"
            defaultValue={moment(`${selectDate.year}/${selectDate.month}/1`)}
          />
        }
        style={{
          width: "100%",
          boxShadow:
            "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
          borderRadius: "8px",
          marginTop: 35,
        }}
        bordered={false}
      >
        <div style={{ height: 400, display: "flex" }}>
          <PieChart data={pieData} />
          <PieChart data={pieData} />
        </div>
      </Card>
    </div>
  );
};

export default Stats;
