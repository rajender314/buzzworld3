import Validations from '../../../../core/validations/validations';

export const messages = {
  name: {
    required: 'Please enter Name',
  },
  // description: {
  //    required: 'Please enter Description'
  // },
};
export const useRolesValidations = Validations(
  {
    name: 'required',
    // description: 'required'
  },
  messages,
);
