import * as Yup from "yup";

const JobValidationSchema = Yup.object().shape({
  order_id: Yup.object().required("Please select order id").nullable(),
  Customers: Yup.string().required("Please Enter Customer"),
  unit_of_measure: Yup.string().required("Please Enter Unit Of Measure"),
  warehouse: Yup.string().required("Please Enter Warehouse"),
  sales_order_line: Yup.string().required("Please Enter Sales Order Line"),
  select_item: Yup.object().required("Please select An Item"),
  job_description: Yup.string().required("Please enter Job Description"),
  lineShipDate: Yup.string()
    .required("Please select Delivery Due Date")
    .nullable(),
});

export default JobValidationSchema;
