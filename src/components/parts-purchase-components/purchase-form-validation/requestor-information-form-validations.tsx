import * as Yup from "yup";

const ReuestorInformationFormValidationSchema = Yup.object({
  // requested_by: Yup.object().required("Please select Requested by").nullable(),
  technician: Yup.object().required("Please select  Technician").nullable(),
  date_requested: Yup.string().required("Please select Date "),
  urgency: Yup.object().required("Please select  Urgency").nullable(),
});

export default ReuestorInformationFormValidationSchema;
