import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import UserSider from "../../components/Sider/UserSider";
import { isAuthenticated } from "../Auth/helper";
import { loadFavorites } from "./helper";

const FavouritesPage = () => {
  const { user, token } = isAuthenticated();

  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadFavorites(user._id, token).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setFavorites(data);
        setLoading(false);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(favorites);
  return (
    <FavouritesTag>
      <Row>
        <Col xxl={4} xl={4} lg={4} md={5} sm={4} xs={5}>
          <UserSider selectedKey="2" />
        </Col>
        <Col
          className="favorites"
          xxl={20}
          xl={20}
          lg={20}
          md={19}
          sm={20}
          xs={19}
        >
          <h1>Coming Soon....</h1>
        </Col>
      </Row>
    </FavouritesTag>
  );
};

export default FavouritesPage;

const FavouritesTag = styled.div`
  .favorites {
    display: flex;
    justify-content: center;
    align-items: center;
    h1 {
      font-size: 1.5rem;
    }
  }
`;
