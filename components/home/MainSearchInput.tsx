import { SearchOutlined } from '@ant-design/icons';
import styled from 'styled-components';

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
  InputButton: styled.button`
    background: black;
    color: white;
    font-weight: 700;
    background: black;
    color: white;
    border: none;
    width: 70px;
  `,
  SearchInputContainer: styled.div`
    margin: 2rem 0;
  `,
};

const MainSearchInput = () => {
  return (
    <St.SearchInputContainer>
      <div className="flex-space-between">
        <St.InputWrapper>
          <input placeholder="검색해 보세요" />
        </St.InputWrapper>
        <St.InputButton>검색</St.InputButton>
      </div>
    </St.SearchInputContainer>
  );
};

export default MainSearchInput;
