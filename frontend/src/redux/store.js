import { configureStore } from '@reduxjs/toolkit'
import { userReducer } from './reducers/user'
import { cartReducer } from './reducers/cart'
import { wishlistReducer } from './reducers/wishlist'
import { productReducer } from './reducers/products'
import { eventReducer } from './reducers/events'

const Store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    products: productReducer,
    events: eventReducer,
  },
})

export default Store