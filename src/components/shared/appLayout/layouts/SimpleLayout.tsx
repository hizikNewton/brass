import { Outlet } from "react-router-dom";
import Header from "../../../Header";
import Page from "../../../Page";

export const SimpleLayout = () => {
  return (
    <Page>
      <Header />
      <Outlet />
      {/* 
        {!(isMobile() && mobileMenuVisible) && <Footer />} */}
    </Page>
  );
};

export default SimpleLayout;
