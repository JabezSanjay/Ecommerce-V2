import { Col, Row, Image, Button } from "antd";
import React, { useEffect, useState } from "react";
import { HeartOutlined } from "@ant-design/icons";
import styled from "styled-components";
import UserSider from "../../components/Sider/UserSider";
import { isAuthenticated } from "../Auth/helper";
import { loadFavorites, removeFavorites } from "./helper";
import TableLayout from "../../components/TableLayout";

const FavouritesPage = () => {
  const { user, token } = isAuthenticated();

  const [favorites, setFavorites] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState("");

  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false);

  const removeFromFavorite = async (favorite) => {
    setLoading(true);
    await removeFavorites(user._id, token, favorite);
    setLoading(false);
    setReload(!reload);
  };

  const columns = [
    {
      title: "Image",
      key: "_id",
      render: (record) => (
        <Image src={record.image_url} alt="Product image" width={100} />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <h4>{text}</h4>,
    },

    {
      title: "Price in Rs.",
      dataIndex: "price_in_rs",
      key: "_id",
      render: (text) => <h4>{text}</h4>,
    },
    {
      title: "Actions",
      key: "_id",
      render: (record) => (
        <Button
          type="danger"
          icon={<HeartOutlined />}
          onClick={() => {
            removeFromFavorite(record);
          }}
        >
          Remove
        </Button>
      ),
    },
  ];

  useEffect(() => {
    loadFavorites(user._id, token).then(async (data) => {
      if (data.error) {
        setError(data.error);
      } else {
        await setFavorites(data);
        setLoading(false);
      }
    });
  }, [reload, token, user._id]);

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
          <TableLayout
            columns={columns}
            dataSource={favorites}
            createButton={false}
            tab="Favorites"
            pagination={false}
            loading={loading}
            scroll={550}
          />
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
    margin-top: 2em;

    h1 {
      font-size: 1.5rem;
    }
  }
`;
