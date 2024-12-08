import React, { useState } from 'react';
import './DatePicker.scss'



const DatePicker = ({ selectedDate, setSelectedDate }) => {


  const handleDateChange = (e) => {
    const selected = new Date(e.target.value);
    setSelectedDate(selected);
    if (selectedDate) {
      onDateChange(selected); 
    }
  };

 

  return (
    <div className="date-picker">
      <label htmlFor="datePicker">Pick A Date  :  </label>
      <input
        type="date"
        id="datePicker"
        value={selectedDate.toISOString().substr(0, 10)} 
        onChange={handleDateChange}
        min={new Date().toISOString().split('T')[0]}
      />
    </div>
  );
};

export default DatePicker;