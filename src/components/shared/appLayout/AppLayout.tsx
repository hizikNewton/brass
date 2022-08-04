import { Suspense } from "react";
import { useAppState } from "utils/hook";
import { AppLayouts } from ".";

const AppLayout = () => {
  const {
    app: {
      settings: { activeLayout },
    },
  } = useAppState();
  const Layout = AppLayouts[activeLayout];
  return (
    <Suspense fallback={<span />}>
      <Layout />
    </Suspense>
  );
};

export default AppLayout;
