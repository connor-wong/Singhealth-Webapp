import React, { Component } from "react";
import "../../../App.css";
import {
  General_Safety_Part_One,
  General_Safety_Part_Two,
} from "../../../data/checklistQuestions";
import { Container, Row, Col, Table } from "react-bootstrap";

class GeneralSafetyQuestionsPartOne extends Component {
  constructor() {
    super();
    this.state = {
      selectedChoices: [],
    };
    this.choiceSelect = this.choiceSelect.bind(this);
  }

  choiceSelect = (e) => {
    this.props.choiceSelect(e);
    let selectedChoices = [...this.state.selectedChoices];
    let choice = selectedChoices.find((x) => x.id === e.target.id);
    if (choice) choice.value = e.target.value;
    else selectedChoices.push({ id: e.target.id, value: e.target.value });
    this.setState({ selectedChoices }, () => {});
  };

  render() {
    let choice;
    if (this.props.selectedOption === "edit") {
      choice = JSON.parse(localStorage.getItem("EditData"));
    } else if (this.props.selectedOption === "view") {
      choice = JSON.parse(localStorage.getItem("ViewData"));
    } else {
      choice = JSON.parse(localStorage.getItem("Data"));
    }

    return (
      <div>
        <Container fluid>
          <Row>
            <Col xl={12} lg={12} md={12} sm={12} xs={12}>
              <h1>General Safety</h1>
            </Col>
          </Row>

          <Row>
            <Col xl={12} lg={12} md={12} sm={12} xs={12}>
              <Table size="sm" borderless className="question-table">
                <tbody>
                  {General_Safety_Part_One.map((question) => {
                    return (
                      <tr key={question.id}>
                        <td>
                          <h3>{question.question}</h3>
                        </td>
                        <td className="radio-buttons">
                          <Row>
                            <Col xl={4} lg={4} md={4} sm={4} xs={4}>
                              <label>
                                <input
                                  type="radio"
                                  disabled={this.props.radioDisable}
                                  value="Pass"
                                  id={question.id}
                                  name={question.id}
                                  onChange={this.choiceSelect}
                                  defaultChecked={
                                    choice.find((state) => {
                                      return state.id === question.id;
                                    }).value === "Pass"
                                  }
                                />
                                Pass
                              </label>
                            </Col>
                            <Col xl={4} lg={4} md={4} sm={4} xs={4}>
                              <label>
                                <input
                                  type="radio"
                                  disabled={this.props.radioDisable}
                                  value="Fail"
                                  id={question.id}
                                  name={question.id}
                                  onChange={this.choiceSelect}
                                  defaultChecked={
                                    choice.find((state) => {
                                      return state.id === question.id;
                                    }).value === "Fail"
                                  }
                                />
                                Fail
                              </label>
                            </Col>
                            <Col xl={4} lg={4} md={4} sm={4} xs={4}>
                              <label>
                                <input
                                  type="radio"
                                  disabled={this.props.radioDisable}
                                  value="Not Applicable"
                                  id={question.id}
                                  name={question.id}
                                  onChange={this.choiceSelect}
                                  defaultChecked={
                                    choice.find((state) => {
                                      return state.id === question.id;
                                    }).value === "Not Applicable"
                                  }
                                />
                                NA
                              </label>
                            </Col>
                          </Row>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

class GeneralSafetyQuestionsPartTwo extends Component {
  constructor() {
    super();
    this.state = {
      selectedChoices: [],
    };
    this.choiceSelect = this.choiceSelect.bind(this);
  }

  choiceSelect = (e) => {
    this.props.choiceSelect(e);
    let selectedChoices = [...this.state.selectedChoices];
    let choice = selectedChoices.find((x) => x.id === e.target.id);
    if (choice) choice.value = e.target.value;
    else selectedChoices.push({ id: e.target.id, value: e.target.value });
    this.setState({ selectedChoices }, () => {});
  };

  render() {
    let choice;
    if (this.props.selectedOption === "edit") {
      choice = JSON.parse(localStorage.getItem("EditData"));
    } else if (this.props.selectedOption === "view") {
      choice = JSON.parse(localStorage.getItem("ViewData"));
    } else {
      choice = JSON.parse(localStorage.getItem("Data"));
    }

    return (
      <div>
        <Container fluid>
          <Row>
            <Col xl={12} lg={12} md={12} sm={12} xs={12}>
              <h1>General Safety</h1>
            </Col>
          </Row>

          <Row>
            <Col xl={12} lg={12} md={12} sm={12} xs={12}>
              <Table size="sm" borderless className="question-table">
                <tbody>
                  {General_Safety_Part_Two.map((question) => {
                    return (
                      <tr key={question.id}>
                        <td>
                          <h3>{question.question}</h3>
                        </td>
                        <td className="radio-buttons">
                          <Row>
                            <Col xl={4} lg={4} md={4} sm={4} xs={4}>
                              <label>
                                <input
                                  type="radio"
                                  disabled={this.props.radioDisable}
                                  value="Pass"
                                  id={question.id}
                                  name={question.id}
                                  onChange={this.choiceSelect}
                                  defaultChecked={
                                    choice.find((state) => {
                                      return state.id === question.id;
                                    }).value === "Pass"
                                  }
                                />
                                Pass
                              </label>
                            </Col>
                            <Col xl={4} lg={4} md={4} sm={4} xs={4}>
                              <label>
                                <input
                                  type="radio"
                                  disabled={this.props.radioDisable}
                                  value="Fail"
                                  id={question.id}
                                  name={question.id}
                                  onChange={this.choiceSelect}
                                  defaultChecked={
                                    choice.find((state) => {
                                      return state.id === question.id;
                                    }).value === "Fail"
                                  }
                                />
                                Fail
                              </label>
                            </Col>
                            <Col xl={4} lg={4} md={4} sm={4} xs={4}>
                              <label>
                                <input
                                  type="radio"
                                  disabled={this.props.radioDisable}
                                  value="Not Applicable"
                                  id={question.id}
                                  name={question.id}
                                  onChange={this.choiceSelect}
                                  defaultChecked={
                                    choice.find((state) => {
                                      return state.id === question.id;
                                    }).value === "Not Applicable"
                                  }
                                />
                                NA
                              </label>
                            </Col>
                          </Row>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export { GeneralSafetyQuestionsPartOne, GeneralSafetyQuestionsPartTwo };
