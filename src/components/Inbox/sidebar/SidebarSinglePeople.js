import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import defaultAvatar from "../../../assets/img/blank-profile-picture-973460.png";
import { useGetConversationBuddyNameQuery } from "../../../features/conversations/conversationsApi";
import {
  ChangeConversationId,
  ShowConversationMessages,
} from "../../../features/UI/UISlice";
import classes from "../../../styles/Inbox/Inbox.module.css";
import modifyText from "../../../utils/conversationLastTextModify";
import { getImages } from "../../../utils/fetchImage";

function SidebarSinglePeople({ conversationData }) {
  const { name: currentUserName, Id } = useSelector(
    (state) => state.auth?.user
  );
  const {
    last_updated,

    lastMessage,
    _id,
    lastTextBackup,
    lastUpdatedBy,
  } = conversationData;

  //get buddyName
  const { data: BuddyName } = useGetConversationBuddyNameQuery(_id);

  //use for switching diffrent messeges for different conversation
  const dispatch = useDispatch();
  const conversationChangeHandler = async () => {
    await dispatch(ChangeConversationId(_id));
    // dispatch for showmessageofconversation in ui slice
    await dispatch(ShowConversationMessages(true));
  };

  // fetch buddy Image
  const [image, setImage] = useState();

  useEffect(() => {
    fetchData();
  }, [_id]);

  async function fetchData() {
    const url = `${process.env.REACT_APP_SERVER_URL}inbox/conversation/People/avatar/${_id}`;
    const [response, error] = await getImages(url);

    if (error) console.log(error);
    else {
      await setImage(response);
      await localStorage.setItem("avatar", image);
    }
  }
  const a =
    lastMessage === "$%09!&#*(^" && String(lastUpdatedBy) !== String(Id);
  const b =
    lastMessage === "$%09!&#*(^" && String(lastUpdatedBy) === String(Id);

  let firstModifyText;
  if (a || b || (a && b)) {
    firstModifyText = lastTextBackup?.text;
    console.log("wrong");
  } else if (b) {
    firstModifyText = "No messages sent!";
  } else {
    firstModifyText = lastMessage;
  }

  // console.log(firstModifyText);

  const updatedLastMessage = modifyText(firstModifyText);

  const currentConversationId = useSelector((state) => state.UI.conversationId);

  return (
    <div
      style={{ background: currentConversationId === _id && "#2a3942", cursor: 'pointer' }}
      onClick={conversationChangeHandler}
      className={classes["sidebar-chat"]}
    >
      <div className={classes["chat-avatar"]}>
        <img src={image ? image : defaultAvatar} alt="profile" />
      </div>
      <div className={classes["chat-info"]}>
        <h4>{BuddyName ? BuddyName.name : ""}</h4>
        <p>
          {updatedLastMessage === "You: sent a photo" &&
          String(lastUpdatedBy) !== String(Id)
            ? `${BuddyName?.name.split(" ")[0]}: sent a photo`
            : updatedLastMessage}
        </p>
      </div>
      <div className={classes.time}>
        <p>{moment(last_updated).fromNow()}</p>
      </div>
    </div>
  );
}

export default SidebarSinglePeople;
