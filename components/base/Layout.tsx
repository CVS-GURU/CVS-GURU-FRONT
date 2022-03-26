import React, { ReactNode } from 'react';
import { useDispatch } from 'react-redux';
import Head from 'next/head';
import Appbar from 'components/base/Appbar';
import ModalPortal from 'components/base/ModalPortal';
import ModalContainer from 'components/modal/ModalContainer';
import { useSelector, RootState } from 'store';
import { Row, Col } from 'antd';
import { modalActions } from 'store/modal';
import styled from 'styled-components';
type Props = {
  children: ReactNode;
};

const St = {
  AllWrapper: styled.div`
    height: 100%;
    min-height: 100vh;
    position: relative;

    background: ${(props) => props.theme.colors.primary};
  `,

  LayoutWrapper: styled.div`
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
};

const Layout = ({ children }: Props) => {
  const modal = useSelector((state: RootState) => state.modal.modal);
  const dispatch = useDispatch();
  const closeModal = () => {
    if (!modal.isNeedBackgroundClickBlock) {
      dispatch(modalActions.closeModal());
    }
  };

  return (
    <>
      <St.AllWrapper>
        <Appbar />
        {/* 모달 포탈 선언 */}
        <ModalPortal
          modalOpened={modal.open}
          closePortal={closeModal}
          isToast={modal.isToast}
          className={modal.className}
        >
          <ModalContainer closeModal={closeModal} />
        </ModalPortal>

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
      </St.AllWrapper>
    </>
  );
};

export default Layout;
