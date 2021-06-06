import React from "react";
import "./form-input.styles.scss";

const FormInput = ({ handleChange, label, ...otherProps }) => {
  let formattedLabel = label.charAt(0).toUpperCase() + label.slice(1);
  return (
    <div className="group">
      {label && (
        <label
          className={`form-input-label ${otherProps.value.length && "shrink"}`}
        >
          {formattedLabel}
        </label>
      )}
      <input className="form-input" onChange={handleChange} {...otherProps} />
    </div>
  );
};

export default FormInput;
