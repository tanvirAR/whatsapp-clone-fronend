import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import useAuthCheck from "./hooks/useAuthCheck";

import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import Admin from "./Pages/Admin";
import Inbox from "./Pages/Inbox";
import SignInPage from "./Pages/SignIn";
import SignupPage from "./Pages/Signup";

export default function App() {
 // ok
  const authChecked = useAuthCheck();
  return !authChecked ? (
    <div>Checking authentication....</div>
  ) : (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <SignInPage />
            </PublicRoute>
          }
        />

        <Route
          path="/signup"
          element={
            // <PublicRoute>
            <SignupPage />
            // </PublicRoute>
          }
        />
        <Route path="/ibox" element={<Inbox />} />

        <Route
          path="/inbox"
          element={
            <PrivateRoute>
              <Inbox />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin"
          element={
            // <PrivateRoute>
            <Admin />
            // </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}
