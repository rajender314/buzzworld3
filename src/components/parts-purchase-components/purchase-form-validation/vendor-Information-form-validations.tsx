import * as Yup from "yup";

const VendorInformationFormValidationSchema = Yup.object({
  // vendor_name: Yup.string()
  //   .matches(
  //     /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
  //     "Vendor Name must be alphabets"
  //   )

  //   .required("Vendor name required"),
  vendor_id: Yup.object().required("Please Select Vendor Name").nullable(),

  vendor_website: Yup.string()
    .matches(
      /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm,
      "Enter valid Website"
    )
    .nullable(),
  vendor_contact_name: Yup.string()
    .matches(
      /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
      "Vendor Contact Name must be alphabets"
    )
    .nullable(),

  vendor_phone: Yup.string()
    .matches(
      /^(\+1[-. ]?)?(\(?\d{3}\)?[-. ]?)?\d{3}[-. ]\d{4}$/,
      "Please Enter Valid Phone number"
    )
    .nullable(),
  // vendor_quote_number: Yup.string()
  //   .matches(/^[a-zA-Z0-9]+$/, "Vendor Quote Number not valid")
  //   .required("Please Enter Vendor quote number "),

  vendor_quote_number: Yup.string().matches(
    /^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]*$/,
    "Vendor Quote Number Not Valid"
  ),

  email: Yup.string()
    .matches(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/, "Email is Not Valid")
    .nullable(),
  // shipping_costs: Yup.string()
  //   .matches(/^\d+(?:\.\d+)?$/, "shipping cost not valid")
  //   .matches(/^(?!0)[0-9]|[1-9][0-9]+$/, "shipping cost can't be 0")

  //   .required("Please Enter Shipping Cost")
  //   .nullable()
  //   .trim(),
});

export default VendorInformationFormValidationSchema;
