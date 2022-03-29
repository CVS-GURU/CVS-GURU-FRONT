import styled from 'styled-components';
import iconMap from 'lib/iconMap';
import Link from 'next/link';
import { addComma } from 'lib/helpers';
const St = {
  ContentCardWrapper: styled.div`
    cursor: pointer;
    padding: 2rem;
    border-radius: 8px;
    // border: 1px solid grey;
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
    .rating-icon {
      margin-right: 5px;
      margin-left: 2.5px;
      color: #ffd341;
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
    ITEM_ID: string;
    ITEM_NAME: string;
    ITEM_PRICE: string;
    ITEM_IMAGE: string;
  };
};
<span className="rating-icon"></span>;
const ContentCard = ({ contentsInfo }: ContentCardProps) => {
  return (
    <Link href={`/contents/${contentsInfo.ITEM_ID}`}>
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
            <span className="score">{addComma(contentsInfo.ITEM_PRICE)}원</span>
            <span className="icon">{iconMap.StarFilled}</span>
            <span className="rating_count">(130)</span>
          </div>
        </St.RatingContainer>
      </St.ContentCardWrapper>
    </Link>
  );
};
export default ContentCard;
