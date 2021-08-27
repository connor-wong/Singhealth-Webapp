import React, { Component } from "react";
import "../../App.css";
import { NavLink } from "react-router-dom";
import RetailSelection from "./RetailTenantSelection";

import smallsinghealth from "../../images/singhealth-logo.png";
import wave from "../../images/wave.svg";
import Academia from "../../images/Academia.svg";
import BVH from "../../images/BVH.png";
import CGH from "../../images/CGH.svg";
import KKH from "../../images/KKH.svg";
import NCCS from "../../images/NCCS.svg";
import NHCS from "../../images/NHCS.svg";
import OCH from "../../images/community-hospital.svg";
import SGH from "../../images/SGH.svg";
import SKH from "../../images/SKH.svg";

import { Container, Row, Col, Image } from "react-bootstrap";

class InstitutionSelection extends Component {
  constructor() {
    super();
    this.state = {
      institutionName: "",
      selectionPage: 1,
    };
    this.onSelectInstitution = this.onSelectInstitution.bind(this);
  }

  onSelectInstitution(e) {
    this.setState({
      institutionName: e.target.value,
      selectionPage: this.state.selectionPage + 1,
    });
  }

  render() {
    localStorage.setItem(
      "Institution",
      JSON.stringify(this.state.institutionName)
    );
    return (
      <div>
        <Container className="text-center" fluid>
          {this.state.selectionPage === 1 && (
            <div className="institution">
              <Row className="images">
                <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                  <h4>INSTITUTION SELECTION</h4>
                  <div className="homepage">
                    <NavLink to="/home">
                      <input type="button" name="" value="<BACK TO HOMEPAGE" />
                    </NavLink>
                  </div>
                </Col>
                <Col xl={4} lg={4} md={12} sm={12} xs={12}>
                  <div>
                    <input
                      value="Academia"
                      type="image"
                      src={Academia}
                      alt="Academia"
                      height="86px"
                      onClick={this.onSelectInstitution}
                    />
                  </div>
                </Col>
                <Col xl={4} lg={4} md={12} sm={12} xs={12}>
                  <div>
                    <input
                      value="Bright Vision Hospital"
                      type="image"
                      src={BVH}
                      alt="BVH"
                      height="86px"
                      onClick={this.onSelectInstitution}
                    />
                  </div>
                </Col>
                <Col xl={4} lg={4} md={12} sm={12} xs={12}>
                  <div>
                    <input
                      value="Changi General Hospital"
                      type="image"
                      src={CGH}
                      alt="CGH"
                      height="86px"
                      onClick={this.onSelectInstitution}
                    />
                  </div>
                </Col>
                <Col xl={4} lg={4} md={12} sm={12} xs={12}>
                  <div>
                    <input
                      value="KK Women's and Children's Hospital"
                      type="image"
                      src={KKH}
                      alt="KKH"
                      height="86px"
                      onClick={this.onSelectInstitution}
                    />
                  </div>
                </Col>
                <Col xl={4} lg={4} md={12} sm={12} xs={12}>
                  <div>
                    <input
                      value="National Cancer Centre Singapore"
                      type="image"
                      src={NCCS}
                      alt="NCCS"
                      height="86px"
                      onClick={this.onSelectInstitution}
                    />
                  </div>
                </Col>
                <Col xl={4} lg={4} md={12} sm={12} xs={12}>
                  <div>
                    <input
                      value="National Heart Centre Singapore"
                      type="image"
                      src={NHCS}
                      alt="NHCS"
                      height="86px"
                      onClick={this.onSelectInstitution}
                    />
                  </div>
                </Col>
                <Col xl={4} lg={4} md={12} sm={12} xs={12}>
                  <div>
                    <input
                      value="Outram Community Hospital"
                      type="image"
                      src={OCH}
                      alt="OCH"
                      height="86px"
                      onClick={this.onSelectInstitution}
                    />
                  </div>
                </Col>
                <Col xl={4} lg={4} md={12} sm={12} xs={12}>
                  <div>
                    <input
                      value="Singapore General Hospital"
                      type="image"
                      src={SGH}
                      alt="SGH"
                      height="86px"
                      onClick={this.onSelectInstitution}
                    />
                  </div>
                </Col>
                <Col xl={4} lg={4} md={12} sm={12} xs={12}>
                  <div>
                    <input
                      value="Sengkang General Hospital"
                      type="image"
                      src={SKH}
                      alt="SKH"
                      height="86px"
                      onClick={this.onSelectInstitution}
                    />
                  </div>
                </Col>
              </Row>
            </div>
          )}

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
        {this.state.selectionPage === 2 && (
          <RetailSelection selectedInstitution={this.state.institutionName} />
        )}
      </div>
    );
  }
}

export default InstitutionSelection;
