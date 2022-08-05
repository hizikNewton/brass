import Header from "components/Header";
import Page from "components/Page";
import { Outlet } from "react-router-dom";

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
