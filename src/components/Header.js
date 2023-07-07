import { Col, Container, Row } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import '../style/Header.css';
import logo from '../images/logo.png';

const Header = () => {
    return (
        <Row className='header'>
            <Container>
                <Row>
                    <Col xs={6} className='header-left'>
                        <NavLink to={'/'}><img src={logo} className='AnhLon'></img></NavLink>
                    </Col>
                    <Col xs={6} className='header-right'>
                        <NavLink to={'/'} className={({ isActive }) => isActive ? 'link-active' : 'link'}>Home</NavLink>
                        <NavLink to={'/bloglist'} className={({ isActive }) => isActive ? 'link-active' : 'link'}>Blog List</NavLink>
                        <NavLink to={'/login'} className={({ isActive }) => isActive ? 'link-active' : 'link'}>Login</NavLink>
                        <NavLink to={'/register'} className={({ isActive }) => isActive ? 'link-active' : 'link'}>Register</NavLink>
                    </Col>
                </Row>
            </Container>
        </Row>
    );
}

export default Header;