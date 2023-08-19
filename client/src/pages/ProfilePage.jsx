import { useContext } from "react";
import { UserContext } from "../UserContext";

const ProfilePage = () => {
  const { user, setUser } = useContext(UserContext);

  async function logout() {
    await axios.post("/logout");
    setRedirect("/");
    setUser(null);
  }

  return (
    <div className="text-center max-w-lg mx-auto">
      Logged In as {user?.name} ({user?.email})<br />
      <button onClick={logout} className="primary max-w-sm mt-2">
        Logout
      </button>
    </div>
  );
};

export default ProfilePage;
