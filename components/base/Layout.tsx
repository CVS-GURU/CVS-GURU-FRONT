import React, { useEffect, ReactNode } from 'react';
import { useDispatch } from 'react-redux';
import Head from 'next/head';
import Footer from 'components/base/Footer';
import Appbar from 'components/base/Appbar';
import ModalPortal from 'components/base/ModalPortal';
import MenuItemWrapper from 'components/base/MenuItemWrapper';
import ModalContainer from 'components/modal/ModalContainer';
import { useSelector, RootState } from 'store';
import { Row, Col } from 'antd';
import { modalActions } from 'store/modal';
import { commonActions } from 'store/common';
import styled from 'styled-components';
import Filter from 'components/contents/filter/Filter';
import FilterTypeSide from 'components/contents/filter/FilterTypeSide';
import useWindowSize, { Size } from 'hooks/useWindowSize';
import { useRouter } from 'next/router';
import { setSessionStorage } from 'lib/helpers';

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
    width: ${(props) => (props.isFilterOpen ? 'calc(100% - 280px)' : '100%')};
    margin-left: ${(props) =>
      props.isFilterOpen && !props.isSmall ? '280px' : '0'};

    flex-grow: 1;
    transition: margin-top 0.2s ease 0s,
      margin-left 0.2s cubic-bezier(0.4, 0, 0.2, 1) 0s;
    transform: translate3d(0px, 0px, 0px);
  `,
};

const Layout = ({ children }: Props) => {
  const router = useRouter();
  const isContentsPage = router.pathname.indexOf('/contents') !== -1;
  const modal = useSelector((state: RootState) => state.modal.modal);
  const isMobileMenuListOpen = useSelector(
    (state: RootState) => state.common.isMobileMenuListOpen,
  );
  const isFilterOpen = useSelector(
    (state: RootState) => state.filter.isFilterOpen,
  );
  const { isMobileSize } = useWindowSize();

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

  const isContentsFullPage = isContentsPage && !isMobileSize;

  useEffect(() => {
    dispatch(commonActions.setContentFullpage(isContentsFullPage));
  }, [isContentsFullPage]);

  if (isContentsFullPage) {
    body = (
      <St.LayoutWrapperFull isFilterOpen={isFilterOpen}>
        {children}
      </St.LayoutWrapperFull>
    );
  }

  console.log('isMobileMenuListOpen = ', isMobileMenuListOpen);
  return (
    <>
      <St.AllWrapper>
        {!isContentsFullPage && <Filter query={router.query} />}
        {isContentsFullPage && <FilterTypeSide />}
        {isMobileMenuListOpen && <MenuItemWrapper />}
        <Appbar />
        {/* 모달 포탈 선언 */}
        <ModalPortal closePortal={closeModal}>
          <ModalContainer closeModal={closeModal} />
        </ModalPortal>
        {body}
        <Footer />
      </St.AllWrapper>
    </>
  );
};

export default Layout;
