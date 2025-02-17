// import Validations from '../../../../core/validations/validations'

// export const messages = {
//    customer_name: {
//        dropdown: "Please select Customer Name"
//    },
//    priority: {
//        dropdown: "Please select Priority"
//    },
//    sales_person_name: {
//        dropdown: "Please select Sales Person Name"
//    },
//    assign_to: {
//        dropdown: "Please select User"
//    },
//    stock_code: {
//        required: "Please enter Stock Code",
//    },
//     description: {
//        required: "Please enter Description",
//    },
//     manufacturer_id: {
//        dropdown: "Please select Manufacturer",
//    },
//     quantity: {
//        required: "Please enter Quantity",
//         phone: "Please enter valid number"
//    },
//     serial_number: {
//        required: "Please enter Serial No"
//    },
// }
// export const repairValidations = Validations({
//    priority: 'dropdown',
// }, messages);

// export const PartRepairValidations = Validations({
//    // part_number: 'required',
//    manufacturer_id: 'dropdown',
//    quantity: 'required|phone',
//    priority: 'dropdown',
//    serial_number: 'required',
// }, messages);

import * as Yup from "yup";

const PartRepairValidations = (data: any) => {
  console.log(data);
  return Yup.object({
    manufacturer_id: Yup.object()
      .required("Please select Manufacturer")
      .nullable(),
    // priority: Yup.object().required('Please select Priority').nullable(),
    // quantity: Yup.string().required('Please select Quantity').matches(/^-?\d+(?:\.\d+)?$/gm, 'Please enter numbers only'),
    quantity: Yup.number()
      .required("Please enter Quantity")
      .min(1, "Quantity cannot be zero")
      .lessThan(100000, "Exceeding character limit")
      .nullable(),
    serial_number: Yup.string().required("Please enter Serial No"),
    // delivery_due_date: Yup.string()
    //  .required('Please select Delivery Due Date')
    //  .nullable(),
    evaluation_summary:
      data.repair_status === "evaluation" ||
      data.repair_status === "pending_quote" ||
      data.evaluation_summary
        ? Yup.array().required("Please select Summary").nullable()
        : Yup.array().nullable(),
    description: Yup.string()
      .max(100, "Description cannot be more than 100 characters")
      .nullable()
      .trim(),
  });
};
export default PartRepairValidations;
