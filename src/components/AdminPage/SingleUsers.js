import React from "react";
import classes from "../../styles/Admin/Container.module.css";

function SingleUsers() {
  return (
    <tr>
      <td className={classes.name}>
        <img
          src={require("../../assets/img/298524338_155607687066266_505303576458642705_n.jpg")}
          alt="user-pic"
        />
        <span>User 1</span>
      </td>
      <td>email@email.com</td>
      <td className={classes.manage}>
        <img
          src={require("../../assets/img/trash.png")}
          alt="Delete"
          className={classes.sepia}
        />
      </td>
    </tr>
  );
}

export default SingleUsers;
