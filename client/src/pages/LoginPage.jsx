import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div className="mt-4 grow items-center justify-around">
      <div className="mt-12">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className="max-w-md mx-auto">
          <input type="email" placeholder="yourmail.com" />
          <input type="password" placeholder="password" />
          <button className="primary">Login</button>
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
