import * as Yup from "yup";

export const CustomPartItemsValidationSchema = Yup.object({
  custom_part_items: Yup.array().of(
    Yup.object().shape({
      supplier: Yup.object().required("Please select Manufacturer").nullable(),
      part_number: Yup.string()
        .required("Please enter Part Number")
        .nullable()
        .trim()
        .min(2, "Atleast two characters required"),
      serial_number: Yup.string()
        .required("Please enter Serial No")
        .trim()
        .min(2, "Atleast two characters required"),
      description: Yup.string()
        .max(100, "Description cannot be more than 100 characters")
        .nullable()
        .trim(),
      // type: Yup.object().when('fixed_value', {
      //	is: (value: any) => value && value.length > 0,
      //	then: Yup.object().nullable(),
      //	otherwise: Yup.object().required('Please enter Type').nullable()
      // }),
      // type_value: Yup.string().when('type', {
      //	is: (value: any) => value,
      //	then: Yup.string().required('Please enter Value').matches(/^-?\d+(?:\.\d+)?$/gm, 'Please enter numbers only'),
      //	otherwise: Yup.string()
      // }),
      // fixed_value: Yup.string().when('type', {
      //	is: (value: any) => value,
      //	then: Yup.string(),
      //	otherwise: Yup.string().required('Please enter Fixed Sales Price').matches(/^-?\d+(?:\.\d+)?$/gm, 'Please enter numbers only')
      // }),
      // buy_price: Yup.string().matches(/^-?\d+(?:\.\d+)?$/gm, 'Please enter numbers only'),
    })
  ),
});

export const CustomQuoteItemsValidationSchema = (quoteInfo: any) =>
  Yup.object({
    custom_part_items: Yup.array().of(
      Yup.object().shape({
        supplier: Yup.object()
          .required("Please select Manufacturer")
          .nullable(),
        part_number: Yup.string()
          .required("Please enter Part Number")
          .nullable()
          .trim()
          .min(2, "Atleast two characters required"),
        quantity: Yup.number()
          .required("Please enter Quantity")
          .min(1, "Quantity cannot be zero")
          .lessThan(100000, "Exceeding character limit"),
        quote_price: Yup.string()
          .required("Please enter Quote Price")
          .matches(/^\d*(\.\d{0,4})?$/gm, "Please enter valid price")
          .matches(/^(?![,.0]*$)/gm, "Price cannot be zero")
          .nullable(),
        // suggested_price: Yup.string()
        //	.required('Please enter Suggested Price')
        //	.matches(/^\d*(\.\d{0,2})?$/gm, 'Please enter valid price')
        //	.matches(/^($|[^0])/gm, 'Price cannot be zero')
        //	.nullable(),
        iidm_cost: Yup.string()
          .required("Please enter IIDM Cost")
          .matches(/^\d*(\.\d{0,6})?$/gm, "Please enter valid price")
          .matches(/^(?![,.0]*$)/gm, "Price cannot be zero")
          .nullable(),
        list_price: Yup.string()
          .required("Please enter List Price")
          .matches(/^\d*(\.\d{0,4})?$/gm, "Please enter valid price")
          .matches(/^(?![,.0]*$)/gm, "Price cannot be zero")
          .nullable(),
        source: quoteInfo.is_repair
          ? Yup.object().nullable()
          : Yup.object().required("Please select Source").nullable(),
        lead_time: Yup.object()
          .required("Please select Turn Around Time")
          .nullable(),
        lead_time_value: Yup.string().when("lead_time", {
          is: (value: any) => value && value.label !== "TBD",
          then: Yup.string()
            .required("Please enter Turn Around Time Value")
            // .matches(/^-?\d+(?:\.\d+)?$/gm, 'Please enter numbers only')
            .trim(),
          otherwise: Yup.string(),
        }),
        description: Yup.string()
          .max(100, "Description cannot be more than 100 characters")
          .nullable()
          .trim(),
      })
    ),
  });
