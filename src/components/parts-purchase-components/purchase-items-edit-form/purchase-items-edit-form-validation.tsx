import * as Yup from "yup";

const PurchaseEditFormValidationSchema = Yup.object({
  job_number: Yup.object().required("Please Select Job Number").nullable(),
  qty: Yup.string()
    .matches(/^[0-9\b]+$/, "quantity is invalid")
    .typeError("quantity must be a number")
    .matches(/^(?!0)[0-9]|[1-9][0-9]+$/, "quantity can't be 0")

    .required("Please Enter quantity"),

  // mfg_part_number: Yup.string()
  //   .matches(/^[a-zA-Z0-9]+$/, "Manufacturer Part Number is  invalid")
  //   .required("Please Enter Manufacturer Part number"),

  mfg_name: Yup.object().required("Please Select Mfg name").nullable(),
  vendor_part_number: Yup.string()
    .matches(
      /^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]*$/,
      "Vendor part number not valid"
    )
    .required("Enter Vendor part number"),

  cost: Yup.string()
    .matches(/^\d+(?:\.\d+)?$/, "Cost is invalid")
    .nullable()
    .trim()
    .required("Please Enter Cost"),
  description: Yup.string()
    .required("Please enter Description")
    .max(255, "Description must be less than 255 character")
    .trim()
    .nullable(),
  special_notes: Yup.string()
    .max(255, "Special Notes must be less than 255 character")
    .nullable(),
  item_notes: Yup.string()
    .max(255, "Item Notes must be less than 255 character")
    .nullable(),
});
export default PurchaseEditFormValidationSchema;
