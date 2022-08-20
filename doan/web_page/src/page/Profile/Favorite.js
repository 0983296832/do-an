import React, { useContext, useEffect, useState } from "react";
import Toast from "../../components/Toast";
import Users from "../../services/userServices";
import { AuthContext } from "../../context/AuthContext";
import Loading from "../../components/Loading";
import Product from "../../components/Product";

const Favorite = () => {
  const { auth } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    try {
      if (auth.data) {
        const data = await Users.getFavorite(auth.data._id);
        setData(
          data.data.map((item) => {
            return {
              id: item._id,
              title: item.name,
              product_code: item.product_code,
              image: item.image,
              price: item.price,
              category: item.category,
              rate: item.votes || 0,
              sale: item.discount > 0,
              details: item.details,
              discount: item.discount,
              priceSale: item.price * ((100 - item.discount) / 100),
              size: [...new Set(item.details.map((i) => i.size))],
              color: [...new Set(item.details.map((i) => i.color))],
              brand: item.brand,
              category: item.category,
              stocks: item.details.reduce((acc, item) => {
                return acc + item.quantity;
              }, 0),
            };
          })
        );
      }
    } catch (error) {
      Toast("error", error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <div>
      <div
        className="top-product"
        style={{
          height: "100vh",
          overflowY: "auto",
          padding: 10,
          justifyContent: "flex-start",
        }}
      >
        {data.map((item, index) => {
          return (
            <div key={index}>
              <Product data={item} like />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Favorite;
