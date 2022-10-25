import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function PrivateRoute({ children }) {
  const authenticated = useAuth();

  return authenticated === true ? children : <Navigate to="/" />;
  // if (authenticated === true) {
  //   return { children };
  // } else return <Navigate to="/" />;
}
