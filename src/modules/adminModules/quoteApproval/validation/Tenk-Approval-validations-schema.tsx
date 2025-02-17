import * as Yup from "yup";

const ApprovalTenkValidationsSchema = Yup.object().shape({
  competitions: Yup.string()
    .required("Please enter Competition")
    .trim()
    .nullable(),
  budgetry_type: Yup.object().required("Please select Type").nullable(),
  // budgetry_amount: Yup.number().required("Please enter Budgetary Amount").min(1, 'Budgetary Amount cannot be zero').nullable(),
  budgetry_amount: Yup.string()
    .required("Please enter Budgetary Amount")
    .matches(/^\d*(\.\d{0,4})?$/gm, "Please enter valid number")
    .matches(/^(?![,.0]*$)/gm, "Price cannot be zero")
    .nullable(),
  key_decision_maker: Yup.string()
    .required("Please enter Key Decision Maker")
    .trim()
    .nullable(),
});

export default ApprovalTenkValidationsSchema;
