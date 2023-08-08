import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    usersList: [],
  },
  reducers: {}
})

export const usersReducer = usersSlice.reducer;