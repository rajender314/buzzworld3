import * as Yup from "yup";

const TermsValidationsSchema = Yup.object().shape({
  website: Yup.string().required("Please Enter Website Name"),
  email: Yup.string().required("Please Enter Email ID"),
  fax_no: Yup.string().required("Please Enter Fax Number"),
  contact_no: Yup.string().required("Please Enter Customer Service Number"),
  field_service: Yup.string().required("Please Enter Field Service Number"),
});
export default TermsValidationsSchema;
