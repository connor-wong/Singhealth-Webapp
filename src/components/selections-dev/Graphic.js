import React, { Component } from "react";
import "../../App.css";
import app from "../../services/firebase";
import { Container, Row, Col, Spinner, Image } from "react-bootstrap";
import { Line } from "react-chartjs-2";
import smallsinghealth from "../../images/singhealth-logo.png";
import wave from "../../images/wave.svg";

class Graphic extends Component {
  constructor() {
    super();
    this.state = {
      _isMounted: false,
      isLoading: true,
      data: [],
      dates: [],
      partOneScore: [],
      partTwoScore: [],
      partThreeScore: [],
      partFourScore: [],
      partFiveScore: [],
    };
    this.getData = this.getData.bind(this);
  }

  getData() {
    let dates = [];
    let partOneScore = [];
    let partTwoScore = [];
    let partThreeScore = [];
    let partFiveScore = [];
    let partFourScore = [];
    let totalScore = [];

    let Institution = localStorage.getItem("Institution");
    let Retail_Tenant = JSON.parse(localStorage.getItem("Retail Tenant"));

    const db = app.firestore();
    /* Get All Documents */
    if (this.props.retailType == "Non-F&B") {
      db.collection(Institution)
        .where("Retail_Tenant", "==", Retail_Tenant)
        .orderBy("created", "desc")
        .limit(4)
        .get()
        .then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            dates.push(
              new Date(doc.data().created.seconds * 1000).toLocaleDateString(
                "en-US"
              )
            );
            partOneScore.push(doc.data().Part_One_Score);
            partTwoScore.push(doc.data().Part_Two_Score);
            partThreeScore.push(doc.data().Part_Three_Score);
            totalScore.push(doc.data().Total_Score);
          });
          this.setState({
            dates,
            partOneScore,
            partTwoScore,
            partThreeScore,
            totalScore,
          });
        });
    } else {
      db.collection(Institution)
        .where("Retail_Tenant", "==", Retail_Tenant)
        .orderBy("created", "desc")
        .limit(4)
        .get()
        .then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            dates.push(
              new Date(doc.data().created.seconds * 1000).toLocaleDateString(
                "en-US"
              )
            );
            partOneScore.push(doc.data().Part_One_Score);
            partTwoScore.push(doc.data().Part_Two_Score);
            partThreeScore.push(doc.data().Part_Three_Score);
            partFourScore.push(doc.data().Part_Four_Score);
            partFiveScore.push(doc.data().Part_Five_Score);
            totalScore.push(doc.data().Total_Score);
          });
          this.setState({
            dates,
            partOneScore,
            partTwoScore,
            partThreeScore,
            partFourScore,
            partFiveScore,
            totalScore,
          });
        });
    }
  }

  componentDidMount() {
    this.setState({ _isMounted: true });
    this.getData();
  }

  componentWillUnmount() {
    this.setState({ _isMounted: false });
  }

  render() {
    return (
      <div>
        {this.state.isLoading == true ? (
          <>
            {setTimeout(() => {
              this.setState({ isLoading: false }, this.getData());
            }, 1500)}
            <Container className="text-center spinner" fluid>
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
                <Col xl={12} lg={12} md={12} sm={12} xs={12}>
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
                  <Image className="btmwave" src={wave} alt="" fluid />
                </Col>
              </Row>
            </Container>
          </>
        ) : (
          <>
            <Container className="text-center " fluid>
              <Row className="graphic">
                <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                  {this.props.retailType === "Non-F&B" && (
                    <Line
                      data={{
                        labels: this.state.dates.reverse(),
                        datasets: [
                          {
                            label: "Score",
                            data: this.state.totalScore.reverse(),
                            backgroundColor: "rgba(255, 99, 132, 0.2)",
                            borderColor: "rgba(255, 99, 132, 1)",
                            borderWidth: 3,
                          },
                          {
                            label: "Professionalism & Staff Hygiene 20%",
                            data: this.state.partOneScore.reverse(),
                            backgroundColor: "rgba(54, 162, 235, 0.2)",
                            borderColor: "rgba(54, 162, 235, 1)",
                            borderWidth: 3,
                          },
                          {
                            label: "Housekeeping & General Cleanliness 40%",
                            data: this.state.partTwoScore.reverse(),
                            backgroundColor: "rgba(255, 206, 86, 0.2)",
                            borderColor: "rgba(255, 206, 86, 1)",
                            borderWidth: 3,
                          },
                          {
                            label: "Workplace Safety & Health 40%",
                            data: this.state.partThreeScore.reverse(),
                            backgroundColor: "rgba(75, 192, 192, 0.2)",
                            borderColor: "rgba(75, 192, 192, 1)",
                            borderWidth: 3,
                          },
                        ],
                      }}
                      height={500}
                      width={800}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        legend: {
                          position: "bottom",
                          align: "start",
                          rtl: false,
                          labels: {
                            fontStyle: "bold",
                            fontColor: "black",
                            fontSize: 12,
                            padding: 10,
                          },
                        },
                        scales: {
                          yAxes: [
                            {
                              ticks: {
                                beginAtZero: true,
                                fontFamily: "Monospace",
                                fontStyle: "bold",
                                fontColor: "black",
                                fontSize: 12,
                              },
                            },
                          ],
                          xAxes: [
                            {
                              ticks: {
                                fontFamily: "Monospace",
                                fontStyle: "bold",
                                fontColor: "#f15a22",
                                fontSize: 12,
                              },
                            },
                          ],
                        },
                      }}
                    />
                  )}
                  {this.props.retailType === "F&B" && (
                    <Line
                      data={{
                        labels: this.state.dates.reverse(),
                        datasets: [
                          {
                            label: "Score",
                            data: this.state.totalScore.reverse(),
                            backgroundColor: "rgba(255, 99, 132, 0.2)",
                            borderColor: "rgba(255, 99, 132, 1)",
                            borderWidth: 3,
                          },
                          {
                            label: "Professionalism & Staff Hygiene 10%",
                            data: this.state.partOneScore.reverse(),
                            backgroundColor: "rgba(54, 162, 235, 0.2)",
                            borderColor: "rgba(54, 162, 235, 1)",
                            borderWidth: 3,
                          },
                          {
                            label: "Housekeeping & General Cleanliness 20%",
                            data: this.state.partTwoScore.reverse(),
                            backgroundColor: "rgba(255, 206, 86, 0.2)",
                            borderColor: "rgba(255, 206, 86, 1)",
                            borderWidth: 3,
                          },
                          {
                            label: "Food Hygiene 35%",
                            data: this.state.partThreeScore.reverse(),
                            backgroundColor: "rgba(75, 192, 192, 0.2)",
                            borderColor: "rgba(75, 192, 192, 1)",
                            borderWidth: 3,
                          },
                          {
                            label: "Healthier Choice 15%",
                            data: this.state.partFourScore.reverse(),
                            backgroundColor: "rgba(153, 102, 255, 0.2)",
                            borderColor: "rgba(153, 102, 255, 1)",
                            borderWidth: 3,
                          },
                          {
                            label: "Workplace Safety & Health 20%",
                            data: this.state.partFiveScore.reverse(),
                            backgroundColor: "rgba(255, 159, 64, 0.2)",
                            borderColor: "rgba(255, 159, 64, 1)",
                            borderWidth: 3,
                          },
                        ],
                      }}
                      height={500}
                      width={800}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        legend: {
                          position: "bottom",
                          align: "start",
                          rtl: false,
                          labels: {
                            fontStyle: "bold",
                            fontColor: "black",
                            fontSize: 15,
                            padding: 15,
                          },
                        },
                        scales: {
                          yAxes: [
                            {
                              ticks: {
                                beginAtZero: true,
                                fontFamily: "Monospace",
                                fontStyle: "bold",
                                fontColor: "black",
                                fontSize: 15,
                              },
                            },
                          ],
                          xAxes: [
                            {
                              ticks: {
                                fontFamily: "Monospace",
                                fontStyle: "bold",
                                fontColor: "#f15a22",
                                fontSize: 15,
                              },
                            },
                          ],
                        },
                      }}
                    />
                  )}
                </Col>
              </Row>
              <Row>
                <Col xl={12} lg={12} md={12} sm={12} xs={12}>
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

export default Graphic;
