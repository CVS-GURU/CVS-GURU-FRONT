import { useCallback, useState, useEffect, useMemo } from 'react';
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

type StyledButtonContainer = {
  isFilterSet: boolean;
};
const St = {
  ContentWrapper: styled.div`
    padding: 1rem;
  `,
  ButtonContainer: styled.div<StyledButtonContainer>`
    background: ${(props) => (props.isFilterSet ? '#080012' : '')};
    color: ${(props) => (props.isFilterSet ? 'white' : '')};

    cursor: pointer;
    flex-wrap: wrap;
    display: flex;
    padding: 10px;
    border: 2px solid black;
    width: ${(props) => (props.isFilterSet ? '94px' : '80px')};
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
  const [isFilterSet, setIsFilterSet] = useState(false);
  const [url, setUrl] = useState('http://localhost:3031/api/item/get-items');
  const isFilterOpen = useSelector(
    (state: RootState) => state.filter.isFilterOpen,
  );
  const dispatch = useDispatch();
  const handleFilterOpen = () => {
    dispatch(filterActions.setIsFilterOpen(!isFilterOpen));
  };
  const handleFilterButtonClick = useCallback(
    (value: string) => {
      let url = '';
      if (query['sort'] === value) url = makeUrl({ ...query, sort: '' }, '');
      else url = makeUrl({ ...query, sort: value }, '');
      setUrl(url);
      router.push(url);
    },
    [router, query],
  );
  useEffect(() => {
    const url = makeUrl(query, 'http://localhost:3031/api/item/get-items');
    setUrl(url);
  }, [query]);

  console.log('url=', url, ' query ', query);
  const { isLoading, error, data } = useQuery<ContentsResponse, Error>(
    'get-contents',
    () => getContents(url),
    { staleTime: 1000 },
  );

  useEffect(() => {
    const judgedFilter = () => {
      if (
        query['category'] ||
        query['price'] ||
        query['rating'] ||
        query['cvs']
      )
        return true;
      else return false;
    };
    setIsFilterSet(judgedFilter);
  }, [query]);

  if (error) return <div>'An error has occurred: ' + error?.message;</div>;
  console.log('[seo] url data = ', url, data);

  // const ContentCardList = useMemo(
  //   () => (
  //     <>
  //       {data &&
  //         data.CONTENTS?.map((content, index) => (
  //           <Col span={12} key={`content.ITEM_IMAGE-${index}`}>
  //             <div style={{ paddingTop: '1em' }}>
  //               <ContentCard contentsInfo={content} />
  //             </div>
  //           </Col>
  //         ))}
  //     </>
  //   ),
  //   [data],
  // );

  return (
    <St.ContentWrapper>
      <div>
        <St.ButtonContainer
          onClick={handleFilterOpen}
          isFilterSet={isFilterSet}
        >
          {iconMap['FilterOutlined']}
          <span>필터</span>
          {isFilterSet && (
            <span style={{ color: '#34c71a', paddingLeft: '2px' }}>
              {iconMap['CheckCircleFilled']}
            </span>
          )}
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

        {/* {data &&
          data.CONTENTS?.map((content, index) => (
            <Col span={12} key={`content.ITEM_IMAGE-${index}`}>
              <div style={{ paddingTop: '1em' }}>
                <ContentCard contentsInfo={content} />
              </div>
            </Col>
          ))} */}
      </Row>
      <div className="flex-center">
        <Pagination query={query} totalCount={data?.HITS ? data.HITS : 0} />
      </div>
    </St.ContentWrapper>
  );
};

export default ContentsComponent;
