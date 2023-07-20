import { Col, Container, Row } from "react-bootstrap";
import '../style/Footer.css';

const Footer = () => {
    return (
        <div className="footer">
            <Container className="footer-component">
                <Row>
                    <Col>
                        @Copyright by Team 6
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Footer;