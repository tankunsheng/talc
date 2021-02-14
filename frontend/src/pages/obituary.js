import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Typography, List, Card, Select, Row, Col } from 'antd';
import talc_logo from '../assets/talc_aboutus.png';
const { Title, Paragraph } = Typography;
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
  const getObituariesByDay = (year, month, day) => {
    console.log(`year ${year}`);
    console.log(`month ${month}`);
    console.log(`day ${day}`);
    const params = {
      year,
      month,
      day,
    };
    axios.get('memorial/filterday', { params }).then((res) => {
      console.log(res);
      setMemorials(res.data);
    });
  };

  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedDay, setSelectedDay] = useState(currentDay);
  const [daysInMonth, setDaysInMonth] = useState();
  const [memorials, setMemorials] = useState([]);
  useEffect(() => {
    const daysInCurrentMonth = getDaysInMonth(currentYear, currentMonth);
    const daysFirstLoad = createDays(daysInCurrentMonth);
    setDaysInMonth(daysFirstLoad);
    getObituariesByDay(currentYear, currentMonth, currentDay);
  }, []);

  function handleChange(value, type) {
    let year, month, day, days;
    switch (type) {
      case 'year':
        setSelectedYear(value);
        year = value;
        month = selectedMonth;
        day = selectedDay;
        days = getDaysInMonth(value, selectedMonth);
        break;
      case 'month':
        setSelectedMonth(value);
        year = selectedYear;
        month = value;
        day = selectedDay;
        days = getDaysInMonth(selectedYear, value);
        break;
      case 'day':
        setSelectedDay(value);
        year = selectedYear;
        month = selectedMonth;
        day = value;
        days = getDaysInMonth(selectedYear, value);
        break;
    }
    getObituariesByDay(year, month, day);
    setDaysInMonth(createDays(days));
  }
  const dateDisplayOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return (
    <div>
      <Link to="/create-memorial">Create a memorial for a loved one</Link>
      <br />
      <br />
      <Row>
        <Col span={12} style={{ textAlign: 'left' }}>
          <Title level={2}>
            {new Date(
              selectedYear,
              selectedMonth,
              selectedDay,
              0,
              0,
              0,
              0,
            ).toLocaleDateString('en-SG', dateDisplayOptions)}
          </Title>
        </Col>
        <Col span={12} style={{ textAlign: 'right' }}>
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
      <br />
      <br />
      <Row>
        <Col span={24}>
          <List
            grid={{
              gutter: 16,
              xs: 1,
              sm: 2,
              md: 2,
              lg: 2,
              xl: 2,
              xxl: 2,
            }}
            dataSource={memorials}
            renderItem={(item) => (
              <List.Item>
                <Row>
                  <Col span={6}>
                    <img style={{ width: '100%' }} src={talc_logo} />
                  </Col>
                  <Col span={16}>
                    <p>
                      <b>Name:</b> {item.name}
                    </p>
                    <p>
                      <b>Date of Passing:</b> {item.dateOfPassing}
                    </p>
                    <Paragraph ellipsis={{ rows: 3 }}>
                      <b>Description:</b> {item.description}
                    </Paragraph>
                  </Col>
                </Row>
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </div>
  );
};
