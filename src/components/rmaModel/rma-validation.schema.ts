import * as Yup from "yup";

const RmaValidationSchema = Yup.object({
  customer_id: Yup.object().required("Please select Company Name").nullable(),
  // priority: Yup.object().required('Please select Priority Level').nullable(),
  contact_id: Yup.object().required("Please select Contact Name").nullable(),
});
export default RmaValidationSchema;
