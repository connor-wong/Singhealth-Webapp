import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "../../App.css";
import smallsinghealth from "../../images/singhealth-logo.png";
import wave from "../../images/wave.svg";
import {
  Academia,
  BVH,
  CGH,
  KKH,
  NCCS,
  NHCS,
  OCH,
  SGH,
  SKH,
} from "../../data/retailTenant";
import Options from "./Options";
import InstitutionSelection from "./InstitutionSelection";

import { Container, Row, Col, Image } from "react-bootstrap";

class RetailSelection extends Component {
  constructor() {
    super();
    this.state = {
      retailName: "",
      retailID: "",
      retailType: "",
      selectionPage: 1,
    };
    this.onSelectRetail = this.onSelectRetail.bind(this);
    this.onSelectHandler = this.onSelectHandler.bind(this);
  }

  onSelectHandler() {
    const optionsContainer = document.querySelector(".options-container");
    const searchBox = document.querySelector(".search-box input");
    const optionsList = document.querySelectorAll(".option");

    /* toggling dropdown list */
    optionsContainer.classList.toggle("active");

    /*searching for the value*/
    const filterList = (searchTerm) => {
      searchTerm = searchTerm.toLowerCase();
      optionsList.forEach((option) => {
        let label =
          option.firstElementChild.nextElementSibling.innerText.toLowerCase();
        if (label.indexOf(searchTerm) !== -1) {
          option.style.display = "block";
        } else {
          option.style.display = "none";
        }
      });
    };

    /* getting value from searchbox*/
    searchBox.addEventListener("keyup", function (e) {
      filterList(e.target.value);
    });
  }

  onSelectRetail(e) {
    const selected = document.querySelector(".selected");
    const optionsList = document.querySelectorAll(".option");
    const optionsContainer = document.querySelector(".options-container");

    /* get selected option and remove dropdown list */
    optionsList.forEach((o) => {
      o.addEventListener("click", () => {
        selected.innerHTML = o.querySelector("label").innerHTML;
        optionsContainer.classList.remove("active");
        this.setState({
          retailName: o.querySelector("label").innerHTML,
        });
      });
    });

    this.setState({
      retailID: e.target.id,
      retailType: e.target.name,
    });
  }

