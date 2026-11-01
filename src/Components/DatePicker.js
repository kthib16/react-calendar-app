import React, { useState } from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

const CalendarSelect = ({ id, setDate }) => {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <DatePicker
      id={id}
      className='date-picker input-group form-control'
      showPopperArrow={false}
      selected={startDate}
      onChange={(date) => {
        setStartDate(date);
        setDate(date);
      }}
    />
  );
};

export default CalendarSelect;
