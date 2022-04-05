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
import FilterOnOff from 'components/contents/filter/FilterOnOff';

const St = {
  ContentWrapper: styled.div`
    padding: 1rem;
  `,

  InfoBoxWrapper: styled.div`
    padding-top: 1em;
    justify-content: center;
    width: 100%;
    font-size: 2.5rem;
    font-weight: 900;
  `,
};

type ContentsResponse = {
  HITS: number;
  CONTENTS: Contents[];
};

const InfoBox = () => {
  return <div></div>;
};
const ContentsComponent = ({ query }: any) => {
  const router = useRouter();
  const [isFilterSet, setIsFilterSet] = useState(false);
  const [url, setUrl] = useState('http://localhost:3031/api/item/get-items');
  const isContentsFullPage = useSelector(
    (state: RootState) => state.common.isContentsFullPage,
  );
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
    [`get-contents-${url}`],
    () => getContents(url),
    { staleTime: 10000 },
  );
  console.log('isLoading=', isLoading, ' data ', data);
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
  console.log('isLoading = ', isLoading);
  console.log('[seo] url data = ', url, data);

  const ContentCardList = useMemo(() => {
    if (data && data?.CONTENTS.length === 0) {
      return (
        <Col span={isContentsFullPage ? 8 : 12} key={`content.ITEM_IMAGE-none`}>
          <div style={{ paddingTop: '1em' }}>'검색된 결과가 없어용'</div>
        </Col>
      );
    }
    return (
      <>
        {data &&
          data?.CONTENTS?.map((content, index) => (
            <Col
              span={isContentsFullPage ? 8 : 12}
              key={`content.ITEM_IMAGE-${index}`}
            >
              <div style={{ paddingTop: '1em' }}>
                <ContentCard contentsInfo={content} />
              </div>
            </Col>
          ))}
      </>
    );
  }, [data]);

  return (
    <St.ContentWrapper>
      <div style={{ marginTop: '100px' }}>
        <FilterOnOff isFilterSet={isFilterSet} />
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
        {!data &&
          Array.from({ length: DEFAULT_PAGE_COUNT }).map((_, index) => (
            <Col
              span={isContentsFullPage ? 8 : 12}
              key={`content.ITEM_IMAGE-${index}`}
            >
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
        {ContentCardList}
      </Row>
      <div className="flex-center">
        <Pagination query={query} totalCount={data?.HITS ? data.HITS : 0} />
      </div>
    </St.ContentWrapper>
  );
};

export default ContentsComponent;
