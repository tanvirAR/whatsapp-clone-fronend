import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messageField: false,
  profileSidebar: false,
  searchedResultList: false,
  sidebarOptionsPopUp: false,
  contactsSidebar: false,
  conversationPartnerInfobar: false,

  searchTextToFindPeople: "",

  //use for switching diffrent messeges for different conversation
  conversationId: undefined,

  showMessagesOfAConversation: false,

  //participant info of a conversation messeges
  buddyInfo: undefined,
  currentOpenedMessageBuddyImg: undefined,

  //fetched conversations data
  conversationsData: undefined,

  isLoadingSearchPeople: false,
};

const UISlice = createSlice({
  name: "UI",
  initialState,
  reducers: {
    messageFieldChange: (state, action) => {
      state.messageField = action.payload;
    },
    SwitchSidebarChange: (state, action) => {
      state.profileSidebar = action.payload;
    },
    ViewSearchedResult: (state, action) => {
      state.searchedResultList = action.payload;
    },
    ViewContacts: (state, action) => {
      state.contactsSidebar = action.payload;
    },
    ViewConversationPartnerInfobar: (state, action) => {
      state.conversationPartnerInfobar = action.payload;
    },
    ChangeConversationId: (state, action) => {
      state.conversationId = action.payload;
    },
    SidebarOptionsPopUps: (state, action) => {
      state.sidebarOptionsPopUp = !state.sidebarOptionsPopUp;
    },
    ShowConversationMessages: (state, action) => {
      state.showMessagesOfAConversation = action.payload;
    },
    PartnerInfoChange: (state, action) => {
      state.buddyInfo = action.payload;
    },
    PartnerAvatarChange: (state, action) => {
      state.currentOpenedMessageBuddyImg = action.payload;
    },
    ChangeSearchText: (state, action) => {
      state.searchTextToFindPeople = action.payload;
    },
    ChangeConversationsData: (state, action) => {
      state.conversationsData = action.payload;
    },
    ChangeLoadingStateSearchingPeople: (state, action) => {
      state.isLoadingSearchPeople = action.payload
    },
    LogoutHandler: (state, action) => {
     state = {
       messageField: false,
       profileSidebar: false,
       searchedResultList: false,
       sidebarOptionsPopUp: false,
       contactsSidebar: false,
       conversationPartnerInfobar: false,

       searchTextToFindPeople: "",

       //use for switching diffrent messeges for different conversation
       conversationId: undefined,

       showMessagesOfAConversation: false,

       //participant info of a conversation messeges
       buddyInfo: undefined,
       currentOpenedMessageBuddyImg: undefined,

       //fetched conversations data
       conversationsData: undefined,

       isLoadingSearchPeople: false,
     };
    }
  },
});

export const {
  messageFieldChange,
  SwitchSidebarChange,
  ViewSearchedResult,
  ViewContacts,
  ViewConversationPartnerInfobar,
  ChangeConversationId,
  ChangeSearchText,
  SidebarOptionsPopUps,
  ShowConversationMessages,
  PartnerInfoChange,
  PartnerAvatarChange,
  ChangeConversationsData,
  ChangeLoadingStateSearchingPeople,
  LogoutHandler,
} = UISlice.actions;

export default UISlice.reducer;
