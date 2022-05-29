
import axios from 'axios';
import React, { Component } from 'react'
import { Alert, Button, Card, CloseButton, Col, Container, Row, Table } from 'react-bootstrap'
import StudentModal from './StudentModal'

export class Student extends Component {

  constructor(props){
    super(props);
    this.state = {
        modal  : {
            status : false,
            type   : ''
        },
        alert  : {
          msg  : '',
          type : 'danger',
          status : false
        },
        students : [],
        dataId   : null,
        student  : {
          id  : '',
          name : '',
          photo : '',
          call : ''
        }

    }
}


  render() {

    const {modal,students,dataId,student} = this.state;
    const {msg,type,status} = this.state.alert;
    // modal show state update
    const handaleModalShow = () =>{
      this.setState({
        ...this.state,
        modal : {
            status : true,
            type   : 'creat'
        } ,
        alert  : {
          msg  : 'modal show',
          type : 'info',
          status : true
        }
      })
    }
    // modal Hide state update
    const handaleModalHide = () =>{
      this.setState({
        ...this.state,
        modal : {
          status : false,
          type   : ''
      } ,
      })
    }
    // singal student view modal
    const handaleSingalModal = (id)=>{
     let single =   students.find( (data) => data.id === id )
      this.setState((prevState)=> ({
        ...prevState,
        modal : {
          ...prevState.modal,
          status : true,
          type   : 'view'
      } ,
           student : single
      }));
    }
    // get data use axios
    const getAllData = () =>{

      try {
        axios.get('http://localhost:5050/student').then(res =>{
          this.setState((prevState) => ({
            ...prevState,
            students : res.data
          }))
        })
      } catch(err){

      }
      
    }
    getAllData()
   
    // data delete handaler
    const handaleDataDeleteModal = (id)=>{
      this.setState((prevState) => ({
        ...prevState,
        modal : {
          status : true,
          type   : 'delete'
      } ,
      dataId : id
      }))
    }
   // Data Edit 
   const handaleDataEdit = (id)=>{
    let single =   students.find( (data) => data.id === id )
    this.setState((prevState)=> ({
      ...prevState,
      modal : {
        ...prevState.modal,
        status : true,
        type   : 'Edit'
    } ,
    student : single
    }));
   }

   // Data Edit function
   const getEditData = (obj) =>{
     this.setState( (prevState) => ({
       ...prevState,
       student : {
         ...prevState.student,
         name : obj.name,
         call : obj.call,
         photo : obj.photo,
       }
     }) )
   }
    return (
      <Container>
        <Row className='justify-content-center my-4'>
          <Col md={6}>
            <Button onClick={ handaleModalShow } className='mb-4'>Add Student</Button>
            <StudentModal getEditData={getEditData} students={students} student={student} show={modal.status} dataId={dataId} type={modal.type} handaleModalHide={handaleModalHide} />
            <Card>
              <Card.Header>
             
             {
              status && 
               <Alert className='d-flex justify-content-between' variant={type}> {msg} <CloseButton /></Alert> 
             }
               
                
              </Card.Header>
              <Card.Body>
                <Table className='table table-striped' >
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Call</th>
                      <th>Photo</th>
                      <th>View</th>
                      <th>Edit</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      students.map((data,index) =>
                        <tr>
                      <td>{index + 1}</td>
                      <td>{data.name}</td>
                      <td>{data.call}</td>
                      <td><img style={{width : '50px',height : '50px',objectFit : 'cover'}} src={data.photo} alt="" /></td>
                      <td><Button onClick={ () => handaleSingalModal(data.id)} className='btn btn-info btn-sm'>View</Button></td>
                      <td><Button onClick={ () => handaleDataEdit(data.id)} className='btn btn-warning btn-sm'>Edit</Button></td>
                      <td><Button onClick={ () => handaleDataDeleteModal(data.id)} className='btn btn-danger btn-sm'>Delete</Button></td>
                    </tr>
                        )
                    }
                    
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Student