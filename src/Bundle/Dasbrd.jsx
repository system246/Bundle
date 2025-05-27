import React, { useState, useEffect } from "react";
import { notification} from "antd";
import { Table, Input, Button, Form, message, Select, Modal } from "antd";
import useAxios from "./Getdata";
import useUpdateAxios from "./UpdatebyPost";
import { PlusOutlined } from "@ant-design/icons";
import AddBundlehook from "./AddData";
import DashTop from "./DashTop/DashTop";
import { toast } from "react-toastify";
import useGetHook from '../Operater/OpcodeHook';
 

const { Option } = Select;

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
  return (
    <td {...restProps}>
      {editing ? (
        dataIndex === "flag" ? (
          <Form.Item
            name={dataIndex}
            style={{ margin: 0 }}
            rules={[{ required: true, message: `Please select ${title}!` }]}
          >
            <Select>
              <Select.Option value="ACTIVE">ACTIVE</Select.Option>
              <Select.Option value="INACTIVE">INACTIVE</Select.Option>
              <Select.Option value="PENDING">PENDING</Select.Option>
            </Select>
          </Form.Item>
        ) : (
          <Form.Item
            name={dataIndex}
            style={{ margin: 0 }}
            rules={[{ required: false, message: `Please input ${title}!` }]}
          >
            <Input />
          </Form.Item>
        )
      ) : (
        children
      )}
    </td>
  );
};

const API_URL = "http://172.16.130.8:6060/collect/bundle/txn?size=100&page=0";

