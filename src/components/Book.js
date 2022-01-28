import React, { useState } from "react";
import { Modal, Select, DatePicker, Space } from "antd";
const { Option } = Select;
const { RangePicker } = DatePicker;

const Book = ({ book, setBook, dataSource }) => {
  const [rentPrice, setRentPrice] = useState(0);
  const [days, setDays] = useState(0);

  function handleChange(e) {
    console.log(`selected ${e}`);

    //set calculated price to state
    setRentPrice(e);
  }

  // function confirm(e) {
  //   console.log(e);

  //   message.success("Your estimated product price is: ", rentPrice * days);
  // }

  // function cancel(e) {
  //   console.log(e);
  //   message.error("Click on No");
  // }

  const handleOk = () => {
    setBook(false);

    // Showing calculation in a alert box
    alert(`Your estimated product price is: ${rentPrice * days}`);
  };
  function onChange(date) {
    // extracting days by comparing two dates selected
    const days = Math.floor(
      Math.abs(new Date(date[1]) - new Date(date[0])) / (1000 * 60 * 60 * 24)
    );
    // check if days is counting correctly or not
    console.log(days);
    // set total days to state
    setDays(days);
  }
  return (
    <Modal
      title="Book a service"
      visible={book}
      onCancel={() => setBook(false)}
      onOk={handleOk}
    >
      <Select
        defaultValue="Book a product"
        style={{ width: 450 }}
        onChange={(e) => handleChange(e)}
      >
        {dataSource.map((single) => (
          <Option key={single.code} value={single.price}>
            {single.name}
            <br />
            {single.mileage && "Mileage ="}
            {single.mileage && single.mileage}
            {single.mileage && <br />}
            Rental Period = {single.minimum_rent_period}
            <br />
            Need to Fix = {single.needing_repair ? "Yes" : "No"}
          </Option>
        ))}
      </Select>
      <br />
      <br />

      <Space direction="vertical" size={12}>
        <RangePicker onChange={onChange} />
      </Space>
    </Modal>
  );
};

export default Book;
