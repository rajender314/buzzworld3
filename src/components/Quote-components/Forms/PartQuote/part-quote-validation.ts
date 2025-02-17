import * as Yup from "yup";

export const PartQuoteValidationSchema = Yup.object({
  customer_id: Yup.object().required("Please select Company Name").nullable(),
  quote_type: Yup.object().required("Please select Quote Type").nullable(),
});

export const RepairSummaryValidationSchema = Yup.object({
  repair_summary: Yup.array()
    .required("Please select Repair Summary")
    .nullable(),
});

export const AssignQCValidationSchema = Yup.object({
  user_id: Yup.object().required("Please select User").nullable(),
});

export const AddCompanyValidationSchema = Yup.object({
  customer_id: Yup.string()
    .required("Please enter Account Name")
    .trim()
    .nullable(),
  account_type: Yup.object().required("Please select Account Type").nullable(),
  state: Yup.object().required("Please Select State").nullable(),
  phone: Yup.string()
    .matches(
      /^(\+1[-. ]?)?(\(?\d{3}\)?[-. ]?)?\d{3}[-. ]\d{4}$/,
      "Please Enter Valid Phone number"
    )
    .required("Please Enter Phone Number"),

  city: Yup.string()
    .matches(
      /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
      " City must be alphabets"
    )
    .required("Please Enter City "),
  zipcode: Yup.object()
    // .matches(/^[a-zA-Z0-9]*$/, "Enter Valid Zip Code")
    .required("Please select Zip Code ")
    .nullable(),
  street_1: Yup.string().required("Please Enter Street 1"),
  website: Yup.string().matches(
    /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm,
    "Enter valid Website"
  ),
});

export const QuoteAddContactSchema = Yup.object({
  customer_id: Yup.object().required("Please select Company Name").nullable(),
  first_name: Yup.string().required("Please Enter First Name"),
  last_name: Yup.string().required("Please Enter Last Name"),
  email: Yup.string()
    .matches(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/, "Email Id is not valid")
    .required("Please Enter  Email ID"),
  phone: Yup.string()
    .matches(
      /^(\+1[-. ]?)?(\(?\d{3}\)?[-. ]?)?\d{3}[-. ]\d{4}$/,
      "Please Enter Valid Phone number"
    )
    .required("Please Enter Phone Number"),
});
