/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import defaultImage from "../../../assets/img/blank-profile-picture-973460.png";
import optionsIcon from "../../../assets/img/more.svg";
import searchIcon from "../../../assets/img/search-solid.svg";
import {
  useDeleteConversationMutation,
  useEditConversationMutation,
} from "../../../features/conversations/conversationsApi";
import { useDeleteMessagesForOneSideMutation } from "../../../features/messages/messagesApi";
import {
  PartnerAvatarChange,
  ShowConversationMessages,
  ViewConversationPartnerInfobar,
} from "../../../features/UI/UISlice";
import classes from "../../../styles/Inbox/Inbox.module.css";
import styles from "../../../styles/Inbox/SidebarHeader.module.css";
import { getImages } from "../../../utils/fetchImage";

function RightSideHeader() {
  const [buddyImage, setBuddyImage] = useState();
  const [optionsPopup, setOptionsPopup] = useState(false);
  const dispatch = useDispatch();

  const { conversationId, buddyInfo } = useSelector((state) => state.UI) || {};

  async function fetchData() {
    const url = `${process.env.REACT_APP_SERVER_URL}inbox/conversation/People/avatar/${conversationId}`;
    const [response, error] = await getImages(url);

    if (error) console.log(error);
    else {
      await setBuddyImage(response);
      dispatch(PartnerAvatarChange(response));
    }
  }

  //style
  const style = { background: "#53616a", borderRadius: "20px", filter: "none" };

  //close message
  const closeMessageHandler = async () => {
    //first close contact info bar if open
    await dispatch(ViewConversationPartnerInfobar(false));
    dispatch(ShowConversationMessages(false));
  };

  useEffect(() => {
    fetchData();
  }, [conversationId]);

  const openPartnerInfobarHandler = () => {
    dispatch(ViewConversationPartnerInfobar(true));
    setOptionsPopup(false);
  };

  // delete messages
  const [deleteMessagesForOneSide] = useDeleteMessagesForOneSideMutation();

  //update lastConversation text after deleting
  const [editConversation] = useEditConversationMutation();

  const deleteMessagesHandler = async () => {
    setOptionsPopup(false);
    await dispatch(ShowConversationMessages(false));

    await deleteMessagesForOneSide(conversationId);

    await editConversation({
      message: "$%09!&#*(^",
      conversationId: conversationId,
      time: Date.now(),
    });
  };

  // ............delete conversation for one SidebarOptionsPopUps.........
  const [deleteConversation] = useDeleteConversationMutation();
  const deleteConversationHandler = async () => {
    await deleteConversation(conversationId);
    dispatch(ShowConversationMessages(false));
  };

  // useEffect(() => {
  //   console.log(deleteConversationResponse);
  // }, []);

  return (
    <div className={classes.header}>
      <div className={classes["chat-title"]}>
        <div className={classes["avatar"]}>
          <img src={buddyImage ? buddyImage : defaultImage} alt="" />
        </div>
        <div className={classes["message-header-content"]}>
          <h4>{buddyInfo ? buddyInfo.name : ""}</h4>
          <p>online</p>
        </div>
      </div>
      <div className={classes["chat-header-right"]}>
        <img
          className={styles.status}
          draggable="false"
          src={searchIcon}
          alt=""
        />

        <img
          style={optionsPopup ? style : null}
          onClick={() => setOptionsPopup((prevState) => !prevState)}
          className={styles.status}
          draggable="false"
          src={optionsIcon}
          alt=""
        />
        {optionsPopup && (
          <div className={classes.rightOptionsBar}>
            <p onClick={openPartnerInfobarHandler}>Contact info</p>
            <p onClick={closeMessageHandler}>Close chat</p>
            <p onClick={deleteMessagesHandler}>Clear messages</p>
            <p onClick={deleteConversationHandler}>Delete chat</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default RightSideHeader;
