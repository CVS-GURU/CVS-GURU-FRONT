/* eslint-disable no-plusplus */
import React from 'react';
import styled from 'styled-components';
import IconMap from 'lib/iconMap';
import { DEFAULT_PAGE_COUNT, DEFAULT_PAGE_NO } from 'lib/staticData';
import { makeUrl } from 'lib/helpers';
import { useRouter } from 'next/router';

interface StyledButtonProps {
  isSelected?: boolean;
}

const St = {
  PaginationWrapper: styled.div`
    display: inline-flex;
    align-items: center;
  `,
  IconWarp: styled.button`
    background-color: white;
    margin: 0 2px 0 2px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 36px;
    height: 36px;
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 16px;
    font-weight: 400;
    color: #999999;
    ]margin: 0;
    padding: 0.5rem 1rem;
    text-align: center;
    text-decoration: none;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: 0.5s;
  `,

  PageNumber: styled.button<StyledButtonProps>`
    color: ${(props) => (props.isSelected ? 'white' : 'black')};
    background: ${(props) =>
      props.isSelected ? 'linear-gradient(to right,#dd5e89,#f7bb97)' : 'none'};
    margin: 0 2px 0 2px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 36px;
    height: 36px;
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 16px;
    font-weight: 400;

    margin: 0;
    padding: 0.5rem 1rem;
    text-align: center;
    text-decoration: none;
    border: none;
    border-radius: 50%;

    box-shadow: : ${(props) =>
      props.isSelected
        ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
        : 'none'};
    cursor: pointer;
    transition: 0.5s;
  `,
};

type PageNationProps = {
  query: any;
  totalCount: number;
};

const calculatePagenationIndex = (
  totalCount: number,
  currentPage: number,
  pageSize: number,
) => {
  const totalPageCnt = Math.ceil(Number(totalCount / pageSize));
  let startIdx = Number(currentPage);
  let endIdx = totalPageCnt;
  if (startIdx <= 10) {
    startIdx = 1;
  } else if (startIdx % 10 === 0) {
    startIdx -= 9;
  } else {
    startIdx = Math.floor(startIdx / 10) * 10 + 1;
  }
  if (totalPageCnt > 10 && totalPageCnt > Number(startIdx) + 10) {
    endIdx = Number(startIdx) + 9;
  }

  return { totalPageCnt, startIdx, endIdx };
};

type PageButtonProps = {
  pageNo: number;
  pageNumber: number;
  dispatchPagenation: (pageNumber: number) => void;
};
const PageButton = ({
  pageNo,
  pageNumber,
  dispatchPagenation,
}: PageButtonProps) => {
  const isSelected = Number(pageNo) === Number(pageNumber);
  return (
    <li>
      <St.PageNumber
        isSelected={isSelected}
        type="button"
        onClick={() => dispatchPagenation(pageNumber)}
      >
        {pageNumber}
      </St.PageNumber>
    </li>
  );
};

const Pagination = ({ query: queryParam, totalCount }: PageNationProps) => {
  console.log('query ', queryParam);
  const {
    query,
    pageNo: pageNoQueryParam,
    pageSize: pageSizeQueryParam,
  } = queryParam;
  const pageNo = pageNoQueryParam || DEFAULT_PAGE_NO;
  const pageSize = pageSizeQueryParam || DEFAULT_PAGE_COUNT;
  const router = useRouter();
  const pageList = [];
  const { totalPageCnt, startIdx, endIdx } = calculatePagenationIndex(
    totalCount,
    pageNo,
    pageSize,
  );
  console.log(
    'totalPageCnt, startIdx, endIdx ',
    totalPageCnt,
    startIdx,
    endIdx,
  );
  for (let i = Number(startIdx); i <= endIdx; i++) {
    pageList.push(i);
  }

  const dispatchPagenation = (pageNo: number) => {
    const params = {
      ...query,
      page: pageNo,
      page_size: pageSize,
    };
    const url = makeUrl(params, '');
    router.push(url);
  };

  /* 나중에 사용  */
  const handlePagenationButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { id } = e.target as any;
    if (id === 'left-end') {
      if (Number(pageNo) === 1) {
        return;
      }
      dispatchPagenation(1);
    } else if (id === 'left') {
      if (Number(pageNo) - 1 <= 0) {
        return;
      }
      dispatchPagenation(Number(pageNo) - 1);
    } else if (id === 'right') {
      if (Number(pageNo) + 1 > totalPageCnt) {
        return;
      }
      dispatchPagenation(Number(pageNo) + 1);
    } else if (id === 'right-end') {
      if (Number(pageNo) === totalPageCnt) {
        return;
      }
      dispatchPagenation(Number(totalPageCnt));
    }
  };

  return (
    <St.PaginationWrapper>
      <ul style={{ display: 'flex', justifyContent: 'center' }}>
        <St.IconWarp>{IconMap.doubleBefore}</St.IconWarp>
        <St.IconWarp>{IconMap.before}</St.IconWarp>
        {pageList &&
          pageList.map((number, key) => {
            return (
              <PageButton
                pageNumber={number}
                pageNo={pageNo}
                key={key}
                dispatchPagenation={dispatchPagenation}
              />
            );
          })}
        <St.IconWarp>{IconMap.next}</St.IconWarp>
        <St.IconWarp>{IconMap.doubleNext}</St.IconWarp>
      </ul>
    </St.PaginationWrapper>
  );
};

export default Pagination;
