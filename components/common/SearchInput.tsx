import { SearchOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const St = {
  SearchInputContainer: styled.div`
    background: #f3f3f3;
    height: 35px;
    border-radius: 8px;
    width: 320px;
    span {
      padding: 0 10px 0 5px;
    }
  `,
};

const SearchInput = () => {
  return (
    <St.SearchInputContainer className="flex-center">
      <span>
        <SearchOutlined />
      </span>
      <input placeholder="검색어를 입력하세요" />
    </St.SearchInputContainer>
  );
};

export default SearchInput;
