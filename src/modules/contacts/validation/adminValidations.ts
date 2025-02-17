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
  quantity: {
    quantity: 'should contain atleast one number',
    required: 'Quantity is required',
    phone: 'Please Enter a Valid Number',
  },
};
export const EditSchema = Validations(
  {
    name: 'required|name',
    description: 'description',
    status: 'Selection',
    quantity: 'quantity|required|phone',
  },
  messages,
);

export const EditVendorSchema = Yup.object({
  pos_mail: Yup.string().matches(
    /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
    'Email is not valid',
  ),
  // .required("Please Enter Vendor Email"),
  pos_test_mail: Yup.string().matches(
    /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
    'Email is not valid',
  ),
  // .required("Please Enter Vendor Email"),
});
