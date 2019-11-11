import React from 'react';
const Input = ({ name, label, value, type, onChange}) => {
  return (
    <div className='form-group'>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        id={name}
        className='form-control'
        value={value}
        onChange={onChange}
        name={name}
      />
    </div>
  );
};

export default Input;
