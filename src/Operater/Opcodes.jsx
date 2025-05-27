import React, { useEffect, useState } from 'react';
import { Table, Spin, Alert, Button } from 'antd';
import useGetHook from './OpcodeHook';
import { useNavigate } from 'react-router-dom';

const OpCodeTable = () => {
  const { data, loading, error, fetchData } = useGetHook();
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'OpCode',
      dataIndex: 'opcode',
      key: 'opcode',
    },
  ];

  return (
    <div className="absolute left-45 top-14 inset-0 px-5 border border-gray-200 rounded-xl m-2 bg-gray-100">
      <div className="flex flex-col h-full">

        {/* Header Section */}
        <div className="flex justify-between items-center  text-black pr-6 py-1 rounded-t-lg ">
          <h1 className="text-2xl text-gray-500">OPCODE</h1>
          <Button
            onClick={() => navigate('/AddOpcode')}
            className="bg-blue-600 text-indigo-600 font-semibold hover:bg-gray-200"
          >
            Add OpCode
          </Button>
        </div>

        {/* Table Section */}
        <div className="flex-1 mt-4  overflow-auto">
          <h2 className="text-xl font-semibold text-gray-700 underline mb-4">OpCode Table</h2>

          {loading ? (
            <Spin size="large" />
          ) : error ? (
            <Alert message="Error" description={error} type="error" showIcon />
          ) : (
            <Table
              columns={columns}
              dataSource={data}
              rowKey="id"
              bordered={false}
              pagination={false}
              components={{
                header: {
                  cell: (props) => (
                    <th
                      {...props}
                      className="!bg-zinc-700 !text-white !border !border-gray-300 !p-3"
                    />
                  ),
                },
                body: {
                  row: (props) => (
                    <tr
                      {...props}
                      className="border-b !bg-gray-200 border-gray-200 hover:bg-indigo-50"
                    />
                  ),
                },
              }}
            />
          )}
        </div>

      </div>
    </div>
  );
};

export default OpCodeTable;
