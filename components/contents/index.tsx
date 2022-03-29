import { Row, Col } from 'antd';
import ContentCard from 'components/contents/ContentCard';
import FilterButton from 'components/contents/filter/FilterButton';
import { useDispatch } from 'react-redux';
import { useSelector, RootState } from 'store';
import { filterActions } from 'store/filter';
import iconMap from 'lib/iconMap';
import styled from 'styled-components';
import { getContents } from 'lib/api/contents';
import { useRouter } from 'next/router';
import { useQueryClient, useQuery, useMutation } from 'react-query';

const St = {
  ContentWrapper: styled.div`
    padding: 1rem;
  `,
  ButtonContainer: styled.div`
    cursor: pointer;
    flex-wrap: wrap;
    display: flex;
    padding: 10px;
    border: 2px solid black;
    width: 80px;
    border-radius: 8px;
    font-weight: bold;
  `,
};
type Contents = {
  ITEM_IMAGE: string;
  ITEM_NAME: string;
  ITEM_PRICE: string;
};
type ContentsResponse = {
  HITS: number;
  CONTENTS: Contents[];
};

const Contents = ({ query }: any) => {
  const router = useRouter();
  const isFilterOpen = useSelector(
    (state: RootState) => state.filter.isFilterOpen,
  );
  const dispatch = useDispatch();
  const handleFilterOpen = () => {
    dispatch(filterActions.setIsFilterOpen(!isFilterOpen));
  };
  const handleFilterButtonClick = (id: string) => {
    console.log('id = ', id);
    router.push(`/contents?order=${id}`);
  };
  const queryClient = useQueryClient();
  const url =
    'http://localhost:3031/api/item/get-item-with-price?from=3000&to=4000';
  const { isLoading, error, data } = useQuery<ContentsResponse, Error>(
    'get-contents',
    () => getContents(url),
  );

  // query 안에 data, isLoading, isSuccess, isError 등 다양한게 있다.
  // const mutation = useMutation(() => getContents(url), {
  //   onMutate: (data: any) => {
  //     const previousValue = queryClient.getQueryData('get-contents');
  //     console.log('previousValue', data);
  //     queryClient.setQueryData('get-contents', (old: any) => {
  //       console.log('old', old);
  //       return [...old, data];
  //     });

  //     return previousValue;
  //   },
  //   onSuccess: (result, variables, context) => {
  //     console.log('성공 메시지:', result);
  //     console.log('변수', variables);
  //     console.log('onMutate에서 넘어온 값', context);
  //       setUserId(userId + 1);
  //   },
  // });
  if (isLoading) return <div>Loading</div>;
  if (error) return <div>'An error has occurred: ' + error?.message;</div>;
  console.log('data = ', data);
  return (
    <St.ContentWrapper>
      <div>
        <St.ButtonContainer onClick={handleFilterOpen}>
          {iconMap['FilterOutlined']}
          <span>필터</span>
        </St.ButtonContainer>
        <div className="flex">
          <FilterButton
            isSelected={'review' === query['order']}
            title="많은 후기순"
            handleFilterButtonClick={handleFilterButtonClick}
            value="review"
          />
          <FilterButton
            isSelected={'most' === query['order']}
            title="인기순"
            value="most"
            handleFilterButtonClick={handleFilterButtonClick}
          />
          <FilterButton
            isSelected={'high' === query['order']}
            title="가격 많은 순"
            value="high"
            handleFilterButtonClick={handleFilterButtonClick}
          />
          <FilterButton
            isSelected={'low' === query['order']}
            title="가격 높은 순"
            value="low"
            handleFilterButtonClick={handleFilterButtonClick}
          />
        </div>
      </div>

      <Row gutter={[16, 16]}>
        {data &&
          data.CONTENTS?.map((content, index) => {
            return (
              <Col span={12} key={content.ITEM_IMAGE}>
                <div style={{ paddingTop: '1em' }}>
                  <ContentCard contentsInfo={content} />
                </div>
              </Col>
            );
          })}
      </Row>
    </St.ContentWrapper>
  );
};

export default Contents;