const Dasbrd = () => {
  const { data, loading, error, refetch, } = useAxios(API_URL, "GET");
  const { updateData: updateFlags } = useUpdateAxios(); // for "Update Flag"
  const { addBundle } = AddBundlehook(); // for "Add Bundle"

  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const [tableData, setTableData] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  // const [showTable, setShowTable] = useState(true);
  const [flagLoading, setFlagLoading] = useState(false);
  const [addBundleModalVisible, setAddBundleModalVisible] = useState(false);
  const [newBundleData, setNewBundleData] = useState({});

  const isEditing = (record) => record.id === editingKey;


   const {
    data: opcodes = [],
    loading: loadingOpcodes,
    error: errorOpcodes,
    fetchData: fetchOpcodes,
  } = useGetHook();

  useEffect(() => {
    fetchOpcodes(); // Fetch operator codes on mount
  }, []);

  // showTable(true);

  useEffect(() => {
    if (Array.isArray(data)) {
      setTableData(data);
    }
  }, [data]);

  const initialBundleState = {
  id: "",
  bundleName: "",
  bundleId: "",
  amount: "",
  bundleDescription: "",
  bundleDetailsDescription: "",
  currency: "",
  category: "",
  opCode: "",
  channel: "",
  validity: "",
};

  const handleFlagUpdate = async () => {
    if (selectedRowKeys.length === 0) return;

    const selectedItems = tableData
      .filter((item) => selectedRowKeys.includes(item.id))
      .map((item) => ({ ...item,
        flag: item.flag !== "ACTIVE" ? "ACTIVE" : "INACTIVE"
      }));

    try {
      setFlagLoading(true);
      await updateFlags(selectedItems);
      toast.success("Flags updated successfully!");
      setSelectedRowKeys([]);
      refetch();
    } catch (error) {
      toast.error("Flag update failed.");
    } finally {
      setTimeout(() => {
        setFlagLoading(false);
      }, 2000);
    }
  };


  
  // const handleAddBundle = async () => {
  //   try {
  //     const response = await addBundle(newBundleData); // store response
  //     setAddBundleModalVisible(false);
  
  //     toast.success(response); 
    
  //     // or use response.message if available
  //     notification.success({
  //       message: 'Success',
  //       description: 'The bundle has been added successfully.',
  //       placement: 'topRight',
  //     });
  
  //     console.log("New bundle data:", newBundleData);
  //     refetch();
  //   } catch (error) {
  //     toast.error("Failed to add bundle.");
  //     notification.error({
  //       message: 'Error',
  //       description: 'There was an issue adding the bundle.',
  //       placement: 'topRight',
  //     });
  //   }
  // };
  

  const handleAddBundle = async () => {
  try {
    const response = await addBundle(newBundleData); 
     setAddBundleModalVisible(false);
     toast.success(response);
    notification.success({
      message: 'Success',
      description: 'The bundle has been added successfully.',
      placement: 'topRight',
    });

    console.log("New bundle data:", newBundleData);

    // ✅ Reset form fields
    form.resetFields();

    // ✅ Clear local state
    setNewBundleData({
      id: "",
      bundleName: "",
      bundleId: "",
      amount: "",
      bundleDescription: "",
      bundleDetailsDescription: "",
      currency: "",
      category: "",
      opCode: "",
      channel: "",
      validity: "",
    });

    // Refresh data
    refetch();

  } catch (error) {
    toast.error("Failed to add bundle.");
    notification.error({
      message: 'Error',
      description: 'There was an issue adding the bundle.',
      placement: 'topRight',
    });
  }
};


  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Bundle ID", dataIndex: "bundleId", editable: true },
    { title: "Bundle Name", dataIndex: "bundleName", editable: true },
    { title: "Amount", dataIndex: "amount", editable: true },
    {
      title: "Bundle Description",
      dataIndex: "bundleDescription",
      editable: true,
    },
    {
      title: "Bundle Detail Description",
      dataIndex: "bundleDetailsDescription",
      editable: true,
    },
    { title: "Currency", dataIndex: "currency", editable: true },
    // { title: "Channel 1", dataIndex: "channel1", editable: true },
    { title: "Channel", dataIndex: "channel", editable: true },
    { title: "Category", dataIndex: "category", editable: true },
    { title: "Operator Code", dataIndex: "opCode", editable: true },
    { title: "Validity", dataIndex: "validity", editable: true },
    {
      title: "Flag",
      dataIndex: "flag",
      render: (flag) => (
        <span
          style={{
            backgroundColor:
              flag === "ACTIVE"
                ? "#4CAF50"
                : flag === "INACTIVE"
                ? "#FF9800"
                : "#f44336",
            color: "white",
            padding: "4px 8px",
            borderRadius: "4px",
            display: "inline-block",
          }}
        >
          {flag || "N/A"}
        </span>
      ),

    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) return col;
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  if (error)
    return (
      <p style={{ color: "red", paddingLeft: "140px", paddingTop: "10px" }}>
        Error: {error.message || "Something went wrong while fetching data. !"}
      </p>
    );

  return (
    <div className="absolute top-13.5 px-5  m-2 inset-0 left-45 border border-gray-200 rounded-lg bg-gray-100 shadow-md py-4 overflow-x-hidden overflow-y-auto">
      <DashTop />
      <hr className="my-2 border-t border-gray-300 opacity-40" />

      <div className="top flex justify-between  mb-4">
        <h1 className="text-2xl text-gray-500">All Bundle</h1>
        <div className="flex items-center gap-3">
          <Button
            type="primary"
            loading={flagLoading}
            onClick={handleFlagUpdate}
            className="bg-blue-500 py-1 px-4 rounded cursor-pointer hover:bg-blue-600"
          >
            Update Flag
          </Button>
          <Button
            icon={<PlusOutlined />}
            type="primary"
            onClick={() => setAddBundleModalVisible(true)}
            className="bg-green-500 text-white py-1 px-4 rounded hover:bg-green-600"
          >
            Add Bundle
          </Button>
        </div>
      </div>

      <Form form={form} component={false} className="shadow-md">
        <Table
          components={{ body: { cell: EditableCell } }}
          bordered
          loading={loading}
          dataSource={tableData}
          columns={mergedColumns}
          rowClassName="editable-row"
          rowKey="id"
          rowSelection={{
            selectedRowKeys,
            onChange: setSelectedRowKeys,
          }}
          pagination={{ pageSize: 10 }}
          scroll={{ x: "max-content" }}
        />
      </Form>

      {/* Add Bundle Modal */}
      <Modal
  title="Add Bundle"
  visible={addBundleModalVisible}
  onCancel={() => setAddBundleModalVisible(false)}
    footer={null}  // Hides OK/Cancel

  // onOk={handleAddBundle}
>
<Form layout="vertical"
 onFinish={handleAddBundle}
  form={form} 
  onFinishFailed={() => toast.error("Please fill all fields")}>

    {/* for ID */}
    <Form.Item
      label="ID"
      name="id"
      rules={[
        { required: true, message: "Please enter the ID!" },
        {
          validator: (_, value) =>
            value && value.length === 6
              ? Promise.resolve()
              : Promise.reject(new Error("ID must be exactly 6 characters long")),
        },
      ]}
    >
      <Input
        maxLength={6}
        value={newBundleData.id}
        onChange={(e) => {
          const val = e.target.value;
          if (val.length <= 6) {
            setNewBundleData({ ...newBundleData, id: val });
          }
        }}
      />
    </Form.Item>

    {/* for Bundle Name */}

  <Form.Item
    label="Bundle Name"
    name="bundleName"
    rules={[{ required: true, message: "Please enter the bundle name!" }]}
  >
    <Input
      value={newBundleData.bundleName}
      onChange={(e) =>
        setNewBundleData({ ...newBundleData, bundleName: e.target.value })
      }
    />
  </Form.Item>

  {/* for Bundle ID */}
  <Form.Item
    label="Bundle ID"
    name="bundleId"
    rules={[{ required: true, message: "Please enter the bundle ID!" }]}
  >
    <Input
      value={newBundleData.bundleId}
      onChange={(e) =>
        setNewBundleData({ ...newBundleData, bundleId: e.target.value })
      }
    />
  </Form.Item>

  {/* for Amount */}
  <Form.Item
    label="Amount"
    name="amount"
    rules={[{ required: true, message: "Please enter the amount!" }]}
  >
    <Input
      value={newBundleData.amount}
      onChange={(e) =>
        setNewBundleData({ ...newBundleData, amount: e.target.value })
      }
    />
  </Form.Item>

  {/* for Bundle Description */}
  <Form.Item
    label="Bundle Description"
    name="bundleDescription"
    rules={[{ required: true, message: "Please enter the bundle description!" }]}
  >
    <Input
      value={newBundleData.bundleDescription}
      onChange={(e) =>
        setNewBundleData({ ...newBundleData, bundleDescription: e.target.value })
      }
    />
  </Form.Item>

  {/* for Bundle Details Description */}
  <Form.Item
    label="Bundle Details Description"
    name="bundleDetailsDescription"
    rules={[{ required: false, message: "Please enter the bundle details description!" }]}
  >
    <Input
      value={newBundleData.bundleDetailsDescription}
      onChange={(e) =>
        setNewBundleData({
          ...newBundleData,
          bundleDetailsDescription: e.target.value,
        })
      }
    />
  </Form.Item>

  {/* for Currency */}
  <Form.Item
  label="Currency"
  name="currency"
  rules={[{ required: true, message: "Please select the currency!" }]}
>
  <Select
    value={newBundleData.currency}
    onChange={(value) =>
      setNewBundleData({ ...newBundleData, currency: value })
    }
    placeholder="Select Currency"
    allowClear
  >
    <Option value="UGX">UGX</Option>
    <Option value="TZS">TZS</Option>
  </Select>
</Form.Item>

  {/* for Category */}
 <Form.Item
  label="Category"
  name="category"
  rules={[{ required: true, message: "Please enter the category!" }]}
>
  <Input
    value={newBundleData.category}
    onChange={(e) => setNewBundleData({ ...newBundleData, category: e.target.value })}
    placeholder="Enter category"
  />
  </Form.Item>

  {/* for Operator Code */}
 <Form.Item
      label="Operator Code"
      name="opCode"
      rules={[{ required: true, message: 'Please select the operator code!' }]}
    >
      <Select
        loading={loadingOpcodes}
        value={newBundleData.opCode}
        onChange={(value) => setNewBundleData({ ...newBundleData, opCode: value })}
        placeholder="Select operator code"
        allowClear
      >
        {opcodes.length ? (
          opcodes.map((op) => (
            <Option key={op.id} value={op.opcode}>
              {op.opcode}
            </Option>
          ))
        ) : (
          <Option disabled>No OPCODEs available</Option>
        )}
      </Select>
    </Form.Item>

  {/* for Channel */}
<Form.Item
  label="Channel"
  name="channel"
  rules={[{ required: true, message: "Please select the channel!" }]}
>
  <Select
    value={newBundleData.channel}
    onChange={(value) =>
      setNewBundleData({ ...newBundleData, channel: value })
    }
    placeholder="Select channel"
    allowClear
  >
    <Option value="USSD">USSD</Option>
    <Option value="APP">APP</Option>
  </Select>
</Form.Item>

  {/* for Validity */}
<Form.Item
  label="Validity"
  name="validity"
  rules={[{ required: true, message: "Please enter the validity!" }]}
>
  <Input
    value={newBundleData.validity}
    onChange={(e) => setNewBundleData({ ...newBundleData, validity: e.target.value })}
    placeholder="Enter validity"
  />
</Form.Item>

  {/* for Flag */}
 <Form.Item>
    <Button type="primary" htmlType="submit">
      Submit
    </Button>
  </Form.Item>

</Form>

</Modal>



    </div>
  );
};

export default Dasbrd;
