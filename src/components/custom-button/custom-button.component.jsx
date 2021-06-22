import React from "react";
import { CustomButtonContainer } from "./custom-button.styles";

// {children} is the value/content that we pass in-between the tags of a component.
const CustomButton = ({ children, ...props }) => (
  <CustomButtonContainer {...props}>{children}</CustomButtonContainer>
);

export default CustomButton;
