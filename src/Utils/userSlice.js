import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const usersSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.push(action.payload)
    },
    removeUser: () => {
      return [] // Clear all users on logout
    },
  },
})

export const { addUser, removeUser } = usersSlice.actions
export default usersSlice.reducer