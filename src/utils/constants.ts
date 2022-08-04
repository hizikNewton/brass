import CONFIG from "../config";
export function getPrimaryColor() {
  return "#9A2CEC";
}

export function getSecondaryColor() {
  return "#9A2CEC";
}

export const AppCachedKeys = {
  AppLanguage: `${CONFIG.APP_NAME}-AppLanguage`,
  Version: `${CONFIG.APP_NAME}-Version`,
};

export const RESIZE_LATENCY = 500;
