import React from "react";
import { auth, signInWithGoogle } from "../../firebase/firebase.utils";
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

  handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = this.state;

    try {
      await auth.signInWithEmailAndPassword(email, password);
      this.setState({
        email: "",
        password: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  handleChange = (event) => {
    // updates the states as we type in the <input>
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
            <CustomButton
              type="submit"
              value="Submit Form"
              onClick={this.handleSubmit}
            >
              Sign in
            </CustomButton>
            <CustomButton
              type="button"
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
