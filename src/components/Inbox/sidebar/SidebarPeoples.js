import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import {
  conversationsApi,
  useGetConversationsQuery,
} from "../../../features/conversations/conversationsApi";
import { ChangeConversationsData } from "../../../features/UI/UISlice";
import classes from "../../../styles/Inbox/Inbox.module.css";
import SidebarSinglePeople from "./SidebarSinglePeople";

function SidebarPeoples() {
  const { Id } = useSelector((state) => state.auth.user);
  // console.log(Id);

  const {
    data: conversations,
    isLoading,
    isError,
  } = useGetConversationsQuery(Id);

  // console.log(conversations);

  // for pagination
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const dispatch = useDispatch();

  // save conversations data in a state
  useEffect(() => {
    if (conversations) {
      dispatch(ChangeConversationsData(conversations));
    }
  }, [conversations, dispatch]);

  const fetchMoreConversations = () => {
    setPage((prev) => prev + 1);
  };

  const totalConversations = conversations?.TotalConversationsNumber;

  useEffect(() => {
    if (page > 1) {
      dispatch(conversationsApi.endpoints.getMoreConversations.initiate(page));
    }
  }, [page, dispatch]);

  useEffect(() => {
    if (totalConversations > 0) {
      const more =
        Math.ceil(
          totalConversations /
            Number(process.env.REACT_APP_CONVERSATIONS_PER_PAGE)
        ) > page;
      setHasMore(more);
    }
  }, [totalConversations, page]);

  // decide what to render
  let content = null;

  if (isLoading) {
    content = <li>Loading...</li>;
  } else if (!isLoading && isError) {
    content = (
      <p style={{ color: "#e85b6c", marginLeft: "170px" }}>
        There was an error!
      </p>
    );
  } else if (
    !isLoading &&
    !isError &&
    conversations?.conversations.length === 0
  ) {
    content = (
      <p
        style={{
          color: "#e85b6c",
          fontSize: "14px",
          marginLeft: "80px",
        }}
      >
        No Conversations found!
      </p>
    );
  } else if (
    !isLoading &&
    !isError &&
    conversations?.conversations.length > 0
  ) {
    // console.log(conversations.conversations);
    content = (
      <InfiniteScroll
        dataLength={conversations?.conversations.length}
        next={fetchMoreConversations}
        hasMore={hasMore}
        loader={<h4>Loading</h4>}
        height={window.innerHeight - 120}
      >
        {conversations.conversations.map((conversationData, key) => {
          return (
            <SidebarSinglePeople
              conversationData={conversationData}
              key={key}
            />
          );
        })}
      </InfiniteScroll>
    );
  }

  return (
    <div className={classes["sidebar-chats"]}>
      <div>{content}</div>
    </div>
  );
}

export default SidebarPeoples;
