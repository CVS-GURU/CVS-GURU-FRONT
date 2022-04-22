import React from 'react';
import styled from 'styled-components';
import { useSelector, RootState } from 'store';
import { commonActions } from 'store/common';
import { useDispatch } from 'react-redux';
import Link from 'next/link';

const St = {
  Wrapper: styled.div`
    text-align: center;
    background: ${(props) => props.theme.colors.primary};
    color: ${(props) => props.theme.colors.fontColor};
    margin: 5px;
  `
};

const Page1 = (props: any) => {
  const page2 = useSelector((state: RootState) => state.common.page2);
  const dispatch = useDispatch();
  const handleTest = (direction: string) => {
    if (direction === 'up') dispatch(commonActions.setPage2(page2 + 1));
    if (direction === 'down') dispatch(commonActions.setPage2(page2 - 1));
  };
  return (
    <St.Wrapper>
      test : {page2}
      <button onClick={() => handleTest('up')}>+</button>
      <button onClick={() => handleTest('down')}>-</button>
      <Link href="/test/3">
        <a>다음</a>
      </Link>
      <Link href="/test/1">
        <a>이전ㄴ</a>
      </Link>
    </St.Wrapper>
  );
};

export default Page1;
