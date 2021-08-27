import React, { Component } from "react";
import "../../../App.css";
import { NavLink } from "react-router-dom";
import app from "../../../services/firebase";

import ProfessionalismQuestions from "./ProfessionalismQuestions";
import {
  StaffHygieneQuestionsPartOne,
  StaffHygieneQuestionsPartTwo,
} from "../F&B/StaffHygieneQuestions";
import {
  GeneralEnvironmentalCleanlinessPartOne,
  GeneralEnvironmentalCleanlinessPartTwo,
  GeneralEnvironmentalCleanlinessPartThree,
} from "./GeneralEnvironmentalCleaninessQuestions";
import HandHygieneFacilitiesQuestions from "./HandHygieneFacilitiesQuestions";
import {
  StoragePreparationOfFoodQuestionsPartOne,
  StoragePreparationOfFoodQuestionsPartTwo,
  StoragePreparationOfFoodQuestionsPartThree,
  StoragePreparationOfFoodQuestionsPartFour,
} from "./StoragePreparationOfFoodQuestions";
import {
  StorageOfFoodInRefrigeratorWarmerQuestionsPartOne,
  StorageOfFoodInRefrigeratorWarmerQuestionsPartTwo,
} from "./StorageOfFoodInRefrigeratorWarmerQuestions";
import FoodQuestions from "./FoodQuestions";
import BeverageQuestions from "./BeverageQuestions";
import {
  GeneralSafetyQuestionsPartOne,
  GeneralSafetyQuestionsPartTwo,
} from "./GeneralSafetyQuestions";
import FireEmergencySafetyQuestions from "./FireEmergencySafetyQuestions";
import ElectricalSafetyQuestions from "./ElectricalSafetyQuestions";
import Result from "../../selections-dev/Result";
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

class View extends Component {
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
        localStorage.setItem("Part Four Score", data.Part_Four_Score);
        localStorage.setItem("Part Five Score", data.Part_Five_Score);
      });
  };

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
                    <ProfessionalismQuestions
                      choiceSelect={this.onSelectChoice}
                      selectedOption={this.props.selectedOption}
                      radioDisable={this.state.radioDisable}
                    />
                  )}
                  {this.state.checkListPage === 2 && (
                    <StaffHygieneQuestionsPartOne
                      choiceSelect={this.onSelectChoice}
                      selectedOption={this.props.selectedOption}
                      radioDisable={this.state.radioDisable}
                    />
                  )}
                  {this.state.checkListPage === 3 && (
                    <StaffHygieneQuestionsPartTwo
                      choiceSelect={this.onSelectChoice}
                      selectedOption={this.props.selectedOption}
                      radioDisable={this.state.radioDisable}
                    />
                  )}
                  {this.state.checkListPage === 4 && (
                    <GeneralEnvironmentalCleanlinessPartOne
                      choiceSelect={this.onSelectChoice}
                      selectedOption={this.props.selectedOption}
                      radioDisable={this.state.radioDisable}
                    />
                  )}
                  {this.state.checkListPage === 5 && (
                    <GeneralEnvironmentalCleanlinessPartTwo
                      choiceSelect={this.onSelectChoice}
                      selectedOption={this.props.selectedOption}
                      radioDisable={this.state.radioDisable}
                    />
                  )}
                  {this.state.checkListPage === 6 && (
                    <GeneralEnvironmentalCleanlinessPartThree
                      choiceSelect={this.onSelectChoice}
                      selectedOption={this.props.selectedOption}
                      radioDisable={this.state.radioDisable}
                    />
                  )}
                  {this.state.checkListPage === 7 && (
                    <HandHygieneFacilitiesQuestions
                      choiceSelect={this.onSelectChoice}
                      selectedOption={this.props.selectedOption}
                      radioDisable={this.state.radioDisable}
                    />
                  )}
                  {this.state.checkListPage === 8 && (
                    <StoragePreparationOfFoodQuestionsPartOne
                      choiceSelect={this.onSelectChoice}
                      selectedOption={this.props.selectedOption}
                      radioDisable={this.state.radioDisable}
                    />
                  )}
                  {this.state.checkListPage === 9 && (
                    <StoragePreparationOfFoodQuestionsPartTwo
                      choiceSelect={this.onSelectChoice}
                      selectedOption={this.props.selectedOption}
                      radioDisable={this.state.radioDisable}
                    />
                  )}
                  {this.state.checkListPage === 10 && (
                    <StoragePreparationOfFoodQuestionsPartThree
                      choiceSelect={this.onSelectChoice}
                      selectedOption={this.props.selectedOption}
                      radioDisable={this.state.radioDisable}
                    />
                  )}
                  {this.state.checkListPage === 11 && (
                    <StoragePreparationOfFoodQuestionsPartFour
                      choiceSelect={this.onSelectChoice}
                      selectedOption={this.props.selectedOption}
                      radioDisable={this.state.radioDisable}
                    />
                  )}
                  {this.state.checkListPage === 12 && (
                    <StorageOfFoodInRefrigeratorWarmerQuestionsPartOne
                      choiceSelect={this.onSelectChoice}
                      selectedOption={this.props.selectedOption}
                      radioDisable={this.state.radioDisable}
                    />
                  )}
                  {this.state.checkListPage === 13 && (
                    <StorageOfFoodInRefrigeratorWarmerQuestionsPartTwo
                      choiceSelect={this.onSelectChoice}
                      selectedOption={this.props.selectedOption}
                      radioDisable={this.state.radioDisable}
                    />
                  )}
                  {this.state.checkListPage === 14 && (
                    <FoodQuestions
                      choiceSelect={this.onSelectChoice}
                      selectedOption={this.props.selectedOption}
                      radioDisable={this.state.radioDisable}
                    />
                  )}
                  {this.state.checkListPage === 15 && (
                    <BeverageQuestions
                      choiceSelect={this.onSelectChoice}
                      selectedOption={this.props.selectedOption}
                      radioDisable={this.state.radioDisable}
                    />
                  )}
                  {this.state.checkListPage === 16 && (
                    <GeneralSafetyQuestionsPartOne
                      choiceSelect={this.onSelectChoice}
                      selectedOption={this.props.selectedOption}
                      radioDisable={this.state.radioDisable}
                    />
                  )}
                  {this.state.checkListPage === 17 && (
                    <GeneralSafetyQuestionsPartTwo
                      choiceSelect={this.onSelectChoice}
                      selectedOption={this.props.selectedOption}
                      radioDisable={this.state.radioDisable}
                    />
                  )}
                  {this.state.checkListPage === 18 && (
                    <FireEmergencySafetyQuestions
                      choiceSelect={this.onSelectChoice}
                      selectedOption={this.props.selectedOption}
                      radioDisable={this.state.radioDisable}
                    />
                  )}
                  {this.state.checkListPage === 19 && (
                    <div>
                      <ElectricalSafetyQuestions
                        choiceSelect={this.onSelectChoice}
                        selectedOption={this.props.selectedOption}
                        radioDisable={this.state.radioDisable}
                      />
                    </div>
                  )}
                  {this.state.checkListPage === 20 && (
                    <div>
                      <Comments selectedOption={this.props.selectedOption} />
                    </div>
                  )}
                  {this.state.checkListPage === 21 && (
                    <div>
                      <Result selectedOption={this.props.selectedOption} />
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

              <Row className="question-page-buttons">
                <Col xl={6} lg={6} md={6} sm={6} xs={6}>
                  {this.state.checkListPage > 1 &&
                    this.state.checkListPage < 22 && (
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
                  {this.state.checkListPage < 21 && (
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

              {this.state.checkListPage < 20 && (
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

export default View;
