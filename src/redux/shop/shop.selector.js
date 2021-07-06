import { createSelector } from 'reselect';
import memoize from 'lodash.memoize';

const selectShop = state => state.shop;

export const selectCollections = createSelector(
  [selectShop],
  shop => shop.collections
);

export const selectCollectionsForPreview = createSelector(
  [selectCollections],
  // "Object.keys" converts all the keys of an onject in an array. We're then mapping over those keys, getting the value, the key corresponds to in the "collections" object.
  collections => collections ? Object.keys(collections).map(key => collections[key]) : []
)

export const selectCollection = memoize((collectionUrlParam) =>
  createSelector(
    [selectCollections],
    collections => collections ? collections[collectionUrlParam] : null
  )
);

export const selectIsCollectionFetching = createSelector(
  [selectShop],
  shop => shop.isFetching
)

export const selectIsCollectionsLoaded = createSelector(
  [selectShop],
  shop => !!shop.collections // !! makes "shop.collection" a boolean value, all truthy values are 1 and falsey values are 0
)