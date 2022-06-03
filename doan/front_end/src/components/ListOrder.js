import {
  Popconfirm,
  Table,
  Typography,
  Input,
  Form,
  Tooltip,
  Tag,
  Select,
} from "antd";
import { useState } from "react";
import "../assets/css/list.css";
import Orders from "../services/orderServices";
import Toast from "./Toast";
import moment from "moment";
import { useLocation } from "react-router-dom";
import Suppliers from "../services/supplierServices";

const ListTable = ({
  data,
  noName,
  noStatus,
  noPay,
  noRec,
  noSup,
  XAxis,
  YAxis,
  noImg,
  noOrder,
  setData,
}) => {
  const [editingKey, setEditingKey] = useState("");
  const [form] = Form.useForm();
  let location = useLocation();
  const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    const inputNode =
      inputType === "select" ? (
        <Select>
          <Select.Option value="đang đợi gói hàng">
            đang đợi gói hàng
          </Select.Option>
          <Select.Option value="đang giao hàng">đang giao hàng</Select.Option>
          <Select.Option value="đã xác nhận">đã xác nhận</Select.Option>
          <Select.Option value="giao hàng thành công">
            giao hàng thành công
          </Select.Option>
          <Select.Option value="đã hủy">đã hủy</Select.Option>
        </Select>
      ) : (
        <Input />
      );
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{
              margin: 0,
            }}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  const isEditing = (record) => record.key === editingKey;
  const cancel = () => {
    setEditingKey("");
  };

  const edit = (record) => {
    form.setFieldsValue(record);
    setEditingKey(record.key);
  };
  const save = async () => {
    try {
      if (location.pathname === "/order") {
        const { id, user_name, address, phone, state, receive_date } =
          form.getFieldValue();
        if (state === "giao hàng thành công") {
          await Orders.updateOrder(id, {
            user_name,
            address,
            phone,
            state,
            receive_date: new Date(),
          });
          setData(
            data.map((item) => {
              if (item.id === id) {
                return {
                  ...item,
                  user_name,
                  address,
                  phone,
                  state,
                  receive_date: new Date(),
                };
              } else return item;
            })
          );
        } else if (state === "giao hàng thành công" && receive_date) {
          await Orders.updateOrder(id, {
            user_name,
            address,
            phone,
          });
          setData(
            data.map((item) => {
              if (item.id === id) {
                return {
                  ...item,
                  user_name,
                  address,
                  phone,
                };
              } else return item;
            })
          );
        } else {
          await Orders.updateOrder(id, {
            user_name,
            address,
            phone,
            state,
          });
          setData(
            data.map((item) => {
              if (item.id === id) {
                return {
                  ...item,
                  user_name,
                  address,
                  phone,
                  state,
                };
              } else return item;
            })
          );
        }
      } else {
        const { id, user_name, address, phone } = form.getFieldValue();
        await Suppliers.updateSupplier(id, {
          user_name,
          address,
          phone,
        });
        setData(
          data.map((item) => {
            if (item.id === id) {
              return {
                ...item,
                user_name,
                address,
                phone,
              };
            } else return item;
          })
        );
      }

      Toast("success", "update success");
    } catch (error) {
      Toast("error", error.message);
    }

    setEditingKey("");
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      fixed: "left",
      width: 150,
      ellipsis: {
        showTitle: false,
      },
      render: (address) => (
        <Tooltip placement="topLeft" title={address}>
          {address}
        </Tooltip>
      ),
    },
    {
      title: "Name",
      dataIndex: "user_name",
      key: "user_name",
      fixed: "left",
      width: 150,
      editable: true,
      hidden: noName,
    },
    {
      title: "Supllier",
      dataIndex: "supplier_name",
      key: "supplier_name",
      fixed: "left",
      width: 150,
      editable: true,
      hidden: noSup,
    },
    {
      title: `${!noOrder ? "Order Date" : "Created"} `,
      dataIndex: "created",
      key: "created",
      width: 150,
      editable: false,
      render: (_, record) => {
        return (
          <div>
            {moment(record.receive_date).zone("+07:00").format("DD/MM/YYYY")}
          </div>
        );
      },
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      editable: true,
      ellipsis: {
        showTitle: false,
      },
      width: 250,
      render: (address) => (
        <Tooltip placement="topLeft" title={address}>
          {address}
        </Tooltip>
      ),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      width: 150,
      editable: true,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      width: 150,
      editable: false,
    },
    {
      title: "Payment Type",
      dataIndex: "payment_type",
      key: "payment_type",
      editable: false,
      hidden: noPay,
      width: 150,
    },
    {
      title: "Recive Date",
      dataIndex: "receive_date",
      key: "receive_date",
      width: 150,
      editable: false,
      hidden: noRec,
      render: (_, record) => {
        if (record.receive_date) {
          return (
            <div>
              {moment(record.receive_date).zone("+07:00").format("DD/MM/YYYY")}
            </div>
          );
        } else {
          return <div></div>;
        }
      },
    },
    {
      title: "Status",
      dataIndex: "state",
      key: "state",
      fixed: "right",
      editable: true,
      hidden: noStatus,
      render: (_, record) => {
        let colorTag;
        switch (record.state) {
          case "đang đợi gói hàng":
            colorTag = "yellow";
            break;
          case "đã xác nhận":
            colorTag = "blue";
            break;
          case "đang giao hàng":
            colorTag = "gray";
            break;
          case "giao hàng thành công":
            colorTag = "green";
            break;
          case "đã hủy":
            colorTag = "red";
            break;
        }
        return <Tag color={colorTag}>{record.state}</Tag>;
      },
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <div style={{ display: "flex", gap: 10 }}>
            <Typography.Link
              disabled={editingKey !== ""}
              onClick={() => edit(record)}
            >
              Edit
            </Typography.Link>
          </div>
        );
      },
      fixed: "right",
      width: 150,
    },
  ].filter((column) => !column.hidden);

  const childrenColumns = [
    {
      title: "Product Code",
      dataIndex: "product_code",
      key: "product_code",
    },
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
      editable: true,
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: () => {
        return (
          <img
            src="https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
            className="product__img"
          />
        );
      },
      hidden: noImg,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      editable: true,
      render: (_, record) => {
        return (
          <div>{`${Number(record.price).toLocaleString("en-US", {
            style: "currency",
            currency: "VND",
          })}`}</div>
        );
      },
    },
    {
      title: "Color",
      dataIndex: "color",
      key: "color",
      editable: true,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      editable: true,
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
      editable: true,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      editable: true,
    },
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
      editable: true,
    },
  ].filter((column) => !column.hidden);

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === "state" ? "select" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      // Column configuration not to be checked
      name: record.name,
    }),
  };
  return (
    <Form form={form} component={false}>
      <Table
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
        style={{ padding: 10 }}
        className="box-shadow"
        columns={mergedColumns}
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        expandable={{
          expandedRowRender: (record) => (
            <Table
              components={{
                body: {
                  cell: EditableCell,
                },
              }}
              columns={childrenColumns}
              dataSource={record?.details}
              pagination={false}
            />
          ),
        }}
        scroll={{ x: XAxis, y: YAxis }}
        dataSource={data}
        pagination={false}
      />
    </Form>
  );
};

export default ListTable;
