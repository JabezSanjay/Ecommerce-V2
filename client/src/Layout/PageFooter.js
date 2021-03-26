import React from "react";
import styled from "styled-components";

const PageFooter = () => {
  return (
    <PageFooterTag>
      <div className="footer">
        <p>Footer</p>
      </div>
    </PageFooterTag>
  );
};

export default PageFooter;

const PageFooterTag = styled.div`
  .footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: #1890ff;
    color: white;
    text-align: center;
    min-height: 7.5vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
