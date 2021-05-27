import { Col, Row } from "antd";
import React from "react";
import styled from "styled-components";
import UserSider from "../../components/Sider/UserSider";

const FavouritesPage = () => {
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
