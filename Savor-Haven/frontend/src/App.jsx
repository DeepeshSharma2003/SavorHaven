import { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import Cart from "./screens/Cart";
import toast, { Toaster } from "react-hot-toast";
import Success from "./screens/Success";
import Cancel from "./screens/Cancel";
import MyOrder from "./screens/MyOrder";
import Profile from "./screens/Profile";
import Admin from "./screens/Admin";
import AdminPrivateRoute from "./AdminPrivateRoute";
import LoginPrivateRoute from "./LoginPrivateRoute";
import LoginViaOTP from "./screens/loginViaOTP.jsx";
import Error from "./screens/Error.jsx";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />
          <Route path="/loginOtp" element={<LoginViaOTP />} />
          <Route path="/createuser" element={<Signup />} />

          <Route element={<LoginPrivateRoute />}>
            <Route path="/myorder" element={<MyOrder />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/success" element={<Success />} />
            <Route path="/cancel" element={<Cancel />} />
            <Route path="/cart" element={<Cart />} />
          </Route>

          <Route element={<AdminPrivateRoute />}>
            <Route path="/admin" element={<Admin />} />
          </Route>

          <Route path="*" element={<Error />} />
        </Routes>
        <Toaster />
      </Router>
    </>
  );
}

export default App;
