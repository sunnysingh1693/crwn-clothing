import React from "react";
import { auth, createUserProfileDocument } from "../../firebase/firebase.utils";
import CustomButton from "../custom-button/custom-button.component";
import FormInput from "../form-input/form-input.component";
import "./sign-up.styles.scss";

class SignUp extends React.Component {
  constructor() {
    super();

    this.state = {
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { displayName, email, password, confirmPassword } = this.state;
    if (password !== confirmPassword) {
      alert("passwords don't match");
      return;
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      await createUserProfileDocument(user, { displayName });
      this.setState({
        displayName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  inputFieldsNames = ["display Name", "email", "password", "confirm Password"];

  render() {
    let itemNoSpace, type;
    return (
      <div className="sign-up">
        <h2 className="title">Ido not have an account</h2>
        <span>Sign up with your email and password</span>
        <form action="" className="sign-up-form" onSubmit={this.handleSubmit}>
          {this.inputFieldsNames.map((item, index) => {
            itemNoSpace = item.replace(/ /g, "");
            if (item === "display Name") type = "text";
            else if (item === "confirm Password") type = "password";
            else type = item;
            
            return (
              <FormInput
                key={index}
                type={type}
                value={this.state[itemNoSpace]}
                name={itemNoSpace}
                onChange={this.handleChange}
                label={item}
                required
              />
            );
          })}
          <CustomButton type="submit">SIGN UP</CustomButton>
        </form>
      </div>
    );
  }
}

export default SignUp;
