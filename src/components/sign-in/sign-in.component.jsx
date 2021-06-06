import React from "react";
import { signInWithGoogle } from "../../firebase/firebase.utils";
import CustomButton from "../custom-button/custom-button.component";
import FormInput from "../form-input/form-input.component";
import "./sign-in.styles.scss";

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      email: "",
      password: "",
    });
  };

  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };

  inputFieldsNames = ["email", "password"];

  render() {
    return (
      <div className="sign-in">
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>

        <form>
          {this.inputFieldsNames.map((item, index) => (
            <FormInput
              key={index}
              name={item}
              label={item}
              type={item}
              value={this.state[item]}
              onChange={this.handleChange}
              required
            />
          ))}
          <div className="buttons">
            <CustomButton type="submit" value="Submit Form">
              Sign in
            </CustomButton>
            <CustomButton
              type="submit"
              value="Submit Form"
              idGoogleSignIn
              onClick={signInWithGoogle}
            >
              Sign in with Google
            </CustomButton>
          </div>
        </form>
      </div>
    );
  }
}

export default SignIn;
