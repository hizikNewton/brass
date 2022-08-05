import { useState, useLayoutEffect } from "react";
import { currentLanguage, changeLanguage } from "utils/i18n";
import { HeaderLanguagePanel, MobileSubMenuPanel } from "./styled";
import SimpleButton from "../../SimpleButton";
import WhiteDropdownIcon from "assets/white_dropdown.png";
import WhiteDropUpIcon from "assets/white_drop_up.png";
import { isMobile } from "utils/screen";
import { useAppState, useDispatch } from "utils/hook";
import { AppDispatch } from "context/reducer";
import { AppActions, ComponentActions } from "context/actions";
import LanDropdown, { languageText } from "components/DropDown/Language";
import i18next from "utils/i18n";
import { useTranslation } from "react-i18next";

const getDropdownIcon = (showDropdown: boolean) => {
  if (!showDropdown) return WhiteDropdownIcon;
};

const languageAction = (dispatch: AppDispatch) => {
  changeLanguage("en");
  dispatch({
    type: AppActions.UpdateAppLanguage,
    payload: {
      language: currentLanguage() === "en",
    },
  });
  dispatch({
    type: ComponentActions.UpdateHeaderMobileMenuVisible,
    payload: {
      mobileMenuVisible: false,
    },
  });
};

const hideMobileMenu = (dispatch: AppDispatch) => {
  dispatch({
    type: ComponentActions.UpdateHeaderMobileMenuVisible,
    payload: {
      mobileMenuVisible: false,
    },
  });
};

const LanguageDropdown = () => {
  const {
    app: { language },
  } = useAppState();

  const [showLanguage, setShowLanguage] = useState(false);
  const [languageLeft, setLanguageLeft] = useState(0);
  const [languageTop, setLanguageTop] = useState(0);
  const { t, i18n } = useTranslation();

  useLayoutEffect(() => {
    if (showLanguage && language) {
      const languageDropdownComp = document.getElementById(
        "header__language__panel"
      );
      if (languageDropdownComp) {
        const languageDropdownReact =
          languageDropdownComp.getBoundingClientRect();
        if (languageDropdownReact) {
          setLanguageLeft(
            languageDropdownReact.left + (currentLanguage() === "en" ? -15 : 3)
          );
          setLanguageTop(languageDropdownReact.bottom - 3);
        }
      }
    }
  }, [showLanguage, language]);

  return (
    <HeaderLanguagePanel
      id="header__language__panel"
      showLanguage={showLanguage}
      onMouseLeave={() => {
        setShowLanguage(false);
      }}
    >
      <SimpleButton
        className="header__language__flag"
        onMouseOver={() => {
          setShowLanguage(true);
        }}
      >
        <div className="header__language__content_panel">
          <div className="header__language__content">
            {languageText(currentLanguage())}
          </div>
          <img src={getDropdownIcon(showLanguage)} alt="dropdown icon" />
        </div>
      </SimpleButton>
      {showLanguage && (
        <LanDropdown
          setShow={setShowLanguage}
          left={languageLeft}
          top={languageTop}
        />
      )}
    </HeaderLanguagePanel>
  );
};

const LanguageMenu = () => {
  const dispatch = useDispatch();
  const [showSubMenu, setShowSubMenu] = useState(false);
  const { t, i18n } = useTranslation();
  return (
    <MobileSubMenuPanel showSubMenu={false}>
      <SimpleButton
        className="mobile__menus__main__item"
        onClick={() => {
          setShowSubMenu(!showSubMenu);
        }}
      >
        <div className="mobile__menus__main__item__content">
          {` ${i18next.t("navbar.language_en")}`}
        </div>
        <img
          className="mobile__menus__main__item__icon"
          alt="mobile language icon"
          src={showSubMenu ? WhiteDropUpIcon : WhiteDropdownIcon}
        />
      </SimpleButton>
      {showSubMenu && (
        <>
          <SimpleButton
            className="mobile__menus__sub__item"
            onClick={() => {
              hideMobileMenu(dispatch);
            }}
          >
            {` ${i18next.t("navbar.language_en")}`}
          </SimpleButton>
          <SimpleButton
            className="mobile__menus__sub__item"
            onClick={() => {
              languageAction(dispatch);
            }}
          >
            {`${i18next.t("navbar.language_en")}`}
          </SimpleButton>
        </>
      )}
    </MobileSubMenuPanel>
  );
};

export default () => (isMobile() ? <LanguageMenu /> : <LanguageDropdown />);
