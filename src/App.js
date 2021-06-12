import React from "react";
import { Route, Switch } from "react-router";
import "./App.css";
import Header from "./components/header/header.component";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { connect } from "react-redux";
import { setCurrentUser } from "./redux/user/user.action";

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const {setCurrentUser} = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      // If the user has actually signed-in
      if (userAuth) { 
      // We get the snapshotObject from the referenceObject using the .get() method.
        const userRef = createUserProfileDocument(userAuth);

        // We're going to subscribe/listen to userRef for any changes to the data
        // But we also get back the 1st state of the data
        // Setting the users data from DB to state
        (await userRef).onSnapshot((snapShot) => {
          setCurrentUser({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data(),
            }
          }, () => { console.log(this.state) });
        });
        console.log(userRef)
      } else {
        // when user logs out set state to null
        setCurrentUser(userAuth)
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route path="/signin" component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }
}

// The App doesn't use the currentUser anywhere inside it. So, we don't need "mapStateToProps()" that's why the 1st arg to "connect()" is null. The 2nd arg to "connect()" is "mapDispatchToProps()", which gets the dispatch property and returns an action object object that we needs to dispatch, ITC it's the "setCurrentUsr" from "user.action"

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(null, mapDispatchToProps)(App);
