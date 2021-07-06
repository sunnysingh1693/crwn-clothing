import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import CollectionsOverviewContainer from "../../components/collections-overview/collections-overview.container";
import { fetchCollectionsStartAsync } from "../../redux/shop/shop.action";
import CollectionPageContainer from "../collection/collection.container";

/* Here we're passing the 2 components that we render on the "Shop" page and wrap them up "WithSpinner" */
// const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
// const CollectionPageWithSpinner = WithSpinner(CollectionPage);

const ShopPage = ({ match, fetchCollectionsStartAsync }) => {
  useEffect(() => {
    fetchCollectionsStartAsync();

    /* ALL THE BELOW CODE ARE 3 DIFFERENT WAYS OF DOING THE SAME THING (FETCHING COLLECTIONS FROM FIRESTORE), WHICH IS NOT MOVEED TO THE SHOP.ACTION.JS. PRO: FETCHING COLLECTIONS IS NOT LOCALIZED ANYMORE AND CAN BE REUSED BY OTHER COMPONENTS IF REQUIRED.
    
    // Using onSnapshot observable from firestore
    collectionRef.onSnapshot(async (snapshot) => {
      const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
      console.log(collectionsMap);
      updateCollections(collectionsMap);
      this.setState({ loading: false });
    }); */

    /* // moving it to shop.action
    const collectionRef = firestore.collection("collections");
    // Using Promise to get the collections
    collectionRef.get().then((snapshot) => {
      const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
      console.log(collectionsMap);
      updateCollections(collectionsMap);
      this.setState({ loading: false });
    }); */

    /* // Native fetch() API
     const YOUR_PROJECT_ID = 'crwn-db-e1e90';
     const collectionName = 'collections';
     const reqUrl = `https://firestore.googleapis.com/v1/projects/${YOUR_PROJECT_ID}/databases/(default)/documents/${collectionName}`;
     
     fetch(reqUrl)
     .then(response => response.json())
     .then(collections => console.log(collections)) */
  }, [fetchCollectionsStartAsync]);

  return (
    /* The "render" takes a function (component) and passes the "props" (match, history, location) it gets from <Route> as parameters to that function (component). Since we're passing a HOC here, the props also gets passed on to the function (component) it returns. */
    <div className="shop-page">
      <Route
        exact
        path={`${match.path}`}
        // render={(props) => (
        //   <CollectionsOverviewWithSpinner
        //     isLoading={isFetchingCollections}
        //     {...props}
        //   />
        // )}
        component={CollectionsOverviewContainer}
      />
      <Route
        path={`${match.path}/:collectionId`}
        // render={(props) => (
        //   <CollectionPageWithSpinner
        //     isLoading={!isCollectionsloaded}
        //     {...props}
        //   />
        // )}
        component={CollectionPageContainer}
      />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync()),
});

export default connect(null, mapDispatchToProps)(ShopPage);
