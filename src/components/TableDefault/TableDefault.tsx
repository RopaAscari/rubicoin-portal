import _ from "lodash";
import React from "react";
import {
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledButtonDropdown,
} from "reactstrap";
import styled from "styled-components";
import { Typography } from "@mui/material";
import { GearFill } from "@styled-icons/bootstrap/GearFill";

const Gear = styled(GearFill)(({ theme }) => ({
  color: theme.palette,
}));

const colorStatus = ["danger", "success", "warning", "secondary"];

type Props = {
  assets: Array<any>;
  projectColor: any;
  leaderStatus: any;
  dropdownColor: any;
};

const TrTableDefault = (props: Props) => {
  const formatDecimal = (value: number) => {
    return value.toFixed(2);
  };

  const determincePercentageColor = (value: number) => {
    return Math.sign(value) === 1 ? "#66bb6a" : "#EC3D3D";
  };

  return (
    <React.Fragment>
      {props.assets.map((item, index) => (
        <tr key={index}>
          <td className="align-middle">
            <span>{item.symbol}</span>
          </td>
          <td className="align-middle">
            <div>{item.name}</div>
          </td>
          <td className="align-middle">$ {formatDecimal(item.price)}</td>
          <td className="align-middle">
            <div>${formatDecimal(item.marketCap)}</div>
          </td>
          <td className="align-middle">
            <i className="fa fa-circle-o text-success mr-2"></i>
            <Typography
              variant="subtitle1"
              noWrap
              style={{ color: determincePercentageColor(item.percentChange1h) }}
            >
              {formatDecimal(item.percentChange1h)} %
            </Typography>
          </td>
          <td className="align-middle">
            <UncontrolledButtonDropdown>
              <DropdownToggle
                color="link"
                className={` text-decoration-none ${props.dropdownColor} `}
              >
                <Gear size="20" />
              </DropdownToggle>
              <DropdownMenu end>
                <DropdownItem>
                  <i className="fa fa-fw fa-envelope mr-2"></i>
                  Buy
                </DropdownItem>
                <DropdownItem>
                  <i className="fa fa-fw fa-phone mr-2"></i>
                  Sell
                </DropdownItem>
                <DropdownItem>
                  <i className="fa fa-fw fa-user mr-2"></i>
                  Trade
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledButtonDropdown>
          </td>
        </tr>
      ))}
    </React.Fragment>
  );
};

TrTableDefault.defaultProps = {
  assets: [],
  dropdownColor: "",
  leaderStatus: "white",
  projectColor: "text-inverse",
};

export { TrTableDefault };
