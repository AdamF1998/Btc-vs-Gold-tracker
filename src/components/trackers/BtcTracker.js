import React from "react";
import { Row } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBitcoin } from "@fortawesome/free-brands-svg-icons";

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
    this.timer = setInterval(
      () =>
        fetch("https://api.coindesk.com/v1/bpi/currentprice.json")
          .then((res) => res.json())
          .then(
            (result) => {
              this.setState({
                price: result.bpi.GBP.rate,
                lastFetch: result.time.updateduk,
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
      1000
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
    }).format(new Date(this.state.lastFetch));
  }

  render() {
    return (
      <Container fluid className="mt-5">
        <Row>
          <Col xs={{ span: 4, offset: 4 }}>
            <Row className="justify-content-center align-items-center">
              <Col xs={2}>
                <div>
                  <FontAwesomeIcon
                    icon={faBitcoin}
                    size="8x"
                    className="justify-content-center w-100"
                  ></FontAwesomeIcon>
                </div>
              </Col>
              <Col xs={2}>
                <Row>
                  <Col>£{this.state.price}</Col>
                </Row>
                <Row>
                  <Col>
                    <small>{this.state.lastFetch}</small>
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
