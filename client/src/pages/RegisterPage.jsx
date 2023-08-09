import { Link } from "react-router-dom";

const RegisterPage = () => {
  return (
    <div className="mt-4 grow items-center justify-around">
      <div className="mt-12">
        <h1 className="text-4xl text-center mb-4">Register</h1>
        <form className="max-w-md mx-auto">
          <input type="text" placeholder="DevMind Raji" />
          <input type="email" placeholder="yourmail.com" />
          <input type="password" placeholder="password" />
          <button className="primary">Register</button>
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
  );
};

export default RegisterPage;
