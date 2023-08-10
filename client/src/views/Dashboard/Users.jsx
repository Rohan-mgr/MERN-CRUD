import { useState } from "react";
import Button from "../../components/common/Button";
import { _remove } from "../../utils/storage";
import { useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";
import useFetchUsers from "../../hooks/useFetchUsers";
import { BiSolidEdit, BiSolidUserPlus } from "react-icons/bi";
import { AiTwotoneDelete } from "react-icons/ai";
import UserInfoModal from "../../components/common/UserInfoModal";
import UserRegisterModal from "../../components/common/UserRegisterModal";
import { _getSecureLs } from "../../utils/storage";
import { deleteUser } from "../../services/user";

function Users() {
  const navigate = useNavigate();
  const { loggedUser } = _getSecureLs("auth");
  const [modalShow, setModalShow] = useState(false);
  const [userRegisterModal, setUserRegisterModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const { isLoading, users, setUsers } = useFetchUsers();

  const handleUserDelete = async (id) => {
    try {
      const response = await deleteUser(id);
      const updatedExpensesList = users?.filter(
        (e) => e?._id !== response?.data?.deletedUser?._id
      );

      setUsers(updatedExpensesList);
    } catch (error) {
      throw new Error(error);
    }
  };

  const handleLogout = () => {
    _remove("auth");
    navigate("/");
  };
  return (
    <div className="user">
      <div className="user__header">
        <h2>MERN CRUD APP</h2>
        <div className="user__button__wrapper d-flex ">
          <Button type="button" handleClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>
      <div className="table__header">
        <h3>Registered Users</h3>
        {loggedUser?.role === "admin" && (
          <div className="table__header__button__wrapper">
            <Button
              type="button"
              variant="success"
              handleClick={() => {
                setSelectedUser({});
                setIsEditing(false);
                setUserRegisterModal(true);
              }}
            >
              <BiSolidUserPlus /> Add New User
            </Button>
          </div>
        )}
      </div>
      <div className="user__list">
        <Table striped hover responsive>
          <thead>
            <tr>
              <th>S.N.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <div className="spinner__wrapper">
                <Spinner animation="border" variant="primary" />
              </div>
            ) : (
              users.map((user, i) => {
                return (
                  <tr
                    key={user?._id}
                    onClick={() => {
                      setSelectedUser(user);
                      setModalShow(true);
                    }}
                  >
                    <td>{++i}</td>
                    <td>{user?.fullName}</td>
                    <td>{user?.email}</td>
                    <td>{user?.address}</td>
                    <td onClick={(e) => e.stopPropagation()}>
                      <BiSolidEdit
                        onClick={() => {
                          setIsEditing(true);
                          setSelectedUser(user);
                          setUserRegisterModal(true);
                        }}
                      />
                      <AiTwotoneDelete
                        onClick={() => handleUserDelete(user?._id)}
                      />
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </Table>

        <UserInfoModal
          show={modalShow}
          user={selectedUser}
          onHide={() => setModalShow(false)}
        />
        <UserRegisterModal
          show={userRegisterModal}
          userList={users}
          handleUser={setUsers}
          isEditing={isEditing}
          selectedUser={selectedUser}
          onHide={() => setUserRegisterModal(false)}
        />
      </div>
    </div>
  );
}

export default Users;
