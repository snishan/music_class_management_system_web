import React, { useState, useEffect, useRef } from 'react';
import Table from 'react-bootstrap/Table';
import EditIcon from '../../assests/icons/edit-icon.svg';
import DeleteIcon from '../../assests/icons/delete-icon.svg';
import { Button, Row, Col, Form } from 'react-bootstrap';
import "./students.css"
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { urls } from '../../API/urls';
import { toast } from 'react-toastify';


const Studenets = () => {
  let createForm = useRef()
  const [show, setShow] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [validated, setValidated] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [classDropdwon, setClassDropdwon] = useState('');
  const [classDropdwonList, setClassDropdwonList] = useState([]);
  const [studenetDataList, setStudenetDataList] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedModelType, setSelectedModelType] = useState('Save');


  useEffect(() => {
    axios.get(urls.classCount).then(function (response) { convertToDropdownList(response.data.data); })
    getAllDataList()
  }, [])

  const convertToDropdownList = (dataList) => {
    const data = [];
    dataList.map((val) => {
      data.push({ value: val.id, label: val.className })
    })
    setClassDropdwonList(data)
  }



  const handleSubmit = (event) => {

    const form = event.currentTarget;

    if (createForm.current.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      const params = {
        "studentName": firstName + " " + lastName,
        "mail": email,
        "contactNo": mobile,
        "classIds": [classDropdwon]
      }
      if (selectedModelType == 'Save') {
        axios.post(urls.createStudent, params).then(function (response) {
          if (response.status == 200) {
            toast.success('Student Created Successfully ')
            setShow(false)
            getAllDataList()
          }
        })
      } else {
        axios.put(urls.updateStudenet + selectedStudent, params).then(function (response) {
          if (response.status == 200) {
            toast.success('Student Updated Successfully')
            setShow(false)
            getAllDataList()
          }
        })
      }


    }
    setValidated(true);
  };

  const getAllDataList = () => {
    axios.get(urls.studentCount).then(function (response) { setStudenetDataList(response.data.data) })
  }

  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = (value) => {
    setShowDelete(true)
    setSelectedStudent(value)
  };

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setFirstName('')
    setLastName('')
    setMobile('')
    setEmail('')
    setClassDropdwon('')
    setSelectedModelType('Save')
    setShow(true)
  }

  const handleEdit = (val) => {
    setSelectedStudent(val)
    setSelectedModelType('Update')
    axios.get(urls.getOneStudenet + val).then(function (response) {
      if (response.status == 200) {
        const name = response.data.data.studentName.split(" ");
        setFirstName(name[0])
        setLastName(name[1])
        setMobile(response.data.data.contactNo)
        setEmail(response.data.data.mail)
        setClassDropdwon(response.data.data.classIds[0])
        setShow(true);
      }

    })
  }

  const handleFname = (val) => {
    setFirstName(val)
  }
  const handleLname = (val) => {
    setLastName(val)
  }
  const handleEmail = (val) => {
    setEmail(val)
  }
  const handlePhone = (val) => {
    if (val.length < 11) {
      setMobile(val)
    }

  }
  const handleClass = (val) => {
    setClassDropdwon(val)
  }
  const returnClass = (id, data) => {
    const filteredLabels = data.filter(val => val.value === id).map(val => val.label);
    return filteredLabels[0]

  }
  const handleDelete = () => {
    axios.delete(urls.deleteStudenet + selectedStudent,).then(function (response) {
      if (response.status == 200) {
        toast.success('Student Deleted Successfully ')
        setShowDelete(false)
        getAllDataList()
      }
    })
  }
  return (

    <div>
      <h2 className='mt-5'>Students</h2>
      <div className='mt-5 create-btn'>
        <Button onClick={handleShow} >Add New Students</Button>
      </div>
      <Table className='student-table mt-2' striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Student Name</th>
            <th>Mobile Number</th>
            <th>Email</th>
            <th>Class Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {studenetDataList.length !== 0 ? studenetDataList.map((data) => {
            return (
              <tr>
                <td>{data.id}</td>
                <td>{data.studentName}</td>
                <td>{data.contactNo}</td>
                <td>{data.mail}</td>
                <td>{returnClass(data.classIds[0], classDropdwonList)}</td>
                <td>
                  <img src={EditIcon} onClick={() => handleEdit(data?.id)} alt='edit' />
                  <img className='mx-3' onClick={() => handleShowDelete(data.id)} src={DeleteIcon} alt='delete' />
                </td>
              </tr>
            )
          }) : <b>No data</b>}
        </tbody>
      </Table>

      <Modal size='lg' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedModelType == 'Save' ? 'Create New Students' : 'Update New Students'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form ref={createForm} noValidate={false} validated={validated} >
            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="validationCustom01">
                <Form.Label>First name</Form.Label>
                <Form.Control
                  value={firstName}
                  required
                  type="text"
                  placeholder="First name"
                  onChange={(e) => handleFname(e.target.value)}
                />
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="validationCustom02">
                <Form.Label>Last name</Form.Label>
                <Form.Control
                  value={lastName}
                  required
                  type="text"
                  placeholder="Last name"
                  onChange={(e) => handleLname(e.target.value)}
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="validationCustom03">
                <Form.Label>Mobile Number</Form.Label>
                <Form.Control
                  required
                  type="number"
                  placeholder="Phone number"
                  value={mobile}
                  onChange={(e) => handlePhone(e.target.value)}
                  min={1}
                  maxLength={10}

                />
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="validationCustom04">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  required
                  value={email}
                  type="text"
                  placeholder="Email"
                  onChange={(e) => handleEmail(e.target.value)}
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="12" controlId="validationCustom05">
                <Form.Label>Class</Form.Label>
                <Form.Select onChange={(e) => handleClass(e.target.value)} required value={classDropdwon} aria-label="Default select example">
                  <option value="">- Select Option -</option>
                  {classDropdwonList?.map((data) => {
                    return <option key={data.value} value={data.value}>{data.label}</option>;
                  })}
                </Form.Select>
              </Form.Group>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}  >
            {selectedModelType}
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal size='md' show={showDelete} onHide={handleCloseDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <p>Do you wish to delete this student?</p>
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

export default Studenets;

