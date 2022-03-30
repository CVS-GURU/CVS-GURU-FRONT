import styled from 'styled-components';
import iconMap from 'lib/iconMap';
import { useDispatch } from 'react-redux';
import { commonActions } from 'store/common';
import { useRouter } from 'next/router';
import Link from 'next/link';

type StyledMenuItemProps = {
  isSelected: boolean;
};
const St = {
  MenuItemWrapper: styled.div`
    min-height: 100vh;
    height: 100%;
    font-weight: 900;
  `,
  MenuItemWrapperTitle: styled.div`
    position: relative;
    padding: 2rem;
    box-shadow: 0 -2px 12px 0 rgb(0 0 0 / 6%), 0 -1px 4px 0 rgb(0 0 0 / 18%);
    .close {
      position: absolute;
      right: 10px;
      cursor: pointer;
    }
  `,
  MenuItem: styled.div<StyledMenuItemProps>`
    cursor: pointer;
    padding: 2rem;
    border-bottom: 1px solid;
    a {
      text-decoration: none;
      color: black;
    }
  `,
};

const MenuItemWrapper = () => {
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(commonActions.setIsMobileMenuListOpen(false));
  };
  const router = useRouter();

  return (
    <St.MenuItemWrapper className="flex-column">
      <St.MenuItemWrapperTitle className="flex-center">
        <span>CVS-GURU</span>
        <span className="close" onClick={handleClose}>
          {iconMap.CloseOutlined}
        </span>
      </St.MenuItemWrapperTitle>

      <St.MenuItem isSelected={router.asPath === '/'}>
        <Link href="/">HOME</Link>
      </St.MenuItem>
      <St.MenuItem isSelected={router.asPath === '/contents'}>
        <Link href="/contents">찾아보기</Link>
      </St.MenuItem>
      <St.MenuItem isSelected={router.asPath === '/rank'}>
        <Link href="/rank">Rank</Link>
      </St.MenuItem>
      <St.MenuItem isSelected={router.asPath === '/about'}>
        <Link href="/about">About</Link>
      </St.MenuItem>
    </St.MenuItemWrapper>
  );
};

export default MenuItemWrapper;
