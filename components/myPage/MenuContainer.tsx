import styled from 'styled-components'
import iconMap from 'lib/iconMap'
import { useDispatch } from 'react-redux'
import { useSelector, RootState } from 'store'
import { commonActions } from 'store/common'

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
  `
}

const MenuContainer = () => {
  const dispatch = useDispatch()
  const isMobileSize = useSelector(
    (state: RootState) => state.common.isMobileSize
  )

  const MenuOpen = (menuName: string, key: string) => {
    if (isMobileSize) {
      dispatch(commonActions.setWebviewPage(menuName))
      dispatch(commonActions.setIsMobileWebViewOpen(true))
      return
    }
    dispatch(commonActions.setMyPageTabkey(key))
  }

  return (
    <St.Wrapper className="flex-center">
      <St.MenuContainer onClick={() => MenuOpen('like-review', '1')}>
        <St.IconContainer className="flex-center">
          {iconMap.HeartOutlined}
        </St.IconContainer>
        <St.IconTextContainer className="flex-center">
          좋아요 한 후기
        </St.IconTextContainer>
      </St.MenuContainer>
      <St.MenuContainer onClick={() => MenuOpen('recent-search', '2')}>
        <St.IconContainer className="flex-center">
          {iconMap.SearchOutlined}
        </St.IconContainer>
        <St.IconTextContainer className="flex-center">
          최근 검색한 내역
        </St.IconTextContainer>
      </St.MenuContainer>
      <St.MenuContainer onClick={() => MenuOpen('my-comment', '3')}>
        <St.IconContainer className="flex-center">
          {iconMap.CommentOutlined}
        </St.IconContainer>
        <St.IconTextContainer className="flex-center">
          내가 남긴 코멘트
        </St.IconTextContainer>
      </St.MenuContainer>
    </St.Wrapper>
  )
}

export default MenuContainer
