import React from 'react'
import './form-input.styles.scss'

const FormInput = ({ handleChange, label, ...otherProps }) => (
  <div className="group">
    {label && (
      <label
        className={`form-input-label ${otherProps.value.length && "shrink"}`}
      >
        {label}
      </label>
    )}
    <input
      className="form-input"
      onChange={handleChange}
      {...otherProps}
    />
  </div>
);

export default FormInput;