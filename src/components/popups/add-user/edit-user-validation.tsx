import * as Yup from "yup";

const editUserSchema = Yup.object({
  manager_id: Yup.object().required("Please Select  Manager").nullable(),
  user_role_id: Yup.object().required("Please Select User Role").nullable(),
  status: Yup.object().required("Please Select Status").nullable(),
  phone: Yup.string()
    .matches(
      /^(\+1[-. ]?)?(\(?\d{3}\)?[-. ]?)?\d{3}[-. ]\d{4}$/,
      "Please Enter Valid Phone number"
    )
    .required("Please Enter Phone Number"),
});
export default editUserSchema;
