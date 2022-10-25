import { io } from "socket.io-client";
import { apiSlice } from "../api/apiSlice";

export const conversationsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getConversations: builder.query({
      query: (userId) => ({
        url: "inbox/users/conversations/1/16",
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
      }),
      providesTags: ["allConversations"],

      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
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
            updateCachedData((draft) => {
              // check if socket data belongs to this user
              // console.log(JSON.stringify(draft));
              // console.log(data);

              const Conversations = draft.conversations.find(
                (c) => c._id === data?.result.conversation_id
              );
              console.log(data.updatedConversations);
              // console.log(arg);
              // console.log(String(data.receiver.id));
              // console.log(String(data.receiver.id) === String(arg));
              if (
                Conversations === undefined &&
                String(data.result.receiver.id) === String(arg)
              ) {
                draft.conversations.unshift(data.updatedConversation);
              }
              // console.log(JSON.stringify(draft));
              // console.log(Conversations);

              if (Conversations && Conversations !== undefined) {
                Conversations.lastMessage = data.result.text;
                Conversations.last_updated = data.result.date_time;

                const updatedConversations = draft.conversations.find(
                  (c) => c._id === data?.result.conversation_id
                );

                const requiredConversationIndex = draft.conversations.findIndex(
                  (el) => el === updatedConversations
                );
                draft.conversations.splice(requiredConversationIndex, 1);
                draft.conversations.unshift(updatedConversations);
              }
            });
          });
        } catch (err) {}
        // close socket on unmount
        await cacheEntryRemoved;
        socket.close();
      },
    }),
    getMoreConversations: builder.query({
      query: (page) => ({
        url: `inbox/users/conversations/${page}/${process.env.REACT_APP_CONVERSATIONS_PER_PAGE}`,
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
      }),
      providesTags: ["allConversations"],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const conversations = await queryFulfilled;
          // console.log(conversations.data.conversations);
          if (conversations?.data?.conversations?.length > 0) {
            // updatae cache pessimistically - !start
            dispatch(
              apiSlice.util.updateQueryData(
                "getConversations",
                undefined,
                (draft) => {
                  return {
                    conversations: [
                      ...draft.conversations,
                      ...conversations.data.conversations,
                    ],
                  };
                }
              )
            );
            // updatae cache pessimistically - end!
          }
        } catch (err) {}
      },
    }),
    // ....................................   X   ...........................................
    getConversationBuddyImg: builder.query({
      query: (conversationId) => ({
        url: `inbox/conversation/People/avatar/${conversationId}`,
        method: "GET",
        credentials: "include",
        cache: "no-cache",
      }),
    }),
    // ..................................    X    ...........................................
    createConversation: builder.mutation({
      query: (data) => ({
        url: "inbox/create/new/conversation",
        method: "POST",
        body: data,
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
      }),
      invalidatesTags: ["allConversations"],
    }),

    // ...................................   X   .................................................

    editConversation: builder.mutation({
      query: ({ message, conversationId, time }) => ({
        url: `inbox/conversation/edit/${conversationId}`,
        method: "PATCH",

        body: { message: message },
        headers: {
          "content-type": "application/json",
        },

        credentials: "include",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        // optimistic cache update start
        const patchResult = dispatch(
          apiSlice.util.updateQueryData(
            "getConversations",
            undefined,
            (draft) => {
              const requiredConversationToEdit = draft.conversations.find(
                (c) => c._id === arg.conversationId
              );

              requiredConversationToEdit.lastMessage = arg.message;
              requiredConversationToEdit.last_updated = arg.time;
            }
          )
        );
        // optimistic cache update end

        try {
          await queryFulfilled;
        } catch (err) {
          patchResult.undo();
        }
      },
    }),
    getConversationBuddyName: builder.query({
      query: (conversationId) => ({
        url: `inbox/conversation/buddyname/${conversationId}`,
        method: "GET",
        credentials: "include",
      }),
    }),
    deleteConversation: builder.mutation({
      query: (conversationId) => ({
        url: `inbox/delete/conversation/${conversationId}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["allConversations"],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const response = await queryFulfilled;
          dispatch(apiSlice.util.invalidateTags(["Messages", "moreMessages"]));
        } catch (err) {}
      },
    }),
  }),
});

export const {
  useGetConversationsQuery,
  useGetConversationBuddyNameQuery,
  useGetConversationBuddyImgQuery,
  useCreateConversationMutation,
  useEditConversationMutation,
  useDeleteConversationMutation,
} = conversationsApi;
