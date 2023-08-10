import * as yup from "yup";

let userSignupSchema = yup.object({
  fullName: yup.string().min(2).required("Please Enter your full Name"),
  email: yup.string().email().required("Please Enter your Email"),
  address: yup.string().min(2).required("Please Enter your address"),
  contact: yup
    .string()
    .matches(/^\d{10}$/, "Contact must be of 10 digits")
    .required("Contact is required"),
  bio: yup.string().min(5).required("Please describe yourself"),
  role: yup.string().required("Role is required"),
  password: yup.string().min(4).required("Please Enter your Password"),
});
let userLoginSchema = yup.object({
  email: yup.string().email().required("Please Enter your Email"),
  password: yup.string().min(4).required("Please Enter your Password"),
});

export { userSignupSchema, userLoginSchema };
