import { configureStore } from '@reduxjs/toolkit'
import usersReducer from './userSlice' // Import the user slice reducer
import feedReducer from './feedSlice' // Import the feed slice reducer  
import connectionRducer from './connectionSlice' // Import the connection slice reducer
import requestReducer from './requestSlice' // Import the request slice reducer

export const store = configureStore({
  reducer: {
    user: usersReducer,
    // Add other reducers here as needed
    // feed: feedReducer, // Uncomment and import feedReducer if you have one
    feed : feedReducer, // Assuming you have a feed slice reducer
    connections: connectionRducer,
    requests : requestReducer // Add the request slice reducer
  }
})

