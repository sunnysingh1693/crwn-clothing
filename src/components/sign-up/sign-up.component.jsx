import React, { useState } from "react";
import { auth, createUserProfileDocument } from "../../firebase/firebase.utils";
import CustomButton from "../custom-button/custom-button.component";
import FormInput from "../form-input/form-input.component";
import "./sign-up.styles.scss";

const SignUp = () => {
  const [userCredentials, setUserCredentials] = useState({
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
    })

  const { displayName, email, password, confirmPassword } = userCredentials;

  const handleSubmit = async (event) => {
    event.preventDefault();
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
      setUserCredentials({
        displayName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserCredentials({ ...userCredentials, [name]: value });
  };

  const inputFieldsNames = ["display Name", "email", "password", "confirm Password"];

    let itemNoSpace, type;
    return (
      <div className="sign-up">
        <h2 className="title">Ido not have an account</h2>
        <span>Sign up with your email and password</span>
        <form action="" className="sign-up-form" onSubmit={handleSubmit}>
          {inputFieldsNames.map((item, index) => {
            itemNoSpace = item.replace(/ /g, "");
            if (item === "display Name") type = "text";
            else if (item === "confirm Password") type = "password";
            else type = item;
            
            return (
              <FormInput
                key={index}
                type={type}
                value={userCredentials[itemNoSpace]}
                name={itemNoSpace}
                onChange={handleChange}
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

export default SignUp;
