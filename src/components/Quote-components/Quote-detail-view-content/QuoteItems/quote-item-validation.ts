import * as Yup from 'yup';

export const QuoteItemValidationSchema = Yup.object({
  quantity: Yup.number().required('Please enter Quantity').min(1, 'Quantity cannot be zero').lessThan(100000, 'Exceeding character limit')
    .nullable(),
  // quote_price: Yup.number().required('Please enter Quote Price').moreThan(0, 'Quote Price cannot be zero').nullable(),
  // suggested_price: Yup.number().required('Please enter Suggested Price').moreThan(0, 'Suggested Price cannot be zero').nullable(),
  // iidm_cost: Yup.number().required('Please enter IIDM Cost').moreThan(0, 'IIDM Cost cannot be zero').nullable(),
  quote_price: Yup.string()
    .required('Please enter Quote Price')
    .matches(/^\d*(\.\d{0,4})?$/gm, 'Please enter valid price')
    // .matches(/^(?![,.0]*$)/gm, 'Price cannot be zero')
    .nullable(),

  // quote_price: Yup.number()
  //	.transform((_, value) => {
  //		if (value.includes('.')) {
  //			return null;
  //		}
  //		return +value.replace(/,/, '.');
  //	})
  //	.positive(),
  list_price: Yup.string()
    .required('Please enter List Price')
    .matches(/^\d*(\.\d{0,4}|n\/a)?$/i, 'Please enter valid price')
    .matches(/^(?![,.0]*$)/gm, 'Price cannot be zero')
    .nullable(),
  // suggested_price: Yup.string()
  //	.required('Please enter Suggested Price')
  //	.matches(/^\d*(\.\d{0,2})?$/gm, 'Please enter valid price')
  //	.matches(/^(?![,.0]*$)/gm, 'Price cannot be zero')
  //	.nullable(),
  iidm_cost: Yup.string()
    .required('Please enter IIDM Price')
    .matches(/^\d*(\.\d{0,6})?$/gm, 'Please enter valid price')
    .matches(/^(?![,.0]*$)/gm, 'Price cannot be zero')
    .nullable(),
  gp: Yup.number().required('Please enter Gross Profit').max(100, 'GP cannot be more than 100').typeError('GP must be a number')
    .nullable(),
  discount: Yup.number().required('Please enter Discount Price').max(100, 'Discount Price cannot be more than 100').typeError('Discount must be a number')
    .nullable(),
  source: Yup.object().required('Please select Source').nullable(),
  lead_time: Yup.object().required('Please select Turn Around Time').nullable(),
  lead_time_value: Yup.string().when('lead_time', {
    is: (value: any) => value && value.label !== 'TBD',
    then: Yup.string()
      .required('Please enter Turn Around Time Value')
      // .matches(/^-?\d+(?:\.\d+)?$/gm, 'Please enter numbers only')
      .trim(),
    otherwise: Yup.string().nullable(),
  }),
  description: Yup.string().max(100, 'Description cannot be more than 100 characters').nullable().trim(),
});

export const QuoteItemValidationSchema2 = Yup.object({
  quantity: Yup.number().required('Please enter Quantity').min(1, 'Quantity cannot be zero').lessThan(100000, 'Exceeding character limit')
    .nullable(),
  // quote_price: Yup.number().required('Please enter Quote Price').moreThan(0, 'Quote Price cannot be zero').nullable(),
  // suggested_price: Yup.number().required('Please enter Suggested Price').moreThan(0, 'Suggested Price cannot be zero').nullable(),
  // iidm_cost: Yup.number().required('Please enter IIDM Cost').moreThan(0, 'IIDM Cost cannot be zero').nullable(),
  quote_price: Yup.string()
    .required('Please enter Quote Price')
    .matches(/^\d*(\.\d{0,4})?$/gm, 'Please enter valid price')
    // .matches(/^(?![,.0]*$)/gm, 'Price cannot be zero')
    .nullable(),

  // quote_price: Yup.number()
  //	.transform((_, value) => {
  //		if (value.includes('.')) {
  //			return null;
  //		}
  //		return +value.replace(/,/, '.');
  //	})
  //	.positive(),
  // list_price: Yup.string()
  //	.required('Please enter List Price')
  //	.matches(/^\d*(\.\d{0,2})?$/gm, 'Please enter valid price')
  //	.matches(/^(?![,.0]*$)/gm, 'Price cannot be zero')
  //	.nullable(),
  // suggested_price: Yup.string()
  //	.required('Please enter Suggested Price')
  //	.matches(/^\d*(\.\d{0,2})?$/gm, 'Please enter valid price')
  //	.matches(/^(?![,.0]*$)/gm, 'Price cannot be zero')
  //	.nullable(),
  iidm_cost: Yup.string()
    .required('Please enter IIDM Price')
    .matches(/^\d*(\.\d{0,6})?$/gm, 'Please enter valid price')
    .matches(/^(?![,.0]*$)/gm, 'Price cannot be zero')
    .nullable(),
  gp: Yup.number().required('Please enter Gross Profit').max(100, 'GP cannot be more than 100').typeError('GP must be a number')
    .nullable(),
  discount: Yup.number().required('Please enter Discount Price').max(100, 'Discount Price cannot be more than 100').typeError('Discount must be a number')
    .nullable(),

  lead_time: Yup.object().required('Please select Turn Around Time').nullable(),
  lead_time_value: Yup.string().when('lead_time', {
    is: (value: any) => value && value.label !== 'TBD',
    then: Yup.string()
      .required('Please enter Turn Around Time Value')
      // .matches(/^-?\d+(?:\.\d+)?$/gm, 'Please enter numbers only')
      .trim(),
    otherwise: Yup.string(),
  }),
  description: Yup.string().max(100, 'Description cannot be more than 100 characters').nullable().trim(),
});
