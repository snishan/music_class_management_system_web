import React, { useEffect, useState } from "react";
import "./dashboard.css"
import { Row } from "react-bootstrap";
import Students from "../../assests/icons/students.png";
import Lessions from "../../assests/icons/lession-icon.png";
import Teachers from "../../assests/icons/teachers-icon.png"
import { urls } from "../../API/urls";
import axios from 'axios';


const Dashboard = () => {
  const [studentCount, setStudentCount] = useState(0);
  const [teacherCount, setTeacherCount] = useState(0);
  const [classCount, setClassCount] = useState(0);


  useEffect(() => {
    axios.get(urls.classCount).then(function (response) { setClassCount(response.data.data?.length); })
    axios.get(urls.studentCount).then(function (response) { setStudentCount(response.data.data?.length) })
    axios.get(urls.teachersCount).then(function (response) { setTeacherCount(response.data.data?.length) })
  }, [])


  return (
    <Row className="dashboard-container">
      <div className="col-lg-4 col-md-4 col-sm-6 col-12 mb-2 mt-4">
        <div className="inforide">
          <div className="row">
            <div className="col-lg-1 col-md-1 col-sm-1 col-1 ">
              <div className="border-line" />
            </div>
            <div className="col-lg-3 col-md-4 col-sm-4 col-4 rideone">
              <img src={Students} />
            </div>
            <div className="col-lg-8 col-md-7 col-sm-7 col-7 fontsty">
              <h4>Students Count</h4>
              <h2>{studentCount}</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-4 col-md-4 col-sm-6 col-12 mb-2 mt-4">
        <div className="inforide">
          <div className="row">
            <div className="col-lg-1 col-md-1 col-sm-1 col-1 ">
              <div className="border-line yellow-color" />
            </div>
            <div className="col-lg-3 col-md-4 col-sm-4 col-4 rideone">
              <img src={Teachers} />
            </div>
            <div className="col-lg-8 col-md-7 col-sm-7 col-7 fontsty">
              <h4>Teachers Count</h4>
              <h2>{teacherCount}</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-4 col-md-4 col-sm-6 col-12 mb-2 mt-4">
        <div className="inforide">
          <div className="row">
            <div className="col-lg-1 col-md-1 col-sm-1 col-1 ">
              <div className="border-line tomato-color" />
            </div>
            <div className="col-lg-3 col-md-4 col-sm-4 col-4 rideone">
              <img src={Lessions} />
            </div>
            <div className="col-lg-8 col-md-7 col-sm-7 col-7 fontsty">
              <h4>Classes Count</h4>
              <h2>{classCount}</h2>
            </div>
          </div>
        </div>
      </div>
    </Row>
  );
};

export default Dashboard;