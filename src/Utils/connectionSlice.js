import { createSlice } from "@reduxjs/toolkit";



const connectionSlice = createSlice({
name: "connections",
initialState : null, // Initial state can be null or an empty array
reducers: {
    addConnections : (state,action) => action.payload,
    removeConnections: () => null, // Clear all connections
    },

});


export const { addConnections, removeConnections } = connectionSlice.actions;
export default connectionSlice.reducer;
