import React, { useState,useEffect, useRef } from "react";
import { Select, Button,  Input, Spin } from "antd";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import useBundleFetch from "./GetDumy";
import useBundleUpdate from "./UpdateDumyDash";
import { motion } from "framer-motion";
import { toast,ToastContainer } from "react-toastify";
import useCategoryFetch from '../../Category/CategoryHook';  
import useValidityFetch from '../../VAL/ValidHook';
import useGetHook from '../../Operater/OpcodeHook';
import { FaC, FaCircleHalfStroke, FaCircleXmark } from "react-icons/fa6";
 
const { Option } = Select;
const type = "row";
 
const DraggableRow = ({
  record,
  index,
  moveRow,
  isEditing,
  onEdit,
  onSave,
  // onCancel,
  onChange,
}) => {
  const ref = useRef(null);
 
  const [, drop] = useDrop({
    accept: type,
    hover(item) {
      if (item.index !== index) {
        moveRow(item.index, index);
        item.index = index;
      }
    },
  });
 
  const [, drag] = useDrag({
    type,
    item: { index },
  });
 
  drag(drop(ref));
 
  return (
    <tr ref={ref} className="border-b hover:bg-gray-100 transition">
      <td className="p-3">{index + 1}</td>
      <td className="p-3">{record.ID}</td>
      <td className="p-3">{record.BUNDLEID}</td>
       <td className="p-3">{record.OPCODE}</td>
      <td className="p-3">{record.CHANNEL}</td>
        <td className="p-3">
      {isEditing ? (
          <Input
            size="small"
            value={record.CATEGORY}
            onChange={(e) => onChange("CATEGORY", e.target.value)}
          />
        ) : (
          record.CATEGORY
        )}
      </td>
      <td className="p-3">
      {isEditing ? (
          <Input
            size="small"
            value={record.VALIDITY}
            onChange={(e) => onChange("VALIDITY", e.target.value)}
          />
        ) : (
          record.VALIDITY
        )}
      </td>
      <td className="p-3">
        {isEditing ? (
          <Input
            size="small"
            value={record.AMOUNT}
            onChange={(e) => onChange("AMOUNT", e.target.value)}
          />
        ) : (
          <span className="font-semibold">
            {record.AMOUNT}
          </span>
        )}
      </td>
      <td className="p-3 text-center align-middle">
        {isEditing ? (
          <Input
            size="small"
            value={record.BUNDLEDESCRIPTION}
            onChange={(e) => onChange("BUNDLEDESCRIPTION", e.target.value)}
          />
        ) : (
          record.BUNDLEDESCRIPTION
        )}
      </td>
      <td className="p-3 align-middle text-center">
        {isEditing ? (
          <Input
            size="small"
            value={record.BUNDLEDETAILSDESCRIPTION}
            onChange={(e) =>
              onChange("BUNDLEDETAILSDESCRIPTION",e.target.value)
            }
          />
        ) : (
          record.BUNDLEDETAILSDESCRIPTION
        )}
      </td>
      <td className="p-3">{record.CURRENCY}</td>
<td className="p-3">
  {isEditing ? (
    <Select
      size="small"
      value={record.FLAG}
      onChange={(value) => onChange("FLAG", value)}
      style={{ width: 100 }}
    >
      <Select.Option value="ACTIVE">ACTIVE</Select.Option>
      <Select.Option value="INACTIVE">INACTIVE</Select.Option>
    </Select>
  ) : (
    <span
      className={`font-semibold ${
        record.FLAG === "ACTIVE" ? "text-green-600" : "text-red-600"
      }`}
    >
      {record.FLAG}
    </span>
  )}
</td>      <td className="p-3">
        {isEditing ? (
          <div className="flex gap-2">
            <Button
              size="small"
              type="primary"
              onClick={() => onSave(record.ID)}
            >
              Done
            </Button>
            {/* <Button size="small" danger onClick={onCancel}>
              Cancel
            </Button> */}
          </div>
        ) : (
          <Button size="small" type="link" onClick={() => onEdit(record.ID)}>
            Edit
          </Button>
        )}
      </td>
    </tr>
  );
};
 
