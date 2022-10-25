import { useState } from "react";
import { useSelector } from "react-redux";
import classes from "../../../styles/Inbox/Inbox.module.css";
import Footer from "../footer/Footer";
import MessageContents from "./MessageContents";
import RightSideHeader from "./RightSideHeader";

function MessageContainer() {
  const [description, setDescription] = useState(false)
  const justifyToShowMessagesField = useSelector(
    (state) => state.UI.showMessagesOfAConversation
  );
  return (
    <div className={classes["message-container"]}>
      {justifyToShowMessagesField ? (
        <>
          <RightSideHeader />
          <MessageContents />
          <Footer />
        </>
      ) : (
        <div className={classes.noMessage}>
          <p className={classes.noMessageP}>WhatssApp Web</p>
          <p
            className={classes.CLICKHERE}
            onClick={() => setDescription((prevState) => !prevState)}
          >
            click here
          </p>
          {description && (
            <div className={classes.instructions}>
              <p className={classes.welcome}>WELCOME to WhatsApp</p>
              <p className={classes.noMessageP2}>
                Its a small prototype of whatsapp.This application is still
                under development.So there may be some bugs and in some cases
                you need to reload the page
              </p>
              <p className={classes.noMessageP2}>
                Instructions & Recommendations:
              </p>
              <ul>
                <li>
                  This application is still not optimized for small screen
                  devices.For best experience it is recomended to view on large
                  screen devices instead of mobile or Tablet
                </li>
                <li>
                  For server storage limitations, you can upload your profile picture but it will be removed after some time & you can only send one
                  attachement to a user and it must be only image file
                </li>
                <li>
                  For testing this application is hosted on free server so real
                  time messaging may be a bit slow.
                </li>
                <li>
                  To chat with a user you need to enter the user name or email
                  or phone number on the search bar
                </li>
                <li>
                  Again, this application is still under development so you may
                  not get all the features comparing the original WHATSAPP
                </li>
                <li style={{fontSize: '14px'}}>
                  To report or feedback:  <span style={{cursor: 'text', color: 'white', userSelect: 'text' }}>tanvir.ar.47@gmail.com</span>
                </li>
                <li>Till then Enjoy!</li>
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default MessageContainer;

// import classes from "../../../styles/Inbox/Inbox.module.css";

// return (
//     <div className={classes["message-container"]}>
//       {showMessagesField ? (
//         <>
//           {" "}
//           <RightSideHeader />
//           <MessageContents />
//           <Footer />{" "}
//         </>
//       ) : (
//         <div className={classes.noMessage}>
//           <p>WhatssApp Web</p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default MessageContainer;
