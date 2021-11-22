import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

class AlertModal extends React.Component {
  render() {
    return (<Modal show={this.props.modalStatus}>

      <Modal.Header closeButton>
        <Modal.Title>Ürünü silmek istediğinize emin misiniz ?</Modal.Title>
      </Modal.Header>

      <Modal.Body><p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Quam, quos? Nesciunt veritatis ad deleniti obcaecati necessitatibus
        unde iure possimus nobis ut deserunt, beatae rerum dignissimos
        eligendi eius perspiciatis eaque fugit?</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="success" onClick={this.props.removeHandler}>
          Evet
        </Button>
        <Button variant="danger" onClick={this.props.closeModal}>
          Hayır
        </Button>
      </Modal.Footer>

    </Modal>
    );
  }

}

export default AlertModal;