import { useState } from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

const DateHandler = () => {
  const [startDate, setStartDate] = useState(new Date());

  console.log(startDate);
  return (
    <div>
      <DatePicker
        className="border "
        showIcon
        selected={startDate}
        dateFormat="MM/dd/yyyy"
        onChange={date => setStartDate(date)}
      />

      <div>{startDate.toLocaleDateString()}</div>
    </div>
  );
};

export default DateHandler;
