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
import { useRouter } from 'next/router';

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
const Contents = () => {
  const router = useRouter();
  const isFilterOpen = useSelector(
    (state: RootState) => state.filter.isFilterOpen,
  );
  const dispatch = useDispatch();
  const handleFilterOpen = () => {
    dispatch(filterActions.setIsFilterOpen(!isFilterOpen));
  };
  const handleFilterButtonClick = (id: string) => {
    router.push(`/contents?order=${id}`);
  };
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
        {testArray?.map((contents) => {
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
