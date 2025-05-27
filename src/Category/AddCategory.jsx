import React, { useState } from 'react';
// import { Button, Input, Dropdown, message, Card, Form, , Modal } from 'antd';
// import { DownOutlined } from '@ant-design/icons';
import { Button, Select, Input, Spin, Space, message,Typography,Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import addCategoryAPI from './addCategoryHook';

const { Title } = Typography;
const { Option } = Select;


const channelItems = [
  { label: 'USSD', key: 'USSD' },
  { label: 'APP', key: 'APP' },
];

const opcodeItems = [
   { label: 'MTNUG', key: 'MTNUG' },
   { label: 'LYCAUG', key: 'LYCAUG', },

 ];

const AddCategory = () => {
  const [formData, setFormData] = useState({
    opcode: '',
    channel: '',
    catId: '',
    category: ''
  });
  const [ui, setUi] = useState({
    loading: false,
    modalVisible: false,
    modalSuccess: false,
    modalMessage: ''
  });

  const navigate = useNavigate();

  const handleChange = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleAdd = async () => {
    const { opcode, channel, catId, category } = formData;

    if (!opcode || !channel || !catId || !category) {
      message.warning('Please fill all fields.');
      return;
    }

    setUi(prev => ({ ...prev, loading: true }));

    const res = await addCategoryAPI({
      id: catId,
      opCode: opcode,
      channel,
      category,
    });

    setUi({
      loading: false,
      modalVisible: true,
      modalSuccess: res.success,
      modalMessage: res.message || (res.success ? 'Category added successfully!' : 'Failed to add category.')
    });
  };

  const handleModalClose = () => {
    setUi(prev => ({ ...prev, modalVisible: false }));
    if (ui.modalSuccess) {
      navigate('/category');
    }
  };

  const { opcode, channel, catId, category } = formData;

  return (
    <div className="absolute inset-0 overflow-hidden top-10 left-40 py-4 px-5">
        <div className="flex items-center justify-between px-5">
        <h1 className="text-2xl font-bold py-2 mt-6">Add Category</h1>
        <Button onClick={() => navigate('/category')}>Back to Category</Button>
      </div>

      <div className="flex flex-wrap items-end gap-4 border-none shadow-2xl px-4 mx-4 rounded-2xl py-4 bg-white">

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Cat ID :</label>
          <Input
            placeholder="Enter Cat ID"
            value={catId}
            onChange={e => handleChange('catId', e.target.value)}
            style={{ width: 160 }}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category :</label>
          <Input
            placeholder="Enter Category Name"
            value={category}
            onChange={e => handleChange('category', e.target.value)}
            style={{ width: 160 }}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Channel :</label>
          <Select
            placeholder="Select Channel"
            value={channel}
            onChange={value => handleChange('channel', value)}
            style={{ width: 160 }}
          >
            <Option value="USSD">USSD</Option>
            <Option value="APP">APP</Option>
            <Option value="SMS">SMS</Option>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">OpCode :</label>
          <Select
            placeholder="Select Opcode"
            value={opcode}
            onChange={value => handleChange('opcode', value)}
            style={{ width: 160 }}
          >
             <Option value="LYCAUG">LYCAUG</Option>
            {/* <Option value="AIRTEL">AIRTEL</Option> */}
            <Option value="MTNUG">MTNUG</Option>
          </Select>
        </div>

        <div className="flex items-end">
        <Button type="primary" onClick={handleAdd} disabled={ui.loading}>
  {ui.loading ? <Spin size="small" /> : 'Add'}
</Button>

        </div>
      </div>

      {/* Modal feedback */}
      <Modal
        open={ui.modalVisible}
        title={ui.modalSuccess ? 'Success' : 'Done'}
        onOk={handleModalClose}
        onCancel={handleModalClose}
        okText={ui.modalSuccess ? 'Go to Categories' : 'OK'}
        cancelButtonProps={{ style: { display: 'none' } }}
      >
        <p>{ui.modalMessage}</p>
      </Modal>
    </div>
  );
};

export default AddCategory;
