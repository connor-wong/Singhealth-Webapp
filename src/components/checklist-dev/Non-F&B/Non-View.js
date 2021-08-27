import React, { Component } from "react";
import "../../../App.css";
import { NavLink } from "react-router-dom";
import app from "../../../services/firebase";

import NonProfessionalismQuestions from "./Non-ProfessionalismQuestions";
import NonStaffHygieneQuestions from "./Non-StaffHygieneQuestions";
import {
  NonGeneralEnvironmentalCleanlinessPartOne,
  NonGeneralEnvironmentalCleanlinessPartTwo,
} from "./Non-GeneralEnvironmentalCleaninessQuestions";
import {
  NonGeneralSafetyQuestionsPartOne,
  NonGeneralSafetyQuestionsPartTwo,
} from "./Non-GeneralSafetyQuestions";
import NonFireEmergencySafetyQuestions from "./Non-FireEmergencySafetyQuestions";
import NonElectricalSafetyQuestions from "./Non-ElectricalSafetyQuestions";
import NonResult from "../../selections-dev/NonResult";
import Comments from "../../selections-dev/Comments";

import {
  Container,
  Row,
  Col,
  Image,
  Modal,
  Button,
  Spinner,
} from "react-bootstrap";

/* View Audit Details */
class NonView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedChoices: this.props.viewData,
      checkListPage: 1,
      previewImage: [],
      enlargeImage: false,
      selectedImage: null,
      radioDisable: true,
      isLoading: true,
      _isMounted: false,
    };
    this.onSelectChoice = this.onSelectChoice.bind(this);
  }

  onSelectChoice(e) {
    const selectedChoices = [...this.state.selectedChoices];
    const choice = selectedChoices.find((x) => x.id === e.target.id);
    if (choice) choice.value = e.target.value;
    else selectedChoices.push({ id: e.target.id, value: e.target.value });
    this.setState(
      {
        selectedChoices,
      },
      () => {
        //console.log(this.state.selectedChoices);
      }
    );
  }

  retrieveImageHandler = () => {
    let imageURLs = [];
    const storage = app.storage().ref();

    storage
      .child(this.props.doc_id)
      .listAll()
      .then((result) => {
        result.items.forEach((imageRef) => {
          imageRef.getDownloadURL().then((url) => {
            imageURLs.push(url);
            this.setState({ previewImage: imageURLs });
          });
        });
      });
  };

  retrieveDataHandler = () => {
    let data;
    let Institution = localStorage.getItem("Institution");
    const db = app.firestore();

    db.collection(Institution)
      .doc(this.props.doc_id)
      .get()
      .then((snapshot) => {
        data = snapshot.data();
        localStorage.setItem("View Email", data.Email);
        localStorage.setItem("Total Score", data.Total_Score);
        localStorage.setItem("Part One Score", data.Part_One_Score);
        localStorage.setItem("Part Two Score", data.Part_Two_Score);
        localStorage.setItem("Part Three Score", data.Part_Three_Score);
      });
  };

  componentDidMount() {
    this.setState({ _isMounted: true });
    this.retrieveDataHandler();
    this.retrieveImageHandler();
  }

  componentWillUnmount() {
    this.setState({ _isMounted: false });
  }

  render() {
    localStorage.setItem(
      "ViewData",
      JSON.stringify(this.state.selectedChoices)
    );

    return (
      <div>
        {this.state.isLoading == true ? (
          <>
            {setTimeout(() => {
              this.setState({ isLoading: false });
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
            </Container>
          </>
        ) : (
          <>
            <Container className="text-center Checklist" fluid>
              <Row>
                <Col xl={12} lg={12} md={12} sm={12} xs={12} className="header">
                  <h3>
                    {this.props.retailName} @ {this.props.selectedInstitution}
                  </h3>
                </Col>
              </Row>

              <Row className="questions">
                <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                  {this.state.checkListPage === 1 && (
                    <NonProfessionalismQuestions
                      choiceSelect={this.onSelectChoice}
                      selectedOption={this.props.selectedOption}
                      radioDisable={this.state.radioDisable}
                    />
                  )}
                  {this.state.checkListPage === 2 && (
                    <NonStaffHygieneQuestions
                      choiceSelect={this.onSelectChoice}
                      selectedOption={this.props.selectedOption}
                      radioDisable={this.state.radioDisable}
                    />
                  )}
                  {this.state.checkListPage === 3 && (
                    <NonGeneralEnvironmentalCleanlinessPartOne
                      choiceSelect={this.onSelectChoice}
                      selectedOption={this.props.selectedOption}
                      radioDisable={this.state.radioDisable}
                    />
                  )}
                  {this.state.checkListPage === 4 && (
                    <NonGeneralEnvironmentalCleanlinessPartTwo
                      choiceSelect={this.onSelectChoice}
                      selectedOption={this.props.selectedOption}
                      radioDisable={this.state.radioDisable}
                    />
                  )}
                  {this.state.checkListPage === 5 && (
                    <NonGeneralSafetyQuestionsPartOne
                      choiceSelect={this.onSelectChoice}
                      selectedOption={this.props.selectedOption}
                      radioDisable={this.state.radioDisable}
                    />
                  )}
                  {this.state.checkListPage === 6 && (
                    <NonGeneralSafetyQuestionsPartTwo
                      choiceSelect={this.onSelectChoice}
                      selectedOption={this.props.selectedOption}
                      radioDisable={this.state.radioDisable}
                    />
                  )}
                  {this.state.checkListPage === 7 && (
                    <NonFireEmergencySafetyQuestions
                      choiceSelect={this.onSelectChoice}
                      selectedOption={this.props.selectedOption}
                      radioDisable={this.state.radioDisable}
                    />
                  )}
                  {this.state.checkListPage === 8 && (
                    <div>
                      <NonElectricalSafetyQuestions
                        choiceSelect={this.onSelectChoice}
                        selectedOption={this.props.selectedOption}
                        radioDisable={this.state.radioDisable}
                      />
                    </div>
                  )}
                  {this.state.checkListPage === 9 && (
                    <div>
                      <Comments selectedOption={this.props.selectedOption} />
                    </div>
                  )}
                  {this.state.checkListPage === 10 && (
                    <div>
                      <NonResult selectedOption={this.props.selectedOption} />
                      <div className="result-home-button">
                        <NavLink to="/home">
                          <input
                            type="button"
                            name=""
                            value="<BACK TO HOMEPAGE"
                          />
                        </NavLink>
                      </div>
                    </div>
                  )}
                </Col>
              </Row>

              <Row>
                <Col xl={6} lg={6} md={6} sm={6} xs={6}>
                  {this.state.checkListPage > 1 &&
                    this.state.checkListPage < 11 && (
                      <div className="question-previouspage">
                        <input
                          type="button"
                          name=""
                          value="< PREVIOUS PAGE"
                          onClick={() => {
                            this.setState({
                              checkListPage: this.state.checkListPage - 1,
                            });
                          }}
                        />
                      </div>
                    )}
                </Col>
                <Col xl={6} lg={6} md={6} sm={6} xs={6}>
                  {this.state.checkListPage < 10 && (
                    <div className="question-nextpage">
                      <input
                        type="button"
                        name=""
                        value="NEXT PAGE >"
                        onClick={() => {
                          this.setState({
                            checkListPage: this.state.checkListPage + 1,
                          });
                        }}
                      />
                    </div>
                  )}
                </Col>
              </Row>

              {this.state.checkListPage < 9 && (
                <>
                  <Row>
                    <Col>
                      {this.state.previewImage.map((photo) => {
                        return (
                          <React.Fragment key={photo}>
                            <Image
                              src={photo}
                              id={photo}
                              alt=""
                              style={{
                                width: "calc(2rem + 1vw)",
                                height: "calc(2rem + 1vw)",
                                marginRight: "2px",
                              }}
                              rounded
                              onClick={() =>
                                this.setState({
                                  enlargeImage: true,
                                  selectedImage: photo,
                                })
                              }
                            />
                          </React.Fragment>
                        );
                      })}
                    </Col>
                  </Row>

                  <Modal
                    show={this.state.enlargeImage}
                    onHide={() => this.setState({ enlargeImage: false })}
                    centered
                  >
                    <Modal.Body>
                      <Image
                        alt=""
                        src={this.state.selectedImage}
                        rounded
                        style={{
                          width: "100%",
                          height: "auto",
                        }}
                      />
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        variant="secondary"
                        onClick={() => this.setState({ enlargeImage: false })}
                      >
                        Close
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </>
              )}
            </Container>
          </>
        )}
      </div>
    );
  }
}

export default NonView;
