import "./Unauthorized.scss";
import { Routes } from "@enums/enums";
import auth from "@assets/images/auth.jpg";
import React, { useEffect, useState } from "react";
import { RouteComponentProps, StaticContext } from "react-router";

type Props = {
  history: RouteComponentProps<{}, StaticContext, unknown>["history"];
};

const UnauthorizedPage: React.FunctionComponent<Props> = (props: Props) => {
  
  const [timer, setTimer] = useState(10);

  useEffect(() => {
    setTimeout(() => {
      if(timer === 0){
        props.history.push(`${Routes.Base}/${Routes.Login}`);
      }
      setTimer(prevState => prevState -1);
    }, 1000);
  });

  return (
    <div className="auth-body ">
     
      <img
        src={auth}
        alt="Unauthorized"
        height="300"
        width="400"
        className="auth-img"
      /> <br></br>
      <a className="unauthorized font">401 Unauthorized Accesss</a><br></br>
      <a className="unauthorized font timer">Redirecting in {timer}</a>
    </div>
  );
};

export default UnauthorizedPage;