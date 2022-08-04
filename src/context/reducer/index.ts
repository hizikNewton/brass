import StateActions, { AppActions, ComponentActions } from "../actions";
import { appReducer } from "./appReducer";
import componentReducer from "./componentReducer";
export type AppDispatch = React.Dispatch<{ type: StateActions; payload: any }>;

export const reducer = (
  state: State.AppState,
  { type, payload }: { type: StateActions; payload: any }
): State.AppState => {
  if (Object.values(AppActions).includes(type as AppActions)) {
    return appReducer(state, {
      type: type as AppActions,
      payload,
    });
  }
  return componentReducer(state, {
    type: type as ComponentActions,
    payload,
  });
};
