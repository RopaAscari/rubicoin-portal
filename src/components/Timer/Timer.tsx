import MDTypography from "@components/MDTypography";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid/Grid";
import React from "react";

type Props = {
  resendCode: () => void;
};

type State = {
  timer: number;
  verificationCode: string;
  timerId: number | NodeJS.Timeout | null;
};

export default class Timer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      timer: 600,
      timerId: null,
      verificationCode: "",
    };

    this.resendCode = this.resendCode.bind(this);
  }

  componentDidMount() {
    this.startTimer();
  }

  componentWillUnmount() {
    this.endTimer();
  }

  endTimer() {
    clearInterval(Number(this.state.timerId));
  }

  startTimer() {
    let clear = setInterval(() => {
      this.setState({ timer: this.state.timer - 1 });
      if (this.state.timer === 0) {
        clearInterval(clear);
      }
    }, 1000);
    this.setState({ timerId: clear });
  }

  getTimeString = () => {
    const m = parseInt(
      ((this.state.timer % (60 * 60)) / 60) as unknown as string
    );
    const s = parseInt((this.state.timer % 60) as unknown as string);
    return m + ":" + (s < 10 ? "0" + s : s);
  };

  resendCode() {
    this.setState({ timer: 600 }, () => {
      this.startTimer();
      this.props.resendCode();
    });
  }

  render() {
    return (
      <Grid
        container
        spacing={0}
        direction="row"
        alignItems="center"
        justifyContent="space-around"
        sx={{ marginTop: 3 }}
      >
        <Grid item>
          <MDTypography
            color="text"
            variant="button"
            fontWeight="regular"
            gutterBottom
            onClick={this.resendCode}
            sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
          >
            &nbsp;&nbsp; Resend Code
          </MDTypography>
        </Grid>
        <Grid item sx={{}}>
          <MDTypography
            color="text"
            variant="button"
            fontWeight="regular"
            gutterBottom
            onClick={this.resendCode}
            sx={{ ml: -1 }}
          >
            &nbsp;&nbsp; {this.getTimeString()}
          </MDTypography>
        </Grid>
      </Grid>
    );
  }
}
