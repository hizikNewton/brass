import SearchLogo from "assets/search_white.png";
import { HeaderSearchPanel, HeaderSearchBarPanel } from "./styled";
import { isScreen750to1440 } from "utils/screen";
import { useAppState, useDispatch } from "utils/hook";
import { ComponentActions } from "context/actions";
import Search from "components/Search";

export const SearchComp = () => {
  const dispatch = useDispatch();
  const {
    components: { searchBarEditable },
  } = useAppState();

  if (isScreen750to1440() && !searchBarEditable) {
    return (
      <HeaderSearchBarPanel
        role="button"
        tabIndex={-1}
        onKeyDown={() => {}}
        onClick={() => {
          dispatch({
            type: ComponentActions.UpdateHeaderSearchEditable,
            payload: {
              searchBarEditable: true,
            },
          });
        }}
      >
        <img alt="header search bar" src={SearchLogo} />
      </HeaderSearchBarPanel>
    );
  }
  return (
    <HeaderSearchPanel>
      <Search />
    </HeaderSearchPanel>
  );
};
