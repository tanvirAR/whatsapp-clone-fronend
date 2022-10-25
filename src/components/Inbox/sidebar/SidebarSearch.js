/* eslint-disable react/jsx-no-duplicate-props */
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchPeopleMutation } from "../../../features/searchPeoples/searchPeoplesApi";
import { searchedPeopleResult } from "../../../features/searchPeoples/searchPeopleSlice";
import {
  ChangeLoadingStateSearchingPeople,
  ChangeSearchText,
  ViewSearchedResult,
} from "../../../features/UI/UISlice";
import classes from "../../../styles/Inbox/Inbox.module.css";

function SidebarSearch({ setShowSidebarSearchedResult }) {
  const [searchIcon, setSearchIcon] = useState(true);
  // const [searchInput, setSearchInput] = useState("");
  const searchInput = useSelector((state) => state.UI.searchTextToFindPeople);
  const [placeHolder, setPlaceHolder] = useState(true);
  const dispatch = useDispatch();
  const [searchPeople, { data: searchedResponse, isLoading }] =
    useSearchPeopleMutation();

  // dispatch the fetched result in searchPeopleresult state
  useEffect(() => {
    if (isLoading) {
      dispatch(ChangeLoadingStateSearchingPeople(true));
    }
    if (searchedResponse !== undefined && searchedResponse?.length > 0) {
      dispatch(ChangeLoadingStateSearchingPeople(false))
      dispatch(searchedPeopleResult(searchedResponse));
    }
    if (searchedResponse === undefined) {
    dispatch(ChangeLoadingStateSearchingPeople(false));
      dispatch(searchedPeopleResult(undefined));
    }
  }, [searchedResponse, dispatch, isLoading]);

  const ref = useRef(null);

  // debounce handler for searching people
  const doneTypingInterval = 500;
  let typingTimer;
  const debounceHandler = () => {
    clearTimeout(typingTimer);

    if (searchInput) {
      typingTimer = setTimeout(searchUser, doneTypingInterval);
    }
  };

  // use dispatch to hide the searched result when search input  character is smaller than 3
  useEffect(() => {
    if (searchInput.length < 3) {
      dispatch(ViewSearchedResult(false));
      dispatch(searchedPeopleResult(undefined));
    }
  }, [searchInput, dispatch]);

  let searchUser = async () => {
    console.log("Clicked");

    if (searchInput.length >= 3) {
      dispatch(ViewSearchedResult(true));
      searchPeople({ user: searchInput });
      // searchConversations(searchInput);
    }
  };

  return (
    <div className={classes["sidebar-search"]}>
      <div className={classes["sidebar-search-container"]}>
        {searchIcon ? (
          <div
            style={{ cursor: "pointer" }}
            onClick={() => {
              ref.current.focus();
            }}
          >
            <svg
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
          <div
            onClick={() => setSearchIcon(true)}
            style={{ cursor: "pointer" }}
          >
            <svg
              onClick={() => {
                dispatch(ChangeSearchText(""));
                setPlaceHolder(true);
              }}
              xmlns="http://www.w3.org/2000/svg"
              // width="15"
              // height="16"
              style={{ height: 30, width: 18, marginLeft: 15 }}
              fill="#51A985"
              // class="bi bi-arrow-left"
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
          value={searchInput}
          onChange={async (e) => {
            await dispatch(ChangeSearchText(e.target.value));
          }}
          onFocus={() => {
            setSearchIcon(false);
            setPlaceHolder(false);
          }}
          onBlur={() => {
            if (searchInput.length === 0) {
              setSearchIcon(true);
              setPlaceHolder(true);
            }
          }}
          onKeyUp={debounceHandler}
          onKeyDown={() => clearTimeout(typingTimer)}
          type="text"
          placeholder={
            placeHolder
              ? "Search or start new chat"
              : "Search by name, email or phone number"
          }
          // onBlur={() => setPlaceHolder(true)}
        />
        <div className={classes.dropdown}>
          {/* <div className={classes["dropdown-row"]}>Devil</div> */}
        </div>
      </div>
    </div>
  );
}

export default SidebarSearch;
