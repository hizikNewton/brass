import React, { createContext, ProviderProps, useReducer } from "react";
import { AppDispatch, reducer } from "../reducer";
import initState from "../states/index";

export const AppContext = createContext<{
  state: typeof initState;
  dispatch: AppDispatch;
}>({
  state: initState,
  dispatch: () => {},
});

const WithProviders =
  (Comp: React.ComponentType) => (props: React.ComponentProps<any>) => {
    const [providers, dispatch] = useReducer(reducer, initState);
    return (
      <AppContext.Provider
        value={{
          state: providers,
          dispatch,
        }}
      >
        <Comp {...props} />
      </AppContext.Provider>
    );
  };

export default WithProviders;
