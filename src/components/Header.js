import React, { useContext, useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import UserContext from './UserContext';
import '../style/Header.css';
import logo from '../images/logo.png';
import { useParams } from 'react-router-dom';

const Header = () => {
  const { userEmail, logoutUser, roleId,userId } = useContext(UserContext);

  return (
    <div className="header">
    <Row style={{marginLeft:'0%',marginRight:'0%'}}>
          <Col xs={3}>
            <NavLink to={'/'}>
              <img src="https://gudlogo.com/wp-content/uploads/2019/04/logo-blog-13.png" className="AnhLon" alt="Logo" />
            </NavLink>
          </Col>
          <Col xs={9} className="header-right">
            {/* Conditionally render the user's email if logged in, or the Login and Register links if not logged in */}
            {roleId === 1 ? (
              <>
                <NavLink to={'/adminBlogList'} className={({ isActive }) => isActive ? 'link-active' : 'link'}>Admin Blog List</NavLink>
                <NavLink to={'/'} className={({ isActive }) => isActive ? 'link-active' : 'link'}>Home</NavLink>
                <NavLink to={'/bloglist'} className={({ isActive }) => isActive ? 'link-active' : 'link'}>Blog List</NavLink>
                <NavLink to={'/addblog'} className={({ isActive }) => isActive ? 'link-active' : 'link'}>New Blog</NavLink>
                <NavLink to={'/approve'} className={({ isActive }) => isActive ? 'link-active' : 'link'}>Approve New Post</NavLink>

              <NavLink to={'/userprofile/'+userId} className={({ isActive }) => isActive ? 'link-active' : 'link'}>User profile</NavLink>
              </>
            ) : (
              <>
                <NavLink to={'/'} className={({ isActive }) => isActive ? 'link-active' : 'link'}>Home</NavLink>
                <NavLink to={'/bloglist'} className={({ isActive }) => isActive ? 'link-active' : 'link'}>Blog List</NavLink>
                <NavLink to={'/addblog'} className={({ isActive }) => isActive ? 'link-active' : 'link'}>New Blog</NavLink>

              <NavLink to={'/userprofile/'+userId} className={({ isActive }) => isActive ? 'link-active' : 'link'}>User profile</NavLink>
              </>
            )}

            {userEmail ? (
              <>
                <span>{userEmail} </span>
                
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
    </div>
  );
};

export default Header;