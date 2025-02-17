import * as Yup from "yup";

const SpItemValidationSchema = Yup.object({
  // value: Yup.string()
  //  .required('Please enter Value')
  //  .matches(/^-?\d+(?:\.\d+)?$/gm, 'Please enter numbers only')
  //  .matches(/^(?![,.0]*$)/gm, 'Value cannot be zero')
  //  .nullable(),
  value: Yup.string().when("type", {
    is: (value: any) => value,
    then: Yup.string()
      .required("Please enter Value")
      .matches(/^-?\d+(?:\.\d+)?$/gm, "Please enter numbers only")
      .trim(),
    otherwise: Yup.string(),
  }),
  fixed_price: Yup.string()
    .matches(/^\d*(\.\d{0,4})?$/gm, "Please enter valid number")
    .matches(/^(?![,.0]*$)/gm, "Price cannot be zero")
    .nullable(),
  buy_price: Yup.string()
    .matches(/^\d*(\.\d{0,4})?$/gm, "Please enter valid number")
    .matches(/^(?![,.0]*$)/gm, "Price cannot be zero")
    .nullable(),
  buy_side_discount: Yup.number()
    .max(100, "Purchase Discount cannot be more than 100")
    .typeError("Discount must be a number")
    .nullable(),
  // date_range: Yup.array().required('Please select Date Range').nullable(),
});
export default SpItemValidationSchema;
