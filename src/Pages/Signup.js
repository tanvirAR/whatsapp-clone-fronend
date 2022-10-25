import { useEffect } from "react";
import Form from "../components/SignupPage/Form";

// import "../../styles/SignupPage/Global.css";
import classes from "../styles/SignupPage/SignupPage.module.css";

function SignupPage() {
  useEffect(() => {
    document.title = "WatsApp-AR - SignUp";
  }, []);

  return (
    <div className={classes.main}>
      <div className={classes.container}>
        <h1 className={classes.title}>Registration</h1>
        <Form />
      </div>
    </div>
  );
}

export default SignupPage;
