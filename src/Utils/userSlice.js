import { createSlice } from '@reduxjs/toolkit'

const initialState = [] // Use an array to allow push

const usersSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.push(action.payload)
    },
    removeUser: (state, action) => {
      return state.filter(user => user.id !== action.payload.id)
    },
  },
})

export const { addUser, removeUser } = usersSlice.actions
export default usersSlice.reducer