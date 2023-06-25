import { Col, Container, Row } from "react-bootstrap";
const Footer = () => {
    return (
        <Row className="footer fixed-bottom">
            <Container className="footer-component">
                <Row>
                    <Row>
                        <Col xs={3}>
                            @Copyright by BlogTech
                            sadasd
                            faddsa
                            dsadsa
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={3}>
                            BlogTech
                            sadasd
                            faddsa
                            dsadsa
                        </Col>
                    </Row>
                </Row>
            </Container>
        </Row>
    );
}

export default Footer;