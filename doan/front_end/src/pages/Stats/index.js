import { Card, DatePicker } from "antd";
import React, { useEffect, useState } from "react";
import moment from "moment";
import Products from "../../services/productServices";
import Toast from "../../components/Toast";
import Loading from "../../components/Loading";

const Stats = () => {
  const [data, setData] = useState();
  const [selectDate, setSelectDate] = useState({
    month: moment(new Date()).format("M"),
    year: moment(new Date()).format("Y"),
  });
  const [loading, setLoading] = useState(false);
  const [barData, setBarData] = useState([]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const stock = await Products.getStockByMonth(selectDate);
        setData([
          {
            name: "product",
            number: stock.product.quantity,
            money: stock.product.money,
          },
          {
            name: "order",
            number: stock.order.quantity,
            money: stock.order.money,
          },
          {
            name: "supplier",
            number: stock.supplier.quantity,
            money: stock.supplier.money,
          },
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
    return <Loading />;
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
        <div className="overviews"></div>
      </Card>
    </div>
  );
};

export default Stats;
