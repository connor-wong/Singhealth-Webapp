import React, { Component } from "react";
import "../../../App.css";
import { NavLink } from "react-router-dom";
import app from "../../../services/firebase";
import UploadLogo from "../../../images/upload.png";

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
  Professionalism,
  Staff_Hygiene,
  General_Environmental_Cleanliness_Part_One,
  General_Environmental_Cleanliness_Part_Two,
  General_Safety_Part_One,
  General_Safety_Part_Two,
  Fire_Emergency_Safety,
  Electrical_Safety,
} from "../../../data/nonChecklistQuestions";

import {
  Container,
  Row,
  Col,
  Image,
  Modal,
  Button,
  Spinner,
} from "react-bootstrap";

class NonCheckList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedChoices: [
        ...Professionalism.map((data) => {
          return { id: data.id, value: data.value };
        }),
        ...Staff_Hygiene.map((data) => {
          return { id: data.id, value: data.value };
        }),
        ...General_Environmental_Cleanliness_Part_One.map((data) => {
          return { id: data.id, value: data.value };
        }),
        ...General_Environmental_Cleanliness_Part_Two.map((data) => {
          return { id: data.id, value: data.value };
        }),
        ...General_Safety_Part_One.map((data) => {
          return { id: data.id, value: data.value };
        }),
        ...General_Safety_Part_Two.map((data) => {
          return { id: data.id, value: data.value };
        }),
        ...Fire_Emergency_Safety.map((data) => {
          return { id: data.id, value: data.value };
        }),
        ...Electrical_Safety.map((data) => {
          return { id: data.id, value: data.value };
        }),
      ],
      checkListPage: 1,
      images: [],
      previewImage: [],
      enlargeImage: false,
      selectedImage: null,
      isLoading: true,
    };
    this.onSelectChoice = this.onSelectChoice.bind(this);
  }

  transmitData = () => {
    let data = JSON.parse(localStorage.getItem("Data"));

    /* Part One: Professionalism & Staff Hygiene 20% */
    var partOneQuestions = 6;
    var partOnePassScore = 0;
    for (var partOne = 0; partOne < 6; partOne++) {
      switch (data[partOne].value) {
        case "Not Applicable":
          partOneQuestions = partOneQuestions - 1;
          break;
        case "Pass":
          partOnePassScore = partOnePassScore + 1;
          break;
        case "Fail":
          break;
        default:
          return;
      }
    }

    /* Part Two: Housekeeping & General Cleanliness 40% */
    var partTwoQuestions = 12;
    var partTwoPassScore = 0;
    for (var partTwo = 6; partTwo < 18; partTwo++) {
      switch (data[partTwo].value) {
        case "Not Applicable":
          partTwoQuestions = partTwoQuestions - 1;
          break;
        case "Pass":
          partTwoPassScore = partTwoPassScore + 1;
          break;
        case "Fail":
          break;
        default:
          return;
      }
    }

    /* Part Three: Workplace Safety & Health  40% */
    var partThreeQuestions = 16;
    var partThreePassScore = 0;
    for (var partThree = 18; partThree < 34; partThree++) {
      switch (data[partThree].value) {
        case "Not Applicable":
          partThreeQuestions = partThreeQuestions - 1;
          break;
        case "Pass":
          partThreePassScore = partThreePassScore + 1;
          break;
        case "Fail":
          break;
        default:
          return;
      }
    }

    /* Score Calculation */
    var Part_One_Score = (partOnePassScore / partOneQuestions) * 20;
    var Part_Two_Score = (partTwoPassScore / partTwoQuestions) * 40;
    var Part_Three_Score = (partThreePassScore / partThreeQuestions) * 40;
    var Total_Score = Part_One_Score + Part_Two_Score + Part_Three_Score;

    /* Round Off */
    Part_One_Score = Part_One_Score.toFixed(1);
    Part_Two_Score = Part_Two_Score.toFixed(1);
    Part_Three_Score = Part_Three_Score.toFixed(1);
    Total_Score = Total_Score.toFixed(1);

    /* Local Storage */
    localStorage.setItem("Part One Score", Part_One_Score);
    localStorage.setItem("Part Two Score", Part_Two_Score);
    localStorage.setItem("Part Three Score", Part_Three_Score);
    localStorage.setItem("Total Score", Total_Score);

    /* Data Formation */
    let Email = JSON.parse(localStorage.getItem("Email"));
    let Institution = localStorage.getItem("Institution");
    let Retail_ID = JSON.parse(localStorage.getItem("Retail ID"));
    let Retail_Tenant = JSON.parse(localStorage.getItem("Retail Tenant"));
    let Retail_Type = JSON.parse(localStorage.getItem("Retail Type"));
    let Data = localStorage.getItem("Data");
    let Comments = localStorage.getItem("Comments");

    /* Store Data To Firebase */
    const db = app.firestore();
    var newAuditRef = db.collection(Institution).doc(); // Generate ID first
    let newAuditID = newAuditRef.id;

    newAuditRef.set({
      Email,
      Institution,
      Retail_ID,
      Retail_Tenant,
      Retail_Type,
      Total_Score,
      Part_One_Score,
      Part_Two_Score,
      Part_Three_Score,
      Data,
      Comments,
      created: new Date(),
    });

    /* Store Images To Firebase */
    let images = this.state.images;
    const storage = app.storage().ref(newAuditID);

    images.map((image) => {
      storage.child(image.name).put(image);
    });

    this.setState({
      checkListPage: this.state.checkListPage + 1,
    });
    //console.log("Data Stored!");
  };

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

  imageUploadHandler = (e) => {
    let images = [...this.state.images];
    images.push(...e.target.files);
    this.setState({ images });

    const filesArray = Array.from(images).map((file) =>
      URL.createObjectURL(file)
    );
    this.setState({ previewImage: filesArray });
  };

  deleteHandler = () => {
    let prevImage = this.state.previewImage;
    let images = this.state.images;
    const index = prevImage.indexOf(this.state.selectedImage);

    if (index > -1) {
      prevImage.splice(index, 1);
      images.splice(index, 1);
    }
    this.setState({ prevImage: prevImage, enlargeImage: false });
  };

  render() {
    localStorage.setItem("Data", JSON.stringify(this.state.selectedChoices));

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
                    />
                  )}
                  {this.state.checkListPage === 2 && (
                    <NonStaffHygieneQuestions
                      choiceSelect={this.onSelectChoice}
                    />
                  )}
                  {this.state.checkListPage === 3 && (
                    <NonGeneralEnvironmentalCleanlinessPartOne
                      choiceSelect={this.onSelectChoice}
                    />
                  )}
                  {this.state.checkListPage === 4 && (
                    <NonGeneralEnvironmentalCleanlinessPartTwo
                      choiceSelect={this.onSelectChoice}
                    />
                  )}
                  {this.state.checkListPage === 5 && (
                    <NonGeneralSafetyQuestionsPartOne
                      choiceSelect={this.onSelectChoice}
                    />
                  )}
                  {this.state.checkListPage === 6 && (
                    <NonGeneralSafetyQuestionsPartTwo
                      choiceSelect={this.onSelectChoice}
                    />
                  )}
                  {this.state.checkListPage === 7 && (
                    <NonFireEmergencySafetyQuestions
                      choiceSelect={this.onSelectChoice}
                    />
                  )}
                  {this.state.checkListPage === 8 && (
                    <div>
                      <NonElectricalSafetyQuestions
                        choiceSelect={this.onSelectChoice}
                      />
                    </div>
                  )}
                  {this.state.checkListPage === 9 && (
                    <div>
                      <Comments />
                      <div className="submit-data-button">
                        <input
                          type="button"
                          name=""
                          value="< Submit Audit >"
                          onClick={this.transmitData}
                        />
                      </div>
                    </div>
                  )}
                  {this.state.checkListPage === 10 && (
                    <div>
                      <NonResult />
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
                    this.state.checkListPage < 10 && (
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
                  {this.state.checkListPage < 9 && (
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
                  <Row className="image-upload">
                    <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                      <input
                        type="file"
                        id="image"
                        accept="image/*"
                        onChange={this.imageUploadHandler}
                        multiple
                      />
                      <label htmlFor="image">
                        <Image
                          className="upload-logo"
                          src={UploadLogo}
                          alt=""
                          style={{
                            width: "calc(1.5rem + 1vw)",
                            height: "auto",
                            marginRight: "10px",
                          }}
                        />
                        Upload Images
                      </label>
                    </Col>
                  </Row>
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
                      <Button variant="primary" onClick={this.deleteHandler}>
                        Remove
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

export default NonCheckList;
