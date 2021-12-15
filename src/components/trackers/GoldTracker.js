import React from "react";
import { Row } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Img from "react-bootstrap/Image";

export default class BTCTracker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      price: 0.0,
      lastFetch: "",
      error: null,
      isLoaded: false,
    };
  }

  componentDidMount() {
    const headers = { "x-access-token": "goldapi-6q35ukjg158hd-io" };

    this.timer = setInterval(
      () =>
        fetch("https://www.goldapi.io/api/XAU/GBP", { headers })
          .then((res) => res.json())
          .then(
            (result) => {
              this.setState({
                price: result.price,
                lastFetch: result.timestamp,
                isLoaded: true,
              });
            },

            (error) => {
              this.setState({
                isLoaded: true,
                error,
              });
            }
          ),
      10000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  dateConversion() {
    return new Intl.DateTimeFormat("en-GB", {
      year: "numeric",
      month: "long",
      day: "2-digit",
    }).format(Date.now());
  }

  render() {
    return (
      <Container fluid className="mt-5">
        <Row>
          <Col xs={{ span: 4, offset: 4 }}>
            <Row className="justify-content-center align-items-center">
              <Col xs={2}>
                <div>
                  <Img src="gold.jpg" className="w-100"></Img>
                </div>
              </Col>
              <Col xs={2}>
                <Row>
                  <Col>£{this.state.price}</Col>
                </Row>
                <Row>
                  <Col>
                    <small>{this.dateConversion()}</small>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}
