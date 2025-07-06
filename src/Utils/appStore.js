import { configureStore } from '@reduxjs/toolkit'
import usersReducer from './userSlice' // Import the user slice reducer
import feedReducer from './feedSlice' // Import the feed slice reducer  
export const store = configureStore({
  reducer: {
    user: usersReducer,
    // Add other reducers here as needed
    // feed: feedReducer, // Uncomment and import feedReducer if you have one
    feed : feedReducer // Assuming you have a feed slice reducer
  }
})

