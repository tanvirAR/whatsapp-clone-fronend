import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useGetUsersFriendsQuery } from "../../../features/searchPeoples/searchPeoplesApi";
import { ViewContacts } from "../../../features/UI/UISlice";
// import { useAuth } from "../../../contexts/AuthContexts";
import styles from "../../../styles/Inbox/ContactsSidebar.module.css";
import classes from "../../../styles/Inbox/Inbox.module.css";
import SingleContacts from "./SingleContacts";

// ................................  X   ................................

function Sidebar() {
  const ref = useRef(null);
  const dispatch = useDispatch();
  const closeContactsSidebarHandler = () => {
    dispatch(ViewContacts(false));
  };
  const [searchIcon, setSearchIcon] = useState(true);
  const [searchText, setSearchText] = useState("");

  // debounce handler for searching contacts
  const doneTypingInterval = 500;
  let typingTimer;
  const debounceHandler = () => {
    clearTimeout(typingTimer);

    if (searchText) {
      typingTimer = setTimeout(searchUser, doneTypingInterval);
    }
  };

  const searchUser = () => {
    console.log("CLICKED!");
  };
  // ................................................get frinds .......... start

  const { data: friends, isLoading, isError } = useGetUsersFriendsQuery();

  let content;

  if (isLoading) {
    content = "Loading...";
  }
  if (isError && !isLoading) {
    content = "Error Occured! Please reload the page";
  }

  // // let firstAlphabetOfEachFriendsName = [];
  if (friends && friends?.list.length === 0) {
    content = "No friends to show";
  }

  let nonDuplicateFirstLetterOfEachFriendsName = [];

  if (friends && friends?.list.length > 0) {
    let firstAlphabetOfEachFriendsName = [];
    for (let i = 0; i < friends.list.length; i++) {
      // console.log(friends.list[i]);
      firstAlphabetOfEachFriendsName.push(
        friends.list[i].name[0].toLowerCase()
      );
    }
    nonDuplicateFirstLetterOfEachFriendsName = [
      ...new Set(firstAlphabetOfEachFriendsName),
    ];

    // sort according to alphabetical order
    function alphabetized(list) {
      var ans = [];
      for (var i = 97; i < 123; ++i)
        for (var j = 0; j < list.length; j++)
          if (list[j].toLowerCase().charCodeAt() == i) ans.push(list[j]);
      return ans;
    }
    const alphabeticalOrderedLetter = alphabetized(
      nonDuplicateFirstLetterOfEachFriendsName
    );

    content = alphabeticalOrderedLetter.map((friend) => {
      let finalFriendsList = [];
      for (let i = 0; i < friends.list.length; i++) {
        if (friends.list[i].name[0].toLowerCase() === friend) {
          finalFriendsList.push(friends.list[i]);
        }
      }

      return (
        <SingleContacts
          key={friend}
          firstLetter={friend}
          friends={finalFriendsList}
        />
      );
    });
  }
  // ........................get friends end...............
  return (
    <div className={styles.sidebar}>
      <div className={styles.head}>
        <div className={styles.header}>
          <div className={styles.ProfileName}>
            <svg
              onClick={closeContactsSidebarHandler}
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
      <div
        style={{
          width: "90%",
          marginLeft: "40px",
          borderRadius: "7px",
          height: "35px",
        }}
        className={classes["sidebar-search-container"]}
      >
        {searchIcon ? (
          <div style={{ cursor: "pointer" }}>
            {/* ...................arrow icon........ */}
            <svg
              onClick={() => setSearchIcon(false)}
              style={{ height: 20, marginLeft: 15 }}
              className="svg-icon search-icon"
              aria-labelledby="title desc"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 19.9 19.7"
            >
              <g className="search-path" fill="none" stroke="#848F91">
                <path strokeLinecap="square" d="M18.5 18.3l-5.4-5.4" />
                <circle cx="8" cy="8" r="7" />
              </g>
            </svg>
          </div>
        ) : (
          <div style={{ cursor: "pointer" }}>
            {/* ................search Icon .................. */}
            <svg
              onClick={() => {
                setSearchIcon(true);
                ref.current.focus();
              }}
              xmlns="http://www.w3.org/2000/svg"
              style={{ height: 30, width: 18, marginLeft: 15 }}
              fill="#51A985"
              viewBox="0 0 16 16"
            >
              {" "}
              <path
                fillRule="evenodd"
                d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
              />{" "}
            </svg>
          </div>
        )}

        <input
          ref={ref}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyUp={debounceHandler}
          onKeyDown={() => clearTimeout(typingTimer)}
          style={{ height: "30px" }}
          type="text"
          placeholder="Search contacts"
        />
        <div className={classes.dropdown}></div>
      </div>

      {/* ........................................................ */}

      {/* <SingleContacts a="A" />
      <SingleContacts a="B" />
      <SingleContacts a="C" />
      <SingleContacts a="A" />
      <SingleContacts a="B" />
      <SingleContacts a="C" />
      <SingleContacts a="A" />
      <SingleContacts a="B" />
      <SingleContacts a="C" />
      <SingleContacts a="A" />
      <SingleContacts a="B" />
      <SingleContacts a="C" /> */}
      {content}
    </div>
  );
}

export default Sidebar;
