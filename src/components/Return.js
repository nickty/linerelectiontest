import React, { useState } from "react";
import { Modal, Select, Space, DatePicker } from "antd";
const { Option } = Select;
const { RangePicker } = DatePicker;

const Return = ({ returnProduct, setReturnProduct, dataSource }) => {
  const [rentPrice, setRentPrice] = useState(0);
  const [mileage, setMileage] = useState(0);
  const [days, setDays] = useState(0);

  function handleChange(value) {
    console.log(`selected ${value}`);
    setRentPrice(value)
  }

  function onChange(date) {
    // extracting days by comparing two dates selected
    const days = Math.floor(
      Math.abs(new Date(date[1]) - new Date(date[0])) / (1000 * 60 * 60 * 24)
    );
    // check if days is counting correctly or not
    console.log(days);
    // set total days to state
    setDays(days);
    // mileage calculation
    setMileage(days * 10)
  }

  const handleOk = () => {
    setReturnProduct(false);

    // Showing calculation in a alert box
    alert(`Your estimated product price is: ${rentPrice * days} and Mileage is: ${mileage}`);
  };

  return (
    <Modal
      title="Return a service"
      visible={returnProduct}
      onCancel={() => setReturnProduct(false)}
      onOk={handleOk}
    >
      <Select
        defaultValue="Select return a service name"
        style={{ width: 250 }}
        onChange={handleChange}
      >
        {dataSource.map((single) => (
          <Option key={single.code} value={single.price}>
            {single.name}
          </Option>
        ))}
      </Select>
      <br />
      <br />
      <p>Please select start and submission date below: </p>
      <Space direction="vertical" size={12}>
        <RangePicker onChange={onChange} />
      </Space>
    </Modal>
  );
};

export default Return;
