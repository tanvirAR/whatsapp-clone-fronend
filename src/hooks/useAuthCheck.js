import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userLoggedIn } from "../features/auth/authSlice";

export default function useAuthCheck() {
  const dispatch = useDispatch();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    // send jwt to check logged in or not and  see if it's valid
    async function checkLogin() {
      axios
        .get(process.env.REACT_APP_SERVER_URL, {
          headers: {
            Accept: "application/json",
            // "Content-Type": "application/json",
          },
          withCredentials: true,
        })
        .then((res) => {
          // console.log(res.data);
          dispatch(userLoggedIn(res.data));
        })

        .catch((err) => {
          console.log(err);
        });
    }

    checkLogin();
    setAuthChecked(true);
  }, [dispatch, setAuthChecked]);

  return authChecked;
}
