import { filterActions } from 'store/filter';
import iconMap from 'lib/iconMap';
import { useDispatch } from 'react-redux';
import { useSelector, RootState } from 'store';
import styled from 'styled-components';

type FilterOnOffProps = {
  isFilterSet: boolean;
};
type StyledButtonContainer = {
  isFilterSet: boolean;
};
const St = {
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

const FilterOnOff = ({ isFilterSet }: FilterOnOffProps) => {
  const dispatch = useDispatch();
  const handleFilterOpen = () => {
    dispatch(filterActions.setIsFilterOpen(!isFilterOpen));
  };
  const isFilterOpen = useSelector(
    (state: RootState) => state.filter.isFilterOpen,
  );
  return (
    <div>
      <St.ButtonContainer onClick={handleFilterOpen} isFilterSet={isFilterSet}>
        {iconMap['FilterOutlined']}
        <span>필터</span>
        {isFilterSet && (
          <span style={{ color: '#34c71a', paddingLeft: '2px' }}>
            {iconMap['CheckCircleFilled']}
          </span>
        )}
      </St.ButtonContainer>
    </div>
  );
};

export default FilterOnOff;
