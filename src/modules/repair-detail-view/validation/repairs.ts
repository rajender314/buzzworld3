import Validations from '../../../core/validations/validations';

export const messages = {
  customer_po: {
    required: 'Please enter Customer PO',
  },
  customer_name: {
    dropdown: 'Please select Customer Name',
  },
  customer_reference: {
    dropdown: 'Please select Customer Reference',
  },
  priority_level: {
    dropdown: 'Please select Priority Level',
  },
  sales_person_name: {
    dropdown: 'Please select Sales Person Name',
  },
  assign_to: {
    dropdown: 'Please select User',
  },
};
export const repairValidations = Validations(
  {
    customer_po: 'required',
    customer_name: 'dropdown',
    customer_reference: 'dropdown',
    priority_level: 'dropdown',
    sales_person_name: 'dropdown',
    assign_to: 'dropdown',
  },
  messages,
);
