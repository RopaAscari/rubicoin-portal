import React from "react";

type Props = {
  condition: boolean;
  renderComponent: JSX.Element | JSX.Element[];
  fallBackComponent: JSX.Element | JSX.Element[];
};

const RenderDelegate: React.FC<Props> = (props: Props) => {
  return (
    <React.Fragment>
      {props.condition ? props.renderComponent : props.fallBackComponent}
    </React.Fragment>
  );
};

export default RenderDelegate;
