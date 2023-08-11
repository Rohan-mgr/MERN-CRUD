import { useState, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import LoginImage450 from "../assets/images/banner-image-450.png"; // desktop;
import LoginImage300 from "../assets/images/banner-image-300.png"; // tablet;
import LoginImage350 from "../assets/images/banner-image-350.png"; // mobile;
import Logo from "../assets/images/palm-mind-logo.png";
import InputField from "../components/common/InputField";
import Button from "../components/common/Button";
import { useFormik } from "formik";
import { userLoginSchema } from "../validation/validation";
import Alert from "../components/common/Alert";
import { userLogin } from "../services/user";
import { useNavigate } from "react-router-dom";
import { _setSecureLs } from "../utils/storage";

function Login() {
  const navigate = useNavigate();
  const [isAdmin, setLoginStatus] = useState(false);
  const [alert, setAlert] = useState({
    status: false,
    title: "",
    desc: "",
    type: "",
  });
  const alertRef = useRef(null);

  const handleAlertClose = () => {
    setAlert((prevState) => {
      return {
        ...prevState,
        status: false,
      };
    });
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: userLoginSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await userLogin(values, isAdmin);
        setAlert((prevState) => {
          return {
            ...prevState,
            status: true,
            title: "Account Verify Successfully",
            desc: response?.data?.message,
            type: "success",
          };
        });
        _setSecureLs("auth", {
          loggedUser: response?.data?.loggedInUser,
          token: response?.data?.token,
        });
        navigate("dashboard");
      } catch (error) {
        setAlert((prevState) => {
          return {
            ...prevState,
            status: true,
            title: "Unable To Login",
            desc: error?.response?.data?.message,
            type: "error",
          };
        });
        console.log(error, "error frontend");
      }
      resetForm();
    },
  });

  return (
    <div className="home">
      <div className="home__image">
        <div className="home__image__text">
          <h1>MERN CRUD APP</h1>
        </div>
        <div className="home__image__wrapper">
          <img
            src={LoginImage350}
            srcSet={`${LoginImage350} 350w, ${LoginImage300} 300w, ${LoginImage450} 450w`}
            sizes="(max-width: 599.98px) 83.33vw, (max-width: 999.98px) 39.06vw, 450px"
            alt="banner-image-mobile.png"
          />
        </div>
      </div>
      <div className="home__form">
        <div className="home__form__logo">
          <img src={Logo} width="300px" height="120px" alt="app-logo" />
        </div>

        <form onSubmit={formik.handleSubmit}>
          <CSSTransition
            in={alert?.status}
            nodeRef={alertRef}
            timeout={500}
            classNames="signup-field"
            unmountOnExit
          >
            <div ref={alertRef}>
              <Alert
                alertTitle={alert?.title}
                alertDescription={alert?.desc}
                type={alert?.type}
                handleClose={handleAlertClose}
                hideAlertBox={alert?.status}
              />
            </div>
          </CSSTransition>
          <div className="form__navigation">
            <h3>{isAdmin ? "Admin" : "User"} Login</h3>
          </div>

          <div className="from-group">
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
          <div className="from-group">
            <InputField
              type="password"
              placeholder="Password"
              errorMsg={formik.touched.password && formik.errors.password}
              name="password"
              handleChange={formik.handleChange}
              value={formik.values.password}
            />
          </div>
          <Button type="submit">
            {formik.isSubmitting ? "Logging In..." : "Login"}
          </Button>
        </form>
        <p>
          Login as{" "}
          <strong onClick={() => setLoginStatus((prevState) => !prevState)}>
            {!isAdmin ? "Admin" : "User"}
          </strong>
        </p>
      </div>
    </div>
  );
}

export default Login;
