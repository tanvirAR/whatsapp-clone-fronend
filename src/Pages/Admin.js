import React from "react";
import Container from "../components/AdminPage/Container";
import classes from "../styles/Admin/Admin.module.css";

export default function Admin() {
  return (
    <div className={classes.main}>
      <div className={classes["manageUser-container"]}>
        <div id={classes.title}>
          <h2>Manage Users</h2>
        </div>
        <Container />
      </div>
    </div>
  );
}
