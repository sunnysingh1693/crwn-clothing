import React from "react";
import { SpinnerContainer, SpinnerOverlay } from "./with-spinner.styles";

/* "WithSpinner" is HOC, it takes a funciton (component) as an arg "WrappedComponent" and returns another function (component) wrapped with the spinner loading feature based on the "isLoading" prop. */

const WithSpinner = WrappedComponent => {
  const Spinner = ({ isLoading, ...otherProps }) => {
    return isLoading ? (
      <SpinnerOverlay>
        <SpinnerContainer />
      </SpinnerOverlay>
    ) : (
      <WrappedComponent {...otherProps} />
    );
  };
  return Spinner;
}

export default WithSpinner;