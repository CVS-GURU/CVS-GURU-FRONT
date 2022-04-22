import { useRef, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { commonActions } from 'store/common';
import Link from 'next/link';
import iconMap from 'lib/iconMap';
import SearchInput from 'components/common/SearchInput';
import useWindowSize, { Size } from 'hooks/useWindowSize';
import { ROUTING_PAGES } from 'lib/staticData';
import { useSelector, RootState } from 'store';

type StyledAppbarWrapper = {
  isScrollDown: boolean;
};

const St = {
  AppbarWrapper: styled.div<StyledAppbarWrapper>`
    z-index: 1;
    width: 100%;
    margin: 0 auto;
    background: ${(props) => props.theme.colors.primary};
    height: 80px;
    min-height: 40px;
    display: flex;
    position: fixed;
    justify-content: space-between;
    align-items: center;
    box-shadow: 1px;
    box-shadow: 0 -2px 12px 0 rgb(0 0 0 / 6%), 0 -1px 4px 0 rgb(0 0 0 / 18%);
    transform: ${(props) =>
      props.isScrollDown
        ? 'translate3d(0, -100%, 0)'
        : 'translate3d(0, 0, 0) '};
    transition: 0.5s;
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
    @media (max-width: 420px) {
      min-width: 100px;
      h1 {
        font-size: 1.5rem;
      }
    }
  `,
  HeaderContaineCenter: styled.div``,
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
      flex: none;
      font-weight: bold;
      margin: 0 0.8rem;
      font-size: 1.3rem;
      position: relative;
      list-style: none;
      min-width: 65px;
    }

    .active {
      background-color: #f1f3f5;
      li {
      }
    }
  `
};

const delta = 2;
let lastScrollTop = 0;
let fixBox;
let fixBoxHeight = 0;
const isServer = typeof window === 'undefined';
const Appbar = () => {
  const dispatch = useDispatch();
  const isMobileWebViewOpen = useSelector(
    (state: RootState) => state.common.isMobileWebViewOpen
  );
  const router = useRouter();
  const { isMobileSize } = useWindowSize();
  const [isScrollDown, setIsScrollDown] = useState(false);
  const links = [{ name: 'Search', path: '/search' }];
  const didScroll = useRef(false);
  const handleOpenMobileMenu = () => {
    dispatch(commonActions.setIsMobileMenuListOpen(null));
  };

  const isMainPage = router.pathname === '/';

  const onScroll = () => {
    didScroll.current = true;
  };
  const hasScrolled = () => {
    if (isServer) {
      return;
    }
    const nowScrollTop = window.scrollY;

    if (Math.abs(lastScrollTop - nowScrollTop) <= delta) {
      return;
    }
    if (nowScrollTop > lastScrollTop && nowScrollTop > fixBoxHeight) {
      //Scroll down
      console.log('scroll down');
      setIsScrollDown(true);
    } else {
      console.log('scroll up');
      setIsScrollDown(false);
    }
    lastScrollTop = nowScrollTop;
  };

  useEffect(() => {
    fixBox = document.querySelector('#search-app-bar') as HTMLElement;
    if (fixBox) {
      fixBoxHeight = fixBox.offsetHeight;
    }
    window.addEventListener('scroll', onScroll);
    setInterval(() => {
      if (didScroll.current) {
        hasScrolled();
        didScroll.current = false;
      }
    }, 250);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [router.query]);

  console.log('router.asPath ', router.asPath);
  return (
    <St.AppbarWrapper id="search-app-bar" isScrollDown={isScrollDown}>
      <St.HeaderContainerLeft className="header-container-left flex">
        <Link href={'/'}>
          <St.HeaderContainerLogoWrapper className="flex-center">
            <h1>CVS-GURU</h1>
            {/* <img src="/static/images/logo.png" alt="logo" /> */}
          </St.HeaderContainerLogoWrapper>
        </Link>
      </St.HeaderContainerLeft>
      {!isMainPage && (
        <div className="flex-row" style={{ width: '100%' }}>
          <SearchInput size="small" isPositionAppbar />
        </div>
      )}

      <St.HeaderContaineRight id="right">
        <St.HeaderLinkWrapper className="flex-center">
          {isMobileSize && (
            <div
              style={{ paddingRight: '10px' }}
              onClick={handleOpenMobileMenu}
            >
              {iconMap.MenuOutlined}
            </div>
          )}
          {!isMobileSize && (
            <>
              {ROUTING_PAGES.map((link) => {
                return (
                  <Link href={link.link}>
                    <li
                      style={{
                        color: router.asPath.includes(link.link)
                          ? '#a400d4'
                          : 'black'
                      }}
                    >
                      {link.title}
                    </li>
                  </Link>
                );
              })}
            </>
          )}
        </St.HeaderLinkWrapper>
      </St.HeaderContaineRight>
    </St.AppbarWrapper>
  );
};

export default Appbar;
