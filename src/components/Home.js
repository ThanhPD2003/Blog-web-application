import { Col, Container, Row } from "react-bootstrap";
import React from 'react';
import '../style/Home.css';

const Home = () => {
    return (  
        <Row>
            <Container className="home-component">
                <Row>
                    <Col xs={12}>
                        <h1>Front-End Web Development with React</h1>
                    </Col>
                </Row>
            </Container>
        </Row>
    );
}
 
export default Home;