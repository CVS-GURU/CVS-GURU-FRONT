import { useEffect } from 'react';
import styled from 'styled-components';
import { Button } from 'components/common';
import palette from 'styles/palette';
import Link from 'next/link';

const St = {
  AppbarWrapper: styled.div`
    z-index: 1;
    width: 89%;
    margin: 0 auto;
    max-width: 1184px;
    height: 60px;
    min-height: 40px;
    display: flex;
    position: relative;
    justify-content: space-between;
    align-items: center;
  `,

  HeaderContainerLeft: styled.div``,
  HeaderContainerLogoWrapper: styled.div`
    min-width: 200px;
    height: 50px;
    img {
      height: 100%;
      width: 100%;
    }
  `,
  HeaderContaineRight: styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    button {
      margin-right: 5px;
    }
  `,

  HeaderLinkWrapper: styled.ul`
    display: flex;
    flex-direction: row;

    margin: auto;
    a {
      text-decoration: none;
      margin: 10px 5px;
      padding: 10px 25px 13px;
      font-size: 14px;
      color: #868e96;
      background-color: transparent;
      border: none;
      border-radius: 22px;
      transition: font-weight 0.2s ease, background-color 0.2s ease,
        color 0.2s ease;
    }
    li {
      color: ${palette.blue_4};
      margin: 0 0.8rem;
      font-size: 1.3rem;
      position: relative;
      list-style: none;
    }

    .active {
      background-color: #f1f3f5;
      li {
        color: ${palette.blue_7};
      }
    }
  `,
};

const Appbar = () => {
  useEffect(() => {}, []);
  const links = [{ name: 'Search', path: '/search' }];
  return (
    <St.AppbarWrapper>
      <St.HeaderContainerLeft className="header-container-left">
        <Link href={'/'}>
          <St.HeaderContainerLogoWrapper>
            CVS-GURU
            {/* <img src="/static/images/logo.png" alt="logo" /> */}
          </St.HeaderContainerLogoWrapper>
        </Link>
      </St.HeaderContainerLeft>
      <St.HeaderContaineRight id="right">
        <St.HeaderLinkWrapper></St.HeaderLinkWrapper>
      </St.HeaderContaineRight>
    </St.AppbarWrapper>
  );
};

export default Appbar;
