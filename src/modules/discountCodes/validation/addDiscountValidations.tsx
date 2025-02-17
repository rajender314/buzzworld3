import Validations from "../../../core/validations/validations";

const object = {
  discount_code: "required",
  quantity_id: "dropdown",
  description: "description",
};
// SubscribeService2.getMessage2().subscribe((data: any) => {
//   if (data) {
//     console.log(data);
//     array = data.data;
//   }
//   for (let i = 0; i < array.length; i++) {
//     let a = Object.keys(array[i])[0];
//     console.log(Object.keys(array[i]));
//     var pair = { a: "required" };
//     console.log(a);
//     object = {
//       ...object,
//       ...pair
//     };
//   }
// });

export const messages = {
  quantity_id: {
    dropdown: "Please select  Quantity",
  },
  description: {
    description: "Give Description",
  },
  discount_code: {
    required: "Please enter Discount Code",
  },
};

export const addDiscountValidations = Validations(object, messages);
