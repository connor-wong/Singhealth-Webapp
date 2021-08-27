import React, { Component } from "react";
import "../../App.css";
import app from "../../services/firebase";
import { NavLink } from "react-router-dom";
import smallsinghealth from "../../images/singhealth-logo.png";
import wave from "../../images/wave.svg";

import CheckList from "../checklist-dev/F&B/Checklist";
import NonCheckList from "../checklist-dev/Non-F&B/Non-Checklist";
import RetailSelection from "./RetailTenantSelection";
import NonEdit from "../checklist-dev/Non-F&B/Non-Edit";
import Edit from "../checklist-dev/F&B/Edit";
import NonView from "../checklist-dev/Non-F&B/Non-View";
import View from "../checklist-dev/F&B/View";
import Graphic from "../selections-dev/Graphic";

import DeleteLogo from "../../images/delete.png";
import EditLogo from "../../images/edit.png";
import ViewLogo from "../../images/view.png";
import DownloadLogo from "../../images/download.png";

import CsvDownload from "react-json-to-csv";

import {
  Container,
  Row,
  Col,
  Table,
  Spinner,
  Modal,
  Button,
  Image,
} from "react-bootstrap";

class Options extends Component {
  constructor() {
    super();
    this.state = {
      editData: [],
      allData: [],
      viewData: [],
      personalData: [],
      personal_doc_id: [],
      all_doc_id: [],
      selectedOption: "",
      selectionPage: 1,
      tablePage: 1,
      selected_doc_id: "",
      deleteClarification: false,
      delete_doc_id: null,
      editClarification: false,
      edit_doc_id: null,
      viewClarification: false,
      view_doc_id: null,
      downloadClarification: false,
      download_doc_id: null,
      _isMounted: false,
      isLoading: true,
      /* For JSON to CSV */
      date: {},
      email: {},
      institution: {},
      retailTenant: {},
      retailID: {},
      retailType: {},
      partOneScore: {},
      partTwoScore: {},
      partThreeScore: {},
      partFourScore: {},
      partFiveScore: {},
      totalScore: {},
      comments: {},
      data: {},
      mergedData: {},
    };
    this.onSelectionOption = this.onSelectionOption.bind(this);
    this.onEditHandler = this.onEditHandler.bind(this);
    this.onDeleteHandler = this.onDeleteHandler.bind(this);
    this.onViewHandler = this.onViewHandler.bind(this);
    this.onDownloadHandler = this.onDownloadHandler.bind(this);
  }

  onSelectionOption(e) {
    this.setState({
      selectedOption: e.target.name,
    });
  }

  onFilterChange = () => {
    this.getPersonalData();
    this.getData();

    this.setState({
      tablePage: this.state.tablePage + 1,
    });
  };

  /* Delete Document */
  onDeleteHandler(e) {
    const db = app.firestore();
    let Institution = localStorage.getItem("Institution");
    let doc_id = e.target.value;

    /* Delete Document From FireStore */
    db.collection(Institution).doc(doc_id).delete();
    this.setState({
      deleteClarification: false,
      delete_doc_id: null,
      allData: [],
      tablePage: 1,
      isLoading: true,
    });

    /* Delete Photo Collection From Storage */
    const storage = app.storage().ref();

    storage
      .child(doc_id)
      .listAll()
      .then((result) => {
        result.items.forEach((file) => {
          file.delete();
        });
      });
  }

  /* Edit Document */
  onEditHandler(e) {
    const db = app.firestore();
    let Institution = localStorage.getItem("Institution");
    let doc_id = e.target.value;
    db.collection(Institution)
      .doc(doc_id)
      .get()
      .then((doc) => {
        localStorage.setItem("EditData", doc.data().Data);
        localStorage.setItem("Comments", doc.data().Comments);
        this.setState({
          editClarification: false,
          selected_doc_id: doc_id,
          selectedOption: "edit",
          editData: JSON.parse(localStorage.getItem("EditData")),
        });
      });
  }

