import Banner from "components/Banner";
import Content from "components/Content";
import { AppActions } from "context/actions";
import { FC, useEffect, useState } from "react";
import {
  fetchAllBanks,
  getAllTransfer,
  initiateTransfer,
  resolveAccountDetails,
} from "services/http/fetchers";
import { useDispatch } from "utils/hook";
import { validate } from "./components";
import { FormContainer, HomeHeaderTopPanel } from "./styled";
import { TransactionList } from "./TransactionList";

type Props = {
  err: Array<string>;
};

const Error: FC<Props> = ({ err }) => {
  return (
    <div className="error">
      {err?.map((i) => (
        <p style={{ margin: 0, color: "#ffa300" }}>{i}</p>
      ))}
    </div>
  );
};

const Home = () => {
  const [bankList, setBankList] = useState([]);
  const dispatch = useDispatch();
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
  const [touched, setTouched] = useState<{ [key in validationType]: boolean }>({
    accountNumber: false,
    amount: false,
  });
  const [active, setactive] = useState("transfer");

  const { bankName, accountNumber, accountName } = values || {};
  useEffect(() => {
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
    dispatch({ type: AppActions.UpdateSecondLoading, payload: true });
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
    })
      .then((data) => {
        console.log(data);
      })
      .finally(() => {
        dispatch({ type: AppActions.UpdateSecondLoading, payload: false });
      });
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setValues((val) => ({ ...val, [name]: value }));
  };
  const handleMouseLeave = (e: any) => {
    const { name } = e.target;
    setTouched((val) => ({ ...val, [name]: true }));
  };
  const handleBlur = () => {
    Object.keys(touched).map((key) => {
      const errors = validate(key as validationType, values);
      setErr((errs) => ({ ...errs, [key]: errors[key] }));
    });
  };
  return (
    <Content>
      <Banner />
      <HomeHeaderTopPanel>
        <div>
          <button onClick={() => setactive("transfer")}>
            {"Transfer Funds"}
          </button>
        </div>
        <div>
          <button onClick={() => setactive("transactions")}>
            {"View Transactions"}
          </button>
        </div>
      </HomeHeaderTopPanel>
      {active === "transfer" && (
        <FormContainer>
          <form onSubmit={handleSubmit}>
            <div>
              <label>{"Select Bank"}</label>
              <select
                required
                name={"bankName"}
                value={bankName}
                onChange={handleChange}
                onMouseLeave={handleMouseLeave}
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
                onMouseLeave={handleMouseLeave}
                onBlur={handleBlur}
              />
              <Error err={err["accountNumber"]} />
            </div>
            <div>
              <label>{"Amount"}</label>
              <input
                type={"number"}
                required
                name={"amount"}
                onMouseLeave={handleMouseLeave}
                onBlur={handleBlur}
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
      )}

      {active === "transactions" && <TransactionList />}
    </Content>
  );
};

export default Home;
