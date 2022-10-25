import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContexts";

export default function RedirectLoggedInUser({ children }) {
  const { auth } = useAuth();
  // console.log(auth);
  return !auth ? children : <Navigate to="/inbox" />;
}
