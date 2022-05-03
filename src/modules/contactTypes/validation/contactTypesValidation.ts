import Validations from '../../../core/validations/validations'

export const messages = {
    filter_name: {
        required: "Please enter first name",
        name: "First name should contain atleast one character"
    },

    // user_ids: {
    //     required: "Please select User Name"
    // }
}
export const profileSchema = Validations({
    filter_name: 'required|name',
    // user_ids: 'required',
}, messages);