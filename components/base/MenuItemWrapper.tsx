import styled from 'styled-components';

const St = {
  MenuItemWrapper: styled.div`
    min-height: 100vh;
    height: 100%;
  `,
};

const MenuItemWrapper = () => {
  return (
    <St.MenuItemWrapper className="flex-column">
      <div>찾아보기</div>
      <div>Rank</div>
      <div>About</div>
    </St.MenuItemWrapper>
  );
};

export default MenuItemWrapper;
