import { useEffect } from "react";
import { useLocation } from "react-router";
import LogoIcon from "assets/brass_logo.png";
import {
  HeaderPanel,
  HeaderEmptyPanel,
  HeaderMobileMenuPanel,
  HeaderLogoPanel,
} from "./styled";
import { isMobile, isScreen750to1440 } from "utils/screen";
import { SearchComp } from "./SearchComp";
import { currentLanguage } from "utils/i18n";
import { useAppState, useDispatch } from "utils/hook";
import { ComponentActions } from "context/actions";
import MenusComp from "./MenusComp";
import LanguageComp from "./LanguageComp";

const LogoComp = () => (
  <HeaderLogoPanel to="/">
    <img src={LogoIcon} alt="logo" />
  </HeaderLogoPanel>
);

const MobileMenuComp = () => {
  const dispatch = useDispatch();
  const {
    components: { mobileMenuVisible },
  } = useAppState();
  return (
    <HeaderMobileMenuPanel
      onClick={() => {
        dispatch({
          type: ComponentActions.UpdateHeaderMobileMenuVisible,
          payload: {
            mobileMenuVisible: !mobileMenuVisible,
          },
        });
      }}
    >
      <div className={mobileMenuVisible ? "close" : ""}>
        <div className="menu__icon__first" />
        <div className="menu__icon__second" />
        <div className="menu__icon__third" />
      </div>
    </HeaderMobileMenuPanel>
  );
};

export default () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const {
    components: { headerSearchBarVisible },
  } = useAppState();

  useEffect(() => {
    dispatch({
      type: ComponentActions.UpdateHeaderSearchBarVisible,
      payload: {
        headerSearchBarVisible: pathname !== "/" && pathname !== "/search/fail",
      },
    });
  }, [dispatch, pathname]);

  return (
    <HeaderPanel isEn={currentLanguage() === "en"}>
      <LogoComp />
      {!isMobile() && (
        <>
          {!(isScreen750to1440() && headerSearchBarVisible) && <MenusComp />}
          <HeaderEmptyPanel />
          {headerSearchBarVisible && <SearchComp />}
          <LanguageComp />
        </>
      )}
      {isMobile() && (
        <>
          <HeaderEmptyPanel />
          <MobileMenuComp />
        </>
      )}
    </HeaderPanel>
  );
};
