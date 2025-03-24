import React from "react";
import "./SideNav.css";
import { LuPanelLeftClose } from "react-icons/lu";
import { LuPanelRightClose } from "react-icons/lu";
import { HiOutlinePencilAlt } from "react-icons/hi";
import profileImg from "../../assets/profile_img.jpg";
import { LuLogOut } from "react-icons/lu";
import History from "./Comp/History";

const SideNav = ({ isOpen, setIsOpen }) => {
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {!isOpen && (
        <button className="sidebar-toggle-btn" onClick={toggleSidebar}>
          <LuPanelRightClose />
        </button>
      )}
      
      <div className={`Sidebar ${isOpen ? "open" : "closed"}`}>
        <div className="sideNav-top">
          <header>
            <div className="close" onClick={toggleSidebar}>
              <LuPanelLeftClose />
            </div>
            <div className="new-chat">
              <HiOutlinePencilAlt />
            </div>
          </header>
          <div className="his">
            <History />
          </div>
        </div>
        <div className="profile">
          <div className="profile-img">
            <img src={profileImg} alt="" />
          </div>
          <div className="user-name">
            <p>Adela Parkson</p>
          </div>
          <div className="logout-btn">
            <LuLogOut />
          </div>
        </div>
      </div>
    </>
  );
};

export default SideNav;