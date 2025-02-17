import * as Yup from "yup";

const CreatestocklineitemsformValidationSchema = Yup.object({
  stock_code: Yup.string().required("Stock Code is required").nullable(),
  description: Yup.string()
    .required("Stock Description is required")
    .nullable(),
  // product_class: Yup.string().required("Product Class is required").nullable(),
  product_class: Yup.object()
    .required("Please Select Product Class")
    .nullable(),

  // vendor_name: Yup.string().required("Vendor Name is required").nullable(),
  stock_uom: Yup.string().required("Order UOM is required").nullable(),
  // ware_house: Yup.string().required("Warehouse required").nullable(),
  ware_house: Yup.object().required("Please Select Warehouse").nullable(),
  supplier: Yup.object().required("supplier required").nullable(),
  unit_cost: Yup.string()
    .matches(/^\d+(?:\.\d+)?$/, "Unit Cost  not valid")
    .matches(/^(?!0)[0-9]|[1-9][0-9]+$/, "Unit Cost can't be 0")

    .nullable()
    .trim()
    .required("Please Enter Unit Cost"),
  list_price: Yup.string()
    .matches(/^\d+(?:\.\d+)?$/, "List Price  not valid")
    .matches(/^(?!0)[0-9]|[1-9][0-9]+$/, "List Price can't be 0")

    .nullable()
    .trim()
    .required("Please Enter List Price"),
});
export default CreatestocklineitemsformValidationSchema;
