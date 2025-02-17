import * as yup from "yup";

function validateUser(value: any) {
  console.log(value);
  return true;
}
function dynamicMethod(value: any, callBack: string) {
  if (callBack === "validateUser") {
    return validateUser(value);
  }

  return true;
}
const getRules = (r: any) => {
  // r.includes("|")
  //   ? r.split("|")
  //   : r.includes("required")
  //     ? ["required"]
  //     : [rule];

  if (r.includes("|")) {
    return r.split("|");
  }
  if (r.includes("required")) {
    return ["required"];
  }
  return [r];
};
function generateRules(rule: string, rulesMessage: any) {
  const yupValidator = yup;

  let yupValidate: any;
  const subRules = getRules(rule);
  subRules.forEach((subRule: any) => {
    if (subRule === "string") {
      yupValidate =
        typeof yupValidate !== "object"
          ? yupValidator.string()
          : yupValidate.concat(yupValidator.string());
    } else if (subRule === "mixed") {
      yupValidate =
        typeof yupValidate !== "object"
          ? yupValidator.mixed()
          : yupValidate.concat(yupValidator.mixed());
    } else if (subRule === "object") {
      yupValidate =
        typeof yupValidate !== "object"
          ? yupValidator.object()
          : yupValidate.concat(yupValidator.object());
    } else if (subRule === "required") {
      console.log(subRule);

      yupValidate =
        typeof yupValidate !== "object"
          ? yupValidator.string().required(rulesMessage[subRule])
          : yupValidate.concat(
              yupValidator.string().required(rulesMessage[subRule])
            );
    } else if (subRule === "numFormatRequired") {
      yupValidate = yupValidator.number().required(rulesMessage[subRule]);
    } else if (subRule.startsWith("numFormatMinVal")) {
      const [ruleType, length] = subRule.split(":");
      if (ruleType === "numFormatMinVal") {
        // yupValidate = yup

        //  .number()
        //  .required('11')
        //  .min(Number(length), rulesMessage[ruleType])

        yupValidate = yupValidate.concat(
          yupValidator.number().min(Number(length), rulesMessage[ruleType])
        );
      }
    } else if (subRule.startsWith("numFormatCharLimit")) {
      const [ruleType, length] = subRule.split(":");
      if (ruleType === "numFormatCharLimit") {
        // yupValidate = yup

        //  .number()
        //  .required('11')
        //  .min(Number(length), rulesMessage[ruleType])

        yupValidate = yupValidate.concat(
          yupValidator.number().lessThan(Number(length), rulesMessage[ruleType])
        );
      }
    } else if (subRule.startsWith("min") || subRule.startsWith("max")) {
      const [ruleType, length] = subRule.split(":");
      console.log(subRule);
      if (ruleType === "min") {
        yupValidate =
          typeof yupValidate !== "object"
            ? yupValidator.string().min(Number(length), rulesMessage[ruleType])
            : yupValidate.concat(
                yupValidator
                  .string()
                  .min(Number(length), rulesMessage[ruleType])
              );
      } else if (ruleType === "max") {
        yupValidate =
          typeof yupValidate !== "object"
            ? yupValidator.string().max(Number(length), rulesMessage[ruleType])
            : yupValidate.concat(
                yupValidator
                  .string()
                  .max(Number(length), rulesMessage[ruleType])
              );
      }
    } else if (subRule === "email") {
      yupValidate =
        typeof yupValidate !== "object"
          ? yupValidator.string().email(rulesMessage[subRule])
          : yupValidate.concat(
              yupValidator.string().email(rulesMessage[subRule])
            );
    } else if (subRule === "phone") {
      const emsg = rulesMessage[subRule]
        ? rulesMessage[subRule]
        : "Phonenumber error";
      yupValidate =
        typeof yupValidate !== "object"
          ? yupValidator.string().matches(/^-?\d+(?:\.\d+)?$/gm, emsg)
          : yupValidate.concat(
              yupValidator.string().matches(/^-?\d+(?:\.\d+)?$/gm, emsg)
            );
    } else if (subRule === "nonzero") {
      const emsg = rulesMessage[subRule]
        ? rulesMessage[subRule]
        : "Phonenumber error";
      yupValidate =
        typeof yupValidate !== "object"
          ? yupValidator.string().matches(/^(?![,.0]*$)/gm, emsg)
          : yupValidate.concat(
              yupValidator.string().matches(/^(?![,.0]*$)/gm, emsg)
            );
    } else if (subRule === "alphanumeric") {
      const emsg = rulesMessage[subRule] ? rulesMessage[subRule] : "error";
      yupValidate =
        typeof yupValidate !== "object"
          ? yupValidator.string().matches(/^([a-zA-Z0-9 _-]+)$/g, emsg)
          : yupValidate.concat(
              yupValidator.string().matches(/^([a-zA-Z0-9 _-]+)$/g, emsg)
            );
    } else if (subRule === "passwordconfirm") {
      const emsg = rulesMessage[subRule]
        ? rulesMessage[subRule]
        : "Passwords must match";
      yupValidate =
        typeof yupValidate !== "object"
          ? yupValidator
              .string()
              .oneOf([yupValidator.ref("password"), null], emsg)
          : yupValidate.concat(
              yupValidator.string().oneOf([yup.ref("password"), null], emsg)
            );
    } else if (subRule === "url") {
      yupValidate =
        typeof yupValidate !== "object"
          ? yupValidator.string().url(rulesMessage[subRule])
          : yupValidate.concat(
              yupValidator.string().url(rulesMessage[subRule])
            );
    } else if (subRule === "alphabets") {
      const emsg = rulesMessage[subRule]
        ? rulesMessage[subRule]
        : "Only alphabet charectors allowed.";
      yupValidate =
        typeof yupValidate !== "object"
          ? yupValidator.string().matches(/^[a-zA-Z ]*$/, emsg)
          : yupValidate.concat(
              yupValidator.string().matches(/^[a-zA-Z ]*$/, emsg)
            );
    } else if (subRule === "alphanumwithspace") {
      const emsg = rulesMessage[subRule]
        ? rulesMessage[subRule]
        : "Only aplphanumeric and space charectors allowed.";
      yupValidate =
        typeof yupValidate !== "object"
          ? yupValidator
              .string()
              .matches(/^[a-zA-Z0-9 _]*[a-zA-Z0-9][a-zA-Z0-9 _]*$/, emsg)
          : yupValidate.concat(
              yupValidator
                .string()
                .matches(/^[a-zA-Z0-9 _]*[a-zA-Z0-9][a-zA-Z0-9 _]*$/, emsg)
            );
    } else if (subRule.startsWith("isDaynamic")) {
      const [ruleType, callBack] = subRule.split(":");
      if (ruleType === "isDaynamic") {
        const emsg = rulesMessage[subRule]
          ? rulesMessage[subRule]
          : "Enter valid data";
        yupValidate =
          typeof yupValidate !== "object"
            ? yupValidator
                .string()
                .test("isDaynamic", emsg, async (value) =>
                  dynamicMethod(value, callBack)
                )
            : yupValidate.concat(
                yup
                  .string()
                  .test("isDaynamic", emsg, async (value) =>
                    dynamicMethod(value, callBack)
                  )
              );
      }
    } else if (subRule === "dropdown") {
      // let emsg = (rulesMessage[subRule]) ? rulesMessage[subRule] : 'Please select an option';
      yupValidate =
        typeof yupValidate !== "object"
          ? yupValidator.object().required(rulesMessage[subRule])
          : yupValidate.concat(
              yupValidator.string().required(rulesMessage[subRule])
            );
    } else if (subRule === "date") {
      // let emsg = (rulesMessage[subRule]) ? rulesMessage[subRule] : 'Please select an option';
      yupValidate =
        typeof yupValidate !== "object"
          ? yupValidator.date().nullable().required(rulesMessage[subRule])
          : yupValidate.concat(
              yupValidator.date().nullable().required(rulesMessage[subRule])
            );
    } else if (subRule === "multiselect") {
      // console.log(yupValidate)
      // let emsg = (rulesMessage[subRule]) ? rulesMessage[subRule] : 'Please select an option';
      yupValidate =
        typeof yupValidate !== "object"
          ? yupValidator.array().required(rulesMessage[subRule])
          : yupValidate.concat(
              yupValidator.array().required(rulesMessage[subRule])
            );
      // eslint-disable-next-line no-dupe-else-if
    } else if (subRule === "date") {
      // let emsg = (rulesMessage[subRule]) ? rulesMessage[subRule] : 'Please select an option';
      yupValidate =
        typeof yupValidate !== "object"
          ? yupValidator.string().required(rulesMessage[subRule])
          : yupValidate.concat(
              yupValidator.string().required(rulesMessage[subRule])
            );
    }
  });
  return yupValidate;
}
/**
 * Return the yup validate schema.
 * @param rules List of ruels object to generate the validation schema.
 * @param rulesMessage List of ruels custom messages object to display as error message.
 */

const Validations = (rules: object, rulesMessage: any) => {
  // console.log(rules)
  const yupRules: any = {};

  // for (const [key, value] of Object.entries(rules)) {
  //   const validator = generateRules(
  //     value,
  //     rulesMessage[key] ? rulesMessage[key] : {}
  //   );
  //   Object.assign(yupRules, {
  //     [key]: validator,
  //   });
  // }
  Object.entries(rules).forEach(([key, value]) => {
    const validator = generateRules(
      value,
      rulesMessage[key] ? rulesMessage[key] : {}
    );
    yupRules[key] = validator;
  });
  const schema = yup.object().shape(yupRules);
  return schema;
};

/**
 * Split a string into substrings using the specified separator and return them as an array.
 * @param value value that can be used to validate.
 * @param callBack A callback function should be defined here.
 */

export default Validations;
