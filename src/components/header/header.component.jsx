import React from "react";
import { HeaderContainer, LogoContainer, OptionsContainer, OptionDiv, OptionLink } from './header.styles'
// The ReactComponent import name is special and tells Create React App that you want a React component that renders an SVG.
import { ReactComponent as Logo } from "../../assets/crown.svg";
import { auth } from "../../firebase/firebase.utils";
import { connect } from "react-redux";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import { createStructuredSelector} from "reselect";
import { selectCartHidden } from "../../redux/cart/cart.selectors";
import { selectCurrentUser } from "../../redux/user/user.selectors";

const Header = ({ currentUser, hidden }) => (
  <HeaderContainer>
    {console.log(currentUser)}
    <LogoContainer to="/">
      <Logo className="logo"></Logo>
    </LogoContainer>
    <OptionsContainer>
      {currentUser && (
        <OptionDiv>
          HEY, {currentUser.currentUser.displayName.toUpperCase()}
        </OptionDiv>
      )}
      <OptionLink to="/shop">SHOP</OptionLink>
      <OptionLink to="/">CONTACT</OptionLink>
      {currentUser ? (
        /* We can use the "as" attribute to specify the type of element we want the styled-component to be. Instead of a 'div', we can also pass a component, as={ComponentName}. 
        This also eliminates our need to have two styled-components, "OptionLink" & "OptionDiv" sharing a css block. Instead now we can have only one styled-component "OptionLink" and use it as='div'. */
        <OptionLink as="div" onClick={() => auth.signOut()}>
          SIGN OUT
        </OptionLink>
      ) : (
        <OptionLink to="/signin">SIGN IN</OptionLink>
      )}
      <CartIcon />
    </OptionsContainer>
    {!hidden && <CartDropdown />}
  </HeaderContainer>
);

// connect is a higher order funcction that lets us modify our components to have access to things related to redux. It takes two functions as arguments, 2nd one is optional. It return another HOF, to which we pass our "Header" component. The 1st arg of connect is a function that allows us to access the state (root-reducer)

// The function name can be anything but "mapStateToProps" is the conventional name as per the Redux docs. The "state" in this function is the root-reducer
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden
})

export default connect(mapStateToProps)(Header);
