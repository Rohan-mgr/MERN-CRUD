import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useFormik } from "formik";
import { userSignupSchema } from "../../validation/validation";
import { userRegistration, updateUser } from "../../services/user";
import InputField from "./InputField";

function UserRegisterModal(props) {
  const { selectedUser, isEditing } = props;
  const formik = useFormik({
    initialValues: {
      fullName: isEditing ? selectedUser?.fullName || "" : "",
      email: isEditing ? selectedUser?.email || "" : "",
      address: isEditing ? selectedUser?.address || "" : "",
      contact: isEditing ? selectedUser?.contact.toString() || "" : "",
      bio: isEditing ? selectedUser?.bio || "" : "",
      role: isEditing ? selectedUser?.role || "" : "",
      password: "",
    },
    enableReinitialize: true,
    validationSchema: userSignupSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        if (isEditing) {
          const response = await updateUser(values, selectedUser?._id);
          const updatedUser = response?.data?.updatedUser;
          const updatedUserList = props.userList.map((user) =>
            user._id === updatedUser?._id ? updatedUser : user
          );
          props.handleUser(updatedUserList);
        } else {
          const response = await userRegistration(values);
          const updatedUsers = [response?.data?.newUser, ...props.userList];
          props.handleUser(updatedUsers);
        }
        props.onHide();
      } catch (error) {
        console.log(error);
      }
      resetForm();
    },
  });

  return (
    <Modal show={props.show} onHide={props.onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Register New User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          <div className="from-group mb-2">
            <InputField
              type="text"
              placeholder="fullName"
              errorMsg={formik.touched.fullName && formik.errors.fullName}
              name="fullName"
              handleChange={formik.handleChange}
              value={formik.values.fullName}
              touched={formik.touched.fullName}
            />
          </div>
          <div className="from-group mb-2">
            <InputField
              type="email"
              placeholder="Email"
              errorMsg={formik.touched.email && formik.errors.email}
              name="email"
              handleChange={formik.handleChange}
              touched={formik.touched.email}
              value={formik.values.email}
            />
          </div>
          <div className="from-group mb-2">
            <InputField
              type="password"
              placeholder={`${isEditing ? "New Password" : "Password"}`}
              errorMsg={formik.touched.password && formik.errors.password}
              name="password"
              handleChange={formik.handleChange}
              touched={formik.touched.password}
              value={formik.values.password}
            />
          </div>
          <div className="from-group mb-2">
            <InputField
              type="text"
              placeholder="address"
              errorMsg={formik.touched.address && formik.errors.address}
              name="address"
              handleChange={formik.handleChange}
              touched={formik.touched.address}
              value={formik.values.address}
            />
          </div>
          <div className="from-group mb-2">
            <InputField
              type="text"
              placeholder="contact"
              errorMsg={formik.touched.contact && formik.errors.contact}
              name="contact"
              handleChange={formik.handleChange}
              touched={formik.touched.contact}
              value={formik.values.contact}
            />
          </div>
          <div className="from-group mb-2">
            <textarea
              className={`${
                formik.errors.bio && formik.touched.bio ? "inputRedBorder" : ""
              }`}
              placeholder="bio"
              name="bio"
              rows="2"
              cols="2"
              onChange={formik.handleChange}
              value={formik.values.bio}
            />
            {formik.errors.bio && formik.touched.bio && (
              <p className="errorMessage d-block">{formik.errors.bio}</p>
            )}
          </div>
          <div className="from-group">
            <label htmlFor="role">Role:</label>
            <select
              className="w-100"
              name="role"
              value={formik.values.role}
              onChange={formik.handleChange}
            >
              <option value="">Select</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            {formik.errors.role && formik.touched.role && (
              <p className="errorMessage">{formik.errors.role}</p>
            )}
          </div>

          <Button
            variant="danger"
            onClick={() => {
              formik.resetForm();
              props.onHide();
            }}
          >
            Close
          </Button>
          <Button className="m-2" type="submit" variant="success">
            {isEditing ? "Update Changes" : "Save Changes"}
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default UserRegisterModal;
