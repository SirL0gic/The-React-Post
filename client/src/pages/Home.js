//Importing Hooks
//import React, {useState, useEffect } from "react";




// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

// Bootstrap npm lib
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



//Importing Components
import NavBar from '../components/Nav';
import Header from '../components/Head';
import DateTime from '../components/Date';
import NewsCard from '../components/News'

// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";

//Custom css
import '../css/custom.css'
import '../css/newscard.css'


let HomePage = () => {
    
    return(
        <Container fluid>
            <Row>
                <Col  xxl={12} className='no-col-nav'>
                <div className="text-center">
                    <NavBar />
                </div>
                </Col>
            </Row>

            <Row>
                <Col xxl={12}>
                <div className="main-heading-area">
                    <h1 className="text-center">{<Header />}</h1>
                </div>
                <div className="date-area">
                    <div className="text-center"> 
                    <p className="date-display">{<DateTime />}</p>
                    </div>
                </div>
                </Col>
            </Row>

            <Row>
                <Col lg={12}>
                    <div className="d-flex align-items-center justify-content-center">
                        <NewsCard />
                    </div>
                    
                </Col>
            </Row>

        </Container>
    );
}

export default HomePage;



   