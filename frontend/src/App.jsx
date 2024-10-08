import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import Login from "./pages/Login.jsx";
import Layout from "./Layout.jsx";
import Register from "./pages/Register.jsx";
import axios from "axios";
import { UserContextProvider } from "./UserContext.jsx";
import Account from "./pages/Account.jsx";
axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          {/* <Route path="/account" element={<Account />} /> */}
          <Route path="/account/:subpage?" element={<Account />} />
          {/* <Route path="/account/places" element={<Account />} /> */}
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
