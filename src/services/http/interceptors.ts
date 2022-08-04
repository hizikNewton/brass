import { AxiosError } from "axios";
import { axiosIns } from "./fetchers";
import i18n from "../../utils/i18n";
import { AppDispatch } from "../../context/reducer";
import { AppActions } from "../../context/actions";

let timeout: ReturnType<typeof setTimeout> | null;

const updateNetworkError = (
  dispatch: AppDispatch,
  errMessage = "toast.invalid_network"
) => {
  if (timeout) {
    clearTimeout(timeout);
  }
  timeout = setTimeout(() => {
    dispatch({
      type: AppActions.UpdateAppErrors,
      payload: {
        appError: {
          type: "Network",
          message: [],
        },
      },
    });
    timeout = null;
  }, 2000);
  dispatch({
    type: AppActions.UpdateAppErrors,
    payload: {
      appError: {
        type: "Network",
        message: [i18n.t(errMessage)],
      },
    },
  });
};

export const initAxiosInterceptors = (dispatch: AppDispatch) => {
  axiosIns.interceptors.request.use(
    (config) => {
      if (config.method === "get") {
        // eslint-disable-next-line no-param-reassign
        config.data = {
          unused: 0,
        };
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  axiosIns.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error && error.response && error.response.data) {
        switch (error.response.status) {
          case 503:
          case 422:
          case 404:
          case 400:
            break;
          case 429:
            updateNetworkError(dispatch, "toast.too_many_request");
            break;
          default:
            updateNetworkError(dispatch);
            break;
        }
      } else {
        updateNetworkError(dispatch);
      }
      return Promise.reject(error);
    }
  );
};

export default initAxiosInterceptors;
