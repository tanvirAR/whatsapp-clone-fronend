import React, { useEffect } from "react";
import {  useNavigate } from "react-router-dom";

import { useLogoutMutation } from "../../../features/auth/authApi";
import styles from "../../../styles/Inbox/Sidebar.module.css";

export default function OptionsPopUp({ setPopup }) {
  const [logout, {data}] = useLogoutMutation();
  const navigate = useNavigate()

  useEffect(() => {
    console.log(data)
    if(data!==undefined){
      
navigate('/');
      window.location.reload();
    }
  },[data, ])

  const logoutHandler = async () => {
    await logout();
    
  };

  return (
    <div className={styles.optionsBar}>
      <p onClick={logoutHandler} className={styles.p2}>
        Logout
      </p>
    </div>
  );
}
