import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegisterForm = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/register", {
        name,
        email,
        password,
      });
      alert("Registration Successful, Now you can login!!!");
    } catch (e) {
      alert("Registration failed, try again!");
    }
  };

  return (
    <>
      <div className="mt-4 grow items-center justify-around">
        <div className="mt-12">
          <h1 className="text-4xl text-center mb-4">Register</h1>
          <form className="max-w-md mx-auto" onSubmit={handleRegisterForm}>
            <input
              type="text"
              placeholder="DevMind Raji"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
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
              Register
            </button>
            <div className="text-center py-2 text-gray-500">
              Already a member?{" "}
              <Link
                className="text-red-600 border rounded-md px-1 underline"
                to={"/login"}
              >
                Sign-In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
