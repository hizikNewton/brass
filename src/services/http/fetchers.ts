import axios, { AxiosResponse } from "axios";
import CONFIG from "../../config";

const baseURL = `${CONFIG.API_URL}/api/v1/`;

export const axiosIns = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application.json",
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
