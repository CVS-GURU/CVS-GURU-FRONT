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
  contentsInfo: {
    ITEM_NAME: string;
    ITEM_PRICE: string;
    ITEM_IMAGE: string;
  };
};
const ContentCard = ({ contentsInfo }: ContentCardProps) => {
  return (
    <St.ContentCardWrapper>
      <St.ImageContainer>
        <img src={contentsInfo.ITEM_IMAGE} alt="" />
      </St.ImageContainer>
      <div>
        <span style={{ fontSize: '18px', fontWeight: 800 }}>
          {contentsInfo.ITEM_NAME}
        </span>
      </div>
      <St.RatingContainer className="flex">
        <div className="flex-center">
          <span className="score">{contentsInfo.ITEM_PRICE}</span>
          <span className="icon">별</span>
          <span className="rating_count">(130)</span>
        </div>
      </St.RatingContainer>
    </St.ContentCardWrapper>
  );
};
export default ContentCard;
