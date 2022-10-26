import { apiSlice } from "../api/apiSlice";
import { userLoggedIn } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: "signup",
        method: "POST",
        body: data,
        headers: {
          "content-type": "application/json",
        },
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "/",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      // task to do after fetching signup request
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (!result?.data.errors) {
            // localStorage.setItem("user", JSON.stringify({ user: result.data }));
            dispatch(userLoggedIn(result.data));
          }
        } catch (err) {
          // errror handled in ui
        }
      },
    }),
    logout: builder.mutation({
      query: (data) => ({
        url: "/logout",
        method: "DELETE",
        credentials: "include",
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } =
  authApi;
