import Validations from '@app/core/validations/validations';

export const messages = {
  name: {
    required: 'Please enter Name',
  },
  // description: {
  //    required: 'Please enter Description'
  // },
};
export const userValidations = Validations(
  {
    name: 'required',
    // description: 'required'
  },
  messages,
);
