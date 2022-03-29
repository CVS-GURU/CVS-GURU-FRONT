import styled from 'styled-components';
import NormalSlider from 'components/common/slider/NormalSlider';
import SearchInput from 'components/common/SearchInput';
import RankTrand from 'components/home/RankTrand';
import CVSViewer from 'components/home/CVSViewer';
import CategoryViewer from 'components/home/CategoryViewer';
import Description from 'components/home/Description';
const St = {
  MainDisplayContainer: styled.div`
    position: relative;
  `,
  MainImageContainer: styled.div`
    height: 400px;
    img {
      width: 100%;
      background: cover;
    }
    margin: 2rem 0;
  `,

  TextContainer: styled.div`
    // position: absolute;
    top: 0;
    p {
      padding: 0.5rem;
      font-size: 32px;
      font-weight: 900;
      margin-bottom: 0.5rem;
    }
    margin: 2rem 0;
  `,
};

const Home = () => {
  return (
    <div>
      <SearchInput />
      <St.MainDisplayContainer>
        {/* <St.MainImageContainer style={{ height: '300px' }}>
          <img src="/static/images/home/main.jpg" style={{ width: '100%' }} />
        </St.MainImageContainer> */}
        <St.TextContainer>
          <p>좀 맛있게 먹어보자!</p>
          <p>당신의 편의점 레전드를 검색해보세요</p>
          <p>다른 사람은 어떻게 생각하는지 생각해봐요</p>
          <p>평가를 해보세요</p>
          <p>당신의 편의점 선생</p>
          <p>편의점 그루</p>
        </St.TextContainer>
        <RankTrand />
        <CVSViewer />
        <Description />
        <CategoryViewer />
      </St.MainDisplayContainer>

      <NormalSlider />
    </div>
  );
};

export default Home;
