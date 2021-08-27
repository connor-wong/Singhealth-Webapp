import React, { Component } from "react";
import "../../App.css";
import { Container, Row, Col, Table } from "react-bootstrap";

class NonResult extends Component {
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
    return (
      <div>
        <Container className="non-result text-center">
          <Row className="non-result-top">
            <Col xl={12} lg={12} md={12} sm={12} xs={12}>
              <Table className="non-result-box" size="sm">
                <tbody>
                  <tr>
                    <td>
                      <h3>Professionalism & Staff Hygiene</h3>
                      <h3>Housekeeping & General Cleanliness</h3>
                      <h3>Workplace Safety & Health</h3>
                    </td>
                    <td>
                      <h3>{One}/20%</h3>
                      <h3>{Two}/40%</h3>
                      <h3>{Three}/40%</h3>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>

          <Row className="non-result-bottom">
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

export default NonResult;
