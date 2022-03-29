import { Row, Col } from 'antd';
import Card from 'components/contents/ContentCard';
import FilterButton from 'components/contents/filter/FilterButton';
import { useDispatch } from 'react-redux';
import { useSelector, RootState } from 'store';
import { filterActions } from 'store/filter';
import { modalActions } from 'store/modal';
import iconMap from 'lib/iconMap';
import Filter from 'components/contents/filter/Filter';
import styled from 'styled-components';
import { getContents } from 'lib/api/contents';
import { useRouter } from 'next/router';
import { useQueryClient, useQuery, useMutation } from 'react-query';
const St = {
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

const item = {
  contentesId: '',
  image_path: '',
  title: '',
  description: '',
  rating: '4.5',
  review_count: 130,
};

const testArray = [item, item, item, item];
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
  const { isLoading, error, data } = useQuery<any[], Error>(
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
    <>
      <div>
        <St.ButtonContainer onClick={handleFilterOpen}>
          {iconMap['FilterOutlined']}
          <span>필터</span>
        </St.ButtonContainer>
        <div className="flex">
          <FilterButton
            title="많은 후기순"
            handleFilterButtonClick={handleFilterButtonClick}
            id="review"
          />
          <FilterButton
            title="인기순"
            id="most"
            handleFilterButtonClick={handleFilterButtonClick}
          />
          <FilterButton
            title="가격 많은 순"
            id="high"
            handleFilterButtonClick={handleFilterButtonClick}
          />
          <FilterButton
            title="가격 높은 순"
            id="low"
            handleFilterButtonClick={handleFilterButtonClick}
          />
        </div>
      </div>

      <Row gutter={[16, 16]}>
        {data.data &&
          data.data?.map((contents) => {
            return (
              <Col span={12} key={contents.contentesId}>
                <div style={{ paddingTop: '1em' }}>
                  <Card contentsInfo={contents} />
                </div>
              </Col>
            );
          })}
      </Row>
    </>
  );
};

export default Contents;
