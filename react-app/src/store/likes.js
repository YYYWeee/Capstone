/** Action Type Constants: */
export const ADD_ITEM_TO_LIKES = 'items/ADD_ITEM_TO_LIKES'
export const REMOVE_ITEM_FROM_LIKES = 'items/REMOVE_ITEM_FROM_LIKES'
export const LOAD_FAVORITE_PRODUCTS = 'items/LOAD_FAVORITE_PRODUCTS'



/**  Action Creators: */
const addItemToLikes = itemId => ({
  type: ADD_ITEM_TO_LIKES,
  itemId
})

const removeItemFromLikes = itemId => ({
  type: REMOVE_ITEM_FROM_LIKES,
  itemId
})

export const loadFavProducts = (items) => ({
  type: LOAD_FAVORITE_PRODUCTS,
  items,
});


/** Thunk: */

export const likeItem = itemId => async dispatch => {

  const res = await fetch(`/api/likes/${itemId}`, {
    method: 'POST', headers: {
      "Content-Type": "application/json",
    },
  })
  if (res.ok) {
    dispatch(addItemToLikes(itemId))
    return true
  }
  return false


}

export const removeLikeItem = itemId => async dispatch => {
  const res = await fetch(`/api/likes/${itemId}`, { method: 'DELETE' })

  if (res.ok) {
    dispatch(removeItemFromLikes(itemId))
    return true
  }

  return false
}



/** Reducer: */
const initialState = { favItems: {} };

const likesReducer = (state = initialState, action) => {
  switch (action.type) {

    case ADD_ITEM_TO_LIKES:
      console.log('sssssssss')
      const addLike = { ...state.favItems }
      addLike[action.itemId] = true
      return { ...state, favItems: { ...addLike } }

    case REMOVE_ITEM_FROM_LIKES:
      const removeLike = { ...state.favItems }
      delete removeLike[action.itemId]
      return { ...state, favItems: { ...removeLike } }

    case LOAD_FAVORITE_PRODUCTS:
      return {
        ...state,
        favItems: action.items,
      };



    default:
      return state;
  }


}

export default likesReducer;
