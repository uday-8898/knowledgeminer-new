import React, { useContext } from 'react';
import { useMsal } from '@azure/msal-react';
import { useNavigate } from 'react-router-dom';
// import { postAPI } from '../caller/axiosUrls';
import { IoMdLogOut } from "react-icons/io";

const SignOutButton = () => {
  const navigate = useNavigate();
  const { instance } = useMsal();

  // const logout = async () => {
  //   try {
  //     const response = await postAPI('/users/logout');
  //     sessionStorage.removeItem('role');
  //     sessionStorage.removeItem('user-id');
  //     sessionStorage.removeItem('token');
  //     sessionStorage.removeItem('graphData');
  //   } catch (error) {
  //     console.error(error.message);
  //   }
  // }

  const handleLogout = () => {
    instance
      .logoutPopup({
        postLogoutRedirectUri: "/", // Redirect URI after logout
      })
      .then(() => {
        sessionStorage.removeItem('graphData');
        navigate("/"); // Navigate to the home route
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  return (
    <button className='flex items-center text-black my-2  relative group transition-transform transform hover:scale-105' onClick={handleLogout}>
      
      <span className="transition text-red-600 duration-300 ease-in-out flex items-center mx-2"> <IoMdLogOut className="mr-1" /><b>LogOut</b></span>
    </button>
  );
}

export default SignOutButton;