  /* View Document */
  onViewHandler(e) {
    const db = app.firestore();
    let Institution = localStorage.getItem("Institution");
    let doc_id = e.target.value;
    db.collection(Institution)
      .doc(doc_id)
      .get()
      .then((doc) => {
        localStorage.setItem("ViewData", doc.data().Data);
        localStorage.setItem("Comments", doc.data().Comments);
        this.setState({
          viewClarification: false,
          selected_doc_id: doc_id,
          selectedOption: "view",
          viewData: JSON.parse(localStorage.getItem("ViewData")),
        });
      });
  }

  /* Download Document */
  onDownloadHandler(e) {
    const db = app.firestore();
    let Institution = localStorage.getItem("Institution");
    let doc_id = e.target.value;

    if (this.props.retailType == "Non-F&B") {
      db.collection(Institution)
        .doc(doc_id)
        .get()
        .then((doc) => {
          this.setState({
            date: new Date(
              doc.data().created.seconds * 1000
            ).toLocaleDateString("en-US"),
            email: doc.data().Email,
            institution: doc.data().Institution,
            retailTenant: doc.data().Retail_Tenant,
            retailID: doc.data().Retail_ID,
            retailType: doc.data().Retail_Type,
            partOneScore: doc.data().Part_One_Score,
            partTwoScore: doc.data().Part_Two_Score,
            partThreeScore: doc.data().Part_Three_Score,
            totalScore: doc.data().Total_Score,
            comments: doc.data().Comments,
            data: JSON.parse(doc.data().Data),
          });

          const mergedData = [
            ...[
              ["Date", this.state.date],
              ["Email", this.state.email],
              ["Institution", this.state.institution],
              ["Retail Tenant", this.state.retailTenant],
              ["Retail ID", this.state.retailID],
              ["Retail Type", this.state.retailType],
              ["Professionalism & Staff Hygiene 20%", this.state.partOneScore],
              [
                "Housekeeping & General Cleanliness 40%",
                this.state.partTwoScore,
              ],
              ["Workplace Safety & Health 40%", this.state.partThreeScore],
              ["Total Score 100%", this.state.totalScore],
              ["Comments", this.state.comments],
              [],
              ["Audit Data"],
            ],
            ...this.state.data.map((data) => {
              return [data.id, data.value];
            }),
          ];

          this.setState({ mergedData: mergedData });
        });
    } else {
      db.collection(Institution)
        .doc(doc_id)
        .get()
        .then((doc) => {
          this.setState({
            date: new Date(
              doc.data().created.seconds * 1000
            ).toLocaleDateString("en-US"),
            email: doc.data().Email,
            institution: doc.data().Institution,
            retailTenant: doc.data().Retail_Tenant,
            retailID: doc.data().Retail_ID,
            retailType: doc.data().Retail_Type,
            partOneScore: doc.data().Part_One_Score,
            partTwoScore: doc.data().Part_Two_Score,
            partThreeScore: doc.data().Part_Three_Score,
            partFourScore: doc.data().Part_Four_Score,
            partFiveScore: doc.data().Part_Five_Score,
            totalScore: doc.data().Total_Score,
            comments: doc.data().Comments,
            data: JSON.parse(doc.data().Data),
          });

          const mergedData = [
            ...[
              ["Date", this.state.date],
              ["Email", this.state.email],
              ["Institution", this.state.institution],
              ["Retail Tenant", this.state.retailTenant],
              ["Retail ID", this.state.retailID],
              ["Retail Type", this.state.retailType],
              ["Professionalism & Staff Hygiene 10%", this.state.partOneScore],
              [
                "Housekeeping & General Cleanliness 20%",
                this.state.partTwoScore,
              ],
              ["Food Hygiene 35%", this.state.partThreeScore],
              ["Healthier Choice 15%", this.state.partFourScore],
              ["Workplace Safety & Health 20%", this.state.partFiveScore],
              ["Total Score 100%", this.state.totalScore],
              ["Comments", this.state.comments],
              [],
              ["Audit Data"],
            ],
            ...this.state.data.map((data) => {
              return [data.id, data.value];
            }),
          ];

          this.setState({ mergedData: mergedData });
        });
    }
  }

