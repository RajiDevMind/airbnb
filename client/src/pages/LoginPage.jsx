import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(UserContext);

  const handleLoginForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/login",
        { email, password },
        { withCredentials: true }
      );
      if (response) {
        setUser(response.data);
        alert("Login Successful!");
        setRedirect(true);
      } else {
        alert("loggedin failed!");
      }
    } catch (e) {
      alert(e, "Login failed!");
    }
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="mt-4 grow items-center justify-around">
      <div className="mt-12">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className="max-w-md mx-auto" onSubmit={handleLoginForm}>
          <input
            type="email"
            placeholder="yourmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="primary">
            Login
          </button>
          <div className="text-center py-2 text-gray-500">
            Dont't have an account yet?{" "}
            <Link
              className="text-red-600 border rounded-md px-1 underline"
              to={"/register"}
            >
              Sign-Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
