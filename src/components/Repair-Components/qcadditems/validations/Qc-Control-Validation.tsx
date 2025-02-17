import * as Yup from "yup";

const QcValidation = Yup.object({
  select_control: Yup.object().required("Please select Qc Form").nullable(),
  qc_statuses_id: Yup.object().required("Please select Status").nullable(),
  // statusQc: Yup.object().required("Please select qc_status").nullable(),
  // .min(00, "Invalid Hours format ")
  // .max(24, "Invalid Hours formats "),
  // .matches(/^([+-]?\d+(?:[.,]\d+)?)$/, "Hours"),
  //   technician: Yup.object().required("Please Select Employee Name").nullable(),
  //   work_center: Yup.string().required("Please Select Work Center"),
  //   start_date: Yup.string().required("Please Select Date").nullable(),
});
export default QcValidation;
