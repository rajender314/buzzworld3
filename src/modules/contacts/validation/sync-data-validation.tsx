import * as Yup from "yup";

const SyncDataSchema = Yup.object({
  quote_no: Yup.string()
    .matches(/^[0-9]+$/, "Quote Number not valid")
    .required("Quote Number required"),
});
export default SyncDataSchema;
