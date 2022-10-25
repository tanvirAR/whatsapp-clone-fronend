import { useSelector } from "react-redux";
import classes from "../../../styles/Inbox/Inbox.module.css";
import styles from "../../../styles/Inbox/SidebarSearchedResult.module.css";
import SearchedSidebarSinglePeople from "./SearchedSinglePeople";

function SidebarSearchedResult() {
  const fetchedResultBySearch = useSelector(
    (state) => state.searchPeople.searchedResult
  );

  const { isLoadingSearchPeople } = useSelector((state) => state.UI);

  console.log(fetchedResultBySearch);
  let results;

  if (isLoadingSearchPeople) {
    results = <p style={{ color: "#e85b6c" }}>Loading...</p>;
  }
  if (fetchedResultBySearch === undefined) {
    results = (
      <p style={{ color: "#e85b6c", fontSize: "14px", marginLeft: "120px" }}>
        No People found!
      </p>
    );
  }
  if (
    fetchedResultBySearch?.length > 0 &&
    fetchedResultBySearch !== "loading"
  ) {
    results = fetchedResultBySearch.map((singlePeople) => (
      <SearchedSidebarSinglePeople
        key={singlePeople._id}
        userData={singlePeople}
      />
    ));
  }

  return (
    <div className={classes["sidebar-chats"]}>
      <p className={styles.title}>PEOPLES</p>
      <div className={styles.lineClass}></div>
      {results}
    </div>
  );
}

export default SidebarSearchedResult;
