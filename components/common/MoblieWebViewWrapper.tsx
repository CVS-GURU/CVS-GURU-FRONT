import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector, RootState } from 'store';
import { commonActions } from 'store/common';
import iconMap from 'lib/iconMap';
import { getSessionStorage } from 'lib/helpers';

type StyledFilterWrapperProps = {
  isMobileWebViewOpen: boolean;
};
const St = {
  MoblieWebViewWrapper: styled.div<StyledFilterWrapperProps>`
    // display : ${(props) => (props.isMobileWebViewOpen ? '' : '')};
    width :100%;
    height :100%;
    position: fixed;
    z-index:2;
    background: ${(props) => props.theme.colors.primary};
    min-height: 100vh;
    transform: ${(props) =>
      props.isMobileWebViewOpen ? 'translateX(0%);' : 'translateX(100%);'}
    transition: 0.4s all;
  `,
  MoblieWebViewContainer: styled.div`
    padding: 2rem;
    border-bottom: 1px solid grey;
  `,
  MoblieWebViewTitle: styled.div`
    font-weight: bold;
    font-size: 1.8rem;
  `,
  MoblieWebViewButtonContainer: styled.div``,
};

type MoblieWebViewButtonData = {
  buttonTitle: string;
  value: string;
};

const MoblieWebView = ({ children, query }: any) => {
  const mobileWebviewWrapperRef = useRef(null);
  const isMobileWebViewOpen = useSelector(
    (state: RootState) => state.common.isMobileWebViewOpen,
  );

  // const [isFilterClose, setIsFilterClose] = useState(false);
  const dispatch = useDispatch();

  const handleFilterClose = () => {
    dispatch(commonActions.setIsMobileWebViewOpen(true));
  };

  /* filter on, off */
  // useEffect(() => {
  //   const filterOn = getSessionStorage('filter_on');
  //   if (filterOn === 'true') {
  //     if (!isMobileWebViewOpen) dispatch(filterActions.setIsFilterOpen(true));
  //   }
  //   if (filterOn === 'false') {
  //     if (isMobileWebViewOpen) dispatch(filterActions.setIsFilterOpen(false));
  //   }
  // }, [query]);

  return (
    <St.MoblieWebViewWrapper
      ref={mobileWebviewWrapperRef}
      isMobileWebViewOpen={isMobileWebViewOpen}
    >
      <div
        onClick={handleFilterClose}
        style={{ padding: '2rem', cursor: 'pointer' }}
      >
        {iconMap['LeftOutlined']}
      </div>

      {children}
    </St.MoblieWebViewWrapper>
  );
};

export default MoblieWebView;
