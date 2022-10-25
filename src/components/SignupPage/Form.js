// import "../../styles/SignupPage/Global.css";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../features/auth/authApi";
import classes from "../../styles/SignupPage/SignupPage.module.css";
import GenderDetails from "./GenderDetailes";

function Form() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("");
  // error for specific field
  const [genderError, setGenderError] = useState(false);
  const [passError, setPassError] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [mobileError, setMobileError] = useState("");

  // gender change handler
  const genderStateHandler = (genderValue) => {
    setGender(genderValue);
    setGenderError(false);
  };

  const [register, { isLoading, error: responseError, data }] =
    useRegisterMutation();

  const navigate = useNavigate();

  useEffect(() => {
    let errors = responseError?.data?.errors;
    if (errors) {
      Object.keys(errors).forEach((fieldName) => {
        let message = errors[fieldName]["msg"];
        console.log(fieldName);
        console.log(message);
        if (fieldName === "password") {
          setPasswordError(message);
        } else if (fieldName === "email") {
          setEmailError(message);
        } else if (fieldName === "mobile") {
          setMobileError(message);
        } else if (fieldName === "firstName") {
          setFirstNameError(message);
        } else if (fieldName === "lastName") {
          setLastNameError(message);
        }
      });
    }
    if (data?.message === "User was added successfully!") {
      navigate("/");
    }
  }, [data, responseError, navigate]);

  console.log(lastNameError);
  //  submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (gender === "") {
      setGenderError(true);
    } else if (password !== confirmPassword) {
      setPassError(true);
    } else {
      const json = JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        mobile: mobile,
        password: password,
        gender: gender,
      });

      register(json);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className={classes["user-details"]}>
          <div className={classes["input-box"]}>
            <span className={classes[".details"]}>First Name</span>
            <input
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
                setFirstNameError("");
              }}
              type="text"
              placeholder=""
              name="firstName"
              required
            />
            {firstNameError !== "" && <p>{firstNameError}</p>}
          </div>
          <div className={classes["input-box"]}>
            <span className={classes[".details"]}>Last Name</span>
            <input
              type="text"
              onChange={(e) => {
                setLastName(e.target.value);
                setLastNameError("");
              }}
              value={lastName}
              name="lastName"
              placeholder=""
              required
            />
            {lastNameError !== "" && <p>{lastNameError}</p>}
          </div>

          <div className={classes["input-box"]}>
            <span className={classes[".details"]}> Email</span>
            <input
              type="text"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError("");
              }}
              name="email"
              placeholder=""
              required
            />
            {emailError !== "" && <p>{emailError}</p>}
          </div>
          <div className={classes["input-box"]}>
            <span className={classes[".details"]}>Phone Number</span>
            <input
              value={mobile}
              type="text"
              onChange={(e) => {
                setMobile(e.target.value);
                setMobileError("");
              }}
              placeholder=""
              name="number"
              required
            />
            {mobileError !== "" && <p>{mobileError}</p>}
          </div>
          <div className={classes["input-box"]}>
            <span className={classes[".details"]}>Password</span>
            <input
              autoComplete="off"
              type="text"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPassError(false);
                setPasswordError("");
              }}
              placeholder=""
              name="password"
              required
            />
            {passwordError !== "" && <p>{passwordError}</p>}
          </div>
          <div className={classes["input-box"]}>
            <span className={classes[".details"]}>Confirm Password</span>
            <input
              autoComplete="off"
              value={confirmPassword}
              type="text"
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setPassError(false);
                setPasswordError("");
              }}
              placeholder=""
              required
            />
            {passwordError !== "" && <p>{passwordError}</p>}
          </div>
        </div>
        <GenderDetails
          genderError={genderError}
          genderStateHandler={genderStateHandler}
        />

        <div className={classes["button"]}>
          <input
            onClick={() => (gender === "" ? setGenderError(true) : null)}
            type="submit"
            disabled={
              isLoading ||
              emailError !== "" ||
              mobileError !== "" ||
              lastNameError !== "" ||
              firstNameError !== "" ||
              passwordError !== ""
            }
            value="Register"
          />
        </div>
        <>
          {passError && (
            <div className="alert alert-danger" id={classes.alert} role="alert">
              Password do not match!
            </div>
          )}
        </>

        <div className={classes.p}>
          <Link to={"/"}>
            <span>Already have an account?</span>
          </Link>
        </div>
      </form>
    </>
  );
}

export default Form;
