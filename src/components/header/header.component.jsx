import React from "react";
import { Link } from "react-router-dom";
import "./header.styles.scss";
// The ReactComponent import name is special and tells Create React App that you want a React component that renders an SVG.
import { ReactComponent as Logo } from "../../assets/crown.svg";
import { auth } from "../../firebase/firebase.utils";
import { connect } from "react-redux";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../card-dropdown/card-dropdown.component";

const Header = ({ currentUser, hidden }) => (
  <div className="header">
    {console.log(currentUser)}
    <Link to="/" className="logo-container">
      <Logo className="logo"></Logo>
    </Link>
    <div className="options">
      {currentUser && (
        <div className="option">
          HEY, {currentUser.currentUser.displayName.toUpperCase()}
        </div>
      )}
      <Link className="option" to="/shop">
        SHOP
      </Link>
      <Link className="option" to="/">
        CONTACT
      </Link>
      {currentUser ? (
        <div className="option" onClick={() => auth.signOut()}>
          SIGN OUT
        </div>
      ) : (
        <Link className="option" to="/signin">
          SIGN IN
        </Link>
      )}
      <CartIcon />
    </div>
    {!hidden && <CartDropdown />}
  </div>
);

// connect is a higher order funcction that lets us modify our components to have access to things related to redux. It takes two functions as arguments, 2nd one is optional. It return another HOF, to which we pass our "Header" component. The 1st arg of connect is a function that allows us to access the state (root-reducer)

// The function name can be anything but "mapStateToProps" is the conventional name as per the Redux docs. The "state" in this function is the root-reducer
const mapStateToProps = ({user: {currentUser}, cart: {hidden}}) => ({
  currentUser,
  hidden
})

export default connect(mapStateToProps)(Header);
