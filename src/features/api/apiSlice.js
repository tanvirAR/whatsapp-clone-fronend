import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_SERVER_URL,
});

export const apiSlice = createApi({
  // reducerPath: 'api',
  reducerPath: "api",
  baseQuery: async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    if (result?.error?.status === 401) {
      window.location.reload();
    }
    return result;
  },
  tagTypes: ["Messages", "allConversations", "moreMessages"],
  endpoints: (builder) => ({}),
});
