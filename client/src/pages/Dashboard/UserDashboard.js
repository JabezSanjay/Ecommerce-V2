import React, { useEffect, useState } from "react";
import UserSider from "../../components/Sider/UserSider";
import { getAllUserOrders } from "./helper";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
// Import Swiper core and required modules
import SwiperCore, { Pagination } from "swiper/core";
import { isAuthenticated } from "../Auth/helper";

SwiperCore.use([Pagination]);

const UserDashboard = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const { token, user } = isAuthenticated();

  useEffect(() => {
    getAllUserOrders(user._id, token).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProducts(data);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(products);
  return (
    <div>
      <UserSider selectedKey="1" />
    </div>
  );
};

export default UserDashboard;
