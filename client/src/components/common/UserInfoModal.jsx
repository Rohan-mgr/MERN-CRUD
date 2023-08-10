import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function UserInfoModal(props) {
  const { user } = props;
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          User Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Name: {user?.fullName}</p>
        <p>
          Email: <a href={`mailto:${user?.email}`}>{user?.email}</a>
        </p>
        <p>Role: {user?.role}</p>
        <p>Address: {user?.address}</p>
        <p>Contact: {user?.contact}</p>
        <p>Bio: {user?.bio}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide} variant="danger">
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default UserInfoModal;
