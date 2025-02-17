import * as Yup from "yup";

const qcValidations = Yup.object({
  item_info: Yup.array().of(
    Yup.object().shape({
      names: Yup.string().required("Name is required"),
      // selected_value: Yup.string().required("A radio option is required"),
    })
  ),
});

export default qcValidations;
