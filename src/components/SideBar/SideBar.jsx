import "./SideBar.css";
import avatarPic from "../../images/Ellipse 18.png";

function SideBar({}) {
  return (
    <div className="sidebar">
      <img className="sidebar__avatar" src={avatarPic} alt="Avatar Pic" />
      <p className="sidebar__username"> User Name</p>
    </div>
  );
}

export default SideBar;
