import * as Yup from 'yup';

export const CreateSOValidationSchema = Yup.object({
  ordered_by: Yup.string()
    .matches(
      /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
      'Ordered By must be alphabets',
    )
    .required('Please Enter Ordered By ')
    .nullable(),
  order_date: Yup.string().required('Please Select Order Date').nullable(),
  requested_ship_date: Yup.string()
    .required('Please Select Ship Date')
    .nullable(),
  customer_email: Yup.string().matches(
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    'Enter Ack Delivery Email Not Valid',
  ),
  invoice_delivery_email: Yup.string().matches(
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    'Enter Invoice Delivery Email Not Valid',
  ),

  invoice_terms: Yup.object()
    .required('Please Select Invoice Terms')
    .nullable(),

  shippingInst_display: Yup.object()
    .required('Please Select Shipping Instructions')
    .nullable(),
  customer_po_number: Yup.string()
    .matches(/^[^'"]*$/, 'Enter PO Number Not Valid')
    .required('Please Enter PO Number')
    .nullable(),
  shipping_collect: Yup.string()
    .matches(/^[^'"]*$/, 'Enter Collect Number Not Valid')
    .nullable(),
  // // shipping_address: Yup.string()
  // //   .required("Please enter Shipping Address")
  // //   .nullable(),
  // requested_ship_date: Yup.string()
  //   .required("Please Select Ship Date")
  //   .nullable(),
  // shipping_instrs_cod: Yup.string()
  //   .required("Please enter Shipping Instruction Code")
  //   .nullable(),
});

export const CreateSOCustomerSchema = Yup.object({
  supplier: Yup.object().required('Please Select Customer').nullable(),
  contact: Yup.object().required('Please Select Quote Requested By').nullable(),
});
