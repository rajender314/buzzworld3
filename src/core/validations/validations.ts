import * as yup from 'yup'

/**
 * Return the yup validate schema.
 * @param rules List of ruels object to generate the validation schema.
 * @param rulesMessage List of ruels custom messages object to display as error message.
 */

const Validations = (rules: object, rulesMessage: any) => {
  console.log(rules)
  const yupRules = {}

  for (const [key, value] of Object.entries(rules)) {
    let validator = generateRules(
      value,
      rulesMessage[key] ? rulesMessage[key] : {},
    )
    Object.assign(yupRules, {
      [key]: validator,
    })
  }
  let schema = yup.object().shape(yupRules)
  return schema
}

function generateRules(rule: string, rulesMessage: any) {
  let yupValidator = yup

  let yupValidate: any
  const subRules = rule.includes('|')
    ? rule.split('|')
    : rule.includes('required')
      ? ['required']
      : [rule]
  subRules.forEach((subRule, index) => {
    if (subRule === 'string') {
      yupValidate =
        typeof yupValidate != 'object'
          ? yupValidator.string()
          : yupValidate.concat(yupValidator.string())
    } else if (subRule === 'mixed') {
      yupValidate =
        typeof yupValidate != 'object'
          ? yupValidator.mixed()
          : yupValidate.concat(yupValidator.mixed())
    } else if (subRule === 'object') {
      yupValidate =
        typeof yupValidate != 'object'
          ? yupValidator.object()
          : yupValidate.concat(yupValidator.object())
    } else if (subRule === 'required') {
      yupValidate =
        typeof yupValidate != 'object'
          ? yupValidator.string().required(rulesMessage[subRule])
          : yupValidate.concat(
            yupValidator.string().required(rulesMessage[subRule]),
          )
    } else if (subRule.startsWith('min') || subRule.startsWith('max')) {
      const [ruleType, length] = subRule.split(':')
      if (ruleType === 'min') {
        yupValidate =
          typeof yupValidate != 'object'
            ? yupValidator.string().min(Number(length), rulesMessage[ruleType])
            : yupValidate.concat(
              yupValidator
                .string()
                .min(Number(length), rulesMessage[ruleType]),
            )
      } else if (ruleType === 'max') {
        yupValidate =
          typeof yupValidate != 'object'
            ? yupValidator.string().max(Number(length), rulesMessage[ruleType])
            : yupValidate.concat(
              yupValidator
                .string()
                .max(Number(length), rulesMessage[ruleType]),
            )
      }
    } else if (subRule === 'email') {
      yupValidate =
        typeof yupValidate != 'object'
          ? yupValidator.string().email(rulesMessage[subRule])
          : yupValidate.concat(
            yupValidator.string().email(rulesMessage[subRule]),
          )
    } else if (subRule === 'phone') {
      let emsg = rulesMessage[subRule]
        ? rulesMessage[subRule]
        : 'Phonenumber error'
      yupValidate =
        typeof yupValidate != 'object'
          ? yupValidator.string().matches(/^-?\d+(?:\.\d+)?$/gm, emsg)
          : yupValidate.concat(
            yupValidator.string().matches(/^-?\d+(?:\.\d+)?$/gm, emsg),
          )
    } else if (subRule === 'passwordconfirm') {
      let emsg = rulesMessage[subRule]
        ? rulesMessage[subRule]
        : 'Passwords must match'
      yupValidate =
        typeof yupValidate != 'object'
          ? yupValidator
            .string()
            .oneOf([yupValidator.ref('password'), null], emsg)
          : yupValidate.concat(
            yupValidator.string().oneOf([yup.ref('password'), null], emsg),
          )
    } else if (subRule === 'url') {
      yupValidate =
        typeof yupValidate != 'object'
          ? yupValidator.string().url(rulesMessage[subRule])
          : yupValidate.concat(yupValidator.string().url(rulesMessage[subRule]))
    } else if (subRule === 'alphabets') {
      let emsg = rulesMessage[subRule]
        ? rulesMessage[subRule]
        : 'Only alphabet charectors allowed.'
      yupValidate =
        typeof yupValidate != 'object'
          ? yupValidator.string().matches(/^[a-zA-Z ]*$/, emsg)
          : yupValidate.concat(
            yupValidator.string().matches(/^[a-zA-Z ]*$/, emsg),
          )
    } else if (subRule === 'alphanumwithspace') {
      let emsg = rulesMessage[subRule]
        ? rulesMessage[subRule]
        : 'Only aplphanumeric and space charectors allowed.'
      yupValidate =
        typeof yupValidate != 'object'
          ? yupValidator
            .string()
            .matches(/^[a-zA-Z0-9 _]*[a-zA-Z0-9][a-zA-Z0-9 _]*$/, emsg)
          : yupValidate.concat(
            yupValidator
              .string()
              .matches(/^[a-zA-Z0-9 _]*[a-zA-Z0-9][a-zA-Z0-9 _]*$/, emsg),
          )
    } else if (subRule.startsWith('isDaynamic')) {
      const [ruleType, callBack] = subRule.split(':')
      if (ruleType === 'isDaynamic') {
        let emsg = rulesMessage[subRule]
          ? rulesMessage[subRule]
          : 'Enter valid data'
        yupValidate =
          typeof yupValidate != 'object'
            ? yupValidator
              .string()
              .test(
                'isDaynamic',
                emsg,
                async (value) => await dynamicMethod(value, callBack),
              )
            : yupValidate.concat(
              yup
                .string()
                .test(
                  'isDaynamic',
                  emsg,
                  async (value) => await dynamicMethod(value, callBack),
                ),
            )
      }
    } else if (subRule === 'dropdown') {
      console.log(yupValidate)
      //let emsg = (rulesMessage[subRule]) ? rulesMessage[subRule] : 'Please select an option';
      yupValidate =
        typeof yupValidate != 'object'
          ? yupValidator.object().required(rulesMessage[subRule])
          : yupValidate.concat(
            yupValidator.string().required(rulesMessage[subRule]),
          )
    } else if (subRule === 'multiselect') {
      //console.log(yupValidate)
      //let emsg = (rulesMessage[subRule]) ? rulesMessage[subRule] : 'Please select an option';
      yupValidate =
        typeof yupValidate != 'object'
          ? yupValidator.array().required(rulesMessage[subRule])
          : yupValidate.concat(
            yupValidator.string().required(rulesMessage[subRule]),
          )
      console.log(yupValidate)
    }
  })
  return yupValidate
}

/**
 * Split a string into substrings using the specified separator and return them as an array.
 * @param value value that can be used to validate.
 * @param callBack A callback function should be defined here.
 */
function dynamicMethod(value: any, callBack: string) {
  if (callBack === 'validateUser') {
    return validateUser(value)
  }

  return true
}

function validateUser(value: any) {
  return true
}

export default Validations
