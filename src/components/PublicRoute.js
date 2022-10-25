import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
// import { useAuth } from "../contextss/AuthContexts";

export default function PublicRoute({ children }) {
  const auth = useAuth();
  //   let isLoggedIn = useAuth();

  return !auth ? children : <Navigate to="/inbox" />;
}
