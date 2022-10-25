/* eslint-disable no-unused-vars */
import moment from "moment/moment";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import defaultAvatar from "../../../assets/img/blank-profile-picture-973460.png";
import classes from "../../../styles/Inbox/Inbox.module.css";
import styles from "../../../styles/Inbox/SingleMessage.module.css";
import validateEmail from "../../../utils/emailValidation";
import { getImages } from "../../../utils/fetchImage";

function SingleMessages({ data }) {
  const [file, setFile] = useState();
  const { name, email, Id } = useSelector((state) => state.auth.user) || {};
  const {
    sender,
    // reciever,
    participant,
    _id,
    text,
    attachment,
    conversation_id,
    date_time,
  } = data;
  if (attachment) {
  }
  const isEmail = validateEmail(text);

  useEffect(() => {
    if (attachment) {
      fetchData();
    }
  }, [conversation_id]);

  // const { data: BuddyName } = useGetConversationBuddyNameQuery(_id);

  // fetch attachment
  async function fetchData() {
    const url = `${process.env.REACT_APP_SERVER_URL}inbox/attachment/messages/${conversation_id}/${attachment}`;
    const [response, error] = await getImages(url);

    if (error) console.log(error);
    else {
      setFile(response);
    }
  }

  return (
    <>
      {text && (
        <p
          style={
            isEmail && {
              color: "#58b1d8",
              cursor: "pointer",
            }
          }
          className={
            sender?.id === Id
              ? `${classes["chat-message"]} ${classes["chat-sent"]}`
              : `${classes["chat-message"]}`
          }
          alt={"attachment"}
        >
          {text}
          <span className={classes["chat-timestamp"]}>
            {moment(date_time).fromNow()}
          </span>
        </p>
      )}
      {attachment && (
        <div
          style={{ marginTop: text && "-18px" }}
          className={
            sender?.id === Id
              ? `${styles.attachment} ${styles["sent-chat"]}`
              : `${styles.attachment}`
            // `${styles.attachment} ${styles["sent-chat"]}`
          }
        >
          <img
            className={styles.attachmentPic}
            // className={styles["attachmentPic"]}
            src={file ? file : defaultAvatar}
            alt=""
          />
          <p>{moment(date_time).fromNow()}</p>
        </div>
      )}
    </>
  );
}

export default SingleMessages;
