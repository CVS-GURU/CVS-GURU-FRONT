import styled from 'styled-components';
import RatingInput from 'components/contents/RatingInput';
import Comment from 'components/contents/Comment';
import { useQueryClient, useQuery, useMutation } from 'react-query';
import { getContentsDetail } from 'lib/api/contents';
import { makeQueryString } from 'lib/helpers';
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
        `http://localhost:3031/api/item/get-item-detail?id=${contentsId}`,
      ),
  );

  return (
    <>
      <St.ContentDetailWrapper>
        <St.ContentTitle>
          {!isLoading && data.CONTENTS[0].ITEM_NAME}
        </St.ContentTitle>
        <St.ImageContainer>
          {!isLoading && <img src={data.CONTENTS[0].ITEM_IMAGE} alt=""></img>}
        </St.ImageContainer>
        <St.RatingContainer>
          <span className="rating">4.0</span>
          <span className="rating-description">
            {!isLoading && data.CONTENTS[0].ITEM_DESCRIPTION}
          </span>
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
