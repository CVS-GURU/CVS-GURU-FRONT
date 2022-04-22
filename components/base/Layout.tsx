import React, { useState, useEffect, ReactNode, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import Head from 'next/head';
import Footer from 'components/base/Footer';
import Appbar from 'components/base/Appbar';
import ModalPortal from 'components/base/ModalPortal';
import MenuItemWrapper from 'components/base/MenuItemWrapper';
import ModalContainer from 'components/modal/ModalContainer';
import MoblieWebViewWrapper from 'components/common/MoblieWebViewWrapper';
import { ToastContainer, toast } from 'react-toastify';
import { useSelector, RootState } from 'store';
import { Row, Col } from 'antd';
import { modalActions } from 'store/modal';
import { commonActions } from 'store/common';
import styled from 'styled-components';
import Filter from 'components/contents/filter/Filter';
import FilterTypeSide from 'components/contents/filter/FilterTypeSide';
import LikeReview from 'components/myPage/LikeReview';
import MyComment from 'components/myPage/MyComment';
import RecentSearch from 'components/myPage/RecentSearch';
import useWindowSize, { Size } from 'hooks/useWindowSize';
import { useRouter } from 'next/router';
import { setSessionStorage, getIsMobileSize } from 'lib/helpers';

type Props = {
  children: ReactNode;
};
type StyledFilterWrapperProps = {
  isFilterOpen: boolean;
  isFilterClose?: boolean;
  isSmall?: boolean | undefined;
};
const St = {
  AllWrapper: styled.div`
    height: 100%;
    min-height: 100vh;
    position: relative;
    background: ${(props) => props.theme.colors.primary};
  `,

  LayoutWrapper: styled.div`
    padding-top: 85px;
    transition: margin-top 0.2s ease 0s,
      margin-left 0.2s cubic-bezier(0.4, 0, 0.2, 1) 0s;
    transform: translate3d(0px, 0px, 0px);
  `,

  HomeSection: styled.section`
    position: relative;
    transition: all 0.5s ease;
    @media (max-width: 420px) {
    }
  `,

  LayoutWrapperFull: styled.div<StyledFilterWrapperProps>`
    padding-top: 85px;
    width: ${(props) => (props.isFilterOpen ? 'calc(100% - 280px)' : '100%')};
    margin-left: ${(props) =>
      props.isFilterOpen && !props.isSmall ? '280px' : '0'};

    flex-grow: 1;
    transition: margin-top 0.2s ease 0s,
      margin-left 0.2s cubic-bezier(0.4, 0, 0.2, 1) 0s;
    transform: translate3d(0px, 0px, 0px);
  `
};

const Layout = ({ children }: Props) => {
  const webviewPage = useSelector(
    (state: RootState) => state.common.webviewPage
  );
  const router = useRouter();
  const contentsId = router.query?.contentsId;
  const isContentsPage =
    router.pathname.indexOf('/contents') !== -1 && !contentsId;
  const modal = useSelector((state: RootState) => state.modal.modal);
  const isMobileMenuListOpen = useSelector(
    (state: RootState) => state.common.isMobileMenuListOpen
  );
  const isFilterOpen = useSelector(
    (state: RootState) => state.filter.isFilterOpen
  );

  const isMobileWebViewOpen = useSelector(
    (state: RootState) => state.common.isMobileWebViewOpen
  );

  const isMobileSizeRedux = useSelector(
    (state: RootState) => state.common.isMobileSize
  );

  const { isMobileSize } = useWindowSize();

  useEffect(() => {
    const isMobileSize = getIsMobileSize({
      width: window.innerWidth,
      height: window.innerHeight
    });
    dispatch(commonActions.setIsMobileSize(isMobileSize));
  }, [router.pathname, isMobileSize]);

  const dispatch = useDispatch();
  const closeModal = () => {
    if (!modal.isNeedBackgroundClickBlock) {
      dispatch(modalActions.closeModal());
    }
  };

  useEffect(() => {
    if (isFilterOpen) {
      setSessionStorage('filter_on', 'true');
    } else {
      setSessionStorage('filter_on', 'false');
    }
  }, [isFilterOpen]);

  let body = (
    <St.LayoutWrapper>
      <St.HomeSection>
        <Row>
          <Col xs={0} sm={2} md={2} lg={3} xl={3}></Col>
          <Col xs={24} sm={20} md={20} lg={18} xl={18}>
            {children}
          </Col>
          <Col xs={0} sm={2} md={2} lg={3} xl={3}></Col>
        </Row>
      </St.HomeSection>
    </St.LayoutWrapper>
  );
  const [isContentsFullPage, setIsContentsFullPage] = useState(false);

  useEffect(() => {
    setIsContentsFullPage(isContentsPage && !isMobileSize);
  }, [isContentsPage, isMobileSize]);

  useEffect(() => {
    dispatch(commonActions.setContentFullpage(isContentsFullPage));
  }, [router.pathname, isContentsFullPage]);

  if (isContentsFullPage) {
    body = (
      <St.LayoutWrapperFull isFilterOpen={isFilterOpen}>
        {children}
      </St.LayoutWrapperFull>
    );
  }
  const getWebviewPageChildren = useCallback(() => {
    if (webviewPage === 'like-review') {
      return { component: <LikeReview />, title: '좋아요 한 리뷰' };
    }
    if (webviewPage === 'my-comment') {
      return { component: <MyComment />, title: '내가 남긴 코멘트' };
    }
    if (webviewPage === 'recent-search') {
      return { component: <RecentSearch />, title: '최근 검색한 내역' };
    }
    return { component: <div />, title: 'default' };
  }, [webviewPage]);

  const WebviewPageChildren = getWebviewPageChildren();

  return (
    <>
      <St.AllWrapper>
        {isContentsPage && !isContentsFullPage && (
          <Filter query={router.query} />
        )}
        <ToastContainer />
        <MoblieWebViewWrapper children={WebviewPageChildren} />

        {isContentsPage && isContentsFullPage && <FilterTypeSide />}
        {isMobileMenuListOpen && <MenuItemWrapper />}
        <Appbar />
        {/* 모달 포탈 선언 */}
        <ModalPortal closePortal={closeModal}>
          <ModalContainer closeModal={closeModal} />
        </ModalPortal>
        {body}
      </St.AllWrapper>
      <Footer />
    </>
  );
};

export default Layout;
