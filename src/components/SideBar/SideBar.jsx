import "./SideBar.css";
import avatarPic from "../../images/Ellipse 18.png";

import { useContext } from "react";
import { CurrentUserContext } from "../../Context/CurrentUserContext";

function SideBar({ editProfile, logOut }) {
  const { currentUser, setCurrentUser, setIsLoggedIn } =
    useContext(CurrentUserContext);
  return (
    <div className="sidebar">
      <div className="sidebar__display-info">
        <img
          className="sidebar__display-info_avatar"
          src={currentUser.avatar}
          alt={"Pic"}
        />
        <p className="sidebar__display-info_username"> {currentUser.name}</p>
      </div>
      {/* <Link to={"/profile/change-profile-data"}> dont need to add a new route */}
      <button
        onClick={editProfile}
        type="button"
        className="sidebar__change-profile-data"
      >
        Change profile data
      </button>
      <button onClick={logOut} type="button" className="sidebar__logout">
        Log out
      </button>
    </div>
  );
}

export default SideBar;
