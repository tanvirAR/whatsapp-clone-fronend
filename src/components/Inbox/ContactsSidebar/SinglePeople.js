import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import defaultAvatar from "../../../assets/img/blank-profile-picture-973460.png";
import classes from "../../../styles/Inbox/Inbox.module.css";
import { getImages } from "../../../utils/fetchImage";

function SinglePeople({ info }) {
  const [buddyImage, setBuddyImage] = useState();
  const dispatch = useDispatch();
  const {} = useSelector((state) => state.UI);

  // fetch image
  async function fetchData() {
    const url = `${process.env.REACT_APP_SERVER_URL}inbox/Peoples/avatar/${info.id}`;
    const [response, error] = await getImages(url);

    if (error) console.log(error);
    else {
      await setBuddyImage(response);
    }
  }
  useEffect(() => {
    if (info.id) {
      fetchData();
    }
  }, [info.id]);

  // fetch image end................
  const { conversations } = useSelector((state) => state.UI.conversationsData);

  let isPresent = false;
  // // const openMessageFieldHandler = async () => {
  // for (let i = 0; i < conversations.length; i++) {
  //   let a = String(conversations[i].creator.id) === String(info.id);
  //   let b = String(conversations[i].creator.id) === String(info.id);
  //   console.log(a);
  //   console.log(b);
  //   if (a === true || b === true) {
  //     isPresent = true;
  //   }
  //   // if (
  //   //   a || b
  //   // ) {
  //   //   console.log("yeeesss");
  //   //   await dispatch(ViewContacts(false));
  //   //   await dispatch(ChangeConversationId(conversations[i]._id));
  //   //   await dispatch(ShowConversationMessages(true));
  //   // }
  // }
  // // };

  useEffect(() => {
    for (let i = 0; i < conversations.length; i++) {
      let a = String(conversations[i].creator.id) === String(info.id);
      let b = String(conversations[i].creator.id) === String(info.id);
      // console.log(a);
      // console.log(b);
      if (a === true || b === true) {
        isPresent = true;
      }
    }
    // console.log(isPresent);
  }, []);

  console.log(info.id);

  return (
    <div
      onClick={() => console.log("s")}
      style={{
        cursor: "pointer",
        width: "90%",
        marginLeft: "20px",
        height: "70px",
      }}
      className={classes["sidebar-chat"]}
    >
      <div className={classes["chat-avatar"]}>
        <img src={buddyImage ? buddyImage : defaultAvatar} alt="profile" />
      </div>
      <div className={classes["chat-info"]}>
        <h4 style={{ fontSize: "14px" }}>{info.name}</h4>
        <p style={{ fontSize: "12px", fontFamily: "sans-serif" }}>
          {info.status}
        </p>
      </div>
    </div>
  );
}

export default SinglePeople;
