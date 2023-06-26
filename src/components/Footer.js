import { Col, Container, Row } from "react-bootstrap";
import '../style/Footer.css';

const Footer = () => {
    return (
        <Row className="footer fixed-bottom">
            <Container className="footer-component">
                <Row>
                    <Col>
                        @Copyright by Team 6
                    </Col>
                </Row>
            </Container>
        </Row>
    );
}

export default Footer;