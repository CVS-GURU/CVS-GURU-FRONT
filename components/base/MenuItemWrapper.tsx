import styled from 'styled-components';
import iconMap from 'lib/iconMap';
import { useDispatch } from 'react-redux';
import { commonActions } from 'store/common';
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
  MenuItem: styled.div`
    cursor: pointer;
    padding: 2rem;
    border-bottom: 1px solid;
  `,
};

const MenuItemWrapper = () => {
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(commonActions.setIsMobileMenuListOpen(false));
  };
  return (
    <St.MenuItemWrapper className="flex-column">
      <St.MenuItemWrapperTitle className="flex-center">
        <span>CVS-GURU</span>
        <span className="close" onClick={handleClose}>
          {iconMap.CloseOutlined}
        </span>
      </St.MenuItemWrapperTitle>

      <St.MenuItem>찾아보기</St.MenuItem>
      <St.MenuItem>Rank</St.MenuItem>
      <St.MenuItem>About</St.MenuItem>
    </St.MenuItemWrapper>
  );
};

export default MenuItemWrapper;
