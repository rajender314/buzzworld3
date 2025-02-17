// import Validations from '../../../core/validations/validations'

// export const messages = {
//    manufacturer_discount_id: {
//        dropdown: "Please select Discount Code",
//    },
//    stock_code: {
//        required: 'Please enter Stock Code'
//    },
//    list_price: {
//        required: 'Please enter List Price',
//        phone: "Please enter valid number"
//    },
//    //description: {
//    //    required: 'Please enter Description'
//    //},

// }
// export const vendorValidations = Validations({
//    manufacturer_discount_id: 'dropdown',
//    stock_code: 'required',
//    list_price: 'required|phone',
//    //description: 'required'

// }, messages);

import * as Yup from "yup";

const vendorValidations = Yup.object({
  manufacturer_discount_id: Yup.object()
    .required("Please select  Discount Code")
    .nullable(),
  stock_code: Yup.string().required("Please enter Stock Code").nullable(),
  // list_price: Yup.number().required('Please enter List Price').min(1, 'List Price cannot be zero').lessThan(100000, 'Exceeding character limit').nullable(),
  list_price: Yup.string()
    .required("Please enter List Price")
    .matches(/^\d*(\.\d{0,4})?$/gm, "Please enter valid number")
    .matches(/^(?![,.0]*$)/gm, "Price cannot be zero")
    .nullable(),
  product_class: Yup.object()
    .required("Please select Product Class")
    .nullable(),
  // list_price: Yup.string().required('Please enter List Price').nullable(),
});

export default vendorValidations;
