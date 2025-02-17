import * as Yup from "yup";

const PurchaseAddFormValidationSchema = Yup.object({
  items: Yup.array().of(
    Yup.object().shape({
      job_number: Yup.object().required("Please Select Job Number").nullable(),
      qty: Yup.string()
        .matches(/^[0-9\b]+$/, "quantity  not valid")
        .typeError("quantity must be a number")
        .matches(/^(?!0)[0-9]|[1-9][0-9]+$/, "quantity can't be 0")

        .required("Please Enter quantity"),

      // mfg_part_number: Yup.string()
      //   .matches(/^[a-zA-Z0-9]+$/, "Manufacturer Part Number not valid")
      //   .required("Please Enter Manufacturer Part number"),

      mfg_name: Yup.object()
        .required("Please Select Manufacturer name")
        .nullable(),
      description: Yup.string()
        .required("Please enter Description")
        .trim()
        .nullable(),
      vendor_part_number: Yup.string()
        .matches(
          /^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]*$/,
          "Vendor part number not valid"
        )
        .required("Enter Vendor part number"),

      cost: Yup.string()
        .matches(/^\d/gm, "cost not valid")
        .matches(/^\d*(\.\d{0,6})?$/gm, "Maximum of six decimals allowed")
        .nullable()
        .trim()
        .required("Please Enter Cost"),
    })
  ),
});

export default PurchaseAddFormValidationSchema;
