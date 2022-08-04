import i18n, { currentLanguage, changeLanguage } from "utils/i18n";
import { useDispatch } from "utils/hook";
import { AppActions } from "context/actions";
import { LanguagePanel } from "./styled";
import SimpleButton from "components/SimpleButton";

export const languageText = (lan: "en" | "zh" | null, reverse?: boolean) => {
  return lan === "en"
    ? i18n.t("navbar.language_en")
    : i18n.t("navbar.language_zh");
};

const LanDropdown = ({
  setShow,
  left,
  top,
}: {
  setShow: Function;
  left: number;
  top: number;
}) => {
  const dispatch = useDispatch();
  const hideDropdown = () => {
    setShow(false);
  };
  const handleLanguage = () => {
    hideDropdown();
    changeLanguage("en");
    dispatch({
      type: AppActions.UpdateAppLanguage,
      payload: {
        language: "en",
      },
    });
  };
  return (
    <LanguagePanel left={left} top={top} onMouseLeave={hideDropdown}>
      <SimpleButton className="language__selected" onClick={hideDropdown}>
        {languageText(currentLanguage())}
      </SimpleButton>
      <div className="language__separate" />
      <SimpleButton className="language__normal" onClick={handleLanguage}>
        {languageText(currentLanguage(), true)}
      </SimpleButton>
    </LanguagePanel>
  );
};
export default LanDropdown;
