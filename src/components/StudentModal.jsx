
import React, { Component } from 'react';
import axios from 'axios';
import { Button, Card, Form, Modal } from 'react-bootstrap';

export class StudentModal extends Component {

    constructor(props){
        super(props);
        this.state = {
          inputs : {
            name  :  '',
            call  :  '',
            photo :  ''
          }
        }
    }
    

  render() {
     const {show,handaleModalHide,type,dataId,student,getEditData} = this.props;
     const {name,call,photo} = this.state.inputs;

     const handaleForm = (e)=>{
      e.preventDefault()
      axios.post('http://localhost:5050/student',this.state.inputs).then(res =>{
        this.setState((prevState) => ({
          ...prevState,
          inputs : {
            name  :  '',
            call  :  '',
            photo :  ''
          }
        }));
        handaleModalHide()
      })
     }
     // Edit Data
     const handaleEditForm = (e) =>{
       e.preventDefault()
       axios.patch(`http://localhost:5050/student/${student.id}`,student).then(res =>{
         handaleModalHide()
       })
     }
     if(type === 'creat'){
      return (
        <Modal show={show} onHide={handaleModalHide}>
            <Modal.Body>
              <h5>Add New Student</h5>
              <Form onSubmit={handaleForm}>
                <Form.Group className='my-3'>
                  <Form.Label>Student Name</Form.Label>
                  <Form.Control onChange={ (e) => this.setState((prevState) => ({
                    ...prevState,
                    inputs : {
                      ...prevState.inputs,
                      name : e.target.value
                    }
                  })) } value={name} type='text' />
                </Form.Group>
                <Form.Group className='my-3'>
                  <Form.Label>Student Call</Form.Label>
                  <Form.Control onChange={ (e) => this.setState((prevState) => ({
                    ...prevState,
                    inputs : {
                      ...prevState.inputs,
                      call : e.target.value
                    }
                  })) } value={call} type='text' />
                </Form.Group>
                <Form.Group className='my-3'>
                  <Form.Label>Student Photo</Form.Label>
                  <Form.Control onChange={ (e) => this.setState((prevState) => ({
                    ...prevState,
                    inputs : {
                      ...prevState.inputs,
                      photo : e.target.value
                    }
                  })) } value={photo} type='text' />
                </Form.Group>
                <Form.Group className='my-3'>
                  <Button type='submit'>Submit</Button>
                </Form.Group>
              </Form>
            </Modal.Body>
        </Modal>
      )
     }else if(type === 'view'){
      return (
        <Modal show={show} onHide={handaleModalHide} centered>
            <Modal.Body>
              <Card>
                <Card.Body>
                  <Card.Img src={student.photo} />
                  <h4>{student.name}</h4>
                </Card.Body>
              </Card>
            </Modal.Body>
        </Modal>
      )
     }else if(type === 'delete'){
       // Data Delete Handaler
       const handaleDeleteData = (id) =>{
         try {
          axios.delete(`http://localhost:5050/student/${id}`).then(res =>{
            handaleModalHide()
           })
         } catch (err){
           console.log(err);
         }
        
       }
      return (
        <Modal show={show} onHide={handaleModalHide} centered>
            <Modal.Body>
              <h5>are you sure !?</h5>
              <div className='text-end'>
                <Button onClick={  handaleModalHide } className='btn btn-primary'>Cancle</Button> &nbsp;
                <Button onClick={ () => handaleDeleteData(dataId) } className='btn btn-danger'>Delete</Button>
              </div>
            </Modal.Body>
        </Modal>
      )
     }else if(type === 'Edit'){
       
      return (
        <Modal show={show} onHide={handaleModalHide} centered>
            <Modal.Body>
               <Card>
                 <Card.Header>
                   <h4>Edit Student Data</h4>
                 </Card.Header>
                 <Card.Img style={{width : '90%',height : '200px',objectFit : 'cover',}} src={student.photo} />
                 <Card.Body>
                 <Form onSubmit={handaleEditForm}>
                <Form.Group className='my-3'>
                  <Form.Label>Student Name</Form.Label>
                  <Form.Control onChange={ (e) => getEditData({ ...student, name : e.target.value}) } value={student.name} type='text' />
                </Form.Group>
                <Form.Group className='my-3'>
                  <Form.Label>Student Call</Form.Label>
                  <Form.Control onChange={ (e) => getEditData({...student, call : e.target.value}) } value={student.call} type='text' />
                </Form.Group>
                <Form.Group className='my-3'>
                  <Form.Label>Student Photo</Form.Label>
                  <Form.Control onChange={ (e) => getEditData({ ...student, photo : e.target.value}) } value={student.photo} type='text' />
                </Form.Group>
                <Form.Group className='my-3'>
                  <Button type='submit'>Submit</Button>
                </Form.Group>
              </Form>
                 </Card.Body>
               </Card>
            </Modal.Body>
        </Modal>
      )
     }
    
  }
}

export default StudentModal