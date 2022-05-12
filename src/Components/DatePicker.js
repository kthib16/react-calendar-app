import React, { useState } from 'react';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const CalendarSelect = (props) => {
  const [startDate, setStartDate] = useState(new Date());



  return (
    <DatePicker
      className="date-picker input-group form-control"
      showPopperArrow={false}
      selected={startDate}
      onChange={(date:Date) => {
        setStartDate(date)
        props.setDate(date)
        }
      } />
  );


};

export default CalendarSelect;
