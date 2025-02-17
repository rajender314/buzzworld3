import * as Yup from "yup";

const CloneQuoteValidationSchema = Yup.object({
  customer_id: Yup.object().required("Please select Company Name").nullable(),
});
export default CloneQuoteValidationSchema;
