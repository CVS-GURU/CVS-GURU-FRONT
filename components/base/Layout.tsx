import React, { ReactNode } from 'react';
import Head from 'next/head';
import Appbar from 'components/base/Appbar';
import { useSelector, RootState } from 'store';
import { Row, Col } from 'antd';
import styled from 'styled-components';
type Props = {
  children: ReactNode;
};

const St = {
  AllWrapper: styled.div`
    height: 100%;
    min-height: 100vh;
    position: relative;
    min-width: 500px;
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
  return (
    <>
      <St.AllWrapper>
        <Appbar />
        <St.LayoutWrapper>
          <St.HomeSection>
            <Row>
              <Col xs={0} sm={2} md={4} lg={4} xl={4}></Col>
              <Col xs={24} sm={20} md={16} lg={16} xl={16}>
                {children}
              </Col>
              <Col xs={0} sm={2} md={4} lg={4} xl={4}></Col>
            </Row>
          </St.HomeSection>
        </St.LayoutWrapper>
      </St.AllWrapper>
    </>
  );
};

export default Layout;
