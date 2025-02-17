import Validations from '../../../core/validations/validations';

export const messages = {
  // manufacturer_vendor_id: {
  //    required: "Please select Vendor",
  // },
  // stock_code: {
  //     dropdown: 'Please search and select Stock Code',
  // },
  Organization: {
    dropdown: 'Please select Organization',
  },
  start_date: {
    date: 'Please select Start Date',
  },
  end_date: {
    date: 'Please select End Date',
  },
  // list_price: {
  //     required: 'Please enter List Price',
  // },
  special_price: {
    required: 'Please enter Special Price',
    phone: 'Please enter valid number',
  },
  description: {
    description: 'Give Description',
  },
};

export const SpecialPricevendorEditValidations = Validations(
  {
    // manufacturer_vendor_id: 'required',
    // stock_code: 'dropdown',
    special_price: 'required|phone',
    // list_price: 'required',
    Organization: 'dropdown',
    start_date: 'date',
    end_date: 'date',
    // description: 'required'
  },
  messages,
);