  render() {
    localStorage.setItem(
      "Retail Tenant",
      JSON.stringify(this.state.retailName)
    );
    localStorage.setItem("Retail ID", JSON.stringify(this.state.retailID));
    localStorage.setItem("Retail Type", JSON.stringify(this.state.retailType));

    let institution = localStorage.getItem("Institution");

    return (
      <div>
        {this.state.selectionPage === 0 && <NavLink to="/home" />}
        {this.state.selectionPage === 1 && (
          <Container className="text-center" fluid>
            <Row className="space"></Row>
            <Row className="retail-buttons">
              <Col xl={6} lg={6} md={6} sm={6} xs={6}>
                <div className="homepage-retail">
                  <NavLink to="/home">
                    <input type="button" name="" value="<BACK TO HOMEPAGE" />
                  </NavLink>
                </div>
              </Col>
              <Col xl={6} lg={6} md={6} sm={6} xs={6}>
                {this.state.retailName !== undefined &&
                  this.state.retailName !== "" && (
                    <div className="retail-nextpage">
                      <input
                        type="button"
                        name=""
                        value="NEXT PAGE >"
                        onClick={() => {
                          this.setState({
                            selectionPage: this.state.selectionPage + 1,
                          });
                        }}
                      />
                    </div>
                  )}
              </Col>
            </Row>
            <Row>
              <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                {institution === "Academia" && (
                  <div className="container">
                    <h6>Please select retail store @ {institution}</h6>
                    <div className="select-box" onClick={this.onSelectRetail}>
                      <div className="options-container">
                        {Academia.map((store) => (
                          <div
                            className="option"
                            key={store.id}
                            onClick={this.onSelectRetail}
                          >
                            <input
                              type="radio"
                              className="radio"
                              value={store.store}
                              id={store.id}
                              name={store.type}
                            />
                            <label htmlFor={store.id}>{store.store}</label>
                          </div>
                        ))}
                      </div>
                      <div className="selected" onClick={this.onSelectHandler}>
                        Select Retail Store
                      </div>
                      <div className="search-box">
                        <input
                          type="text"
                          placeholder="Search for retail store"
                        />
                      </div>
                    </div>
                  </div>
                )}
                {institution === "Bright Vision Hospital" && (
                  <div className="container">
                    <h6>Please select retail store @ {institution}</h6>
                    <div className="select-box" onClick={this.onSelectRetail}>
                      <div className="options-container">
                        {BVH.map((store) => (
                          <div
                            className="option"
                            key={store.id}
                            onClick={this.onSelectRetail}
                          >
                            <input
                              type="radio"
                              className="radio"
                              value={store.store}
                              id={store.id}
                              name={store.type}
                            />
                            <label htmlFor={store.id}>{store.store}</label>
                          </div>
                        ))}
                      </div>
                      <div className="selected" onClick={this.onSelectHandler}>
                        Select Retail Store
                      </div>
                      <div className="search-box">
                        <input
                          type="text"
                          placeholder="Search for retail store"
                        />
                      </div>
                    </div>
                  </div>
                )}
                {institution === "Changi General Hospital" && (
                  <div className="container">
                    <h6>Please select retail store @ {institution}</h6>
                    <div className="select-box">
                      <div className="options-container">
                        {CGH.map((store) => (
                          <div
                            className="option"
                            key={store.id}
                            onClick={this.onSelectRetail}
                          >
                            <input
                              type="radio"
                              className="radio"
                              value={store.store}
                              id={store.id}
                              name={store.type}
                            />
                            <label htmlFor={store.id}>{store.store}</label>
                          </div>
                        ))}
                      </div>
                      <div className="selected" onClick={this.onSelectHandler}>
                        Select Retail Store
                      </div>
                      <div className="search-box">
                        <input
                          type="text"
                          placeholder="Search for retail store"
                        />
                      </div>
                    </div>
                  </div>
                )}
                {institution === "KK Women's and Children's Hospital" && (
                  <div className="container">
                    <h6>Please select retail store @ {institution}</h6>
                    <div className="select-box" onClick={this.onSelectRetail}>
                      <div className="options-container">
                        {KKH.map((store) => (
                          <div
                            className="option"
                            key={store.id}
                            onClick={this.onSelectRetail}
                          >
                            <input
                              type="radio"
                              className="radio"
                              value={store.store}
                              id={store.id}
                              name={store.type}
                            />
                            <label htmlFor={store.id}>{store.store}</label>
                          </div>
                        ))}
                      </div>
                      <div className="selected" onClick={this.onSelectHandler}>
                        Select Retail Store
                      </div>
                      <div className="search-box">
                        <input
                          type="text"
                          placeholder="Search for retail store"
                        />
                      </div>
                    </div>
                  </div>
                )}
                {institution === "National Cancer Centre Singapore" && (
                  <div className="container">
                    <h6>Please select retail store @ {institution}</h6>
                    <div className="select-box" onClick={this.onSelectRetail}>
                      <div className="options-container">
                        {NCCS.map((store) => (
                          <div
                            className="option"
                            key={store.id}
                            onClick={this.onSelectRetail}
                          >
                            <input
                              type="radio"
                              className="radio"
                              value={store.store}
                              id={store.id}
                              name={store.type}
                            />
                            <label htmlFor={store.id}>{store.store}</label>
                          </div>
                        ))}
                      </div>
                      <div className="selected" onClick={this.onSelectHandler}>
                        Select Retail Store
                      </div>
                      <div className="search-box">
                        <input
                          type="text"
                          placeholder="Search for retail store"
                        />
                      </div>
                    </div>
                  </div>
                )}
                {institution === "National Heart Centre Singapore" && (
                  <div className="container">
                    <h6>Please select retail store @ {institution}</h6>
                    <div className="select-box" onClick={this.onSelectRetail}>
                      <div className="options-container">
                        {NHCS.map((store) => (
                          <div
                            className="option"
                            key={store.id}
                            onClick={this.onSelectRetail}
                          >
                            <input
                              type="radio"
                              className="radio"
                              value={store.store}
                              id={store.id}
                              name={store.type}
                            />
                            <label htmlFor={store.id}>{store.store}</label>
                          </div>
                        ))}
                      </div>
                      <div className="selected" onClick={this.onSelectHandler}>
                        Select Retail Store
                      </div>
                      <div className="search-box">
                        <input
                          type="text"
                          placeholder="Search for retail store"
                        />
                      </div>
                    </div>
                  </div>
                )}
                {institution === "Outram Community Hospital" && (
                  <div className="container">
                    <h6>Please select retail store @ {institution}</h6>
                    <div className="select-box" onClick={this.onSelectRetail}>
                      <div className="options-container">
                        {OCH.map((store) => (
                          <div
                            className="option"
                            key={store.id}
                            onClick={this.onSelectRetail}
                          >
                            <input
                              type="radio"
                              className="radio"
                              value={store.store}
                              id={store.id}
                              name={store.type}
                            />
                            <label htmlFor={store.id}>{store.store}</label>
                          </div>
                        ))}
                      </div>
                      <div className="selected" onClick={this.onSelectHandler}>
                        Select Retail Store
                      </div>
                      <div className="search-box">
                        <input
                          type="text"
                          placeholder="Search for retail store"
                        />
                      </div>
                    </div>
                  </div>
                )}
                {institution === "Singapore General Hospital" && (
                  <div className="container">
                    <h6>Please select retail store @ {institution}</h6>
                    <div className="select-box" onClick={this.onSelectRetail}>
                      <div className="options-container">
                        {SGH.map((store) => (
                          <div
                            className="option"
                            key={store.id}
                            onClick={this.onSelectRetail}
                          >
                            <input
                              type="radio"
                              className="radio"
                              value={store.store}
                              id={store.id}
                              name={store.type}
                            />
                            <label htmlFor={store.id}>{store.store}</label>
                          </div>
                        ))}
                      </div>
                      <div className="selected" onClick={this.onSelectHandler}>
                        Select Retail Store
                      </div>
                      <div className="search-box">
                        <input
                          type="text"
                          placeholder="Search for retail store"
                        />
                      </div>
                    </div>
                  </div>
                )}
                {institution === "Sengkang General Hospital" && (
                  <div className="container">
                    <h6>Please select retail store @ {institution}</h6>
                    <div className="select-box" onClick={this.onSelectRetail}>
                      <div className="options-container">
                        {SKH.map((store) => (
                          <div
                            className="option"
                            key={store.id}
                            onClick={this.onSelectRetail}
                          >
                            <input
                              type="radio"
                              className="radio"
                              value={store.store}
                              id={store.id}
                              name={store.type}
                            />
                            <label htmlFor={store.id}>{store.store}</label>
                          </div>
                        ))}
                      </div>
                      <div className="selected" onClick={this.onSelectHandler}>
                        Select Retail Store
                      </div>
                      <div className="search-box">
                        <input
                          type="text"
                          placeholder="Search for retail store"
                        />
                      </div>
                    </div>
                  </div>
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
        )}
        {this.state.selectionPage === 2 && (
          <Options
            retailType={this.state.retailType}
            retailName={this.state.retailName}
            selectedInstitution={institution}
          />
        )}
      </div>
    );
  }
}

export default RetailSelection;
