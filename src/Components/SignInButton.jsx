import React from 'react';
import { useMsal } from '@azure/msal-react';
import { loginRequest } from '../authConfig';
import MS_LOGIN from '../assets/ms_buttons.svg';
 
export const SignInButton = ({ dataCaller }) => {
  const { instance } = useMsal();
 
  const handleLogin = async () => {
    instance.loginPopup(loginRequest)
      .then((loginResponse) =>  {
        instance.setActiveAccount(loginResponse.account);
        if (instance.getAllAccounts().length > 0) {
          dataCaller();
        }
      })
      .catch((e) => {
        console.error(e.message);
      });
  };
 
  return (
    <div onClick={handleLogin}>
      <img className="rounded-sm hover:scale-105 active:scale-100" src={MS_LOGIN} alt="MS_LOGIN" />
    </div>
  );
};
 
 
 