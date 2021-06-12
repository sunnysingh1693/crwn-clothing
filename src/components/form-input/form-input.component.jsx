import React from "react";
import "./form-input.styles.scss";

const FormInput = ({ handleChange, label, ...otherProps }) => {
  //  Upperase the 1st character at 0 then concat with label (1st character removed)
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
