import React, { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router";
import "./App.css";
import Header from "./components/header/header.component";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { connect } from "react-redux";
import { setCurrentUser } from "./redux/user/user.action";
import { selectCurrentUser } from "./redux/user/user.selectors";
import { createStructuredSelector } from 'reselect'
import CheckoutPage from "./components/checkout/checkout.component";

const App = ({ setCurrentUser, currentUser }) => {

  useEffect(() => {
    let unsubscribeFromAuth = null;
    unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      // If the user has actually signed-in
      if (userAuth) {
        // We get the snapshotObject from the referenceObject using the .get() method.
        const userRef = createUserProfileDocument(userAuth);

        // We're going to subscribe/listen to userRef for any changes to the data
        // But we also get back the 1st state of the data
        // Setting the users data from DB to state
        (await userRef).onSnapshot((snapShot) => {
          setCurrentUser(
            {
              currentUser: {
                id: snapShot.id,
                ...snapShot.data(),
              },
            },
            () => {
              console.log(this.state);
            }
          );
        });
        console.log(userRef);
      } else {
        // when user logs out set state to null
        setCurrentUser(userAuth);
      }
    });

    return () => { unsubscribeFromAuth(); } // This mimics "componentWillUnmount()"
  }, [setCurrentUser]);

  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/shop" component={ShopPage} />
        <Route exact path="/checkout" component={CheckoutPage} />
        <Route
          exact
          path="/signin"
          render={() =>
            currentUser ? (
              <Redirect to="/" />
            ) : (
              <SignInAndSignUpPage />
            )
          }
        />
      </Switch>
    </div>
  );
}

// If the App doesn't use the currentUser anywhere inside it. So, we don't need "mapStateToProps()" then the 1st arg to "connect()" will be null. The 2nd arg to "connect()" is "mapDispatchToProps()", which gets the dispatch property and returns an action object that we needs to dispatch, ITC it's the "setCurrentUsr" from "user.action"

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
