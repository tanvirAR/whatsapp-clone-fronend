import { useSelector } from "react-redux";
import ChatContainer from "../components/Inbox/chat-container/ChatContainer";
import PersonalizedSidebar from "../components/Inbox/PersonalizeSidebar/Sidebar";
import Sidebar from "../components/Inbox/sidebar/Sidebar";
// import classes from "../styles/Inbox/Inbox.module.css";
import ContactsSidebar from "../components/Inbox/ContactsSidebar/ContactsSidebar";
import ConversationPartnerInfobar from "../components/Inbox/ConversationPartnerInfobar/ConversationPartnerInfobar";
import styles from "../styles/Inbox/PersonalizedSidebar.module.css";
import { useEffect } from "react";

export default function Inbox() {
useEffect(()=> {
document.title = 'WatsApp-AR'
},[])

  // decide which sidebar to show between default sidebar & personalized Sidebar
  const Personalizedsidebar = useSelector((state) => state.UI.profileSidebar);
  const contactsSidebar = useSelector((state) => state.UI.contactsSidebar);
  const ConversationPartnerInfobarShow = useSelector(
    (state) => state.UI.conversationPartnerInfobar
  );

  return (
    <div className={styles.main}>
      {contactsSidebar ? (
        <ContactsSidebar />
      ) : !Personalizedsidebar ? (
        <Sidebar />
      ) : (
        <PersonalizedSidebar />
      )}
      <ChatContainer />
      {ConversationPartnerInfobarShow && <ConversationPartnerInfobar />}
    </div>
  );
}
