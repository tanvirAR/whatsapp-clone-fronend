import React from "react";
import classes from "../../styles/Admin/Container.module.css";
import SingleUsers from "./SingleUsers";

function Container() {
  return (
    <>
      <div
        className={`${classes["new-message-container"]} ${classes["new-user"]}`}
      ></div>
      <div id={classes["users-table"]}>
        <table>
          <thead>
            <tr className={classes.category}>
              <th>Name</th>
              <th>Email</th>
              <th>Manage</th>
            </tr>
          </thead>
          <tbody id={classes["users-table"]}>
            <SingleUsers />
            <SingleUsers />
            <SingleUsers />
            <SingleUsers />
            <SingleUsers />
            <SingleUsers />
            <SingleUsers />
            <SingleUsers />
            <SingleUsers />
            <SingleUsers />
            <SingleUsers />
            <SingleUsers />
            <SingleUsers />
            <SingleUsers />
            <SingleUsers />
            <SingleUsers />
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Container;

// import React from "react";
// import SingleUsers from "./SingleUsers";
// import classes from "../../styles/Admin/Admin.module.css"

// function Container() {
//   return (
//     <>
//       {" "}
//       className={`${classes["new-message-container"]} ${classes["new-user"]}`}
//       <div className="new-message-container new-user"></div>
//       <div id="users-table">
//         <table>
//           <thead>
//             <tr className="category">
//               <th>Name</th>
//               <th>Email</th>
//               <th>Manage</th>
//             </tr>
//           </thead>
//           <tbody id="users-table">
//             <SingleUsers />
//           </tbody>
//         </table>
//       </div>
//     </>
//   );
// }

// export default Container;
