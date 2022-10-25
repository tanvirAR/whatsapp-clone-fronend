import { useDispatch, useSelector } from "react-redux";
import editIcon from "../../../assets/img/edit-pen-icon.svg";
import { SwitchSidebarChange } from "../../../features/UI/UISlice";
// import { useAuth } from "../../../contexts/AuthContexts";
import { useEffect, useState } from "react";
import {
  setUserAvatar,
  updateUserName,
  updateUserStatus,
} from "../../../features/auth/authSlice";
import {
  useChangeUserNameMutation,
  useChangeUserStatusMutation,
  useGetUserAvatarMutation,
} from "../../../features/user/userApi";
import styles from "../../../styles/Inbox/PersonalizedSidebar.module.css";
import { getImages } from "../../../utils/fetchImage";

function Sidebar({ setSidebar }) {
  // for managing input field state
  const [imageFile, setImageFile] = useState("");
  //user info
  const { username, status, Id } = useSelector((state) => state.auth.user);

  //states for updating names & status
  const [nameEdit, setNameEdit] = useState(username);
  const [nameEditShow, setNameEditShow] = useState(false);
  const [statusEdit, setStatusEdit] = useState(status);
  const [statusEditShow, setStatusEditShow] = useState(false);

  const dispatch = useDispatch();

  const SidebarChangeHandler = () => {
    dispatch(SwitchSidebarChange(false));
  };

  const [getUserAvatar, { isLoading }] = useGetUserAvatarMutation();

  // this executed to get userAvatar from server when user changes his profile picture
  async function fetchData() {
    const url = `${process.env.REACT_APP_SERVER_URL}inbox/User/avatar/`;
    const [response, error] = await getImages(url);

    if (error) console.log(error);
    else {
      await dispatch(setUserAvatar(response));
    }
  }

  const userAvatar = useSelector((state) => state.auth.userAvatar);

  // setting new Avatar and uploading in server
  useEffect(() => {
    const fetch = async () => {
      if (imageFile !== "") {
        const formData = new FormData();
        formData.append("file", imageFile);
        await getUserAvatar(formData);
        await setImageFile("");
        fetchData();
      }
    };
    fetch();
  }, [getUserAvatar, imageFile]);

  // change userNAme
  const [
    changeUserName,
    {
      isLoading: isLoadingNameUpdate,
      // isSuccess: isSuccessName,
      data: updatedName,
    },
  ] = useChangeUserNameMutation();

  // updating name in UI
  useEffect(() => {
    if (updatedName !== undefined) {
      dispatch(updateUserName(updatedName?.name));
      setNameEditShow(false);
    }
  }, [updatedName, isLoadingNameUpdate, dispatch]);

  // fetching request for name Update
  const nameChangeHandler = async (e) => {
    if (nameEdit.length > 2 && e.key === "Enter" && !isLoadingNameUpdate) {
      await changeUserName({ name: nameEdit, Id: Id });
    }
  };

  // ............................. stautus update ............................
  const [
    changeUserStatus,
    {
      isLoading: isLoadingStatus,
      data: updatedStatus,
      isSuccess: isSuccessStatus,
    },
  ] = useChangeUserStatusMutation();

  useEffect(() => {
    if (updatedStatus !== undefined) {
      dispatch(updateUserStatus(updatedStatus?.status));
      setStatusEditShow(false);
    }
  }, [isSuccessStatus, updatedStatus, dispatch]);

  // fetching request for status Update
  const statusChangeHandler = async (e) => {
    if (statusEdit.length > 2 && e.key === "Enter" && !isLoadingStatus) {
      await changeUserStatus({ status: statusEdit, Id: Id });
    }
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.head}>
        <div className={styles.header}>
          <div className={styles.ProfileName}>
            <svg
              onClick={SidebarChangeHandler}
              xmlns="http://www.w3.org/2000/svg"
              // width="15"
              // height="16"
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
      <div className={styles.IMAGE}>
        <div
          onClick={() => console.log("Clicked")}
          className={styles.IMAGECONTAINER}
        >
          {" "}
          <label htmlFor="file">
            <img
              className={styles.profilePicture}
              src={
                userAvatar
                  ? userAvatar
                  : require("../../../assets/img/blank-profile-picture-973460.png")
              }
              alt="profile"
            />

            <div className={styles.profileInfo}>
              {
                <img
                  className={styles.cameraLogo}
                  src={require("../../../assets/img/camera.png")}
                  alt="camera"
                />
              }
              {!localStorage.getItem("avatarURL") && (
                <div className={styles.text}>
                  <p className={styles.text1}>ADD PROFILE</p>
                  <p className={styles.text2}>PHOTO</p>
                </div>
              )}
              <form>
                <input
                  disabled={isLoading}
                  id="file"
                  accept="image/jpg, image/png, image/jpeg"
                  onChange={(e) => setImageFile(e.target.files[0])}
                  style={{ display: "none" }}
                  type="file"
                ></input>
              </form>
            </div>
          </label>
        </div>
      </div>
      <p className={styles.yourName}>Your name</p>
      <div className={styles.userName}>
        {!nameEditShow ? (
          <p>{username}</p>
        ) : (
          <input
            onKeyDown={nameChangeHandler}
            onChange={(e) => setNameEdit(e.target.value)}
            value={nameEdit}
            className={styles.nameInput}
            type="text"
          />
        )}
        <img
          onClick={() => setNameEditShow((prevState) => !prevState)}
          className={styles.editIcon}
          src={editIcon}
          alt="edit"
        />
      </div>

      <p className={styles.info}>
        This is not your username or pin. This name will be visible to your
        WhatsApps contacts.
      </p>

      <p className={styles.about}>About</p>
      <div className={styles.userName}>
        {!statusEditShow ? (
          <p className={styles.status}>{status}</p>
        ) : (
          <input
            onKeyDown={statusChangeHandler}
            onChange={(e) => setStatusEdit(e.target.value)}
            value={statusEdit}
            className={`${styles.nameInput} ${styles.status}`}
            type="text"
          />
        )}

        <img
          onClick={() => setStatusEditShow((prevState) => !prevState)}
          className={styles.editIcon}
          src={editIcon}
          alt="edit"
        />
      </div>
    </div>
  );
}

export default Sidebar;