  getData() {
    let allData = [];
    let all_doc_id = [];
    let Institution = localStorage.getItem("Institution");
    let Retail_Tenant = JSON.parse(localStorage.getItem("Retail Tenant"));
    const db = app.firestore();

    /* Get All Documents */
    db.collection(Institution)
      .where("Retail_Tenant", "==", Retail_Tenant)
      .orderBy("created", "desc")
      .limit(5)
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          allData.push(doc.data());
          all_doc_id.push(doc.id);
          this.setState({
            allData: allData,
            all_doc_id: all_doc_id,
          });
        });
      });
  }

  getPersonalData() {
    let personalData = [];
    let personal_doc_id = [];
    let Institution = localStorage.getItem("Institution");
    let Retail_Tenant = JSON.parse(localStorage.getItem("Retail Tenant"));
    let Email = JSON.parse(localStorage.getItem("Email"));

    const db = app.firestore();

    /* Get All Personal Documents */
    db.collection(Institution)
      .where("Retail_Tenant", "==", Retail_Tenant)
      .where("Email", "==", Email)
      .orderBy("created", "desc")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          personalData.push(doc.data());
          personal_doc_id.push(doc.id);
          this.setState({
            personalData: personalData,
            personal_doc_id: personal_doc_id,
          });
        });
      });
  }

  componentDidMount() {
    this.setState({ _isMounted: true, allData: [] });
  }

  componentWillUnmount() {
    this.setState({ _isMounted: false });
  }

  render() {
    let allData = this.state.allData;
    let personalData = this.state.personalData;
    let personal_doc_id = this.state.personal_doc_id;
    let all_doc_id = this.state.all_doc_id;
    let role = localStorage.getItem("Role");

    localStorage.setItem("Data", []);
    localStorage.setItem("EditData", []);
    localStorage.setItem("ViewData", []);
    localStorage.setItem("Total Score", "");
    localStorage.setItem("Part One Score", "");
    localStorage.setItem("Part Two Score", "");
    localStorage.setItem("Part Three Score", "");
    localStorage.setItem("Part Four Score", "");
    localStorage.setItem("Part Five Score", "");

    return (
      <div>
        {this.state.isLoading == true ? (
          <>
            {setTimeout(() => {
              this.setState({ isLoading: false }, this.getData());
              localStorage.setItem("Comments", "");
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
            {this.state.selectionPage === 0 && (
              <RetailSelection
                selectedInstitution={this.props.selectedInstitution}
              />
            )}

            {this.state.selectionPage === 1 && (
              <Container className="text-center options-page" fluid>
                {this.state.selectedOption === "" && (
                  <div>
                    <Row className="space"></Row>
                    <Row>
                      <Col className="option-retail-header">
                        <h3>{this.props.retailName}</h3>
                      </Col>
                      <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                        <div className="option-previouspage">
                          <input
                            type="button"
                            name=""
                            value="< PREVIOUS PAGE"
                            onClick={() => {
                              this.setState({
                                selectionPage: 0,
                              });
                            }}
                          />
                        </div>
                      </Col>
                    </Row>

                    <Row>
                      <Col
                        className="options-page-buttons"
                        xl={6}
                        lg={12}
                        md={12}
                        sm={12}
                        xs={12}
                      >
                        <div className="buttons">
                          <input
                            type="button"
                            name="create"
                            value="Create New Audit"
                            onClick={this.onSelectionOption}
                          />
                        </div>
                        <div className="buttons">
                          <NavLink to="/home">
                            <input
                              type="button"
                              name=""
                              value="<BACK TO HOMEPAGE"
                            />
                          </NavLink>
                        </div>
                      </Col>

                      <Col xl={6} lg={12} md={12} sm={12} xs={12}>
                        {this.state.tablePage === 1 && (
                          <div>
                            <Row>
                              <Col
                                className="box-top"
                                xl={12}
                                lg={12}
                                md={12}
                                sm={12}
                                xs={12}
                              >
                                <Row>
                                  <Col xl={6} lg={6} md={6} sm={6} xs={6}>
                                    <div className="graphic-button">
                                      <input
                                        type="button"
                                        value="Generate Graphic"
                                        onClick={() => {
                                          this.setState({
                                            selectionPage: 2,
                                          });
                                        }}
                                      />
                                    </div>
                                  </Col>
                                  <Col xl={6} lg={6} md={6} sm={6} xs={6}>
                                    <div className="filter-button">
                                      <input
                                        type="button"
                                        name=""
                                        value="View Personal Audits"
                                        onClick={this.onFilterChange}
                                      />
                                    </div>
                                  </Col>
                                </Row>
                              </Col>
                            </Row>

                            <Row>
                              <Col
                                className="box"
                                xl={12}
                                lg={12}
                                md={12}
                                sm={12}
                                xs={12}
                              >
                                <Table
                                  size="sm"
                                  responsive
                                  className="option-table"
                                >
                                  {role === "admin" && (
                                    <>
                                      <thead>
                                        <tr>
                                          <th>Date</th>
                                          <th>Done by</th>
                                          <th>Score</th>
                                          <th>View</th>
                                          <th>Edit</th>
                                          <th>Delete</th>
                                          <th>Download</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {allData.map((allData, index) => {
                                          return (
                                            <tr key={index}>
                                              <td>
                                                {new Date(
                                                  allData.created.seconds * 1000
                                                ).toLocaleDateString(
                                                  "en-US"
                                                )}{" "}
                                              </td>

                                              <td>{allData.Email}</td>
                                              <td>{allData.Total_Score}%</td>
                                              <td>
                                                <input
                                                  className="view-image-button"
                                                  value={all_doc_id[index]}
                                                  type="image"
                                                  src={ViewLogo}
                                                  alt="view"
                                                  name="view"
                                                  onClick={(e) => {
                                                    this.setState({
                                                      viewClarification: true,
                                                      view_doc_id:
                                                        e.target.value,
                                                    });
                                                  }}
                                                />
                                              </td>
                                              <td>
                                                <input
                                                  className="edit-image-button"
                                                  value={all_doc_id[index]}
                                                  type="image"
                                                  src={EditLogo}
                                                  alt="Edit"
                                                  name="edit"
                                                  onClick={(e) => {
                                                    this.setState({
                                                      editClarification: true,
                                                      edit_doc_id:
                                                        e.target.value,
                                                    });
                                                  }}
                                                />
                                              </td>
                                              <td>
                                                <input
                                                  className="delete-image-button"
                                                  value={all_doc_id[index]}
                                                  type="image"
                                                  src={DeleteLogo}
                                                  alt="Delete"
                                                  name="delete"
                                                  onClick={(e) =>
                                                    this.setState({
                                                      deleteClarification: true,
                                                      delete_doc_id:
                                                        e.target.value,
                                                    })
                                                  }
                                                />
                                              </td>
                                              <td>
                                                <input
                                                  className="download-image-button"
                                                  value={all_doc_id[index]}
                                                  type="image"
                                                  src={DownloadLogo}
                                                  alt="Download"
                                                  name="download"
                                                  onClick={(e) =>
                                                    this.setState(
                                                      {
                                                        downloadClarification: true,
                                                        download_doc_id:
                                                          e.target.value,
                                                      },
                                                      this.onDownloadHandler(e)
                                                    )
                                                  }
                                                />
                                              </td>
                                            </tr>
                                          );
                                        })}
                                      </tbody>
                                    </>
                                  )}
                                  {role === "user" && (
                                    <>
                                      <thead>
                                        <tr>
                                          <th>Date</th>
                                          <th>Done by</th>
                                          <th>Score</th>
                                          <th>View</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {allData.map((allData, index) => {
                                          return (
                                            <tr key={index}>
                                              <td>
                                                {new Date(
                                                  allData.created.seconds * 1000
                                                ).toLocaleDateString(
                                                  "en-US"
                                                )}{" "}
                                              </td>

                                              <td>{allData.Email}</td>
                                              <td>{allData.Total_Score}%</td>
                                              <td>
                                                <input
                                                  className="view-image-button"
                                                  value={all_doc_id[index]}
                                                  type="image"
                                                  src={ViewLogo}
                                                  alt="view"
                                                  name="view"
                                                  onClick={(e) => {
                                                    this.setState({
                                                      viewClarification: true,
                                                      view_doc_id:
                                                        e.target.value,
                                                    });
                                                  }}
                                                />
                                              </td>
                                            </tr>
                                          );
                                        })}
                                      </tbody>
                                    </>
                                  )}
                                </Table>
                              </Col>
                            </Row>
                          </div>
                        )}

                        {this.state.tablePage === 2 && (
                          <div>
                            <Row>
                              <Col
                                className="box-top"
                                xl={12}
                                lg={12}
                                md={12}
                                sm={12}
                                xs={12}
                              >
                                <Row>
                                  <Col xl={6} lg={6} md={6} sm={6} xs={6}></Col>
                                  <Col xl={6} lg={6} md={6} sm={6} xs={6}>
                                    <div className="filter-button">
                                      <input
                                        type="button"
                                        name=""
                                        value="View Recent Audits"
                                        onClick={() => {
                                          this.setState({
                                            tablePage: this.state.tablePage - 1,
                                          });
                                        }}
                                      />
                                    </div>
                                  </Col>
                                </Row>
                              </Col>
                            </Row>

                            <Row>
                              <Col
                                className="box"
                                xl={12}
                                lg={12}
                                md={12}
                                sm={12}
                                xs={12}
                              >
                                <Table
                                  size="sm"
                                  responsive
                                  className="option-table"
                                >
                                  <thead>
                                    <tr>
                                      <th>Date</th>
                                      <th>Score</th>
                                      <th>Edit</th>
                                      <th>Delete</th>
                                      <th>Download</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {personalData.map((personalData, index) => {
                                      return (
                                        <tr key={index}>
                                          <td>
                                            {new Date(
                                              personalData.created.seconds *
                                                1000
                                            ).toLocaleDateString("en-US")}
                                          </td>

                                          <td>{personalData.Total_Score}%</td>
                                          <td>
                                            <input
                                              className="edit-image-button"
                                              value={personal_doc_id[index]}
                                              type="image"
                                              src={EditLogo}
                                              alt="Edit"
                                              name="edit"
                                              onClick={(e) => {
                                                this.setState({
                                                  editClarification: true,
                                                  edit_doc_id: e.target.value,
                                                });
                                              }}
                                            />
                                          </td>
                                          <td>
                                            <input
                                              className="delete-image-button"
                                              value={personal_doc_id[index]}
                                              type="image"
                                              src={DeleteLogo}
                                              alt="Delete"
                                              name="delete"
                                              onClick={(e) =>
                                                this.setState({
                                                  deleteClarification: true,
                                                  delete_doc_id: e.target.value,
                                                })
                                              }
                                            />
                                          </td>
                                          <td>
                                            <input
                                              className="download-image-button"
                                              value={personal_doc_id[index]}
                                              type="image"
                                              src={DownloadLogo}
                                              alt="Download"
                                              name="download"
                                              onClick={(e) =>
                                                this.setState(
                                                  {
                                                    downloadClarification: true,
                                                    download_doc_id:
                                                      e.target.value,
                                                  },
                                                  this.onDownloadHandler(e)
                                                )
                                              }
                                            />
                                          </td>
                                        </tr>
                                      );
                                    })}
                                  </tbody>
                                </Table>
                              </Col>
                            </Row>
                          </div>
                        )}
                      </Col>
                    </Row>
                  </div>
                )}

                <Modal
                  show={this.state.deleteClarification}
                  onHide={() => this.setState({ deleteClarification: false })}
                  centered
                >
                  <Modal.Header>
                    <Modal.Title>
                      <h3
                        style={{
                          fontFamily: "Monospace",
                          fontWeight: "Bold",
                          fontSize: "calc(0.5em + 0.5vw)",
                        }}
                      >
                        Press Confirm To Delete Audit Record
                      </h3>
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Footer>
                    <Button
                      variant="secondary"
                      onClick={() =>
                        this.setState({
                          deleteClarification: false,
                          delete_doc_id: null,
                        })
                      }
                    >
                      Close
                    </Button>
                    <Button
                      variant="primary"
                      value={this.state.delete_doc_id}
                      onClick={this.onDeleteHandler}
                    >
                      Confirm
                    </Button>
                  </Modal.Footer>
                </Modal>

                <Modal
                  show={this.state.editClarification}
                  onHide={() => this.setState({ editClarification: false })}
                  centered
                >
                  <Modal.Header>
                    <Modal.Title>
                      <h3
                        style={{
                          fontFamily: "Monospace",
                          fontWeight: "Bold",
                          fontSize: "calc(0.5em + 0.5vw)",
                        }}
                      >
                        Press Confirm To Edit Audit Record
                      </h3>
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Footer>
                    <Button
                      variant="secondary"
                      onClick={() =>
                        this.setState({
                          editClarification: false,
                          edit_doc_id: null,
                        })
                      }
                    >
                      Close
                    </Button>
                    <Button
                      variant="primary"
                      value={this.state.edit_doc_id}
                      onClick={this.onEditHandler}
                    >
                      Confirm
                    </Button>
                  </Modal.Footer>
                </Modal>

                <Modal
                  show={this.state.viewClarification}
                  onHide={() => this.setState({ viewClarification: false })}
                  centered
                >
                  <Modal.Header>
                    <Modal.Title>
                      <h3
                        style={{
                          fontFamily: "Monospace",
                          fontWeight: "Bold",
                          fontSize: "calc(0.5em + 0.5vw)",
                        }}
                      >
                        Press Confirm To View Audit Record
                      </h3>
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Footer>
                    <Button
                      variant="secondary"
                      onClick={() =>
                        this.setState({
                          viewClarification: false,
                          view_doc_id: null,
                        })
                      }
                    >
                      Close
                    </Button>
                    <Button
                      variant="primary"
                      value={this.state.view_doc_id}
                      onClick={this.onViewHandler}
                    >
                      Confirm
                    </Button>
                  </Modal.Footer>
                </Modal>

                <Modal
                  show={this.state.downloadClarification}
                  onHide={() => this.setState({ downloadClarification: false })}
                  centered
                >
                  <Modal.Header>
                    <Modal.Title>
                      <h3
                        style={{
                          fontFamily: "Monospace",
                          fontWeight: "Bold",
                          fontSize: "calc(0.5em + 0.5vw)",
                        }}
                      >
                        Press Confirm To Download Audit Record
                      </h3>
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Footer>
                    <Button
                      variant="secondary"
                      onClick={() =>
                        this.setState({
                          downloadClarification: false,
                          download_doc_id: null,
                        })
                      }
                    >
                      Close
                    </Button>
                    <CsvDownload
                      data={this.state.mergedData}
                      filename={this.state.download_doc_id + ".csv"}
                      style={{
                        backgroundColor: "#2f7dfa",
                        borderRadius: "6px",
                        border: "1px solid #2f7dfa",
                        display: "inline-block",
                        cursor: "pointer",
                        color: "#ffffff",
                        fontSize: "15px",
                        padding: "6px 24px",
                        textDecoration: "none",
                      }}
                    >
                      Confirm
                    </CsvDownload>
                  </Modal.Footer>
                </Modal>
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
            )}
            {this.state.selectionPage === 2 && (
              <>
                <div className="back-to-option">
                  <input
                    type="button"
                    name="create"
                    value="Back to Options"
                    onClick={() =>
                      this.setState({
                        isLoading: true,
                        selectionPage: 1,
                      })
                    }
                  />
                </div>
                <Graphic retailType={this.props.retailType} />
              </>
            )}

            {this.state.selectedOption === "create" && (
              <div>
                {this.props.retailType === "F&B" && (
                  <div>
                    <CheckList
                      retailName={this.props.retailName}
                      selectedInstitution={this.props.selectedInstitution}
                    />
                    <div className="back-to-option">
                      <input
                        type="button"
                        name="create"
                        value="Back to Options"
                        onClick={() =>
                          this.setState({
                            selectedOption: "",
                            allData: [],
                            isLoading: true,
                          })
                        }
                      />
                    </div>
                  </div>
                )}
                {this.props.retailType === "Non-F&B" && (
                  <div>
                    <NonCheckList
                      retailName={this.props.retailName}
                      selectedInstitution={this.props.selectedInstitution}
                    />
                    <div className="back-to-option">
                      <input
                        type="button"
                        name="create"
                        value="Back to Options"
                        onClick={() =>
                          this.setState({
                            selectedOption: "",
                            allData: [],
                            isLoading: true,
                          })
                        }
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
            {this.state.selectedOption === "edit" && (
              <div>
                {this.props.retailType === "F&B" && (
                  <div>
                    <Edit
                      retailName={this.props.retailName}
                      selectedInstitution={this.props.selectedInstitution}
                      doc_id={this.state.selected_doc_id}
                      selectedOption={this.state.selectedOption}
                      editData={this.state.editData}
                    />
                    <div className="back-to-option">
                      <input
                        type="button"
                        name="edit"
                        value="Back to Options"
                        onClick={() =>
                          this.setState({
                            selectedOption: "",
                            allData: [],
                            tablePage: 1,
                            isLoading: true,
                          })
                        }
                      />
                    </div>
                  </div>
                )}
                {this.props.retailType === "Non-F&B" && (
                  <div>
                    <NonEdit
                      retailName={this.props.retailName}
                      selectedInstitution={this.props.selectedInstitution}
                      doc_id={this.state.selected_doc_id}
                      selectedOption={this.state.selectedOption}
                      editData={this.state.editData}
                    />
                    <div className="back-to-option">
                      <input
                        type="button"
                        name="edit"
                        value="Back to Options"
                        onClick={() =>
                          this.setState({
                            selectedOption: "",
                            allData: [],
                            tablePage: 1,
                            isLoading: true,
                          })
                        }
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
            {this.state.selectedOption === "view" && (
              <div>
                {this.props.retailType === "F&B" && (
                  <div>
                    <View
                      retailName={this.props.retailName}
                      selectedInstitution={this.props.selectedInstitution}
                      doc_id={this.state.selected_doc_id}
                      selectedOption={this.state.selectedOption}
                      viewData={this.state.viewData}
                    />
                    <div className="back-to-option">
                      <input
                        type="button"
                        name="view"
                        value="Back to Options"
                        onClick={() =>
                          this.setState({
                            selectedOption: "",
                            allData: [],
                            tablePage: 1,
                            isLoading: true,
                          })
                        }
                      />
                    </div>
                  </div>
                )}
                {this.props.retailType === "Non-F&B" && (
                  <div>
                    <NonView
                      retailName={this.props.retailName}
                      selectedInstitution={this.props.selectedInstitution}
                      doc_id={this.state.selected_doc_id}
                      selectedOption={this.state.selectedOption}
                      viewData={this.state.viewData}
                    />
                    <div className="back-to-option">
                      <input
                        type="button"
                        name="view"
                        value="Back to Options"
                        onClick={() =>
                          this.setState({
                            selectedOption: "",
                            allData: [],
                            tablePage: 1,
                            isLoading: true,
                          })
                        }
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    );
  }
}

export default Options;
