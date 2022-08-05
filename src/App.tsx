import { useMemo } from "react";
import { useRoutes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import WithProviders from "./context/providers";
import AllPages from "./routes";
import { useAppState, useInitApp } from "./utils/hook";

const appStyle = {
  width: "100vw",
  height: "100vh",
  maxWidth: "100%",
};

const App = WithProviders(() => {
  useInitApp();

  const { app } = useAppState();
  const theme = useMemo(
    () => ({
      primary: app.primaryColor,
      secondary: app.secondaryColor,
    }),
    [app.primaryColor, app.secondaryColor]
  );
  const all_pages = useRoutes(AllPages());
  return (
    <ThemeProvider theme={theme}>
      <div style={appStyle}>{all_pages}</div>
    </ThemeProvider>
  );
});
export default App;
