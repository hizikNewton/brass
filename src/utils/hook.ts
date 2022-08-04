import { useContext, useEffect, useState } from "react";
import { AppActions } from "../context/actions";
import { AppContext } from "../context/providers";
import { AppDispatch } from "../context/reducer";
import initAxiosInterceptors from "../services/http/interceptors";
import { fetchCachedData } from "./cache";
import { AppCachedKeys, RESIZE_LATENCY } from "./constants";
import { changeLanguage } from "./i18n";
export const useAppState = () => useContext(AppContext).state;
export const useDispatch = () => useContext(AppContext).dispatch;

const initAppLanguage = (app: State.App, dispatch: AppDispatch) => {
  const language =
    fetchCachedData<"en">(AppCachedKeys.AppLanguage) || app.language;
  setTimeout(() => {
    dispatch({
      type: AppActions.UpdateAppLanguage,
      payload: {
        language,
      },
    });
  }, 0);
  changeLanguage(language);
};

const useWindowResize = (dispatch: AppDispatch) => {
  useEffect(() => {
    let resizeTimer: any = null;
    const resizeListener = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        dispatch({
          type: AppActions.ResizeWindow,
          payload: {
            appWidth: window.innerWidth,
            appHeight: window.innerHeight,
          },
        });
        resizeTimer = null;
      }, RESIZE_LATENCY);
    };
    window.addEventListener("resize", resizeListener);
    return () => {
      window.removeEventListener("resize", resizeListener);
    };
  }, [dispatch]);
};

export const useInitApp = () => {
  const [init, setInit] = useState(false);
  const { app } = useAppState();
  const dispatch = useDispatch();

  if (!init) {
    setInit(true);
    initAxiosInterceptors(dispatch);
    initAppLanguage(app, dispatch);
  }
  useWindowResize(dispatch);
};
