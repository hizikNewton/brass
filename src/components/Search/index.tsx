import { useState, useRef, useEffect, useMemo } from "react";
import { useNavigate } from "react-router";
import { AxiosError } from "axios";
import { useTranslation } from "react-i18next";
import {
  SearchImage,
  SearchInputPanel,
  SearchPanel,
  SearchButton,
  SearchContainer,
} from "./styled";
import SearchLogo from "assets/search_black.png";
import ClearLogo from "assets/clear.png";
import { isMobile } from "utils/screen";
import { useAppState, useDispatch } from "utils/hook";
import { AppDispatch } from "context/reducer";
import { ComponentActions } from "context/actions";
import { fetchSearchResult } from "services/http/fetchers";
import i18n from "utils/i18n";

const clearSearchInput = (inputElement: any) => {
  const input: HTMLInputElement = inputElement.current;
  if (input) {
    input.value = "";
    input.blur();
  }
};

const setSearchLoading = (inputElement: any) => {
  const input: HTMLInputElement = inputElement.current;
  input.value = i18n.t("search.loading");
};

const setSearchContent = (inputElement: any, content: string) => {
  const input: HTMLInputElement = inputElement.current;
  if (input) {
    input.value = content;
  }
};

const hideMobileMenu = (dispatch: AppDispatch) => {
  if (isMobile()) {
    dispatch({
      type: ComponentActions.UpdateHeaderMobileMenuVisible,
      payload: {
        mobileMenuVisible: false,
      },
    });
  }
};

const handleSearchResult = (
  searchValue: string,
  inputElement: any,
  searchBarEditable: boolean,
  dispatch: AppDispatch,
  setSearchValue: Function,
  navigate: ReturnType<typeof useNavigate>
) => {
  hideMobileMenu(dispatch);
  const query = searchValue.trim().replace(",", ""); // remove front and end blank and ','

  if (searchBarEditable) {
    dispatch({
      type: ComponentActions.UpdateHeaderSearchEditable,
      payload: {
        searchBarEditable: false,
      },
    });
  }
  setSearchLoading(inputElement);
  fetchSearchResult(query)
    .then((response: any) => {
      const { data } = response;
      if (!response || !data.type) {
        navigate(`/search/fail?q=${query}`);
        return;
      }
      clearSearchInput(inputElement);
      setSearchValue("");
    })
    .catch((error: AxiosError) => {
      setSearchContent(inputElement, query);
      navigate(`/search/fail?q=${query}`);
    });
};

const Search = ({
  content,
  hasButton,
}: {
  content?: string;
  hasButton?: boolean;
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [t] = useTranslation();
  const SearchPlaceholder = useMemo(() => t("navbar.search_placeholder"), [t]);
  const [searchValue, setSearchValue] = useState(content || "");
  const [placeholder, setPlaceholder] = useState(SearchPlaceholder);
  const inputElement = useRef<HTMLInputElement>(null);
  const {
    components: { searchBarEditable },
  } = useAppState();

  // update input placeholder when language change
  useEffect(() => {
    setPlaceholder(SearchPlaceholder);
  }, [SearchPlaceholder]);

  useEffect(() => {
    if (inputElement.current && !isMobile()) {
      const input = inputElement.current as HTMLInputElement;
      input.focus();
    }
  }, []);

  const clearSearchAction = (isClear?: boolean) => {
    if (isClear) {
      setSearchValue("");
      clearSearchInput(inputElement);
      dispatch({
        type: ComponentActions.UpdateHeaderSearchEditable,
        payload: {
          searchBarEditable: false,
        },
      });
    }
  };

  const inputChangeAction = (event: any) => {
    setSearchValue(event.target.value);
    dispatch({
      type: ComponentActions.UpdateHeaderSearchEditable,
      payload: {
        searchBarEditable: !!event.target.value,
      },
    });
  };

  const searchKeyAction = (event: any) => {
    if (event.keyCode === 13) {
      handleSearchResult(
        searchValue,
        inputElement,
        searchBarEditable,
        dispatch,
        setSearchValue,
        navigate
      );
    }
  };

  const ImageIcon = ({ isClear }: { isClear?: boolean }) => (
    <SearchImage isClear={isClear} onClick={() => clearSearchAction(isClear)}>
      <img src={isClear ? ClearLogo : SearchLogo} alt="search logo" />
    </SearchImage>
  );

  return (
    <SearchContainer>
      <SearchPanel moreHeight={hasButton} hasButton={hasButton}>
        <ImageIcon />
        <SearchInputPanel
          searchBarEditable={searchBarEditable}
          ref={inputElement}
          placeholder={placeholder}
          defaultValue={searchValue || ""}
          onChange={(event: any) => inputChangeAction(event)}
          onKeyUp={(event: any) => searchKeyAction(event)}
        />
        {searchValue && <ImageIcon isClear />}
      </SearchPanel>
      {hasButton && (
        <SearchButton
          onClick={() =>
            handleSearchResult(
              searchValue,
              inputElement,
              searchBarEditable,
              dispatch,
              setSearchValue,
              navigate
            )
          }
        >
          {"Search"}
        </SearchButton>
      )}
    </SearchContainer>
  );
};

export default Search;
