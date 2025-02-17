import * as Yup from "yup";

const TimerValidation = Yup.object().shape({
  selected_time: Yup.string()
    .required("Please Enter Spent Time")
    .matches(/^\d*(\.\d{0,2})?$/gm, "Please enter valid Time"),
  // .min(00, "Invalid Hours format ")
  // .max(24, "Invalid Hours formats "),
  // .matches(/^([+-]?\d+(?:[.,]\d+)?)$/, "Hours"),
  technician: Yup.object().required("Please Select Employee Name").nullable(),
  work_center: Yup.string().required("Please Select Work Center"),
  start_date: Yup.string().required("Please Select Date").nullable(),
});
export default TimerValidation;
