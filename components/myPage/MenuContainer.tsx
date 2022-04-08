import styled from 'styled-components';
import iconMap from 'lib/iconMap';
import { useDispatch } from 'react-redux';
import { useSelector, RootState } from 'store';
import { commonActions } from 'store/common';

const St = {
  Wrapper: styled.div``,
  MenuContainer: styled.div`
    padding: 1rem 0;
    cursor: pointer;
  `,
  IconContainer: styled.div`
    font-size: 150%;
    padding: 1rem;
  `,
  IconTextContainer: styled.div`
    font-size: 1rem;
    padding: 1rem;
  `,
};

const MenuContainer = () => {
  const dispatch = useDispatch();
  const isMobileWebViewOpen = useSelector(
    (state: RootState) => state.common.isMobileWebViewOpen,
  );
  const MenuOpen = () => {
    dispatch(commonActions.setIsMobileWebViewOpen(true));
  };

  return (
    <St.Wrapper className="flex-center">
      <St.MenuContainer onClick={MenuOpen}>
        <St.IconContainer className="flex-center">
          {iconMap.HeartOutlined}
        </St.IconContainer>
        <St.IconTextContainer className="flex-center">
          좋아요 한 후기
        </St.IconTextContainer>
      </St.MenuContainer>
      <St.MenuContainer>
        <St.IconContainer className="flex-center">
          {iconMap.SearchOutlined}
        </St.IconContainer>
        <St.IconTextContainer className="flex-center">
          최근 검색한 내역
        </St.IconTextContainer>
      </St.MenuContainer>
      <St.MenuContainer>
        <St.IconContainer className="flex-center">
          {iconMap.CommentOutlined}
        </St.IconContainer>
        <St.IconTextContainer className="flex-center">
          내가 남긴 코멘트
        </St.IconTextContainer>
      </St.MenuContainer>
    </St.Wrapper>
  );
};

export default MenuContainer;
