import { convertCollectionsSnapshotToMap, firestore } from '../../firebase/firebase.utils';
import ShopActionTypes from './shop.types';

export const fetchCollectionsStart = () => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_START,
});

// This is where we get our collections into state
export const fetchCollectionsSuccess = collectionsMap => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: collectionsMap
})

export const fetchCollectionFailure = errorMessage => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
  payload: errorMessage
})

// This is the function that we will pass into our components to begin the process. 
export const fetchCollectionsStartAsync = () => {
  return dispatch => {
    const collectionRef = firestore.collection("collections");
    dispatch(fetchCollectionsStart()); // We dispatch the "fetchCollectionsStart()" just after we create the collectionRef, which will switch isFetching to true.

    collectionRef.get().then((snapshot) => {
      const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
      console.log(collectionsMap);
      dispatch(fetchCollectionsSuccess(collectionsMap)); // Dispatching "fetchCollectionsSuccess" action after we get colltions from Firestore
    }).catch(error => dispatch(fetchCollectionFailure(error.message)));
  }
}

/* We are able to call the dispatch() inside of an action function because of "redux-thunk" */

/* If redux-think middleware is enabled, anytime you attempt to dispatch() a function instead of an object, the middleware will call that function with dispatch method itself as the first argument. */