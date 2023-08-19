import "./App.css";
import { Route, Routes } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import Layout from "./Layout";
import RegisterPage from "./pages/RegisterPage";
import axios from "axios";
import { UserContextProvider } from "./UserContext";
import AcctPage from "./pages/AcctPage";

axios.defaults.baseURL = "http://localhost:4000";
// axios.defaults.baseURL = "http://127.0.0.1:4000";
// axios.defaults.withCredentials = true;

const App = () => {
  return (
    <UserContextProvider>
      <Routes>
        <Route path={"/"} element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path={"/login"} element={<LoginPage />} />
          <Route path={"/register"} element={<RegisterPage />} />
          <Route path={"/account/:subpage?"} element={<AcctPage />} />
          <Route path={"/account/:subpage/:action"} element={<AcctPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
};

export default App;
