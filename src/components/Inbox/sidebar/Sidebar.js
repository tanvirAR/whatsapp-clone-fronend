import { useSelector } from "react-redux";
import classes from "../../../styles/Inbox/Inbox.module.css";
import styles from "../../../styles/Inbox/Sidebar.module.css";
import OptionsPopUp from "./OptionsPopUp";
import SidebarHeader from "./SidebarHeader";
import SidebarPeoples from "./SidebarPeoples";
import SidebarSearch from "./SidebarSearch";
import SidebarSearchedResult from "./SidebarSearchedResult";

function Sidebar() {
  const showSidebarSearchResult = useSelector(
    (state) => state.UI.searchedResultList
  );

  const showSignOutPopUp = useSelector((state) => state.UI.sidebarOptionsPopUp);

  return (
    <div className={classes.sidebar}>
      <SidebarHeader />
      <div className={styles.containerr}>
        {showSignOutPopUp && <OptionsPopUp />}
        <SidebarSearch />
      </div>

      {!showSidebarSearchResult ? (
        <SidebarPeoples />
      ) : (
        <SidebarSearchedResult />
      )}
    </div>
  );
}

export default Sidebar;
