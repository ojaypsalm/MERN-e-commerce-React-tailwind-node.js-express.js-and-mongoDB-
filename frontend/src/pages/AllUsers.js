import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import moment from 'moment';
import { MdModeEdit } from 'react-icons/md';
import ChangeUserRole from "../components/ChangeUserRole";


const AllUsers = () => {
  const [allUser, setAllUser] = useState([]);
  const [openUpdateRole, setOpenUpdateRole] = useState(false);
  const [updateUserDetails, setUpdateUserDetails] = useState({
    email : '',
    firstName : '',
    role : '',
    _id : '',
  })

  const fetchAllUsers = async () => {
    const fetchData = await fetch(SummaryApi.allUser.url, {
      method: SummaryApi.allUser.method,
      credentials: "include",
    });

    const dataResponse = await fetchData.json();

    if (dataResponse.success) {
      setAllUser(dataResponse.data);
    }
    if (dataResponse.error) {
      console.log(dataResponse.message);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div className="bg-white pb-4">
      <table className="w-full userTable">
        <thead>
          <tr className="bg-black text-white userTable th">
            <th>Sr.</th>
            <th>FirstName</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {allUser.map((el, index) => {
            return (
              <tr key={el._id || index} className="userTable td" >
                <td>{index + 1}</td>
                <td>{el?.firstName}</td>
                <td>{el?.email}</td>
                <td>{el?.role}</td>
                <td>{moment(el?.createdAt).format('ll')}</td>
                <td>
                  <button className="bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 text-white" 
                  onClick={()=>{
                    setUpdateUserDetails(el)
                    setOpenUpdateRole(true)
                  }}
                     
                  >
                    <MdModeEdit />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {
        openUpdateRole && (
          <ChangeUserRole 
             onClose={()=>setOpenUpdateRole(false)} 
             firstName={updateUserDetails.firstName}
             email={updateUserDetails.email}
             role={updateUserDetails.role}
             userId={updateUserDetails._id}
             callFunc={fetchAllUsers}
          />
        )
      }

      
    </div>
  );
};

export default AllUsers;
