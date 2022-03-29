import { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { commonActions } from 'store/common';
import Link from 'next/link';
import iconMap from 'lib/iconMap';
import useWindowSize, { Size } from 'hooks/useWindowSize';

const St = {
  AppbarWrapper: styled.div`
    z-index: 1;
    width: 100%;
    margin: 0 auto;

    height: 80px;
    min-height: 40px;
    display: flex;
    position: relative;
    justify-content: space-between;
    align-items: center;
    box-shadow: 1px;

    box-shadow: 0 -2px 12px 0 rgb(0 0 0 / 6%), 0 -1px 4px 0 rgb(0 0 0 / 18%);
  `,

  HeaderContainerLeft: styled.div``,
  HeaderContainerLogoWrapper: styled.div`
    min-width: 200px;
    height: 50px;
    cursor: pointer;
    h1 {
      font-size: 2rem;
      font-weight: 900;
    }
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
    cursor: pointer;
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
      font-weight: bold;
      margin: 0 0.8rem;
      font-size: 1.3rem;
      position: relative;
      list-style: none;
    }

    .active {
      background-color: #f1f3f5;
      li {
      }
    }
  `,
};

const Appbar = () => {
  const dispatch = useDispatch();
  const size: Size = useWindowSize();
  const isMoblie = size && size.width && size?.width < 720;
  const links = [{ name: 'Search', path: '/search' }];

  const handleOpenMobileMenu = () => {
    dispatch(commonActions.setIsMobileMenuListOpen(null));
  };

  return (
    <St.AppbarWrapper>
      <St.HeaderContainerLeft className="header-container-left flex">
        <Link href={'/'}>
          <St.HeaderContainerLogoWrapper className="flex-center">
            <h1>CVS-GURU</h1>
            {/* <img src="/static/images/logo.png" alt="logo" /> */}
          </St.HeaderContainerLogoWrapper>
        </Link>
        <input />
      </St.HeaderContainerLeft>
      <St.HeaderContaineRight id="right">
        <St.HeaderLinkWrapper className="flex-center">
          {isMoblie && (
            <div onClick={handleOpenMobileMenu}>{iconMap.MenuOutlined}</div>
          )}
          {!isMoblie && (
            <>
              <Link href="/contents">
                <li>찾아보기</li>
              </Link>
              <Link href="/my-page">
                <li>마이 페이지</li>
              </Link>
              <Link href="/about">
                <li>about</li>
              </Link>
            </>
          )}
        </St.HeaderLinkWrapper>
      </St.HeaderContaineRight>
    </St.AppbarWrapper>
  );
};

export default Appbar;
