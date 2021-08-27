import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import app from "../../services/firebase";

import wave from "../../images/wave.svg";
import smallsinghealth from "../../images/smallsinghealth.png";

import { Container, Row, Col, Image, Table, Spinner } from "react-bootstrap";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      role: "",
      institution: "",
      _isMounted: false,
      isLoading: true,
    };
  }

  getData() {
    const Email = JSON.parse(localStorage.getItem("Email"));
    const uid = localStorage.getItem("uid");
    const db = app.firestore();

    let data = [];

    /* Get User role, insitution and audits */
    db.collection("userGroup")
      .doc(uid)
      .get()
      .then((doc) => {
        localStorage.setItem("Role", doc.data().role);
        localStorage.setItem("Institution", doc.data().institution);
        this.setState({
          role: doc.data().role,
          institution: doc.data().institution,
        });

        if (doc.data().role == "user") {
          /* Get All Personal Documents */
          db.collection(doc.data().institution)
            .where("Email", "==", Email)
            .orderBy("created", "desc")
            .limit(5)
            .get()
            .then((snapshot) => {
              snapshot.docs.forEach((doc) => {
                data.push(doc.data());
              });

              this.setState({
                data,
              });
            });
        } else if (doc.data().role == "admin") {
          /* Get All Documents */
          db.collection(doc.data().institution)
            .orderBy("created", "desc")
            .limit(5)
            .get()
            .then((snapshot) => {
              snapshot.docs.forEach((doc) => {
                data.push(doc.data());
              });

              this.setState({
                data,
              });
            });
        }
      });
  }

  signOutHandler = () => {
    localStorage.clear();
    app.auth().signOut();
  };

  componentDidMount() {
    this.setState({ _isMounted: true, data: [] });
  }

  componentWillUnmount() {
    this.setState({ _isMounted: false });
  }

  render() {
    const data = this.state.data;
    const email = JSON.parse(localStorage.getItem("Email"));

    return (
      <div>
        {this.state.isLoading == true ? (
          <>
            {setTimeout(() => {
              this.setState({ isLoading: false });
              this.getData();
            }, 1500)}
            <Container className="text-center spinner" fluid>
              <Row>
                <Col>
                  <Image className="wave" src={wave} alt="" fluid />
                  <Image
                    className="smallsinghealth"
                    src={smallsinghealth}
                    alt=""
                    fluid
                  />
                </Col>
              </Row>

              <Row>
                <Col>
                  <Spinner
                    className="loader"
                    animation="border"
                    style={{ width: "5rem", height: "5rem" }}
                  />
                  <h3>Loading...</h3>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Image className="btmwave" src={wave} alt="" fluid />
                </Col>
              </Row>
            </Container>
          </>
        ) : (
          <>
            <Container className="text-center home-page" fluid>
              <Row>
                <Col>
                  <Image className="wave" src={wave} alt="" fluid />
                  <Image
                    className="smallsinghealth"
                    src={smallsinghealth}
                    alt=""
                    fluid
                  />
                </Col>
              </Row>

              <Row className="space"></Row>

              <Row>
                <Col>
                  <h3 style={{ color: "#f15a22" }}>{this.state.institution}</h3>
                </Col>
              </Row>

              <Row>
                <Col xl={6} lg={12} md={12} sm={12} xs={12}>
                  <h3>Welcome {email}</h3>
                  <div className="buttons">
                    <NavLink to="/selection">
                      <input
                        type="button"
                        name="select"
                        value="Select Retail Store"
                      />
                    </NavLink>
                  </div>
                  <div className="buttons">
                    <input
                      type="button"
                      value="SIGN OUT"
                      onClick={this.signOutHandler}
                    />
                  </div>
                </Col>
                <Col xl={6} lg={12} md={12} sm={12} xs={12}>
                  {this.state.role === "admin" && (
                    <h3 className="table-title">Recent Audits</h3>
                  )}
                  {this.state.role === "user" && (
                    <h3 className="table-title">My Recent Audits</h3>
                  )}

                  <Table size="sm" className="option-table">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Done by</th>
                        <th>Retail Tenant</th>
                        <th>Score</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((data, index) => {
                        return (
                          <tr key={index}>
                            <td>
                              {new Date(
                                data.created.seconds * 1000
                              ).toLocaleDateString("en-US")}
                            </td>
                            <td>{data.Email}</td>
                            <td>{data.Retail_Tenant}</td>
                            <td>{data.Total_Score}%</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Image className="btmwave" src={wave} alt="" fluid />
                </Col>
              </Row>
            </Container>
          </>
        )}
      </div>
    );
  }
}

export default Home;
