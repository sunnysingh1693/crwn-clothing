import React, { useState } from "react";
import { auth, signInWithGoogle } from "../../firebase/firebase.utils";
import CustomButton from "../custom-button/custom-button.component";
import FormInput from "../form-input/form-input.component";
import "./sign-in.styles.scss";

const SignIn = () => {
  const [userCredentials, setCredentials] = useState({ email: '', password: ''})

  const { email, password } = userCredentials;
  
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await auth.signInWithEmailAndPassword(email, password);
      setCredentials({
        email: "",
        password: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event) => {
    // updates the states as we type in the <input>
    const { value, name } = event.target;
    setCredentials({...userCredentials, [name]: value });
  };

  const inputFieldsNames = ["email", "password"];

    return (
      <div className="sign-in">
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>

        <form>
          {inputFieldsNames.map((item, index) => (
            <FormInput
              key={index}
              name={item}
              label={item}
              type={item}
              value={userCredentials[item]}
              onChange={handleChange}
              required
            />
          ))}
          <div className="buttons">
            <CustomButton
              type="submit"
              value="Submit Form"
              onClick={handleSubmit}
            >
              Sign in
            </CustomButton>
            <CustomButton
              type="button"
              value="Submit Form"
              isGoogleSignIn
              onClick={signInWithGoogle}
            >
              Sign in with Google
            </CustomButton>
          </div>
        </form>
      </div>
    );
}

export default SignIn;
