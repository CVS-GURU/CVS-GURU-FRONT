import styled from 'styled-components';
import RatingInput from 'components/contents/RatingInput';
import CommentList from 'components/contents/CommentList';
import { useQueryClient, useQuery, useMutation } from 'react-query';
import { getContentsDetail } from 'lib/api/contents';
import { makeQueryString, addComma } from 'lib/helpers';
import { useSelector, RootState } from 'store';
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
    margin: auto;
    img {
      width: 100%;
      height: 100%;
      background-size: cover;
    }
    @media (max-width: 420px) {
      min-width: 0;
    }
  `,
  RatingContainer: styled.div`
    margin: 15px 0;
    justify-content: left;
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
  ContentContainer: styled.div`
    @media (min-width: 600px) {
      display: flex;
      text-align: left;
    }
  `
};

type ContentDetailProps = {
  contentsId: string;
};
type contentsDetail = {
  ITEM_CATEGORY: string;
  ITEM_DESCRIPTION: null;
  ITEM_ID: string;
  ITEM_IMAGE: string;
  ITEM_NAME: string;
  ITEM_PRICE: string;
  STORE_KIND: string;
};
const ContentDetail = ({ contentsId }: ContentDetailProps) => {
  const { isLoading, error, data } = useQuery<any, Error>(
    'get-contents-detail',
    () =>
      getContentsDetail(
        `http://localhost:3031/api/item/get-item-detail?id=${contentsId}`
      ),
    { staleTime: 10000 }
  );
  const isMobileSizeRedux = useSelector(
    (state: RootState) => state.common.isMobileSize
  );
  //getItemComment

  console.log('ContentDetail = ', isLoading, data);

  return (
    <>
      <St.ContentDetailWrapper>
        <St.ContentTitle>
          {!isLoading && data?.CONTENTS[0]?.ITEM_NAME}
        </St.ContentTitle>
        <St.ContentContainer>
          <St.ImageContainer>
            {!isLoading && <img src={data?.CONTENTS[0]?.ITEM_IMAGE} alt="" />}
          </St.ImageContainer>
          <St.RatingContainer>
            <span className="rating">4.0</span>

            <span>뭐 나름 괜찮은데?</span>

            <span className="rating-description">
              {!isLoading && data?.CONTENTS[0]?.ITEM_DESCRIPTION}
            </span>
            <div style={{ margin: '20px 0' }}>
              가격 :
              <span className="rating-description">
                {!isLoading && addComma(data?.CONTENTS[0]?.ITEM_PRICE)}원
              </span>
            </div>
            <div style={{ marginBottom: '10px' }}>
              <span>
                [토핑이 2배!, 토핑 강조형 삼각김밥 시리즈 운영] 1. 기존 참치마요
                삼각김밥 대비 참치마요샐러드 2배 이상 토핑 적용
              </span>
            </div>
          </St.RatingContainer>
        </St.ContentContainer>
      </St.ContentDetailWrapper>
      <div>
        <RatingInput contentsId={contentsId} />
        <CommentList contentsId={contentsId} />
      </div>
    </>
  );
};

export default ContentDetail;
