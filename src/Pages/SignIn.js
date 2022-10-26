/* eslint-disable no-unused-expressions */
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../features/auth/authApi";
import classes from "../styles/SignInPage/Signin.module.css";

export default function Login() {

useEffect(()=> {
document.title = 'WhatsApp-AR - SignIn'
},[])

  // const a = useSelector((state) => state.auth);
  // console.log(a?.user);

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [emptyUserNameError, setEmptyUserNameError] = useState(false);
  const [emptyPasswordError, setEmptyPasswordError] = useState(false);
  const [error, setError] = useState("");

  let navigate = useNavigate();

  const [login, { data, isLoading, error: responseError }] = useLoginMutation();

  useEffect(() => {
    console.log(data)
    if (data?.data.errors ===true) {
      // navigate("/inbox");
      console.log('sssssssssssssssssssssssssssssssssssssssssssssss');
      setError(data.data.errors.common.msg);
//       console.log("failed");
    } else if (!data?.data.errors && data !== undefined) {
      console.log('sssssssssssssssssssssssssssssssssssssssssssssss');
//       console.log(data);
//       navigate("/inbox");
    }
  }, [data, responseError, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (userName.length === 0 && password.length === 0) {
      setEmptyUserNameError(true);
      setEmptyPasswordError(true);
    } else if (password.length === 0) {
      setEmptyPasswordError(true);
    } else if (userName.length === 0) {
      setEmptyUserNameError(true);
    } else {
      login({ username: userName, password: password });
    }
  };

  return (
    <div className={classes.main}>
      <div className={classes.center}>
        <h1>Login</h1>
        <form noValidate onSubmit={handleSubmit} method="post">
          <div className={classes["txt_field"]}>
            <input
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
                setEmptyUserNameError(false);
              }}
              autoComplete="on"
              type="text"
              required
            />

            <span></span>
            {emptyUserNameError === true && <p>Username name is required!</p>}

            <label>Username</label>
          </div>
          <div className={classes["txt_field"]}>
            <input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setEmptyPasswordError(false);
              }}
              type="password"
              autoComplete="off"
              required
            />
            {/* {setEmptyPasswordError === true && <p>Password is required!</p>} */}
            <span></span>
            {emptyPasswordError === true && <p>Password is required!</p>}
            {true && (
              <p
                style={
                  error === "" ? { display: "none" } : { display: "block" }
                }
                className={classes.error}
              >
                {error}
              </p>
            )}

            <label>Password</label>
          </div>
          <div className={classes.pass}>Forgot Password?</div>
          <input
            type="submit"
            // onClick={() => console.log("button was clicked")}
            disabled={isLoading}
            value="Login"
          />
          <div className={classes["signup_link"]}>
            Not a member? <Link to={"/signup"}>Signup</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
