import React, { useEffect, useState } from "react";
import "./userDetails.scss";
import Nav from "../../components/Nav/Nav";
import Sidebar from "../../components/Sidebar/Sidebar";
import left from "../../assets/icon/leftArr.png";
import Details from "./Details/Details";
import { ActiveUserDetails, axiosBase } from "../../components/UserTable/Api";
import { Link } from "react-router-dom";
import MobileSidebar from "../../components/Sidebar/MobileSidebar";

const UserDetails = () => {
  const [menuActive, setMenuActive] = useState(0);
  const [usersDetails, setUsersDetails] = useState<ActiveUserDetails>();

  const data = [
    "General Details",
    "Documents",
    "Bank Details",
    "Loans",
    "Savings",
    "App and System",
  ];

  async function getUser(id: string) {
    try {
      const response = await axiosBase.get(`/users/${id}`);
      localStorage.setItem('usersId', JSON.stringify(response.data));
    } catch (error) {
      console.error(error);
    }
  }
const activeUserId = window.location.pathname.split("/")[2];

  useEffect(() => {
    getUser(activeUserId);
  }, []);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('usersId')!);
    if (items) {
     setUsersDetails(items);
    }
  }, []);

  return (
    <div>
      <Nav />
      {usersDetails?.userName && (
        <section className="userDetails">
          <div className="userDetails-sidebar">
            <Sidebar />
          </div>
          <div className='userDetails-sidebar-mobile'>
          <MobileSidebar />
        </div>
          <main>
            <Link to='/dashboard'><section className="userDetails-back">
              <img src={left} alt="Left arrow" />
              <span>Back to Users</span>
            </section></Link>

            <section className="userDetails-heading">
              <h2>User Details</h2>
              <div className="userDetails-heading-btn">
                <button type="submit">BLACKLIST USER</button>
                <button type="submit">ACTIVATE USER</button>
              </div>
            </section>

            <section className="userDetails-display">
              <div className="userDetails-display-box">
                <div className="userDetails-display-box-name">
                  <div className="userDetails-display-box-name-img">
                    <img
                      src={usersDetails.profile.avatar}
                      alt="User profile picture"
                    ></img>
                  </div>
                  <div>
                    <p>{usersDetails.userName}</p>
                    <p>{usersDetails.accountNumber}</p>
                  </div>
                </div>
                <hr />
                <div className="userDetails-display-box-tier">
                  <p>User's Tier</p>
                  <div>
                    <span>&#9733;</span>
                    <span>&#10025;</span>
                    <span>&#10025;</span>
                  </div>
                </div>
                <hr />
                <div className="userDetails-display-box-balance">
                  <p>???{usersDetails.accountBalance}</p>
                  <p>9912345678/Providus Bank</p>
                </div>
              </div>

              <div className="userDetails-display-menu">
                {data.map((item, index) => (
                  <span
                    className={` ${menuActive === index && "activeUserMenu"} `}
                    key={index}
                    onClick={() => setMenuActive(index)}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </section>

            <section>
              <Details userDetailsBox={usersDetails} />
            </section>
          </main>
        </section>
      )}
    </div>
  );
};

export default UserDetails;
