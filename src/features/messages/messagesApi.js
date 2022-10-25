import { io } from "socket.io-client";
import { apiSlice } from "../api/apiSlice";

export const messagesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: ({ conversationID, userID }) => ({
        url: `inbox/messages/${conversationID}/1/30`,
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
      }),
      providesTags: ["Messages"],
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        // https://wapp-backend-second.herokuapp.com/
        // create socket
        const socket = io("https://wapp-backend-second.herokuapp.com/", {
          reconnectionDelay: 1000,
          reconnection: true,
          reconnectionAttempts: 10,
          transports: ["websocket"],
          agent: false,
          upgrade: false,
          rejectUnauthorized: false,
        });
        try {
          await cacheDataLoaded;
          socket.on("conversation_", (data) => {
            // console.log(data);
            updateCachedData((draft) => {
              // check if socket data belongs to this user................
              const messageToAdd =
                draft?.conversation_id === data?.result.conversation_id;
              if (messageToAdd) {
                draft.data.messages.push(data.result);
              }
              // console.log(data);
            });
          });
        } catch (err) {}
        // close socket on unmount
        await cacheEntryRemoved;
        socket.close();
      },
    }),

    getMoreMessages: builder.query({
      query: ({ conversationID, userID, page }) => ({
        url: `inbox/messages/${conversationID}/${page}/${process.env.REACT_APP_MESSAGES_PER_PAGE}`,
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
      }),
      providesTags: ["moreMessages"],

      async onQueryStarted(
        { conversationID, userID },
        { queryFulfilled, dispatch }
      ) {
        try {
          const result = await queryFulfilled;

          // pessimistically update message cache of getConversations ---- start
          dispatch(
            apiSlice.util.updateQueryData(
              "getMessages",
              { conversationID, userID },
              (draft) => {
                return {
                  ...draft,
                  data: {
                    ...draft.data,
                    // add the getmoreConversations data
                    messages: [
                      ...result.data.data.messages,
                      ...draft.data.messages,
                    ],
                  },
                };
              }
            )
          );
          // pessimistically update message cache of getConversations ---- end
        } catch (err) {
          console.log(err);
        }
      },
    }),

    sendMessages: builder.mutation({
      query: ({ conversationId, formData }) => ({
        url: `inbox/message/${conversationId}`,
        method: "POST",
        body: formData,
        credentials: "include",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        // try {
        //   const result = await queryFulfilled;
        //   // pessimistically update message cache
        //   dispatch(
        //     apiSlice.util.updateQueryData(
        //       "getMessages",
        //       arg.conversationId,
        //       (draft) => {
        //         draft.data.messages.push(result.data.data);
        //       }
        //     )
        //   );
        // } catch (err) {
        //   console.log(err);
        // }
      },
    }),
    //delete messages just for the user
    deleteMessagesForOneSide: builder.mutation({
      query: (conversationId) => ({
        url: `inbox/delete/messages/forMe/${conversationId}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: (result, error, arg) =>
        result ? ["Messages", "moreMessages"] : null,
      // async onQueryStarted(arg, { queryFulfilled, dispatch }) {
      //   try {
      //     const result = await queryFulfilled;
      //     if (!result?.errors) {
      //       // localStorage.setItem("user", JSON.stringify({ user: result.data }));
      //       dispatch(
      //         apiSlice.util.invalidateTags(
      //           (result) => result && ["Messages", "moreMessages"]
      //         )
      //       );
      //     }
      //   } catch (err) {
      //     // errror handled in ui
      //     console.log(err);
      //   }
      // },
    }),
  }),
});

export const {
  useGetMessagesQuery,
  useSendMessagesMutation,
  useDeleteMessagesForOneSideMutation,
} = messagesApi;
