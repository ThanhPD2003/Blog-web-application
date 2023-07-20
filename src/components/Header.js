import React, { useContext } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import UserContext from './UserContext';
import '../style/Header.css';
import logo from '../images/logo.png';

const Header = () => {
  const { userEmail, logoutUser, roleId } = useContext(UserContext);

  return (
    <Row className="header">
          <Col xs={6}>
            <NavLink to={'/'}>
              <img src="https://gudlogo.com/wp-content/uploads/2019/04/logo-blog-13.png" className="AnhLon" alt="Logo" />
            </NavLink>
          </Col>
          <Col xs={6} >
            {/* Conditionally render the user's email if logged in, or the Login and Register links if not logged in */}
            {roleId === 1 ? (
              <>
                <NavLink to={'/adminBlogList'} className={({ isActive }) => isActive ? 'link-active' : 'link'}>Admin Blog List</NavLink>
                <NavLink to={'/'} className={({ isActive }) => isActive ? 'link-active' : 'link'}>Home</NavLink>
                <NavLink to={'/bloglist'} className={({ isActive }) => isActive ? 'link-active' : 'link'}>Blog List</NavLink>
                <NavLink to={'/addblog'} className={({ isActive }) => isActive ? 'link-active' : 'link'}>New Blog</NavLink>
                <NavLink to={'/approve'} className={({ isActive }) => isActive ? 'link-active' : 'link'}>Approve New Post</NavLink>
              </>
            ) : (
              <>
                <NavLink to={'/'} className={({ isActive }) => isActive ? 'link-active' : 'link'}>Home</NavLink>
                <NavLink to={'/bloglist'} className={({ isActive }) => isActive ? 'link-active' : 'link'}>Blog List</NavLink>
                <NavLink to={'/addblog'} className={({ isActive }) => isActive ? 'link-active' : 'link'}>New Blog</NavLink>
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
  );
};

export default Header;
