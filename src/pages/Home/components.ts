import { Dispatch, SetStateAction } from "react";
import { AccountInfo } from ".";

export const validate = (
  name: "accountNumber" | "amount",
  values: AccountInfo,
  setErr?: Dispatch<
    SetStateAction<{
      [x: string]: string[];
    }>
  >
) => {
  let errors: { [x: string]: Array<string> } = {
    accountNumber: [],
    amount: [],
  };
  const repr = {
    accountNumber: "Account number",
    amount: "Amount",
  };
  const value = values[name];
  //check its empty
  if (!Boolean(value)) {
    errors[name]?.push(`${repr[name]} is required`);
  }

  if (name === "accountNumber" && value) {
    //check length is 10
    if (value.toString().length > 10 || value.toString().length < 10) {
      errors[name]?.push("Account number must be 10 digit number");
    }
    if (isNaN(value as number)) {
      errors[name]?.push(`${repr[name]} must be number`);
    }
  }
  //check within range

  if (name === "amount" && value) {
    if (value < 100 || value > 1000000) {
      errors[name]?.push("amount must be between 100 and 1000000");
    }
  }
  setErr && setErr((errs) => ({ ...errs, [name]: errors[name] }));
  return errors;
};
