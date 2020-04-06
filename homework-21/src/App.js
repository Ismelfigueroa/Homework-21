import React, { Component } from 'react';
import { Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button } from 'reactstrap';
import axios from 'axios';

class App extends Component {

  state = {
    books: [],
    newBookModal: false
  }
  
 componentWillMount() {
    axios.get('http://localhost:3000/books').then((response) => {
      this.setState({
        books: response.data
      })
    });
 };

 toggleNewBookModal() {
   this.setState({
     newBookModal: true
   });
  //  this.state.newBookModal = true;
 }

render() { 
  let books = this.state.books.map((book) => {
    return (
      <tr key={book.id}>
              <td>{book.id}</td>
              <td>{book.title}</td>
              <td>{book.rating}</td>
              <td>
              <Button color="primary" size="sm" className="mr-2">Edit</Button>
               <Button color="danger" size="sm">Delete</Button>
              </td>
            </tr>
    )
  })
  return (
    <div className="App container">
       <Button color="danger" onClick={this.toggleNewBookModal.bind(this)}>Add book</Button>
      <Modal isOpen={this.toggleNewBookModal} toggle={this.toggleNewBookModal.bind(this)}>
        <ModalHeader toggle={this.toggleNewBookModal.bind(this)}>Add a new book</ModalHeader>
        <ModalBody>
        <FormGroup>
        <Label for="title">Title</Label>
        <Input id="title"  />
      </FormGroup>
      <FormGroup>
        <Label for="rating">Rating</Label>
        <Input id="rating"  />
      </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.toggleNewBookModal.bind(this)}>Do Something</Button>{' '}
          <Button color="secondary" onClick={this.toggleNewBookModal.bind(this)}>Cancel</Button>
        </ModalFooter>
      </Modal>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Rating</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
         {books}
        </tbody>
      </Table>
    </div>
  );
}
}

export default App;
