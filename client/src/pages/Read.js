//Importing-Hooks
import React from "react";

// Bootstrap-Bundle-JS
import "bootstrap/dist/js/bootstrap.bundle.min";

// Bootstrap-npm-lib
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

//Bootstrap-CSS
import "bootstrap/dist/css/bootstrap.min.css";

//Importing-Components..
import NavBar from "../components/Nav";
import FooterComp from "../components/Footer";
import Header from "../components/Head";
import DateTime from "../components/Date";

//Custom-CSS
import "../css/read.css";

let ReadPage = (props) => {
  return (
    <Container fluid className="main-container">
      <Row className="navigation-row">
        <Col lg={12} className="navigation-col-one">
          <NavBar />
        </Col>
      </Row>

      <Row className="heading-row">
        <Col lg={12} className="navigation-col-one">
          <div className="text-center">
            <h1 className="text-center">{<Header />}</h1>
            <p className="date-display">{<DateTime />}</p>
          </div>
        </Col>
      </Row>

      <Row className="new-article-row">
        <Col lg={12} className="news-article-col-one">
            <div className="new-article-container">
            <h1>{props.title}</h1>
            <h4>{props.subtitle}</h4>
            <br></br>
            <p>Date: {props.date}</p>
            <p>Author: {props.author}</p>
            <img className="news-img" src="https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/WKECRV6SQ6EZHD4KAUXNIPE3VM.JPG&w=916"></img>
            <p className="para-one">SAN FRANCISCO — Elon Musk’s plans to lay off large number of Twitter employees are getting underway, a course of action that could prompt fundamental changes in the way more than 200 million daily users experience the site.</p>
            </div>
        </Col>
      </Row>

      <Row className="footer-row">
        <Col lg={12} className="footer-col-one">
          <FooterComp />
        </Col>
      </Row>
    </Container>
  );
};

export default ReadPage;
