import { SearchOutlined } from '@ant-design/icons';
import styled, { css } from 'styled-components';

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
  return (
    <St.SearchInputContainer isPositionAppbar={isPositionAppbar}>
      <div className="flex-space-between">
        <St.InputWrapper>
          <input placeholder="검색해 보세요" />
        </St.InputWrapper>
        <St.InputButton size={size}> {buttonTitle}</St.InputButton>
      </div>
    </St.SearchInputContainer>
  );
};

export default MainSearchInput;
