import { configureStore } from '@reduxjs/toolkit'
import usersReducer from './userSlice' // Import the user slice reducer
export const store = configureStore({
  reducer: {
    user: usersReducer,
  }
})

