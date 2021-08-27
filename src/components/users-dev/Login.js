import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import app from "../../services/firebase";
import { AuthContext } from "../users-dev/Auth";

import wave from "../../images/wave.svg";
import auditimage from "../../images/audit-image.png";
import singhealthlogo from "../../images/singhealth-logo.png";
import email from "../../images/email-icon.svg";
import password from "../../images/pw-icon.svg";

import { Container, Row, Col, Image } from "react-bootstrap";

const Login = ({ history }) => {
  const handleLogin = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await app
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push("/home");
        localStorage.setItem("Email", JSON.stringify(email.value));
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/home" />;
  }

  const forgetLogin = () => {};

  return (
    <div>
      <Container className="text-center" fluid>
        <Row>
          <Col>
            <Image className="btmwave" src={wave} alt="" fluid />
          </Col>
        </Row>
        <Row className="login">
          <Col xl={6} lg={12} md={12} sm={12} xs={12}>
            <Image className=" audit" src={auditimage} alt="" fluid />
          </Col>
          <Col xl={6} lg={12} md={12} sm={12} xs={12}>
            <Row>
              <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                <Image
                  className="singhealth"
                  src={singhealthlogo}
                  alt=""
                  fluid
                />
              </Col>
            </Row>
            <Row>
              <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                <h1>USER LOGIN</h1>
                <form onSubmit={handleLogin}>
                  <div className="inputbox">
                    <img src={email} alt="" />
                    <input name="email" type="email" placeholder="Email" />
                  </div>
                  <div className="inputbox">
                    <img src={password} alt="" />
                    <input
                      name="password"
                      type="password"
                      placeholder="Password"
                    />
                  </div>
                  <input type="submit" name="" value="Sign In" />
                </form>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row>
          <Col>
            <Image className="wave" src={wave} alt="" fluid />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default withRouter(Login);
