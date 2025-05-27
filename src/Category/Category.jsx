import React, { useState, useRef, useEffect } from 'react';
import { Button, Dropdown, Space, Modal,Select,Popconfirm } from 'antd';
import { DownOutlined, UserOutlined, PlusOutlined } from '@ant-design/icons';
import useCategoryFetch from './CategoryHook';
import { useNavigate } from "react-router-dom";
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import updateCategoryAPI from './updateCategory';
import { toast, ToastContainer } from 'react-toastify';
import useGetHook from '../Operater/OpcodeHook';

const { Option } = Select;



const channelItems = [
  { label: 'USSD', key: 'USSD', icon: <UserOutlined /> },
  { label: 'APP', key: 'APP', icon: <UserOutlined /> },
];

const channelopcode = [
  { label: 'LYCAUG', key: 'LYCAUG', icon: <UserOutlined /> },
  { label: 'MTNUG', key: 'MTNUG', icon: <UserOutlined /> },
];

const Category = () => {
  // const [opcode, setOpcode] = useState('');
  const [opcode, setOpcode] = useState('');

  const [channel, setChannel] = useState('');
  const navigate = useNavigate();
  const { categories, loading, fetchCategories } = useCategoryFetch();
  const [categoryList, setCategoryList] = useState([]);
  const [updateLoading, setUpdateLoading] = useState(false);

  useEffect(() => {
    if (Array.isArray(categories)) {
      const validCategories = categories.filter(cat => cat && cat.catId && cat.category);
      setCategoryList(validCategories);
    }
  }, [categories]);

  const moveRow = (dragIndex, hoverIndex) => {
    if (dragIndex === hoverIndex) return;
    setCategoryList((prevList) =>
      update(prevList, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevList[dragIndex]]
        ]
      })
    );
  };

  const { data: opcodes = [], loading: loadingOpcodes, error: errorOpcodes, fetchData: fetchOpcodes } = useGetHook();

   useEffect(() => {
      fetchOpcodes(); // fetch without any params for now
    }, []);

  const handleMenuClick = (e) => {
    setChannel(e.key);
  };

  const handleSubmit = async () => {
    if (!opcode || !channel) {
      toast.warning('Please enter OPCODE and CHANNEL');
      return;
    }

    const loadingId = toast.loading('Fetching categories...');

    const result = await fetchCategories(opcode, channel);

    toast.dismiss(loadingId);

    if (result.success) {
      toast.success(result.message);
      localStorage.setItem('categoryInputs', JSON.stringify({ opcode, channel }));
    } else {
      toast.error(result.message);
    }
  };

  const handleUpdate = async () => {
    if (!opcode || !channel) {
      Modal.warning({
        title: 'Missing Info',
        content: 'Please select OPCODE and CHANNEL before updating.',
      });
      return;
    }

    const requestPayload = categoryList.map((cat, index) => ({
      catId: index + 1,
      channel: channel,
      category: cat.category,
      opcode: opcode,
    }));

    setUpdateLoading(true);

    try {
      const result = await updateCategoryAPI(requestPayload);
      if (result.success) {
        toast.success(result.message || 'Category updated successfully!');
       }
       else {
        toast.success(result.message || 'Category updated successfully!');
      }
      
    } catch (error) {
      console.error('Update Error:', error);
      Modal.error({
        title: 'Error',
        content: 'An unexpected error occurred during update.',
      });
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleDelete = (index) => {
    const newList = [...categoryList];
    newList.splice(index, 1);
    setCategoryList(newList);
  };

  const DraggableRow = ({ item, index, moveRow, onDelete }) => {
    const ref = useRef(null);

    const [, drop] = useDrop({
      accept: 'row',
      hover: (draggedItem) => {
        if (!ref.current || draggedItem.index === index) return;
        moveRow(draggedItem.index, index);
        draggedItem.index = index;
      }
    });

    const [{ isDragging }, drag] = useDrag({
      type: 'row',
      item: { index },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });

    drag(drop(ref));

    return (
      <tr
        ref={ref}
        style={{ opacity: isDragging ? 0.5 : 1 }}
        className="text-center cursor-move"
      >
        <td className="border px-4 py-2 text-center">{index + 1}</td>
        <td className="border px-4 py-2 text-center">
          <Button type="primary" size="small">{item.category}</Button>
        </td>
      
<td className="border px-4 py-2 text-center">
  <Popconfirm
    title="Do you want to delete this?"
    onConfirm={() => onDelete(index)}
    okText="Yes"
    cancelText="No"
  >
    <Button danger size="small">Delete</Button>
  </Popconfirm>
</td>
      </tr>
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="absolute overflow-hidden top-14 border border-gray-200 rounded-xl m-2 bg-gray-100 px-5 inset-0 left-45">
        <div className="flex justify-between items-center  py-2">
          <h1 className="text-2xl text-gray-500 py-2">Category</h1>
          <Button className="mr-6 items-center text-xl" onClick={() => navigate('/addCategory')} loading={loading}>
            <PlusOutlined /> Add Category
          </Button>
        </div>

        <Space wrap className="border-none ">

          {/* _________________________________________ */}

          <div className="flex items-center">
          <label className="w-20">OPCODE:</label>
          <Select
            value={opcode}
            onChange={(v) => setOpcode(v)}
            style={{ width: 180 }}
            placeholder="Select OPCODE"
          >
            {opcodes.length ? (
              opcodes.map((op) => (
                <Select.Option key={op.id} value={op.opcode}>
                  {op.opcode}
                </Select.Option>
              ))
            ) : (
              <Select.Option disabled>No OPCODEs available</Select.Option>
            )}
          </Select>
        </div>

    {/* --------------------------------- */}

          <div className="flex items-center space-x-2">
              <label className="text-gray-700">Channel:</label>
              <Select
                // mode='tags'
                showSearch
                value={channel}
                placeholder="Select or type CHANNEL"
                onChange={(value) => setChannel(value)}
                style={{ width: 200 }}
                options={channelItems.map((item) => ({
                  label: item.label,
                  value: item.key,
                }))}
                allowClear
              />
            </div>

    {/*------------------------------------------  */}

          <div className="flex items-center ">
            <label className="invisible">Submit</label>
            <Button type="primary" onClick={handleSubmit} loading={loading}>
              Submit
            </Button>
          </div>
        </Space>

        <div className="mt-5 py-2">
          <div className="flex justify-between items-center mb-4 pr-2">
            <h2 className="text-xl font-bold mb-2">Categories List</h2>
            <Button loading={updateLoading} type="primary" onClick={handleUpdate}>Update</Button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full border border-black text-sm">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border px-4 py-2 text-center">Cat ID</th>
                  <th className="border px-4 py-2 text-center">Category</th>
                  <th className="border px-4 py-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {categoryList.length > 0 ? (
                  categoryList.map((item, index) => (
                    <DraggableRow
                      key={item.category + index}
                      item={item}
                      index={index}
                      moveRow={moveRow}
                      onDelete={handleDelete}
                    />
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="text-center py-4">No categories available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <ToastContainer/>

      </div>
    </DndProvider>
  );
};

export default Category;
