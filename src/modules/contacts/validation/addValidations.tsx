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
        // required: "Quantity is required",
        quantity: "should contain number"
    }


}
export const addSchema = Validations({
    name: 'required|name',
    description: 'description',
    status: 'Selection',
    quantity: 'required|quantity'
}, messages);