import { useDispatch, useSelector } from "react-redux";
import blockIcon from "../../../assets/img//block.svg";
import dislikeIcon from "../../../assets/img/dislike.svg";
import trashIcon from "../../../assets/img/TRASH.svg";
import { useDeleteConversationMutation } from "../../../features/conversations/conversationsApi";
import {
  ShowConversationMessages,
  ViewConversationPartnerInfobar,
} from "../../../features/UI/UISlice";
import styles from "../../../styles/Inbox//ConversationPartnerInfobar.module.css";

// ................................  X   ................................

function ConversationPartnerInfobar() {
  const dispatch = useDispatch();
  const closePatrtnerInfoBarHandler = () => {
    dispatch(ViewConversationPartnerInfobar(false));
  };

  //

  //get partner info from state
  const { name, status, number } = useSelector((state) => state.UI.buddyInfo);

  //get partner avatar from state
  const { currentOpenedMessageBuddyImg: avatar, conversationId } = useSelector(
    (state) => state.UI
  );

  //delete user handler
  const [deleteConversation] = useDeleteConversationMutation();
  const deleteConversationHandler = async () => {
    await deleteConversation(conversationId);
    await dispatch(ViewConversationPartnerInfobar(false));
    dispatch(ShowConversationMessages(false));
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.head}>
        <div className={styles.header}>
          <div className={styles.ProfileName}>
            <svg
              onClick={closePatrtnerInfoBarHandler}
              xmlns="http://www.w3.org/2000/svg"
              style={{ height: 30, width: 18, marginLeft: 15 }}
              fill="#51A985"
              // class="bi bi-arrow-left"
              viewBox="0 0 11 16"
            >
              {" "}
              <path
                fillRule="evenodd"
                d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
              />{" "}
            </svg>
            <p>Profile</p>
          </div>
        </div>
      </div>
      {/* .......................... (header end)   X   .......................................... */}
      <div className={styles.IMAGE}>
        <div
          onClick={() => console.log("Clicked")}
          className={styles.IMAGECONTAINER}
        >
          {" "}
          <label htmlFor="file">
            <img
              className={styles.profilePicture}
              src={
                avatar
                  ? avatar
                  : require("../../../assets/img/blank-profile-picture-973460.png")
              }
              alt="profile"
            />
          </label>
          <div className={styles.pictureInfo}>
            <p className={styles.name}>{name ? name : ""}</p>
            <p className={styles.number}>{number ? number : ""}</p>
          </div>
        </div>
      </div>

      <div className={styles.about}>
        <p className={styles.aboutText}>About</p>
        <p className={styles.statusText}>{status ? status : ""}</p>
      </div>
      <div className={styles.reportContainer}>
        <div className={styles.itemContainer}>
          <img className={styles.blockIcon} src={blockIcon} alt="" />
          <p className={styles.item}>Block Jack</p>
        </div>
        <div className={styles.itemContainer}>
          <img className={styles.blockIcon} src={dislikeIcon} alt="" />

          <p className={styles.item}>Report Jack</p>
        </div>
        <div className={styles.itemContainer}>
          <img className={styles.blockIcon} src={trashIcon} alt="" />

          <p onClick={deleteConversationHandler} className={styles.item}>
            Delete Jack
          </p>
        </div>
      </div>
    </div>
  );
}

export default ConversationPartnerInfobar;
