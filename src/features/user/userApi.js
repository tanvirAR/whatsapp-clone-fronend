import { apiSlice } from "../api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserAvatar: builder.mutation({
      query: (data) => ({
        url: `${process.env.REACT_APP_SERVER_URL}inbox/avatarUpload`,
        method: "PUT",
        body: data,
        // headers: {
        //   "Content-Type": "multipart/form-data",
        // },
        credentials: "include",
      }),
    }),
    changeUserName: builder.mutation({
      query: (data) => ({
        url: `${process.env.REACT_APP_SERVER_URL}User/edit/name`,
        method: "PUT",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }),
    }),
    changeUserStatus: builder.mutation({
      query: (data) => ({
        url: `${process.env.REACT_APP_SERVER_URL}User/edit/status`,
        method: "PUT",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useGetUserAvatarMutation,
  useChangeUserNameMutation,
  useChangeUserStatusMutation,
} = userApi;
