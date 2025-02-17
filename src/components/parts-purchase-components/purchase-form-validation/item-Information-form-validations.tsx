import * as Yup from "yup";

const ItemInformationFormValidationSchema = Yup.object({
  // job_number: Yup.object().required("Please select Job Number").nullable(),
  item_info: Yup.array().of(
    Yup.object().shape({
      job_number: Yup.object().required("Please select Job Number").nullable(),
      qty: Yup.string()
        .matches(/^[0-9\b]+$/, "quantity  not valid")
        .matches(/^(?!0)[0-9]|[1-9][0-9]+$/, "quantity can't be 0")
        .required("Enter quantity"),

      mfg_part_number: Yup.string()
        // .matches(/^[a-zA-Z0-9]+$/, "Manufacturer Part Number not valid")
        // .required("Please Enter Manufacturer Part number")
        .nullable()
        .trim()
        .min(2, "Atleast two characters required"),

      mfg_name: Yup.object().required("Please Select Mfg name").nullable(),
      // vendor_part_number: Yup.number()
      //   .typeError("Vendor Part Number must be a number")
      //   .integer("Vendor Part Number must be a number")
      //   .required("Enter Vendor part number"),
      vendor_part_number: Yup.string()
        .matches(
          /^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]*$/,
          "Vendor Part Number not valid"
        )
        .required("Enter Vendor Part Number")
        .trim(),

      cost: Yup.string()
        .matches(/^\d+(?:\.\d+)?$/, "Cost  not valid")
        .nullable()
        .trim()
        .required("Please Enter Cost"),
      description: Yup.string()
        .required("Please enter Description")
        .trim()
        .max(255, "Description must be less than 255 character")
        .nullable(),
      special_notes: Yup.string()
        .max(255, "Special Notes must be less than 255 character")
        .nullable(),
      item_notes: Yup.string()
        .max(255, "Item Notes must be less than 255 character")
        .nullable(),
    })
  ),
});

export default ItemInformationFormValidationSchema;
