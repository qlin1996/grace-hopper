import axios from 'axios'

const POST_ITEM = 'POST_ITEM'
const GET_ITEMS = 'GET_ITEMS'
const EDIT_ITEM_QUANTITY = 'EDIT_ITEM_QUANTITY'

export const postItem = item => ({
  type: POST_ITEM,
  item
})

export const getItems = items => ({
  type: GET_ITEMS,
  items
})

export const editItem = items => ({
  type: EDIT_ITEM_QUANTITY,
  items
})

export const addToCart = item => async dispatch => {
  try {
    const {data} = await axios.post('/api/orderItems', item)
    return dispatch(postItem(data))
  } catch (error) {
    console.log(error)
  }
}

export const getCartItems = orderId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/orderItems/${orderId}`)
    return dispatch(getItems(data))
  } catch (error) {
    console.log(error)
  }
}

export const editItemQuantity = (
  orderId,
  productId,
  quantityObj
) => async dispatch => {
  try {
    console.log(orderId, productId, 'QUANITIY OBJ', quantityObj)
    const {data} = await axios.patch(
      `api/orderItems/${orderId}/product/${productId}`,
      quantityObj
    )
    console.log('DATA', data)
    dispatch(editItem(data))
  } catch (error) {
    console.error(error)
  }
}

export default function cartReducer(state = [], action) {
  switch (action.type) {
    case POST_ITEM:
      return [...state, action.item]
    case GET_ITEMS:
      return action.items
    case EDIT_ITEM_QUANTITY:
      return action.items
    default:
      return state
  }
}
