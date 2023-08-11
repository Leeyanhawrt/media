import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "../thunks/fetchUsers";
import { addUser } from "../thunks/addUser";
import { deleteUser } from "../thunks/deleteUser";

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    usersList: [],
    error: null,
    isLoading: false,
  },
  extraReducers(builder) {
    builder.addCase(fetchUsers.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.usersList = action.payload;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });

    builder.addCase(addUser.pending, (state, action) => {
      state.isLoading = true;
    })
    builder.addCase(addUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.usersList.push(action.payload)
    })
    builder.addCase(addUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    })

    builder.addCase(deleteUser.pending, (state, action) => {
      state.isLoading = true;
    })
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.usersList = state.usersList.filter((user) => {
        return user.id !== action.payload.id;
      })
    })
    builder.addCase(deleteUser.rejected, (state, action) => {
      state.error = action.error;
      state.isLoading = false;
    })
  }
})

export const usersReducer = usersSlice.reducer;