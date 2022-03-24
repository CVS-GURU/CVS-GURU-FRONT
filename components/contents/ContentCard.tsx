import styled from 'styled-components';

const St = {
  ContentCardWrapper: styled.div`
    padding: 2rem;
    border-radius: 8px;
    border: 1px solid grey;
  `,
  ImageContainer: styled.div`
    img {
      width: 100%;
      height: 100%;
      background-size: cover;
    }
  `,
  RatingContainer: styled.div`
    padding: 1rem 0;
    span {
      padding: 0 2px;
    }
    .score {
      font-weight: 700;
    }
    .icon {
      color: voilet;
    }
    .rating_count {
      font-size: 1.2rem;
      color: grey;
      font-weight: 700;
    }
  `,
};

type ContentCardProps = {
  contentsId: string;
  image_path: string;
  title: string;
  description?: string;
  rating: string;
  review_count: number;
};
const ContentCard = (contentsInfo: ContentCardProps) => {
  return (
    <St.ContentCardWrapper>
      <St.ImageContainer>
        <img
          src="http://bgf-cu.xcache.kinxcdn.com/product/8801019610110.jpg"
          alt=""
        />
      </St.ImageContainer>
      <div>
        <span style={{ fontSize: '18px', fontWeight: 800 }}>
          주) 토핑 2배 참치마요
        </span>
      </div>
      <St.RatingContainer className="flex">
        <div className="flex-center">
          <span className="score">4.5</span>
          <span className="icon">별</span>
          <span className="rating_count">(130)</span>
        </div>
      </St.RatingContainer>
    </St.ContentCardWrapper>
  );
};
export default ContentCard;
