import { Row, Col, Table, Button, message } from "antd";
import React from "react";

const TableLayout = ({
  dataSource,
  columns,
  tab,
  loading,
  state,
  setReload = (f) => f,
  reload = undefined,
  success,
  setSuccess,
  expandableValues,
  scroll,
  createButton,
}) => {
  message.config({
    maxCount: 1,
  });
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
          {tab === "Users" ? (
            <div></div>
          ) : (
            <Button type="primary" size="large" shape="round" onClick={state}>
              Create
            </Button>
          )}
        </Col>
      </Row>

      {expandableValues ? (
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={true}
          loading={loading}
          expandable={expandableValues}
        />
      ) : (
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={true}
          loading={loading}
          scroll={{ x: scroll }}
        />
      )}
      {success && message.success("Successful operation!") && setSuccess(false)}
    </Col>
  );
};

export default TableLayout;
