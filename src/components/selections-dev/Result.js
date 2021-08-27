import React, { Component } from "react";
import "../../App.css";
import { Container, Row, Col, Table } from "react-bootstrap";

class Result extends Component {
  render() {
    let Email;
    if (this.props.selectedOption === "view") {
      Email = localStorage.getItem("View Email");
    } else {
      Email = JSON.parse(localStorage.getItem("Email"));
    }

    let Retail_ID = JSON.parse(localStorage.getItem("Retail ID"));
    let Score = JSON.parse(localStorage.getItem("Total Score"));
    let One = JSON.parse(localStorage.getItem("Part One Score"));
    let Two = JSON.parse(localStorage.getItem("Part Two Score"));
    let Three = JSON.parse(localStorage.getItem("Part Three Score"));
    let Four = JSON.parse(localStorage.getItem("Part Four Score"));
    let Five = JSON.parse(localStorage.getItem("Part Five Score"));

    return (
      <div>
        <Container className="result text-center">
          <Row className="result-top">
            <Col xl={12} lg={12} md={12} sm={12} xs={12}>
              <Table className="result-box" size="sm">
                <tbody>
                  <tr>
                    <td>
                      <h3>Professionalism & Staff Hygiene</h3>
                      <h3>Housekeeping & General Cleanliness</h3>
                      <h3>Food Hygiene</h3>
                      <h3>Healthier Choice</h3>
                      <h3>Workplace Safety & Health</h3>
                    </td>
                    <td>
                      <h3>{One}/10%</h3>
                      <h3>{Two}/20%</h3>
                      <h3>{Three}/35%</h3>
                      <h3>{Four}/15%</h3>
                      <h3>{Five}/20%</h3>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>

          <Row className="result-bottom">
            <Col xl={12} lg={12} md={12} sm={12} xs={12}>
              <h3>Total Score: {Score}/100%</h3>
              <h3>Done by: {Email}</h3>
              <h3>Retail ID: {Retail_ID}</h3>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Result;
