import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import defaultAvatar from "../../../assets/img/blank-profile-picture-973460.png";
import messageIcon from "../../../assets/img/chat.svg";
import statusIcon from "../../../assets/img/circle-notch-solid.svg";
import optionsIcon from "../../../assets/img/more.svg";
import { setUserAvatar } from "../../../features/auth/authSlice";
import {
  SidebarOptionsPopUps,
  SwitchSidebarChange,
  ViewContacts,
} from "../../../features/UI/UISlice";
import classes from "../../../styles/Inbox/Inbox.module.css";
import styles from "../../../styles/Inbox/SidebarHeader.module.css";
import { getImages } from "../../../utils/fetchImage";

function SidebarHeader({ setSidebar, setPopup }) {
  const dispatch = useDispatch();
  // swtch between sidebar & personalized sidebar
  const sidebarChangeHandler = () => {
    dispatch(SwitchSidebarChange(true));
  };

  const OptionsPopUPHandler = async () => {
    await dispatch(SidebarOptionsPopUps());
  };

  // fetching user avatar------------------- start
  const userAvatar = useSelector((state) => state.auth.userAvatar);

  useEffect(() => {
    if (userAvatar === undefined) {
      fetchData();
    }
  }, [userAvatar]);

  async function fetchData() {
    const url = `${process.env.REACT_APP_SERVER_URL}inbox/User/avatar/`;
    const [response, error] = await getImages(url);

    if (error) console.log(error);
    else {
      dispatch(setUserAvatar(response));
    }
  }
  // fetching user avatar------------------- end

  // ................contactsSidebar trigger
  const contactsSidebarHandler = () => {
    dispatch(ViewContacts(true));
  };

  return (
    <div className={classes.header}>
      <div className={classes.avatar}>
        <div onClick={sidebarChangeHandler}>
          <img src={userAvatar ? userAvatar : defaultAvatar} alt="" />
        </div>
      </div>
      <div className={classes["chat-header-right"]}>
        <img
          draggable="false"
          className={styles.status}
          src={statusIcon}
          alt=""
        />
        <img
          onClick={contactsSidebarHandler}
          draggable="false"
          className={styles.messageIcon}
          src={messageIcon}
          alt=""
        />
        <button
          onClick={OptionsPopUPHandler}
          name="bttn"
          style={{
            border: "none",
            boxShadow: "none",
            outline: "none",
            background: "none",
          }}
          // onClick={optionsPopUpHandler}
        >
          <img
            // onClick={optionsPopUpHandler}
            htmlFor="bttn"
            draggable="false"
            className={styles.optionsIcon}
            src={optionsIcon}
            alt=""
          />
        </button>
      </div>
    </div>
  );
}

export default SidebarHeader;
