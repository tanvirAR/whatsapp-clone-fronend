import "../../styles/SignupPage/GenderDetails.css";
import classes from "../../styles/SignupPage/SignupPage.module.css";

function GenderDetails({ genderStateHandler, genderError }) {
  // console.log(genderError);
  return (
    <div className="gender-details">
      <input type="radio" name="gender" id="dot-1" />
      <input type="radio" name="gender" id="dot-2" />
      <input type="radio" name="gender" id="dot-3" />
      <span className="gender-titile">Gender</span>
      <div className="category">
        <label onClick={() => genderStateHandler("male")} htmlFor={"dot-1"}>
          <span className="dot one"></span>
          <span className="gender">Male</span>
        </label>
        <label onClick={() => genderStateHandler("female")} htmlFor={"dot-2"}>
          <span className="dot two"></span>
          <span className="gender">Female</span>
        </label>
        <label onClick={() => genderStateHandler("other")} htmlFor={"dot-3"}>
          <span className="dot three"></span>
          <span className="gender">Prefer not to say</span>
        </label>
      </div>
      {genderError && (
        <p className={classes["gendervalue"]}>Gender is required!</p>
      )}
    </div>
  );
}

export default GenderDetails;

// <div classNameName={styles["gender-details"]}>
//   <input type="radio" name="gender" id={styles["dot-1"]} />
//   <input type="radio" name="gender" id={styles["dot-2"]} />
//   <input type="radio" name="gender" id={styles["dot-3"]} />
//   <span classNameName={styles["gender-titile"]}>Gender</span>
//   <div classNameName={styles.category}>
//     <label htmlFor="dot-1">
//       <span classNameName={`${styles.dot} ${styles.one}`}></span>
//       <span classNameName="gender">Male</span>
//     </label>
//     <label htmlFor="dot-2">
//       <span classNameName={`${styles.dot} ${styles.two}`}></span>
//       <span classNameName="gender">Female</span>
//     </label>
//     <label htmlFor="dot-3">
//       <span classNameName={`${styles.dot} ${styles.three}`}></span>
//       <span classNameName={styles.gender}>Prefer not to say</span>
//     </label>
//   </div>
// </div>;
