import * as Yup from "yup";

const ApprovalTwentykValidationsSchema = Yup.object({
  timeline: Yup.object().required("Please select timeline").nullable(),
  delivery_due_date: Yup.string().required("Please select PO-Date").nullable(),
  pain: Yup.string().required("Please enter Pain").trim().nullable(),
  decision_making_process: Yup.string()
    .required("Please enter Decision Making Process")
    .trim()
    .nullable(),
});

export default ApprovalTwentykValidationsSchema;
