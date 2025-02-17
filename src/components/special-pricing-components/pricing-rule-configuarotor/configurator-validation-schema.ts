import * as Yup from "yup";

export const ConfiguratorValidationSchema = Yup.object({
  // account_type: Yup.object().required('Please select Company Name'),
  organizations_id: Yup.object()
    .required("Please select Company Name")
    .nullable(),
  date_range: Yup.array().required("Please select Date Range"),
  quote_number: Yup.string()
    .required("Please enter Client Quote Number")
    .trim()
    .nullable(),
  pricing_rules: Yup.array().of(
    Yup.object().shape(
      {
        supplier: Yup.object().required("Please select Supplier").nullable(),
        // type: Yup.object().required('Please select Type'),
        // type: Yup.object().when('fixed_value', {
        //    is: (value: any) => value && value.length > 0,
        //    then: Yup.object().nullable(),
        //    otherwise: Yup.object().required('Please select Type').nullable(),
        // }),
        type: Yup.object().when(
          ["buy_side_discount", "buy_price", "fixed_value"],
          {
            is: (value: any, value2: any, value3: any) =>
              value || value2 || value3,
            then: Yup.object().nullable(),
            otherwise: Yup.object().required("Please select Type").nullable(),
          }
        ),
        // buy_side_discount: Yup.number()
        //    .max(100, 'Discount cannot be more than 100')
        //    .typeError("Discount must be a number")
        //    .nullable(),
        buy_side_discount: Yup.number().when(
          ["type", "fixed_value", "buy_price"],
          {
            is: (value: any, value2: any, value3: any) =>
              value || value2 || value3,
            then: Yup.number()
              .max(100, "Discount cannot be more than 100")
              .typeError("Discount must be a number")
              .nullable(),
            otherwise: Yup.number()
              .required("Please enter Purchase Discount")
              .max(100, "Discount cannot be more than 100")
              .typeError("Discount must be a number")
              .nullable(),
          }
        ),
        // buy_price: Yup.string()
        //    .matches(/^\d/gm, 'Please enter numbers only')
        //    .matches(/^\d*(\.\d{0,2})?$/gm, 'Please enter valid number')
        //    .matches(/^(?![,.0]*$)/gm, 'Price cannot be zero')
        //    .nullable()
        //    .trim(),
        buy_price: Yup.string().when(
          ["buy_side_discount", "type", "fixed_value"],
          {
            is: (value: any, value2: any, value3: any) =>
              value || value2 || value3,
            then: Yup.string()
              .matches(/^\d/gm, "Please enter numbers only")
              .matches(/^\d*(\.\d{0,4})?$/gm, "Please enter valid number")
              .matches(/^(?![,.0]*$)/gm, "Price cannot be zero")
              .nullable()
              .trim(),
            otherwise: Yup.string()
              .required("Please enter Buy Price")
              .matches(/^\d/gm, "Please enter numbers only")
              .matches(/^\d*(\.\d{0,4})?$/gm, "Please enter valid number")
              .matches(/^(?![,.0]*$)/gm, "Price cannot be zero")
              .nullable()
              .trim(),
          }
        ),
        // fixed_value: Yup.string().when(['type', 'item_range_specification'], {
        //    is: (value: any, item_range_specification: any) => value || (item_range_specification &&
        //        item_range_specification.value === 'item_range'),
        //    then: Yup.string().nullable(),
        //    otherwise: Yup.string().required('Please select Fixed Sales Price').nullable(),
        // }),
        fixed_value: Yup.string().when(
          ["buy_price", "type", "buy_side_discount"],
          {
            is: (value: any, value2: any, value3: any) =>
              value || value2 || value3,
            then: Yup.string()
              .matches(/^\d/gm, "Please enter numbers only")
              .matches(/^\d*(\.\d{0,4})?$/gm, "Please enter valid number")
              .matches(/^(?![,.0]*$)/gm, "Price cannot be zero")
              .nullable()
              .trim()
              .nullable(),
            otherwise: Yup.string()
              .matches(/^\d/gm, "Please enter numbers only")
              .matches(/^\d*(\.\d{0,4})?$/gm, "Please enter valid number")
              .matches(/^(?![,.0]*$)/gm, "Price cannot be zero")
              .trim()
              .required("Please enter Fixed Sales Price")
              .nullable(),
          }
        ),
        type_value: Yup.string().when("type", {
          is: (value: any) => value,
          then: Yup.string()
            .required("Please enter Value")
            .matches(/^-?\d+(?:\.\d+)?$/gm, "Please enter numbers only")
            .trim(),
          otherwise: Yup.string(),
        }),
        // item_range_specification: Yup.object().required('Please select Specification').nullable(),
        starting_with: Yup.string().when(
          ["ending_with", "item_range_specification"],
          {
            is: (ending_with: any, item_range_specification: any) =>
              ending_with ||
              item_range_specification === null ||
              item_range_specification === undefined ||
              (item_range_specification &&
                item_range_specification.value === "specification"),
            then: Yup.string(),
            otherwise: Yup.string().required("Please enter Value").trim(),
          }
        ),
        ending_with: Yup.string().when(
          ["starting_with", "item_range_specification"],
          {
            is: (starting_with: any, item_range_specification: any) =>
              starting_with ||
              item_range_specification === null ||
              item_range_specification === undefined ||
              (item_range_specification &&
                item_range_specification.value === "specification"),
            then: Yup.string(),
            otherwise: Yup.string().required("Please enter Value").trim(),
          }
        ),
        // items: Yup.object().when('item_range_specification', {
        //    is: (value: any) => value && value.value === "specification",
        //    then: Yup.object().required('Please select Items'),
        //    otherwise: Yup.object().nullable()
        // }),
        items: Yup.array().when("item_range_specification", {
          is: (value: any) => value && value.value === "specification",
          then: Yup.array().required("Please select Items"),
          otherwise: Yup.array(),
        }),
        // starting_with: Yup.string().when('ending_with', {
        //    is: (value: any) => value,
        //    then: Yup.string(),
        //    otherwise: Yup.string().required('Please enter Value').matches(/^-?\d+(?:\.\d+)?$/gm, 'Please enter numbers only')
        // }),
        // ending_with: Yup.string().when('starting_with', {
        //    is: (value: any) => value,
        //    then: Yup.string(),
        //    otherwise: Yup.string().required('Please enter Value').matches(/^-?\d+(?:\.\d+)?$/gm, 'Please enter numbers only')
        // }),
        // fixed_value: Yup.string().when('type', {
        //    is: (value: any) => value,
        //    then: Yup.string(),
        //    otherwise: Yup.string().required('Please enter Fixed Sales Price').matches(/^-?\d+(?:\.\d+)?$/gm, 'Please enter numbers only')
        // }),
        // fixed_value: Yup.string()
        //    .matches(/^\d/gm, 'Please enter numbers only')
        //    .matches(/^\d*(\.\d{0,2})?$/gm, 'Please enter valid number')
        //    .matches(/^(?![,.0]*$)/gm, 'Price cannot be zero')
        //    .nullable()
        //    .trim(),
      },
      [
        ["starting_with", "ending_with"],
        ["type", "buy_side_discount"],
        ["type", "buy_price"],
        ["type", "fixed_value"],
        ["buy_side_discount", "fixed_value"],
        ["buy_side_discount", "buy_price"],
        ["buy_price", "fixed_value"],
      ]
    )
  ),
});

export default ConfiguratorValidationSchema;
