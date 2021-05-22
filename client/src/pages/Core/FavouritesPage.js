import React from "react";
import styled from "styled-components";
import UserSider from "../../components/Sider/UserSider";

const FavouritesPage = () => {
  return (
    <FavouritesTag>
      <UserSider selectedKey="2" />
    </FavouritesTag>
  );
};

export default FavouritesPage;

const FavouritesTag = styled.div`
  .favorites {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
