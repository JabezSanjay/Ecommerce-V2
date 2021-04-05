import { Col, Table } from "antd";
import React from "react";

const TableLayout = ({ dataSource, columns, tab }) => {
  return (
    <Col
      xl={19}
      lg={19}
      md={17}
      sm={20}
      xs={18}
      style={{ marginTop: "10vh", marginLeft: "10px" }}
    >
      <h1 className="table-header">Manage {tab}</h1>
      <Table dataSource={dataSource} columns={columns} pagination={false} />
    </Col>
  );
};

export default TableLayout;