const DashTop = ({ onBundleChange }) => {
  const [filters, setFilters] = useState({
    opcode: "",
    channel: "",
    category: "",
    validity: "",
  });
  const [rowData, setRowData] = useState([]);
  const [rowIDs, setRowIDs] = useState([]);
  const [editingKey, setEditingKey] = useState("");
  const [showTable, setShowTable] = useState(false);

  const { categories = [], fetchCategories, loadingCategories, errorCategories } = useCategoryFetch();
const { validities = [], fetchValidity } = useValidityFetch();
const { data: opcodes = [], loading: loadingOpcodes, error: errorOpcodes, fetchData: fetchOpcodes } = useGetHook();

 
  const { loading, error, fetchBundles } = useBundleFetch();
  const { updateBundles, updating } = useBundleUpdate();
 
  const reference = "202502090806";
 
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };
 

    // Fetch opcodes when component mounts
    useEffect(() => {
    fetchOpcodes(); // fetch without any params for now
  }, []);
  
    // Fetch categories when opcode & channel are selected
    useEffect(() => {
      if (filters.opcode && filters.channel) {
        fetchCategories(filters.opcode, filters.channel);
      }
    }, [filters.opcode, filters.channel]);
  
    // Fetch bundles when opcode, channel & category are selected
    useEffect(() => {
      if (filters.opcode && filters.channel && filters.category) {
  fetchValidity(filters.opcode, filters.channel, filters.category);
      }
    }, [filters.opcode, filters.channel, filters.category]);
  
 
  
  
 
  const handleShowTable = async () => {
    let { opcode, channel, category, validity } = filters;
  
    // Default unselected values to "All"
   opcode = !opcode || opcode === "Select OPCODE" ? "All" : opcode;
channel = !channel || channel === "Select Channel" ? "All" : channel;
category = !category || category === "Select Category" ? "All" : category;
validity = !validity || validity === "Select Validity" ? "All" : validity;

  
    // If opcode is still "All", hide table and exit
    // if (opcode === "All") {
    //   setShowTable(false);
    //   onBundleChange?.(false);
    //   setRowData([]);
    //   setRowIDs([]);
    //   return;
    // }
  
    try {
      // Clear old data before fetch
      setRowData([]);
      setRowIDs([]);
      setShowTable(false); // Hide table temporarily
  
      const result = await fetchBundles(opcode, channel, reference, category, validity);
  
      if (result?.success) {
        const bundles = result.data;
  
        if (bundles.length === 0) {
          toast.error("No bundles found.");
          setShowTable(false); // Do not show table if empty
          return;
        }
  
        const ids = bundles.map((item) => item.ID);
        const rows = bundles.map(({ ID, ...rest }) => rest);
  
        setRowIDs(ids);
        setRowData(rows);
        setShowTable(true);
        onBundleChange?.(false);
        toast.success(`Fetched ${bundles.length} bundles`);
      } else {
        toast.error(result?.toast || "Fetch failed.");
        setShowTable(true);
      }
    } catch {
      toast.error("Unexpected error while fetching bundles.");
      setRowData([]);
      setRowIDs([]);
      setShowTable(false);
    }
  };

  const hide = () => {
    setShowTable(false);
    setRowData([]);
    setRowIDs([]);}
  
 
  const moveRow = (from, to) => {
    const updated = [...rowData];
    const [moved] = updated.splice(from, 1);
    updated.splice(to, 0, moved);
    setRowData(updated);
  };
 
  const onEdit = (id) => setEditingKey(id);
  // const onCancel = () => setEditingKey("");
  const onChange = (field, value) => {
    setRowData((prev) =>
      prev.map((item, index) =>
        rowIDs[index] === editingKey ? { ...item, [field]: value } : item
      )
    );
  };
 
  const onSave = () => {
    const combined = rowData.map((item, i) => ({ ID: rowIDs[i], ...item }));
    localStorage.setItem("localBundles", JSON.stringify(combined));
    toast.success("Saved locally");
    setEditingKey("");
  };
 
  const handleUpdate = async () => {
    const { category, validity, opcode } = filters;
   
    const payload = rowData.map((data, index) => ({
      id: rowIDs[index],
      bundleId: data.BUNDLEID,
      bundleName: data.BUNDLEDESCRIPTION,
      amount: data.AMOUNT,
      bundleDescription: data.BUNDLEDESCRIPTION,
      bundleDetailsDescription: data.BUNDLEDETAILSDESCRIPTION,
      category: data.CATEGORY,
      currency: data.CURRENCY,
      validity: data.VALIDITY,
      channel: data.CHANNEL,
      flag: data.FLAG,

      // channel2: data.CHANNEL2,
     
      opCode: data.OPCODE,
    }));
 
    const result = await updateBundles(payload);
    toast.success("Bundle updated successfully")
  };
 
  return (
    <div className=" space-y-10">
      <div>
        <h1 className="text-2xl text-gray-500">Select Filters</h1>
        <div className="flex justify-between items-start gap-4 flex-wrap mb-4 ">
         
          <div className="filters">
             <div className="1&2 md:flex gap-6 py-2 flex-wrap items-center">
               {/* OPCODE Filter */}
            <div className="flex items-center">
              <label className="w-20">OPCODE:</label>
              <Select
                value={filters.opcode}
                onChange={(v) => handleFilterChange('opcode', v)}
                style={{ width: 180 }}
                placeholder="Select OPCODE"
              >
                <Option value="All">All</Option>
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
            </div>

            {/* Channel Filter */}
            <div className="flex items-center ">
              <label className="w-20">Channel:</label>
              <Select
              // mode="multiple"
                value={filters.channel}
                onChange={(v) => handleFilterChange("channel", v)}
                style={{ width: 180 }}
                placeholder="Select Channel"
              >
                <Option value="USSD">USSD</Option>
                <Option value="APP">APP</Option>
                <Option value="SMS">SMS</Option>
              </Select>
            </div>
           </div>

           <div className="3&4 md:flex gap-6 flex-wrap items-center">
             {/* Category Filter */}
            <div className="flex items-center">
              <label className="w-20">Category:</label>
              <Select
                // mode="multiple"
              
                value={filters.category}
                onChange={(v) => handleFilterChange('category', v)}
                style={{ width: 180 }}
                placeholder="Select Category"
              >
                <Option value="All">All</Option>
                {categories.length ? (
                  categories.map((cat) => (
                    <Option key={cat.catId} value={cat.category}>
                      {cat.category}
                    </Option>
                  ))
                ) : (
                  <Option disabled>No categories available</Option>
                )}
              </Select>
            </div>

            {/* Validity Filter */}
            <div className="flex items-center ">
              <label className="w-20">Validity:</label>
              <Select
                value={filters.validity}
                onChange={(v) => handleFilterChange('validity', v)}
                style={{ width: 180 }}
                placeholder="Select Validity"
              >
                <Option value="All">All</Option>
                {validities.length ? (
                  validities.map((item, index) => (
                    <Option key={index} value={item.validity}>
                      {item.validity}
                    </Option>
                  ))
                ) : (
                  <Option disabled>No validities available</Option>
                )}
              </Select>
            </div>
           </div>
          </div>

            {/* Show Table Button */}
            <motion.div whileTap={{ scale: 0.95 }}>
              <Button type="primary" onClick={handleShowTable}>
                Show Table
              </Button>
            </motion.div>

            {/* <Button type="default" onClick={hide} className="ml-2">
              Hide Table  </Button> */}
        </div>

      </div>
 
    
 
{showTable && (
        <div className="bg-white py-4 rounded shadow-lg">
          <div className="flex justify-between items-center mb-4 px-5">
            <h2 className="text-lg font-bold ">
              Bundles for Selected Filters
              {/* <span className="text-black font-bold">{filters.category}</span> -{" "}
              <span className="text-black font-bold ">{filters.validity}</span> */}
            </h2>
            <motion.div className="flex items-center gap-3" whileTap={{ scale: 0.95 }}>
            <Button type="primary" className="" onClick={handleUpdate} loading={updating}>
              Update Bundles
            </Button>
            <FaCircleXmark className="text-red-400 h-[25px] w-[25px] rounded-full   hover:text-red-500 cursor-pointer "onClick={hide}/>
            </motion.div>
          </div>
 
          {loading ? (
      <Spin tip="Loading bundles..." />
    ) : rowData.length > 0 ? (
      <DndProvider backend={HTML5Backend}>
      <div className="overflow-x-auto">
  <table className="min-w-full  rounded text-sm whitespace-nowrap">
    <thead className="bg-gray-100 text-gray-700 uppercase text-xs tracking-wider">
      <tr>
        <th className="p-3">S.No</th>
        <th className="p-3">ID</th>
        <th className="p-3">Bundle ID</th>
        <th className="p-3">OpCode</th>
        <th className="p-3">Channel</th>
         <th className="p-3">Category</th>
        <th className="p-3">Validity</th>
        <th className="p-3">Amount</th>
        <th className="p-3">Bundle Description</th>
        <th className="p-3">Details Description</th>
        <th className="p-3">Currency</th>
        <th className="p-3">Flag</th>
        <th className="p-3">Action</th>
      </tr>
    </thead>
    <tbody>
      {rowData.map((record, index) => (
        <DraggableRow
          key={rowIDs[index]}
          record={{ ...record, ID: rowIDs[index] }}
          index={index}
          moveRow={moveRow}
          isEditing={editingKey === rowIDs[index]}
          onEdit={onEdit}
          onSave={onSave}
          // onCancel={onCancel}
          onChange={onChange}
        />
      ))}
    </tbody>
  </table>
</div>

      </DndProvider>
    ) : (
      <p className="text-red-500 text-center mt-4">NO DATA FOUND</p>
    )}
  </div>
      )}
      <ToastContainer/>
    </div>
 
  );
};
 
export default DashTop;