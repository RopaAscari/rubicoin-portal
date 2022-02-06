import React from "react";
import './NotFound.scss';
import { Routes } from "@enums/enums";
import NotFound from '@assets/images/404.png'

type Props = {
  history: any;
};
const NotFoundPage: React.FunctionComponent<Props> = (props: Props) => {
  const navigateToLogin = () => {
    props.history.push(`${Routes.Base}/${Routes.Login}`);
  };

  return (
    <div>
      <img
        src={NotFound}
        alt="Unauthorized"
        height="450"
        width="550"
        className="auth-img"
      /> 
  
      <a className="login-here-text auth font">
        Click <a onClick={navigateToLogin} className="here font ">here</a> to login
      </a>
    </div>
  );
};

export default NotFoundPage;