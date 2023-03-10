import React, { useState } from "react";
import "./userTable.scss";
import { axiosBase } from "./Api";
import { useEffect } from "react";
import ViewUser from "./ViewUser";
import FIlterTable from "./FIlterTable";
import Pagination from "./Pagination";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const UserTable = () => {
  const [usersStored, setUsersStored] = useState([]);
  const [displayUsers, setDisplayUsers] = useState([]);
  const [activeDropDown, setActiveDropDown] = useState<any>("");
  const [isLoading, setIsLoading] = useState(false);

  type User = {
    orgName: string;
    createdAt: string;
    userName: string;
    email: string;
    phoneNumber: string;
    id?: string;
  };

  async function getUser() {
    setIsLoading(true);
    try {
      const response = await axiosBase.get("/users");
      localStorage.setItem("users", JSON.stringify(response.data));
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("users")!);
    if (items) {
      setUsersStored(items);
    }
  }, []);

  const headingData = [
    "ORGANIZATION",
    "USERNAME",
    "EMAIL",
    "PHONE NUMBER",
    "DATE JOINED",
    "STATUS",
  ];

  const customDate = (ele: string) => {
    const date = new Date(ele).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    const time = new Date(ele).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return date + " " + time;
  };

  return (
    <div onClick={() => setActiveDropDown("")}>
      <table className="userTable">
        <thead className="userTable-head">
          <tr>
            {headingData.map((item, index) => (
              <th key={index}>
                {item}
                <FIlterTable current={index} />
              </th>
            ))}
          </tr>
        </thead>
        {isLoading ? (
          <Skeleton
            count={10}
            width="500%"
            height={40}
            highlightColor="white"
          />
        ) : (
          <tbody className="userTable-body">
            {displayUsers.map((item: User, index: number) => (
              <tr key={index}>
                <td>{item.orgName} </td>
                <td>{item.userName}</td>
                <td>{item.email}</td>
                <td>{item.phoneNumber}</td>
                <td>{customDate(item.createdAt)}</td>
                {/* <td>
              <p className="activeOpt">Active</p>
            </td> */}
                <td>
                  <p
                    className={`${
                      index % 2 == 0
                        ? "activeOpt"
                        : index % 3 === 0
                        ? "pending"
                        : index % 5 === 0
                        ? "blacklist"
                        : "inactive"
                    }`}
                  >
                    {`${
                      index % 2 == 0
                        ? "Active"
                        : index % 3 === 0
                        ? "Pending"
                        : index % 5 === 0
                        ? "Blacklisted"
                        : "Inactive"
                    }`}
                  </p>
                </td>
                <td>
                  <ViewUser
                    id={item.id}
                    setActiveDropDown={setActiveDropDown}
                    activeDropDown={activeDropDown}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
      {usersStored.length && (
        <Pagination
          setDisplayUsers={setDisplayUsers}
          usersStored={usersStored}
        />
      )}
    </div>
  );
};

export default UserTable;
