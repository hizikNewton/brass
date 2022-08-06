export const validate = (name: validationType, values: AccountInfo) => {
  let errors: { [x: string]: Array<string> } = {
    accountNumber: [],
    amount: [],
  };
  const repr = {
    accountNumber: "Account number",
    amount: "Amount",
  };
  const value = values[name];

  if (name === "accountNumber") {
    console.log(value);
    //check its empty
    if (!Boolean(value)) {
      errors[name]?.push(`${repr[name]} is required`);
    }
    //check length is 10
    if (
      value &&
      (value.toString().length > 10 || value.toString().length < 10)
    ) {
      errors[name]?.push("Account number must be 10 digit number");
    }
    if (value && isNaN(value)) {
      errors[name]?.push(`${repr[name]} must be number`);
    }
  }

  if (name === "amount" && value) {
    if (!Boolean(value)) {
      errors[name]?.push(`${repr[name]} is required`);
    }
    //check within range
    if (value < 100 || value > 10000000) {
      errors[name]?.push("Amount must be between 100 and 1000000");
    }
  }
  return errors;
};
