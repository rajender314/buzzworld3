import Validations from '../../../core/validations/validations'
export const messages = {
    manufacturer_vendor_id: {
        dropdown: "Please select Vendor",
    },
    // stock_code: {
    //     dropdown: 'Please search and select Stock Code',
    // },
    Organization: {
        dropdown: 'Please select Organization',
    },
    // start_date: {
    //     required: 'Please select the Start Date',
    // },
    // end_date: {
    //     required: 'Please select the End Date',
    // },
    // list_price: {
    //     required: 'Please enter List Price',
    // },
    special_price: {
        required: 'Please enter Special Price',
        phone: "Please enter valid number"
    },
    description: {
        description: 'Give Description'
    }

}


export const SpecialPricevendorEditValidations = Validations({
     manufacturer_vendor_id: 'dropdown',
    // stock_code: 'dropdown',
     special_price: 'required',
    // list_price: 'required',
     Organization: 'dropdown',
    // start_date: 'required',
    // end_date: 'required',
    // description: 'required'

}, messages);