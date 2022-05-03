import Validations from '../../../core/validations/validations'

export const messages = {
    quantity_id: {
        required: "Please enter PO Min Quantity",
    },


    discount_code_ids: {
        multiselect: "Please select User Name"
    }

    // user_ids: {
    //     required: "Please select User Name"
    // }
}
export const discountValidations = Validations({
    quantity_id: 'required',
    discount_code_ids: 'multiselect',
    // user_ids: 'required',
}, messages);