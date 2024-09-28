import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import EditIcon from '../../assests/icons/edit-icon.svg';
import DeleteIcon from '../../assests/icons/delete-icon.svg';
import { Button, Row, Col, Form } from 'react-bootstrap';
import "./classes.css"
import Modal from 'react-bootstrap/Modal';
import { urls } from '../../API/urls';
import axios from 'axios';
import { toast } from 'react-toastify';

const Classes = () => {
  const [show, setShow] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [cassName, setClassName] = useState('');
  const [classDate, setClassDate] = useState('Sunday');
  const [classTime, setClassTime] = useState('8.00');
  const [classDataList, setClassDataList] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedModelType, setSelectedModelType] = useState('Save');

  useEffect(() => {
    getAllData()
  }, [])

  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = (val) => {
    setSelectedClass(val)
    setShowDelete(true);
  }

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setClassName('')
    setClassDate('Sunday')
    setClassTime('8.00')
    setShow(true);
    setSelectedModelType('Save')
  }

  const handleEdit = (val) => {
    setSelectedClass(val)
    setSelectedModelType('Update')
    axios.get(urls.getOneClass + val).then(function (response) {
      if (response.status == 200) {
        setClassName(response.data.data.className)
        setClassDate(response.data.data.classDate)
        setClassTime(response.data.data.classStartTime)
        setShow(true);
      }

    })
  }

  const handleClassName = (val) => { setClassName(val) }
  const handleTime = (val) => { setClassTime(val) }
  const handleDay = (val) => { setClassDate(val) }

  const getAllData = () => {
    axios.get(urls.classCount).then(function (response) {
      if (response.status == 200) {
        setClassDataList(response.data?.data)
      }

    })
  }

  const handleCreteClass = () => {
    if (cassName == '') {
      toast.error('Enter Class Name')
    } else {
      if (selectedModelType == 'Save') {
        const params = {
          "className": cassName,
          "classDate": classDate,
          "classStartTime": classTime
        }
        axios.post(urls.createClass, params).then(function (response) {
          if (response.status == 200) {
            toast.success('Class Created Successfully')
            setShow(false)
            getAllData()
          }
        })
      } else {
        const params = {
          "className": cassName,
          "classDate": classDate,
          "classStartTime": classTime
        }
        axios.put(urls.updateOneClass + selectedClass, params).then(function (response) {
          if (response.status == 200) {
            toast.success('Class Updated Successfully')
            setShow(false)
            getAllData()
          }
        })
      }
    }
  }

  const handleDelete = () => {
    axios.delete(urls.deleteClass + selectedClass).then(function (response) {
      if (response.status == 200) {
        toast.success('Class Deleted Successfully')
        setShowDelete(false)
        getAllData()
      }
    })
  }

  return (
    <div>
      <h2 className='mt-5'>Classes</h2>
      <div className='mt-5 create-btn'>
        <Button onClick={handleShow} >Add New Class</Button>
      </div>
      <Table className='student-table mt-2' striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Class Name</th>
            <th>Day</th>
            <th>Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {classDataList.length !== 0 ? classDataList.map((data) => {
            return (
              <tr>
                <td>{data?.id}</td>
                <td>{data?.className ?? "-"}</td>
                <td>{data?.classDate ?? "-"}</td>
                <td>{data?.classStartTime ?? "-"}</td>
                <td>
                  <img src={EditIcon} onClick={() => handleEdit(data?.id)} alt='edit' />
                  <img className='mx-3 delete-icon' onClick={() => handleShowDelete(data?.id)} src={DeleteIcon} alt='delete' />
                </td>
              </tr>
            )
          }) : <b>No data</b>}
        </tbody>
      </Table>

      <Modal size='lg' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedModelType == 'Save' ? 'Create New Class' : 'Update New Class'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Form.Group as={Col} md="6" controlId="validationCustom01">
              <Form.Label>Class name</Form.Label>
              <Form.Control
                required
                type="text"
                value={cassName}
                placeholder="Class name"
                onChange={(e) => handleClassName(e.target.value)}
              />
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="validationCustom02">
              <Form.Label>Class Date</Form.Label>
              <Form.Select value={classDate} onChange={(e) => handleDay(e.target.value)} required aria-label="Default select example">
                <option value="Sunday">Sunday</option>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
              </Form.Select>
            </Form.Group>
          </Row>
          <Row className='mt-3'>
            <Form.Group as={Col} md="6" controlId="validationCustom02">
              <Form.Label>Class Start Time</Form.Label>
              <Form.Select value={classTime} onChange={(e) => handleTime(e.target.value)} required aria-label="Default select example">
                <option value="8.00">8.00</option>
                <option value="9.00">9.00</option>
                <option value="10.00">10.00</option>
                <option value="11.00">11.00</option>
                <option value="12.00">12.00</option>
                <option value="13.00">13.00</option>
                <option value="14.00">14.00</option>
                <option value="15.00">15.00</option>
                <option value="16.00">16.00</option>
                <option value="17.00">17.00</option>
              </Form.Select>
            </Form.Group>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCreteClass}>
            {selectedModelType}
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal size='md' show={showDelete} onHide={handleCloseDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Class Record</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <p>Do you wish to delete this class?</p>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDelete}>
            Close
          </Button>
          <Button variant="danger" onClick={() => handleDelete()}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
};

export default Classes;

