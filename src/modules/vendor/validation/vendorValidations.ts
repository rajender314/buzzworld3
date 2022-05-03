import Validations from '../../../core/validations/validations'

export const messages = {
    manufacturer_discount_id: {
        dropdown: "Please select Discount Code",
    },
    stock_code: {
        required: 'Please enter Stock Code'
    },
    list_price: {
        required: 'Please enter List Price',
        phone: "Please enter valid number"
    },
    //description: {
    //    required: 'Please enter Description'
    //},


}
export const vendorValidations = Validations({
    manufacturer_discount_id: 'dropdown',
    stock_code: 'required',
    list_price: 'required|phone',
    //description: 'required'

}, messages);