import * as Yup from "yup";

const addUserSchema = Yup.object({
  manager_id: Yup.object().required("Please Select  Manager").nullable(),
  user_role_id: Yup.object().required("Please Select User Role").nullable(),
  country: Yup.object().required("Please Select Country").nullable(),
  state: Yup.object().required("Please Select State").nullable(),
  first_name: Yup.string()
    .matches(/^[a-zA-Z0-9]+(?:\s[a-zA-Z0-9]+)*$/, "Enter Valid First Name")
    .required("Please Enter First Name "),

  last_name: Yup.string()
    .matches(/^[a-zA-Z0-9]+(?:\s[a-zA-Z0-9]+)*$/, "Enter Valid Last Name")
    .required("Please Enter Last Name "),

  phone: Yup.string()
    .matches(
      /^(\+1[-. ]?)?(\(?\d{3}\)?[-. ]?)?\d{3}[-. ]\d{4}$/,
      "Please Enter Valid Phone number"
    )
    .required("Please Enter Phone Number"),

  email: Yup.string()
    .matches(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/, "Email Id is not valid")
    .required("Please Enter  Email ID"),

  city: Yup.string()
    .matches(
      /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
      " City must be alphabets"
    )
    .required("Please Enter City "),

  syspro_id: Yup.string()
    .matches(/^[a-zA-Z0-9]+$/, "Syspro ID  not valid")
    .required("Please Enter Syspro ID "),
  branch: Yup.object().required("Please Select Branch").nullable(),
});
export default addUserSchema;
