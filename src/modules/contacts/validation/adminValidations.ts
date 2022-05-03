import Validations from "src/core/validations/validations";


export const messages = {
    name: {
        required: "Name is required",
        name: "name should contain atleast one character"
    },

    description: {
        // required: "Description is required",
        description: "should contain atleast two characters"
    },

    status: {
        // required: "status is required",
        Selection: "please select"
    },
    quantity: {
        quantity: "should contain atleast one number",
        required: "Quantity is required"
    }

    
}
export const EditSchema = Validations({
    name: 'required|name',
    description: 'description',
    status: 'Selection',
    quantity: 'quantity|required',
}, messages);