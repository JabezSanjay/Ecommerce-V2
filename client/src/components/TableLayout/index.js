import { Row, Col, Table, Button } from "antd";
import React from "react";

const TableLayout = ({ dataSource, columns, tab, loading, state }) => {
  return (
    <Col
      xl={19}
      lg={19}
      md={17}
      sm={20}
      xs={18}
      style={{ marginTop: "10vh", marginLeft: "10px" }}
    >
      <Row>
        <Col span={16}>
          <h1 className="table-header">Manage {tab}</h1>
        </Col>
        <Col span={8}>
          <Button type="primary" size="large" shape="round" onClick={state}>
            Create
          </Button>
        </Col>
      </Row>

      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        loading={loading}
      />
    </Col>
  );
};

export default TableLayout;
