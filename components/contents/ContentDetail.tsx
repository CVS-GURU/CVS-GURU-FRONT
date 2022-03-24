import styled from 'styled-components';
import RatingInput from 'components/contents/RatingInput';
import Comment from 'components/contents/Comment';
const St = {
  ContentDetailWrapper: styled.div`
    padding: 2rem;
    border-bottom: 1px solid grey;
  `,
  ContentTitle: styled.div`
    font-size: 4rem;
    font-weight: 800;
  `,
  ImageContainer: styled.div`
    min-width: 400px;
    max-width: 500px;
    img {
      width: 100%;
      height: 100%;
      background-size: cover;
    }
  `,
  RatingContainer: styled.div`
    .rating {
      color: #ff4b21;
      font-size: 4rem;
      font-weight: 800;
      padding-right: 1rem;
    }
    .rating-description {
      font-size: 3.3rem;
      font-weight: 800;
    }
  `,
};
const ContentDetail = () => {
  return (
    <>
      <St.ContentDetailWrapper>
        <St.ContentTitle>주) 토핑 2배 참치마요</St.ContentTitle>
        <St.ImageContainer>
          <img
            src="http://bgf-cu.xcache.kinxcdn.com/product/8801019610110.jpg"
            alt=""
          ></img>
        </St.ImageContainer>
        <St.RatingContainer>
          <span className="rating">4.0</span>
          <span className="rating-description">뭐, 나름 괜찮은데</span>
        </St.RatingContainer>
      </St.ContentDetailWrapper>
      <div>
        <RatingInput />
        <Comment />
      </div>
    </>
  );
};

export default ContentDetail;
