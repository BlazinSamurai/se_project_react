import "./SideBar.css";
import avatarPic from "../../images/Ellipse 18.png";

function SideBar({ editProfile }) {
  return (
    <div className="sidebar">
      <div className="sidebar__display-info">
        <img
          className="sidebar__display-info_avatar"
          src={avatarPic}
          alt="Avatar Pic"
        />
        <p className="sidebar__display-info_username"> Terrence Tegegne</p>
      </div>
      <button
        onClick={editProfile}
        type="button"
        className="sidebar__change-profile-data"
      >
        Change profile data
      </button>
      <button type="button" className="sidebar__logout">
        Log out
      </button>
    </div>
  );
}

export default SideBar;
