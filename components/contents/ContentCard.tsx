import styled from 'styled-components';
import iconMap from 'lib/iconMap';
import Link from 'next/link';
import { addComma } from 'lib/helpers';
import { Contents } from 'types';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

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
      padding: 0 4px 0 0;
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
  isLoading?: boolean;
  contentsInfo?: Contents;
};

function ImageSkeletonWrapper({ children }: any) {
  return (
    <div
      style={{
        display: 'inline-block',
        width: '200px',
        height: '200px',
      }}
    >
      {children}
    </div>
  );
}
const ContentCard = ({ isLoading, contentsInfo }: ContentCardProps) => {
  return (
    <Link href={`/contents/${contentsInfo?.ITEM_ID}`}>
      <St.ContentCardWrapper>
        {isLoading && <Skeleton wrapper={ImageSkeletonWrapper} height="100%" />}
        <St.ImageContainer>
          <img src={contentsInfo?.ITEM_IMAGE} alt="" />
        </St.ImageContainer>
        <div className="flex-center">
          <span style={{ fontSize: '18px', fontWeight: 800 }}>
            {isLoading && <Skeleton width={70} />}
            {contentsInfo?.ITEM_NAME}
          </span>
        </div>
        <St.RatingContainer className="flex-center">
          <div className="flex-center">
            <span className="score">
              {isLoading ? (
                <Skeleton width={50} />
              ) : (
                addComma(
                  contentsInfo?.ITEM_PRICE ? contentsInfo?.ITEM_PRICE : '0',
                )
              )}
            </span>
            <span className="icon">
              {isLoading ? <Skeleton width={15} /> : iconMap.StarFilled}
            </span>
            <span className="rating_count">
              {(isLoading && <Skeleton width={30} />) || '(130)'}
            </span>
          </div>
        </St.RatingContainer>
      </St.ContentCardWrapper>
    </Link>
  );
};
export default ContentCard;
