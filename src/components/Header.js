import React, { useContext, useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import UserContext from './UserContext';
import '../style/Header.css';
import logo from '../images/logo.png';
import { useParams } from 'react-router-dom';

const Header = () => {
  const { userEmail, logoutUser,userId } = useContext(UserContext);

  return (
    <div className="header">
      <Container>
        <Row>
          <Col xs={4} className="header-left">
            <NavLink to={'/'}>
              <img src="https://gudlogo.com/wp-content/uploads/2019/04/logo-blog-13.png" className="AnhLon" alt="Logo" />
            </NavLink>
          </Col>
          <Col xs={8} className="header-right">
            {/* <NavLink to={'/bloglist'}> <button> </button></NavLink> */}
            <NavLink to={'/'} className={({ isActive }) => isActive ? 'link-active' : 'link'}>Home</NavLink>
            <NavLink to={'/bloglist'} className={({ isActive }) => isActive ? 'link-active' : 'link'}>Blog List</NavLink>
            
            {/* Conditionally render the user's email if logged in, or the Login and Register links if not logged in */}
            {userEmail ? (
              <>
              <NavLink to={'/addblog'} className={({ isActive }) => isActive ? 'link-active' : 'link'}>Add Blog</NavLink>
              <NavLink to={'/userprofile/'+userId} className={({ isActive }) => isActive ? 'link-active' : 'link'}>User profile</NavLink>
                <span>{userEmail}</span>
                <button onClick={logoutUser}>Logout</button>
              </>
            ) : (
              <>
                <NavLink to={'/login'} className={({ isActive }) => isActive ? 'link-active' : 'link'}>Login</NavLink>
                <NavLink to={'/register'} className={({ isActive }) => isActive ? 'link-active' : 'link'}>Register</NavLink>
              </>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Header;
