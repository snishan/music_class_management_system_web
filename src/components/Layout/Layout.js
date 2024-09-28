import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import "./layout.css";
import Logo from "../../assests/icons/music-icon-2.svg";
import { RiLogoutCircleLine } from "react-icons/ri";

const Layout = () => {
  const currentLocation = useLocation();
  let navigate = useNavigate();
  const [selectedKey, setSelectedKey] = useState('');

  useEffect(() => {
    if (currentLocation.pathname == '/portal/dashboard') {
      setSelectedKey('DASHBOARD')
    } else if (currentLocation.pathname == '/portal/student') {
      setSelectedKey('STUDENTS')
    } else if (currentLocation.pathname == '/portal/teacher') {
      setSelectedKey('TEACHER')
    } else if (currentLocation.pathname == '/portal/classes') {
      setSelectedKey('CLASSES')
    }
  }, [currentLocation]);

  const handleLogout = () => {
    navigate('/')
  }

  return (
    <Row className="main-container">
      <Col sm={2} className="column-1" >
        <div className="sidenav">
          <strong className="mx-3"> Admin</strong>
          <RiLogoutCircleLine onClick={() => handleLogout()} className="logout-icon" />
          <br />
          <img className="logo-icon" src={Logo} />
          <div className="mt-4">
            <a className={selectedKey == 'DASHBOARD' ? "active" : ''} href="/portal/dashboard">Dashboard</a>
            <a className={selectedKey == 'STUDENTS' ? "active" : ''} href="/portal/student">Students</a>
            <a className={selectedKey == 'TEACHER' ? "active" : ''} href="/portal/teacher">Teachers</a>
            <a className={selectedKey == 'CLASSES' ? "active" : ''} href="/portal/classes">Classes</a>
            <p className="bottom-text">2024 All Rights Reserved</p>
          </div>
        </div>
      </Col>
      <Col sm={10}>
        <Outlet />
      </Col>
    </Row>
  )
};

export default Layout;