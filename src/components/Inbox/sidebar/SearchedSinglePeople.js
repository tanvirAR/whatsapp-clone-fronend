import { useEffect } from "react";
import { useDispatch } from "react-redux";
import defaultProfilePhoto from "../../../assets/img/blank-profile-picture-973460.png";
import { useCreateConversationMutation } from "../../../features/conversations/conversationsApi";
import {
  ChangeConversationId,
  ChangeSearchText,
  ShowConversationMessages,
  ViewSearchedResult,
} from "../../../features/UI/UISlice";
import classes from "../../../styles/Inbox/Inbox.module.css";

function SidebarSinglePeople({ userData }) {
  const { _id, name, status, avatar } = userData;
  const dispatch = useDispatch();
  const [createConversation, { data }] = useCreateConversationMutation();

  useEffect(() => {
    //if successfully created a conversation
    if (data && data?.conversationId) {
      dispatch(ChangeConversationId(data.conversationId));
    }
  }, [data, dispatch]);

  // add conversation
  const addConversationHandler = async () => {
    // await setSkip(false);
    await createConversation({ participant: name, id: _id });
    // after successfully creating a conversation , clear search result and redirect to default sidebar
    await dispatch(ViewSearchedResult(false));

    //clear search input filed from  Sidesearch component after adding conversation
    await dispatch(ChangeSearchText(""));
    await dispatch(ShowConversationMessages(true));
  };

  return (
    <div
      onClick={addConversationHandler}
      style={{ cursor: "pointer" }}
      className={classes["sidebar-chat"]}
    >
      <div className={classes["chat-avatar"]}>
        <img src={defaultProfilePhoto} alt="" />
      </div>
      <div className={classes["chat-info"]}>
        <h4>{name}</h4>
        <p>{status}</p>
      </div>
    </div>
  );
}

export default SidebarSinglePeople;
