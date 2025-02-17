import * as Yup from 'yup';

const TermsValidationsSchema = Yup.object().shape({
  website: Yup.string().required('Please select website'),
  email: Yup.string().required('Please select email'),
  fax_no: Yup.string().required('Please select fax no'),
  contact_no: Yup.string().required('Please select Contact Number'),
});

export default TermsValidationsSchema;
