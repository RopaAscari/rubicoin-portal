import React, { Fragment, useRef } from "react";
import Grid from "@mui/material/Grid";
import Header from "@components/Header";
import { useSelector } from "react-redux";
import MDButton from "@components/MDButton";
import Camera from "@assets/images/camera.png";
import { Typography, Box, Card } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import NoProfile from "@assets/images/noProfile.png";
import { RootState } from "@reducers/combinedReducers";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import MotionHoc from "../../components/MotionHOC/MotionHOC";
import { PaperClip } from "@styled-icons/heroicons-outline/PaperClip";
import {
  Button,
  Input,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Container,
  Row,
  Col,
} from "reactstrap";
import { Themes } from "@enums/enums";
import { CloudUploadFill } from '@styled-icons/bootstrap/CloudUploadFill';

type Props = {};

const darkStyle = {
  color: "white",
  inputBg: "#000000",
  border: "transparent",
  backgroundColor: "#1A1A1A",
};
const lightStyle = {
  border:'',
  color: "black",
  inputBg: "#FFFFFF",
  cardHeader: "#fffffff",
  backgroundColor: "#F7F7F7",
};

const ProfileScreen: React.FC<Props> = () => {
  const uploadInputRef = useRef(null as any);
  const user = useSelector((state: RootState) => state.user?.user);
  const theme = useSelector((state: RootState) => state.theme?.theme.name);

  const profilePic =
    user?.profilePic !== null && user?.profilePic !== undefined
      ? user?.profilePic
      : NoProfile;

  const username = `${user?.firstName} ${user?.lastName}`;

  const styles = theme === Themes.DARK ? darkStyle : lightStyle;

  return (
    <React.Fragment>
      <Box mb={2} />
      <Header>
        <Container className="mt--7" fluid>
          <Row>
            <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
              <Card className="card-profile shadow">
                <Row className="justify-content-center">
                  <Col className="order-lg-2" lg="3">
                    <div className="card-profile-image">
                      <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        <img
                          alt="..."
                          className="rounded-circle"
                          src={profilePic}
                        />
                      </a>
                    </div>
                  </Col>
                </Row>
                <CardHeader
                  style={{ background: styles.backgroundColor, borderRadius: 10 }}
                  className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4"
                >
                  <div className="d-flex justify-content-between">
                    <Button
                      className="mr-4"
                      color="info"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      Connect
                    </Button>
                    <Button
                      className="float-right"
                      color="default"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      Message
                    </Button>
                  </div>
                </CardHeader>
                <CardBody className="pt-0 pt-md-4">
                  <br></br>
                  <br></br>
                  <div className="text-center">
                    <h3 style={{ color: styles.color }}>
                      {username}
                      <span className="font-weight-light">, 22</span>
                    </h3>
                    <div
                      className="h5 font-weight-300"
                      style={{ color: styles.color }}
                    >
                      <i className="ni location_pin mr-2" />
                      St.James, Jamaica
                    </div>

                    <div>
                      <FacebookIcon /> &nbsp;
                      <InstagramIcon /> &nbsp;
                      <GoogleIcon />
                    </div>

                    <hr className="my-4" />
                    <p>
                      Danyel — the name taken by Melbourne-raised,
                      Brooklyn-based Nick Murphy — writes, performs and records
                      all of his own music.
                    </p>
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      Show more
                    </a>
                  </div>
                </CardBody>
              </Card>

              <Card className="bg-white shadow-sm mb-4 mt-4">
                <Card>
                  <h5 className="mb-4">{}</h5>
                  <div className="d-xl-flex align-items-center">
                    <div className="user-avatar xl-avatar"></div>
                    <div className="file-field">
                      <div className="d-flex justify-content-xl-center ms-xl-3">
                        <div className="d-flex p-3">
                          <Fragment>
                            <input
                              ref={uploadInputRef}
                              type="file"
                              accept="image/*"
                              style={{ display: "none" }}
                              // onChange={onChange}
                            />
                            <Button
                              onClick={() =>
                                uploadInputRef.current &&
                                uploadInputRef.current.click()
                              }
                          
                              variant="contained"
                            >
                              Upload &nbsp;<CloudUploadFill size="20"/>
                            </Button>
                          </Fragment>
                          <div className="d-md-block text-start ">
                            <div style={{ color: styles.color }} className="fw-normal">
                              Choose Image 
                            </div>
                            <div
                              style={{ marginBottom: 5 }}
                              className="text-gray small mb-10"
                            >
                              JPG, GIF or PNG. Max size of 800K
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </Card>
            </Col>
            <Col className="order-xl-1" xl="8">
              <Card className=" shadow">
                <CardHeader
                  style={{ background: styles.backgroundColor }}
                  className=""
                >
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0" style={{ color: styles.color }}>
                        My account
                      </h3>
                    </Col>
                    <Col className="text-right" xs="4">
                      <Button
                        color="primary"
                        href="#pablo"
                        onClick={(e: any) => e.preventDefault()}
                        size="sm"
                      >
                        Profile
                      </Button>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form>
                    <h6 className="heading-small text-muted mb-4">
                      User information
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-username"
                            >
                              Username
                            </label>
                            <Input
                              style={{backgroundColor : styles.inputBg , border: styles.border,  color:  styles.color}}
                              className="form-control-alternative"
                              defaultValue=""
                              id="input-username"
                              placeholder="Username"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-email"
                            >
                              Email address
                            </label>
                            <Input
                              style={{backgroundColor : styles.inputBg , border: styles.border,  color:  styles.color}}
                              className="form-control-alternative"
                              id="input-email"
                              defaultValue={user?.email}
                              type="email"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name"
                            >
                              First name
                            </label>
                            <Input
                              style={{backgroundColor : styles.inputBg , border: styles.border,  color:  styles.color}}
                              className="form-control-alternative"
                              defaultValue={user?.firstName}
                              id="input-first-name"
                              placeholder="First name"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-last-name"
                            >
                              Last name
                            </label>
                            <Input
                              style={{backgroundColor : styles.inputBg , border: styles.border,  color:  styles.color}}
                              className="form-control-alternative"
                              defaultValue={user?.lastName}
                              id="input-last-name"
                              placeholder="Last name"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                    <hr className="my-4" />
                    {/* Address */}
                    <h6 className="heading-small text-muted mb-4">
                      Contact information
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col md="12">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-address"
                            >
                              Address
                            </label>
                            <Input
                              style={{backgroundColor : styles.inputBg , border: styles.border,  color:  styles.color}}
                              className="form-control-alternative"
                              defaultValue=""
                              id="input-address"
                              placeholder="Home Address"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-city"
                            >
                              City
                            </label>
                            <Input
                              style={{backgroundColor : styles.inputBg , border: styles.border,  color:  styles.color}}
                              className="form-control-alternative"
                              defaultValue=""
                              id="input-city"
                              placeholder="City"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-country"
                            >
                              Country
                            </label>
                            <Input
                              style={{backgroundColor : styles.inputBg , border: styles.border,  color:  styles.color}}
                              className="form-control-alternative"
                              defaultValue=""
                              id="input-country"
                              placeholder="Country"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-country"
                            >
                              Postal code
                            </label>
                            <Input
                              style={{backgroundColor : styles.inputBg , border: styles.border,  color:  styles.color}}
                              className="form-control-alternative"
                              id="input-postal-code"
                              placeholder="Postal code"
                              type="number"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                    <hr className="my-4" />
                    <MDButton color="info" variant="gradient">
                      Update
                    </MDButton>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </Header>
    </React.Fragment>
  );
};

const ProfileScreenHoc = MotionHoc(ProfileScreen);

export default ProfileScreenHoc;
