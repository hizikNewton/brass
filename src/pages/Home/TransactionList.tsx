import { useEffect, useState } from "react";
import { getAllTransfer } from "services/http/fetchers";
import { sampleData } from "services/http/sampleData";
import { Detail, TransactionContainer } from "./styled";

type Tx = {
  id: number;
  full_name: string;
  created_at: string;
  amount: number;
  bank_name: string;
  reference: string;
};
const objRepr: { [x: string]: string } = {
  id: "Identification Number",
  account_number: "Account Number",
  bank_code: "Bank Code",
  full_name: "Full Name",
  created_at: "Created At",
  currency: "Currency",
  debit_currency: "Debit Currency",
  amount: "Amount",
  fee: "Fee",
  status: "Status",
  reference: "Reference",
  meta: "Meta",
  narration: "Narration",
  approver: "Approver",
  complete_message: "Complete Message",
  requires_approval: "Requires Approval",
  is_approved: "Approved",
  bank_name: "Bank Name",
};
export const TransactionList = () => {
  const [txList, setTxList] = useState<Array<Tx>>([]);
  const [page] = useState<number>(1);
  const [selected, setSelected] = useState<number>();
  useEffect(() => {
    getAllTransfer({ page }).then((res) => {
      const { data } = res;
      if (data && data.length !== 0) {
        setTxList(data);
      } else {
        setTxList(sampleData);
      }
    });
  }, [page]);

  const handleClick = (e: any, id: number) => {
    setSelected(id);
  };

  return (
    <TransactionContainer>
      <>
        <table>
          <thead>
            <tr>
              <th>{"Id"}</th>
              <th>{"Full Name"}</th>
              <th>{"Amount"}</th>
              <th>{"Bank Name"}</th>
              <th>{"Reference"}</th>
              <th>{"Date Created"}</th>
            </tr>
          </thead>
          <tbody>
            {txList.map(
              ({ id, full_name, created_at, amount, bank_name, reference }) => (
                <tr
                  onClick={(e) => handleClick(e, id)}
                  className={selected === id ? "selected" : ""}
                  key={id}
                >
                  <td>{id}</td>
                  <td>{full_name}</td>
                  <td>{amount}</td>
                  <td>{bank_name}</td>
                  <td>{reference}</td>
                  <td>{created_at}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
        {/*  <div>
          <button>{"<"}</button>
          {page}

          <button>{">"}</button>
        </div> */}
      </>
      {Boolean(selected) && (
        <Detail style={{ width: "40%" }}>
          <div className="detail_head">
            <h4>{"Transaction Detail"}</h4>
            <button onClick={(e) => handleClick(e, 0)}>{"Close X"}</button>
          </div>
          {Object.entries(txList.find(({ id }) => id === selected) || {}).map(
            ([key, value]) => (
              <p key={key}>{`${objRepr[key]} : ${value}`}</p>
            )
          )}
        </Detail>
      )}
    </TransactionContainer>
  );
};
