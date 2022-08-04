export enum AppActions {
  ResizeWindow = "resizeWindow",
  UpdateLoading = "updateLoading",
  UpdateSecondLoading = "updateSecondLoading",
  UpdateModal = "updateModal",
  ShowToastMessage = "showToastMessage",
  UpdateAppErrors = "updateAppErrors",
  UpdateNodeVersion = "updateNodeVersion",
  UpdateAppLanguage = "updateAppLanguage",
}

export enum ComponentActions {
  UpdateHeaderSearchEditable = "updateHeaderSearchEditable",
  UpdateFilterNoResult = "updateFilterNoResult",
  UpdateHeaderMobileMenuVisible = "updateHeaderMobileMenuVisible",
  UpdateHeaderSearchBarVisible = "updateHeaderSearchBarVisible",
}

export type StateActions = AppActions | ComponentActions;

export default StateActions;
