import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchedResult: undefined,
};

const SearchPeopleSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    searchedPeopleResult: (state, action) => {
      state.searchedResult = action.payload;
    },
  },
});

export const { searchedPeopleResult } = SearchPeopleSlice.actions;

export default SearchPeopleSlice.reducer;
