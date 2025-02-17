import * as Yup from "yup";

const PoInformationFormValidationSchema = Yup.object({
  purchase_order_info: Yup.array().of(
    Yup.object().shape({
      purchase_order_number: Yup.string()
        .matches(/^[a-zA-Z0-9]+$/, "Enter Purchase Order Number not valid")
        .required("Please Enter Purchase Order Number "),
      tracking_number: Yup.string().matches(
        /^[a-zA-Z0-9]+$/,
        "Enter Tracking Number not valid"
      ),

      follow_up_date: Yup.string().required("Please Select Follow up Date "),
      confirmed_delivery_date: Yup.string().required(
        "Please Select Confirmed Delivery Date"
      ),
      // order_notes: Yup.number().max(25, 'Exceeding character limit').nullable(),
      order_notes: Yup.string()
        .max(255, "Order Notes must be less than 255 character")
        .nullable(),
    })
  ),
});
export default PoInformationFormValidationSchema;
