import React from "react";
import styles from "../../../styles/Inbox/ContactsSidebar.module.css";
import SinglePeople from "./SinglePeople";

function SingleContacts({ firstLetter, friends }) {
  // console.log(friends);
  let content = "";
  if (friends.length > 0) {
    content = friends.map((sf, key) => <SinglePeople key={key} info={sf} />);
  }

  return (
    <>
      <div className={styles.singleContacts}>
        <p style={{ marginTop: "30px" }} className={styles.yourName}>
          {firstLetter.toUpperCase()}
        </p>
        {content}
      </div>
    </>
  );
}

export default SingleContacts;
