import { apiSlice } from "../api/apiSlice";

export const searchPeopleApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    searchPeople: builder.mutation({
      query: (data) => ({
        url: `${process.env.REACT_APP_SERVER_URL}inbox/user/search`,
        method: "POST",
        body: data,
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
      }),
    }),
    getUsersFriends: builder.query({
      query: (data) => ({
        url: `inbox/friends/info`,
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
      }),
    }),
  }),
});

export const { useSearchPeopleMutation, useGetUsersFriendsQuery } =
  searchPeopleApi;
