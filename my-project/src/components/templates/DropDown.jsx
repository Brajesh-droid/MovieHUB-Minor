import React from 'react';

const DropDown = ({ title, options, func }) => {
  return (
    <div>
      <label className="mr-2 text-2xl text-white">{title}:</label>
      <select onChange={func} className="border rounded mx-4 mt-2  text-2xl">
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropDown;
