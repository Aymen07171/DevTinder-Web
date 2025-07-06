import { createSlice } from '@reduxjs/toolkit';



const feedSlice = createSlice({
    name: 'feed',
    initialState : null,
    reducers: {
        addFeed: (state, action) => {
           return  action.payload
 },
        removeFeed: () => {
            return null // Clear all feed items
        },
    },
}); 


export const { addFeed, removeFeed } = feedSlice.actions;
export default feedSlice.reducer;