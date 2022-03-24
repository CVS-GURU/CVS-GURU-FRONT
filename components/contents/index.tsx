import { Row, Col } from 'antd';
import Card from 'components/contents/ContentCard';
import FilterButton from 'components/contents/filter/FilterButton';
import { useDispatch } from 'react-redux';
import { useSelector, RootState } from 'store';
import { filterActions } from 'store/filter';
import Filter from 'components/contents/filter/Filter';

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
  const isFilterOpen = useSelector(
    (state: RootState) => state.filter.isFilterOpen,
  );
  const dispatch = useDispatch();
  const handleFilterOpen = () => {
    console.log('isFilterOpen= ', isFilterOpen);
    dispatch(filterActions.setIsFilterOpen(!isFilterOpen));
  };
  const handleFilterButtonClick = () => {};
  return (
    <>
      <Filter />
      <div>
        <button onClick={handleFilterOpen} type="button">
          필터
        </button>
        <div className="flex-space-between">
          <FilterButton title="많은 후기순" />
          <FilterButton title="인기순" />
          <FilterButton title="가격 많은 순" />
          <FilterButton title="가격 높은 순" />
        </div>
      </div>

      <Row gutter={[16, 16]}>
        {testArray?.map((contents) => {
          return (
            <Col span={12} key={contents.contentesId}>
              <div style={{ padding: '1em' }}>
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
