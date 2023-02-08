//@author sudheer_dagar(raven)


import { GoogleLoginButton } from "react-social-login-buttons"

import { LoginSocialGoogle } from "reactjs-social-login"

function google_login() {
  return (
    <div>
      <LoginSocialGoogle
        client_id={"60295875488-qcu5e73d582h7rtnhub3hep1jnu0gl8o.apps.googleusercontent.com"}
        scope="openid profile email"
        discoveryDocs="claims_supported"
        access_type="offline"
        onResolve={({ provider, data }) => {
          console.log(provider, data);
          //use the provider and data as objects and send it to backend for authentication to create a jwt token and  give access to 
          //user profile after  verification and send me the env file  shubh bitch 
          //
        }}
        onReject={(err) => {
          console.log(err);
        }}
      >
        <GoogleLoginButton />
      </LoginSocialGoogle>
    </div>
  );
}

export default google_login;