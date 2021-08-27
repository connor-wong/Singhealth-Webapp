import React, { Component } from "react";
import "../../App.css";
import { Container, Row, Col } from "react-bootstrap";

class Comments extends Component {
  constructor() {
    super();
    this.state = {
      textInput: localStorage.getItem("Comments"),
      inputDisabled: false,
    };
  }

  componentDidMount() {
    if (this.props.selectedOption == "view") {
      this.setState({ inputDisabled: true });
    } else {
      this.setState({ inputDisabled: false });
    }
  }

  render() {
    localStorage.setItem("Comments", this.state.textInput);
    return (
      <>
        <Container className="text-center comments" fluid>
          <Row>
            <Col xl={12} lg={12} md={12} sm={12} xs={12}>
              <textarea
                placeholder="Add Your Comments Here..."
                disabled={this.state.inputDisabled}
                value={this.state.textInput}
                style={{
                  border: "3px solid #f15a22",
                  fontSize: "calc(0.5em + 0.5vw)",
                  width: "100%",
                  height: "300px",
                }}
                onChange={(e) => {
                  this.setState({ textInput: e.target.value });
                }}
              />
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default Comments;
