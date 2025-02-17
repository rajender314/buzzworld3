import Validations from '@app/core/validations/validations';
import * as Yup from 'yup';

export const messages = {
  name: {
    required: 'Name is required',
    name: 'name should contain atleast one character',
  },

  description: {
    // required: "Description is required",
    description: 'should contain atleast two characters',
  },

  status: {
    // required: "status is required",
    Selection: 'please select',
  },
  branch_manager: {
    required: 'Manager is required',
    Selection: 'please select',
  },

  quantity: {
    numFormatRequired: 'Enter Quantity',
    numFormatMinVal: 'cannot be zero',
    numFormatCharLimit: 'Exceeding character limit',
  },
};
export const addSchema = Validations(
  {
    name: 'required|name',
    description: 'description',
    status: 'Selection',
    quantity:
      'numFormatRequired|trim|numFormatMinVal:1|numFormatCharLimit:99999',
  },
  messages,
);
export const addBranchSchema = Yup.object({
  branch_manager_id: Yup.object()
    .required('Please Select Branch Manager')
    .nullable(),

  sales_region_id: Yup.object()
    .required('Please Select Sales Region')
    .nullable(),

  name: Yup.string()
    // .matches(/^[a-zA-Z0-9]+(?:\s[a-zA-Z0-9]+)*$/, "Enter Valid Name")
    .required('Please Enter Name '),

  phone: Yup.string().matches(
    /^(\+1[-. ]?)?(\(?\d{3}\)?[-. ]?)?\d{3}[-. ]\d{4}$/,
    'Please Enter Valid Phone number',
  ),

  email: Yup.string()
    .matches(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/, 'Email is not valid')
    .required('Please Enter  Email ID'),
  state: Yup.string()
    .matches(
      /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
      ' State must be alphabets',
    )
    .required('State required'),
  city: Yup.string()
    .matches(
      /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
      ' City must be alphabets',
    )
    .required('City required'),
  branch_id: Yup.string()
    .matches(/^[a-zA-Z0-9]+$/, ' Branch ID is not Valid')
    .required('Branch ID required'),
  zip: Yup.string()
    .matches(/^[0-9]+$/, 'Zip Code must be number')
    .required('Zip Code required'),
  fax: Yup.string()
    .matches(/^\d{3}\.\d{3}\.\d{4}$/, 'Enter Valid Fax number')
    .required('Fax required'),
});
export const addRegionSchema = Yup.object({
  region_manager_id: Yup.object()
    .required('Please Select Region Manager')
    .nullable(),

  name: Yup.string()
    // .matches(/^[a-zA-Z0-9]+(?:\s[a-zA-Z0-9]+)*$/, "Enter Valid Name")
    .required('Please Enter Name '),
});
export const VendorSchema = Yup.object({
  supplier_code: Yup.object().required('Please Search Code ').nullable(),
  // pos_mail: Yup.string().matches(
  //   /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
  //   "Email is not valid"
  // ),
  // // .required("Please Enter Vendor Email"),
  // pos_test_mail: Yup.string().matches(
  //   /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
  //   "Email is not valid"
  // ),
  // .required("Please Enter Vendor Email"),
});
export const addTerritorySchema = Yup.object({
  sales_manager_id: Yup.object()
    .required('Please Select Sales Manager')
    .nullable(),

  sales_person_id: Yup.object()
    .required('Please Select Sales Person')
    .nullable(),

  name: Yup.string()
    // .matches(/^[a-zA-Z0-9]+(?:\s[a-zA-Z0-9]+)*$/, "Enter Valid Name")
    .required('Please Enter Name '),

  // br_notify_email: Yup.string()
  //   .matches(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/, "Email is not valid")
  //   .required("Please Enter  Email ID"),

  branch_id: Yup.object().required('Please Select Branch Name').nullable(),
  sales_region_id: Yup.object()
    .required('Please Select Sales Region')
    .nullable(),
  territory_code: Yup.string()
    .matches(/^[0-9]+$/, 'Territory Code not valid !')
    .matches(/^(?!0+$)[0-9]+$/, "Territory Code can't be zero !")
    .required('Territory Code required'),
});
export const addZipCodesSchema = Yup.object({
  zipcode: Yup.number()
    // .matches(/^[a-zA-Z0-9]*$/, "Enter Valid Zip Code")
    .required('Please Enter Zip Code ')
    .lessThan(10000000000, 'Exceeding character limit')
    .nullable(),
  city: Yup.string().matches(
    /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
    ' City must be alphabets',
  ),
  state_abr: Yup.string().matches(
    /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
    'state abbreviation must be alphabets',
  ),
  country: Yup.string().matches(
    /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
    'country must be alphabets',
  ),
});
