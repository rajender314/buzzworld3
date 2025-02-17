import Validations from '../../../core/validations/validations';

export const messages = {
  filter_name: {
    required: ' Please Enter Filter Name',
    min: 'Filter Name should contain at least three characters',
  },

  user_ids: {
    multiselect: 'Please Select User Name',
  },
};
export const profileSchema = Validations(
  {
    filter_name: 'required|min:3',
    user_ids: 'multiselect',
  },
  messages,
);
