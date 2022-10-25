// import classes from "../../../styles/Inbox/Inbox.module.css";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import { useGetConversationBuddyNameQuery } from "../../../features/conversations/conversationsApi";
import {
  messagesApi,
  useGetMessagesQuery,
} from "../../../features/messages/messagesApi";
import { PartnerInfoChange } from "../../../features/UI/UISlice";
import "../../../styles/Global.css";
import SingleMessages from "./SingleMessage";

function MessageContents() {
  const dispatch = useDispatch();
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(1);

  // conversationID for useGetMessagesQuery
  const conversationID = useSelector((state) => state.UI.conversationId);
  // use for socket implementation
  const { Id: userID } = useSelector((state) => state.auth.user);
  const {
    data: Messages,
    isLoading,
    isError,
  } = useGetMessagesQuery({ conversationID, userID });

  const { totalMessagesNumber } = Messages?.data || {};

  const fetchMoreMessages = () => {
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    if (page > 1) {
      dispatch(
        // conversationsApi.endpoints.getMoreConversations.initiate(page)
        messagesApi.endpoints.getMoreMessages.initiate({
          conversationID,
          userID,
          page,
        })
      );
    }
  }, [page, dispatch, userID, conversationID]);

  useEffect(() => {
    if (totalMessagesNumber > 0) {
      const more =
        Math.ceil(
          totalMessagesNumber / Number(process.env.REACT_APP_MESSAGES_PER_PAGE)
        ) > page;
      setHasMore(more);
    }
  }, [totalMessagesNumber, page]);

  //decide what to render
  let content;
  if (isLoading) {
    content = <p style={{ color: " #3c805f" }}>Loading...</p>;
  }

  if (isError) {
    content = <p>An error occured!</p>;
  }

  if (!isLoading && !isError && Messages?.data?.messages?.length === 0) {
    content = (
      <p
        style={{
          color: "#e85b6c",
          fontSize: "14px",
          marginLeft: "120px",
        }}
      >
        No messeges sent
      </p>
    );
  }
  if (!isLoading && !isError && Messages?.data?.messages?.length > 0) {
    content = (
      <InfiniteScroll
        dataLength={Messages.data.messages.length}
        next={fetchMoreMessages}
        hasMore={hasMore}
        // loader={<h4>Loading</h4>}
        // height={window.innerHeight - 120}
        inverse={true}
        scrollableTarget="scroll"
      >
        {Messages.data.messages.map((singleMessage, key) => (
          <SingleMessages data={singleMessage} key={key} />
        ))}
      </InfiniteScroll>
    );
  }

  // save current slected messages partner info- (name&status) in store
  const { data: buddyInfo } = useGetConversationBuddyNameQuery(conversationID);

  useEffect(() => {
    // save the partner name and info in store
    dispatch(PartnerInfoChange(buddyInfo));
  }, [conversationID, buddyInfo, dispatch]);

  return (
    <div id="scroll" className="message-content">
      {content}
    </div>
  );
}

export default MessageContents;
