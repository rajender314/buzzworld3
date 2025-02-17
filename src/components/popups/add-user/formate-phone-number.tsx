// export function formatPhoneNumbers(value: any) {
//   // if input value is falsy eg if the user deletes the input, then just return
//   if (!value) return value;
//   // clean the input for any non-digit values.
//   const phoneNumber = value.replace(/[^\d]/g, "");
//   // phoneNumberLength is used to know when to
//   // apply our formatting for the phone number
//   const phoneNumberLength = phoneNumber.length;
//   // we need to return the value with no formatting if its less then four digits
//   // this is to avoid weird behavior
//   // that occurs if you  format the area code to early
//   if (phoneNumberLength < 4) return phoneNumber;
//   // if phoneNumberLength is greater than 4 and less the 7 we start to return
//   // the formatted number
//   if (phoneNumberLength < 7) {
//     return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
//   }
//   // finally, if the phoneNumberLength is greater then seven, we add the last
//   // bit of formatting and return it.
//   return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
//     3,
//     6
//   )}-${phoneNumber.slice(6, 10)}`;
// }

function formatPhoneNumbers(value: any) {
  // if input value is falsy eg if the user deletes the input, then just return
  if (!value) return value;
  // clean the input for any non-digit values.
  const phoneNumber = value.replace(/[^\d]/g, "");
  // phoneNumberLength is used to know when to
  // apply our formatting for the phone number
  const phoneNumberLength = phoneNumber.length;
  // we need to return the value with no formatting if its less than four digits
  // this is to avoid weird behavior
  // that occurs if you format the area code too early
  if (phoneNumberLength < 4) return phoneNumber;
  // remove prefixes like "+91" and "1-"
  const cleanedNumber = phoneNumber.replace(/^91|^1/, "");
  // format the phone number as (XXX) XXX-XXXX
  const formattedNumber = `(${cleanedNumber.slice(0, 3)}) ${cleanedNumber.slice(3, 6)}-${cleanedNumber.slice(6, 10)}`;
  return formattedNumber;
}

export default formatPhoneNumbers;
