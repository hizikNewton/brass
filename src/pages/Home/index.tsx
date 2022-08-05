import Banner from "components/Banner";
import Content from "components/Content";
import { FC, useEffect, useState } from "react";
import {
  fetchAllBanks,
  getAllTransfer,
  initiateTransfer,
  resolveAccountDetails,
} from "services/http/fetchers";
import { validate } from "./components";
import { FormContainer, HomeHeaderTopPanel } from "./styled";

export type AccountInfo = {
  bankName?: string;
  accountNumber?: number;
  amount?: number;
  accountName?: string;
  narration: string;
  debit_currency: "NGN";
};

type Props = {
  err: Array<string>;
};

const Error: FC<Props> = ({ err }) => {
  console.log(err);
  return (
    <div className="error">
      {err?.map((i) => (
        <p style={{ margin: 0 }}>{i}</p>
      ))}
    </div>
  );
};

const Home = () => {
  const [bankList, setBankList] = useState([]);
  const [values, setValues] = useState<AccountInfo>({
    bankName: "",
    accountName: "",
    accountNumber: 0,
    amount: 0,
    narration: "",
    debit_currency: "NGN",
  });
  const [err, setErr] = useState<{ [x: string]: Array<string> }>({
    accountNumber: [],
  });

  const { bankName, accountNumber, accountName } = values || {};
  useEffect(() => {
    /* getAllTransfer().then((data) => {
      console.log(data);
    }); */
    if (bankList?.length === 0) {
      fetchAllBanks("NG").then((res) => {
        setBankList(res);
      });
    }
    const isValid =
      validate("accountNumber", values)["accountNumber"]?.length === 0 &&
      Boolean(bankName);
    if (isValid && accountNumber && bankName) {
      resolveAccountDetails({ accountNumber, accountBank: bankName }).then(
        ({ account_name }) => {
          setValues((val) => ({ ...val, accountName: account_name }));
        }
      );
    }
  }, [accountNumber, accountName]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    type ConcreteValueType = Concrete<AccountInfo>;
    const { bankName, accountNumber, amount, narration } =
      values as ConcreteValueType;
    initiateTransfer({
      account_bank: bankName,
      account_number: accountNumber,
      amount,
      narration,
      currency: "NGN",
      callback_url: "https://www.flutterwave.com/ng/",
      reference: "isaac-bamidele-kdkdksll-mmd",
    }).then((data) => {
      console.log(data);
    });
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    const res = validate(name, values, setErr);
    setValues((val) => ({ ...val, [name]: value }));
  };
  return (
    <Content>
      <Banner />
      <HomeHeaderTopPanel>{"Transfer Funds"}</HomeHeaderTopPanel>
      <FormContainer>
        <form onSubmit={handleSubmit}>
          <div>
            <label>{"Select Bank"}</label>
            <select
              required
              name={"bankName"}
              value={bankName}
              onChange={handleChange}
            >
              {bankList?.map(({ code, name }) => (
                <option key={code} value={code}>
                  {name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>{"Account Number"}</label>
            <input
              name={"accountNumber"}
              onChange={handleChange}
              required
              placeholder={"10 digit number"}
            />
            <Error err={err["accountNumber"]} />
          </div>
          <div>
            <label>{"Amount"}</label>
            <input
              type={"number"}
              required
              name={"amount"}
              onChange={handleChange}
            />

            <Error err={err["amount"]} />
          </div>
          <div>
            <label>{"Narration"}</label>
            <textarea required name={"narration"} onChange={handleChange} />
          </div>
          {accountName && (
            <div>
              <label>{"Account Name"}</label>
              <input value={accountName} name={"accountName"} disabled />
            </div>
          )}
          <div className="btn-container">
            <button type={"submit"}>{"Transfer Funds"}</button>
          </div>
        </form>
      </FormContainer>
    </Content>
  );
};

export default Home;
