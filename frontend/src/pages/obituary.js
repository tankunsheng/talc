import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Typography, Card, Select, Row, Col } from 'antd';
const { Title } = Typography;
import axios from '../libs/axios';
const years = [],
  months = [];
let days = [];

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth() + 1;
const currentDay = new Date().getDate();

const createDays = (numberOfDays) => {
  days = [];
  for (let day = 1; day <= numberOfDays; day++) {
    days.push(<Option key={day}>{day}</Option>);
  }
  return days;
};
for (let month = 1; month < 13; month++) {
  months.push(<Option key={month}>{month}</Option>);
}
for (let year = currentYear; year > currentYear - 30; year--) {
  years.push(<Option key={year}>{year}</Option>);
}

export default () => {
  // Month here is 1-indexed (January is 1, February is 2, etc). This is
  // because we're using 0 as the day so that it returns the last day
  // of the last month, so you have to add 1 to the month number
  // so it returns the correct amount of days
  const getDaysInMonth = (year, month) => {
    return new Date(year, month, 0).getDate();
  };
  const getObituariesOfDay = (year, month, day) => {
    console.log(`year ${year}`);
    console.log(`month ${month}`);
    console.log(`day ${day}`);
  };

  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [daysInMonth, setDaysInMonth] = useState();
  useEffect(() => {
    const daysInCurrentMonth = getDaysInMonth(currentYear, currentMonth);
    const daysFirstLoad = createDays(daysInCurrentMonth);
    setDaysInMonth(daysFirstLoad);
  }, []);

  function handleChange(value, type) {
    let year, month, day;
    switch (type) {
      case 'year':
        setSelectedYear(value);
        year = value;
        month = selectedMonth;
        day = getDaysInMonth(value, selectedMonth);
        break;
      case 'month':
        setSelectedMonth(value);
        year = selectedYear;
        month = value;
        day = getDaysInMonth(selectedYear, value);
        break;
    }
    getObituariesOfDay(year, month, day);
    setDaysInMonth(createDays(day));
  }
  return (
    <div>
      <Link to="/create-memorial">Create a memorial for a loved one</Link>
      <Row style={{ textAlign: 'right' }}>
        <Col span={12} offset={12}>
          <Select
            defaultValue={selectedYear}
            onChange={(value) => handleChange(value, 'year')}
            style={{ width: 200 }}
          >
            {years}
          </Select>
          <Select
            defaultValue={selectedMonth}
            onChange={(value) => handleChange(value, 'month')}
            style={{ width: 200 }}
          >
            {months}
          </Select>
          <Select
            defaultValue={currentDay}
            onChange={(value) => handleChange(value, 'day')}
            style={{ width: 200 }}
          >
            {daysInMonth}
          </Select>
        </Col>
      </Row>
    </div>
  );
};
