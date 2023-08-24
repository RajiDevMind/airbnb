import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Navigate, useLocation } from "react-router-dom";
import PlacesPage from "./PlacesPage";
import ProfilePage from "./ProfilePage";
import AcctNav from "../AcctNav";

const AcctPage = () => {
  const [redirect, setRedirect] = useState(false);
  const { loading, user, setUser } = useContext(UserContext);

  const { pathname } = useLocation();
  let subpage = pathname.split("/")?.[2];
  if (subpage === undefined) {
    subpage = "profile";
  }

  if (loading) {
    return <p>Loading...</p>;
  }
  if (loading && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div>
      <AcctNav />
      {subpage === "profile" && <ProfilePage />}
      {subpage === "places" && <PlacesPage />}
    </div>
  );
};

export default AcctPage;
