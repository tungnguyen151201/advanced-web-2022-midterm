import React from 'react';
function InputInfo({ placeholder, type, value, handleInput, name }) {
  return (
    <input
      className='w-100'
      type={type}
      name={name}
      value={value}
      onChange={handleInput}
      placeholder={placeholder}
    />
  );
}
export default InputInfo;
