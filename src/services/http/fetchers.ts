import axios, { AxiosResponse } from "axios";
import CONFIG from "config";

const baseURL = `${CONFIG.API_URL}/v3`;

interface TransferParams {
  account_bank: string;
  account_number: number;
  amount: number;
  narration: string;
  currency?: "NGN";
  reference?: string;
  callback_url?: "https://www.flutterwave.com/ng/";
}

export const axiosIns = axios.create({
  baseURL,
  headers: {
    Authorization: "Bearer FLWSECK_TEST-32db968ef6dca2ccb040598ee71e6181-X",
  },
  data: null,
});

export const fetchSearchResult = (param: string) =>
  axiosIns
    .get("suggest_queries", {
      params: {
        q: param,
      },
    })
    .then((res: AxiosResponse) => res.data);

export const fetchAllBanks = async (country: string) => {
  const res = await axiosIns.get(`banks/${country}`);
  return res.data.data;
};

export const resolveAccountDetails = async ({
  accountNumber,
  accountBank,
}: {
  accountNumber: number;
  accountBank: string;
}) => {
  const res = await axiosIns.post(`accounts/resolve`, {
    account_number: accountNumber,
    account_bank: accountBank,
  });
  return res.data.data;
};

export const initiateTransfer = async (transferDT: TransferParams) => {
  const { amount } = transferDT;
  const res = await axiosIns.post(`transfers`, {
    ...transferDT,
    amount: parseInt(amount?.toString()),
  });
  console.log(res, "response");
  return res.data.data;
};

export const getAllTransfer = async () => {
  const res = await axiosIns.get(`transfers`);
  return res.data;
};
