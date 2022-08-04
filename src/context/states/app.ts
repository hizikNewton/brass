import { getPrimaryColor, getSecondaryColor } from "../../utils/constants";

export const initApp: State.App = {
  toast: null,
  loading: false,
  secondLoading: false,
  appErrors: [
    {
      type: "Network",
      message: [],
    },
  ],
  nodeVersion: "",
  appWidth: window.innerWidth,
  appHeight: window.innerHeight,
  language: "en",
  primaryColor: getPrimaryColor(),
  secondaryColor: getSecondaryColor(),
  settings: {
    activeLayout: "simpleLayout",
  },
};

export default initApp;
