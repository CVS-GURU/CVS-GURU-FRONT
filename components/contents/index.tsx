import { useState, useEffect } from 'react';
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
import { makeQueryString, makeUrl } from 'lib/helpers';
import { Contents } from 'types';
import { DEFAULT_PAGE_NO, DEFAULT_PAGE_COUNT } from 'lib/staticData';
import Pagination from 'components/common/Pagination';

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

type ContentsResponse = {
  HITS: number;
  CONTENTS: Contents[];
};

const ContentsComponent = ({ query }: any) => {
  const router = useRouter();
  const [url, setUrl] = useState('http://localhost:3031/api/item/get-items');
  const isFilterOpen = useSelector(
    (state: RootState) => state.filter.isFilterOpen,
  );
  const dispatch = useDispatch();
  const handleFilterOpen = () => {
    dispatch(filterActions.setIsFilterOpen(!isFilterOpen));
  };
  const handleFilterButtonClick = (value: string) => {
    let url = '';
    if (query['sort'] === value) url = makeUrl({ ...query, sort: '' }, '');
    else url = makeUrl({ ...query, sort: value }, '');
    setUrl(url);
    router.push(url);
  };
  useEffect(() => {
    //price
    const url = makeUrl(query, 'http://localhost:3031/api/item/get-items');
    setUrl(url);
  }, [query]);

  console.log('url=', url);
  const { isLoading, error, data } = useQuery<ContentsResponse, Error>(
    'get-contents',
    () => getContents(url),
  );

  //const queryClient = useQueryClient();

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
            isSelected={'review' === query['sort']}
            title="많은 후기순"
            handleFilterButtonClick={handleFilterButtonClick}
            value="review"
          />
          <FilterButton
            isSelected={'most' === query['sort']}
            title="인기순"
            value="most"
            handleFilterButtonClick={handleFilterButtonClick}
          />
          <FilterButton
            isSelected={'high' === query['sort']}
            title="가격 높은 순"
            value="high"
            handleFilterButtonClick={handleFilterButtonClick}
          />
          <FilterButton
            isSelected={'low' === query['sort']}
            title="가격 낮은 순"
            value="low"
            handleFilterButtonClick={handleFilterButtonClick}
          />
        </div>
      </div>

      <Row gutter={[16, 16]}>
        {isLoading &&
          Array.from({ length: DEFAULT_PAGE_COUNT }).map((_, index) => (
            <Col span={12} key={`content.ITEM_IMAGE-${index}`}>
              <div style={{ paddingTop: '1em' }}>
                <ContentCard isLoading />
              </div>
            </Col>
          ))}

        {data &&
          data.CONTENTS?.map((content, index) => {
            return (
              <Col span={12} key={`content.ITEM_IMAGE-${index}`}>
                <div style={{ paddingTop: '1em' }}>
                  <ContentCard contentsInfo={content} />
                </div>
              </Col>
            );
          })}
      </Row>
      <div className="flex-center">
        <Pagination query={query} totalCount={data?.HITS ? data.HITS : 0} />
      </div>
    </St.ContentWrapper>
  );
};

export default ContentsComponent;
