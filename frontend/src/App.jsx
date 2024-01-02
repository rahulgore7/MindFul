// Import necessary components
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import { useSelector } from "react-redux";
import { checkAuthStatus } from "./actions/userActions";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Profile from "./components/Profile";
import AddUser from "./components/AddUser";

const App = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  useEffect(() => {
    // Dispatch an action to check if the user is authenticated
    dispatch(checkAuthStatus());
  }, [dispatch]);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/addUser" element={<AddUser />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
            <Route path="/" element={<Dashboard />} />
          </Route>

          

        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
