import React, { useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';
import { SignInButton } from '../components/SignInButton';
import SignOutButton from '../components/SignOutButton';
import { loginRequest } from '../authConfig';
import { callMsGraph } from '../graph';
import { useMsal } from '@azure/msal-react';
// import { postAPI } from '../caller/axiosUrls';
 
function Register() {
  const { instance, accounts } = useMsal();
 
  // const serverLogin = async (data) => {
  //   try {
  //     const bodyData = {
  //       name: data.displayName,
  //       email: data.mail
  //     };
  //     const response = await postAPI('/users/login', bodyData);
  //     sessionStorage.setItem('token', response.token);
  //     sessionStorage.setItem('user-id', response.uid);
  //   } catch (error) {
  //     console.error(error.message);
  //   }
  // };
 
  const RequestProfileData = () => {
    if (instance.getAllAccounts().length > 0) {
      instance
        .acquireTokenSilent({
          ...loginRequest,
          account: accounts[0],
        })
        .then((response) => {
          callMsGraph(response.accessToken)
            .then(async (data) => {
              // await serverLogin(data);
              sessionStorage.setItem('graphData', JSON.stringify(data));
            });
        })
        .catch((error) => {
          console.error('Failed to acquire token silently:', error);
        });
    }
  };
 
  return (
    <div className="registration-container">
      <div className="registration-form">
        <h2>Register</h2>
        <AuthenticatedTemplate>
          <p>Redirecting...</p>
          <SignOutButton />
        </AuthenticatedTemplate>
        <UnauthenticatedTemplate>
          <p>Please log in to continue</p>
          <SignInButton dataCaller={RequestProfileData} />
        </UnauthenticatedTemplate>
      </div>
    </div>
  );
}
 
export default Register;
 
 