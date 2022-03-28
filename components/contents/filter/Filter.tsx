import styled from 'styled-components';
import { useRouter } from 'next/router';
import { Slider } from 'antd';
import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector, RootState } from 'store';
import FilterButton from 'components/contents/filter/FilterButton';
import { filterButtonDataList } from 'lib/staticData';
import { filterActions } from 'store/filter';
import iconMap from 'lib/iconMap';

type StyledFilterWrapperProps = {
  isFilterOpen: boolean;
  isFilterClose: boolean;
};
const St = {
  FilterWrapper: styled.div<StyledFilterWrapperProps>`
    display : ${(props) => (props.isFilterClose ? 'none' : '')};
    width :100%;
    height :100%;
    position: fixed;
    z-index:2;
    background: ${(props) => props.theme.colors.primary};
    min-height: 100vh;
    transform: ${(props) =>
      props.isFilterOpen ? 'translateX(0%);' : 'translateX(100%);'}
    transition: 0.4s all;
  `,
  FilterContainer: styled.div`
    padding: 2rem;
    border-bottom: 1px solid grey;
  `,
  FilterTitle: styled.div`
    font-weight: bold;
    font-size: 1.8rem;
  `,
  FilterButtonContainer: styled.div``,
};

type FilterButtonData = {
  buttonTitle: string;
};
type FilterContainerProps = {
  filterButtonData: {
    title: string;
    type: string;
    buttonData: FilterButtonData[];
  };
};

const FilterContainer = ({ filterButtonData }: FilterContainerProps) => {
  const [rating, setRating] = useState([0, 5]);
  const handleSilder = (value: [number, number]) => {
    setRating(value);
  };
  const router = useRouter();

  if (filterButtonData.type === 'silder') {
    return (
      <St.FilterContainer>
        <St.FilterTitle>{filterButtonData.title}</St.FilterTitle>
        <St.FilterButtonContainer>
          <Slider range min={0} max={5} onChange={handleSilder} />
          <FilterButton title={rating?.toString()} />
        </St.FilterButtonContainer>
      </St.FilterContainer>
    );
  }
  return (
    <St.FilterContainer>
      <St.FilterTitle>{filterButtonData.title}</St.FilterTitle>
      <St.FilterButtonContainer className="flex-row">
        {filterButtonData.buttonData.map((buttonData) => {
          return <FilterButton title={buttonData.buttonTitle} />;
        })}
      </St.FilterButtonContainer>
    </St.FilterContainer>
  );
};
const Filter = () => {
  const filterWrapperRef = useRef(null);
  const isFilterOpen = useSelector(
    (state: RootState) => state.filter.isFilterOpen,
  );
  const [isFilterClose, setIsFilterClose] = useState(false);
  const dispatch = useDispatch();

  const handleFilterClose = () => {
    dispatch(filterActions.setIsFilterOpen(false));
  };

  return (
    <St.FilterWrapper
      ref={filterWrapperRef}
      isFilterOpen={isFilterOpen}
      isFilterClose={isFilterClose}
    >
      <div
        onClick={handleFilterClose}
        style={{ padding: '2rem', cursor: 'pointer' }}
      >
        {iconMap['LeftOutlined']}
      </div>
      {filterButtonDataList?.map((filterButtonData, index) => {
        return (
          <FilterContainer filterButtonData={filterButtonData} key={index} />
        );
      })}
    </St.FilterWrapper>
  );
};

export default Filter;
