import * as React from 'react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import CalendarPicker from '@mui/lab/CalendarPicker';

export default function DatePicker(props) {
    const { onDateChange } = props;
  

  const handleOnChange = (newDate) => {
    onDateChange(newDate);
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
        <div className="calendar" >
            <CalendarPicker date={props.date} onChange={handleOnChange} />
        </div>
    </LocalizationProvider>
  );
}