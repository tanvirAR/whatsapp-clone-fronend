import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import cancellAttachmentIcon from "../../../assets/img/cancell.svg";
import attachmentIcon from "../../../assets/img/paper-clip.svg";
import sendMessageIcon from "../../../assets/img/sendMessageIcon.png";
import emojiIcon from "../../../assets/img/smile.svg";
import { useEditConversationMutation } from "../../../features/conversations/conversationsApi";
import { useSendMessagesMutation } from "../../../features/messages/messagesApi";
import styles from "../../../styles/Inbox/Footer.module.css";
import classes from "../../../styles/Inbox/Inbox.module.css";

function Footer() {
  const [message, setMessage] = useState("");
  const [file, setFile] = useState();

  // edit the conversation(last message & time stamp ) after sending a message
  const [editConversation] = useEditConversationMutation();

  // get conversation ID
  const conversationId = useSelector((state) => state.UI.conversationId) || {};

  useEffect(() => {
    setMessage("");
  }, [conversationId]);

  // get own info
  const { username: UserName, Id: userId } =
    useSelector((state) => state.auth.user) || {};

  //get partner info to send message
  const { name: BuddyName, id } =
    useSelector((state) => state.UI.buddyInfo) || {};

  //send message query
  const [sendMessages, { isLoading }] = useSendMessagesMutation();

  // console.log(UserName);
  // console.log(Id);

  const data = {
    message: message,
    attachment: file,
    conversationId: conversationId,
    receiverId: id,
    name: UserName,
    receiverName: BuddyName,
  };

  const submitHandler = async (e) => {
    console.log();

    if (
      (e.key === "Enter" || e._reactName === "onClick") &&
      !isLoading &&
      (file || message?.length > 0)
    ) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("message", message);
      formData.append("conversationId", conversationId);
      formData.append("receiverId", id);
      formData.append("name", UserName);
      formData.append("receiverName", BuddyName);

       editConversation({
        message: message ? message : "You: sent a photo",
        conversationId: conversationId,
        time: Date.now(),
      });
       sendMessages({ formData, conversationId, userId });
      setFile("");
      setMessage("");
    }
  };

  return (
    <div className={classes["message-footer"]}>
      <img className={styles.img} src={emojiIcon} alt=" " />
      <input
        id="file"
        onChange={(e) => setFile(e.target.files[0])}
        accept="image/jpg, image/png, image/jpeg"
        style={{ display: "none" }}
        type="file"
      ></input>
      {file ? (
        <img
          onClick={() => setFile(null)}
          className={styles.img}
          src={cancellAttachmentIcon}
          alt="X"
        />
      ) : (
        <label htmlFor="file">
          <img
            style={{
              marginLeft: "-2px",
              paddingRight: "0px",
              marginRight: "-5px",
            }}
            className={styles.img}
            src={attachmentIcon}
            alt=""
          />
        </label>
      )}
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => submitHandler(e)}
        autoComplete="off"
        type="text"
        placeholder={file ? "1 attachment selected" : "Type a message"}
      />
      <div className={styles.imgSendIcon}>
        <img
          onClick={submitHandler}
          className={styles.img}
          src={sendMessageIcon}
          alt=""
        />
      </div>
    </div>
  );
}

export default Footer;
