import { useSelector } from "react-redux";

export default function useAuth() {
  const auth = useSelector((state) => state.auth);
  //  console.log(a?.user);
  let authenticated;

  if (auth?.user !== undefined) {
    authenticated = true;
  } else {
    authenticated = false;
  }

  return authenticated;
}
