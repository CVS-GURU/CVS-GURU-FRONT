import { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { useDispatch } from 'react-redux';
import { filterActions } from 'store/filter';
import { useRouter } from 'next/router';
import { makeUrl } from 'lib/helpers';
import { DIRECTION_TABLE } from 'lib/staticData';
import { useSelector, RootState } from 'store';

//* 버튼 크기 구하기
const getButtonSize = (size: 'small' | 'medium' | string) => {
  switch (size) {
    case 'medium':
      return '18px';

    case 'small':
      return '14px';

    default:
      return '14px';
  }
};

const getMarginSize = (isPositionAppbar: boolean) => {
  if (isPositionAppbar) {
    return css`
      margin: 2rem 50px 2rem 0;
    `;
  }
  return css`
    margin: 2rem 0;
  `;
};

type InputButtonProps = {
  size: 'small' | 'medium' | string;
};
type SearchInputConainer = {
  isPositionAppbar: boolean;
};

const St = {
  InputWrapper: styled.div`
    padding: 1rem;
    border: 3px solid;
    width: 100%;
    input {
      width: 100%;
      border: none;
    }
  `,
  InputButton: styled.button<InputButtonProps>`
    cursor: pointer;
    background: black;
    color: white;
    font-weight: 700;
    background: black;
    color: white;
    border: none;
    width: 70px;
    font-size: ${(props) => getButtonSize(props.size)};
  `,
  SearchInputContainer: styled.div<SearchInputConainer>`
    width: 100%;
    ${(props) => getMarginSize(props.isPositionAppbar)}
  `,
};

type MainSearchInputProps = {
  buttonTitle?: string;
  size?: string;
  isPositionAppbar?: boolean;
};

const MainSearchInput = ({
  buttonTitle = '검색',
  size = 'medium',
  isPositionAppbar = false,
}: MainSearchInputProps) => {
  const [searchQuertLocal, setSearchQueryLocal] = useState('');
  const [isFocusInput, setIsFocueInput] = useState(false);

  useEffect(() => {}, [router.query]);

  const handleFocus = () => {
    setIsFocueInput(true);
  };
  const handleBlur = () => {
    setIsFocueInput(false);
  };
  const dispatch = useDispatch();
  const router = useRouter();
  const searchQuery = useSelector(
    (state: RootState) => state.filter.searchQuery,
  );
  const handleSearchQuery = (e: any) => {
    dispatch(filterActions.setSearchQuery(e.target.value));
  };

  const handleSearch = () => {
    const url = makeUrl({ query: searchQuery }, 'contents');
    router.push(url);
  };

  /* 엔터버튼 클릭시 인풋  */
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const dir = DIRECTION_TABLE[String(event.keyCode)];
      /* 화살표, 엔터 제외한 다른 키값일 경우 RETURN  */
      if (dir === 'UP' || dir === 'DOWN' || dir === 'ENTER' || dir === 'ESC') {
        if (dir === 'DOWN') {
        }
        if (dir === 'UP') {
        }
        if (dir === 'ESC') {
          handleBlur();
          const focusSearch: any = document.querySelector('#search-bar');
          focusSearch.blur();
        }
        /* 여기서 enter처리  */
        if (dir === 'ENTER') {
          if (isFocusInput) handleSearch();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown, false);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isFocusInput, searchQuery, router.query]);
  return (
    <St.SearchInputContainer isPositionAppbar={isPositionAppbar}>
      <div className="flex-space-between">
        <St.InputWrapper>
          <input
            placeholder="검색해 보세요"
            onChange={handleSearchQuery}
            id="search-bar"
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </St.InputWrapper>
        <St.InputButton size={size} onClick={handleSearch}>
          {buttonTitle}
        </St.InputButton>
      </div>
    </St.SearchInputContainer>
  );
};

export default MainSearchInput;
