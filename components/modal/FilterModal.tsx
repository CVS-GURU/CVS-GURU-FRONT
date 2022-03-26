import styled from 'styled-components';
import { Slider } from 'antd';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector, RootState } from 'store';
import FilterButton from 'components/contents/filter/FilterButton';
import { filterButtonDataList } from 'lib/staticData';
import { filterActions } from 'store/filter';
import { modalActions } from 'store/modal';

type StyledFilterWrapperProps = {
  isFilterOpen: boolean;
};
const St = {
  FilterWrapper: styled.div<StyledFilterWrapperProps>`
    background: ${(props) => props.theme.colors.primary};
    min-height: 100vh;
    transform: ${(props) =>
      props.isFilterOpen ? 'translateX(0);' : 'translateX(100%);'}
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
const FilterModal = ({ closeModal }) => {
  const modal = useSelector((state: RootState) => state.modal.modal);
  const isFilterOpen = useSelector(
    (state: RootState) => state.filter.isFilterOpen,
  );
  const dispatch = useDispatch();
  const [isFilterClose, setIsFilterClose] = useState(false);
  // 모달 오픈,close시
  useEffect(() => {
    if (modal.type === 'filter' && modal.open) {
      dispatch(filterActions.setIsFilterOpen(!isFilterOpen));
      return;
    }
  }, [modal.type, modal.open]);

  const handleCloseModal = () => {
    dispatch(filterActions.setIsFilterOpen(!isFilterOpen));
    setTimeout(() => {
      setIsFilterClose(true);
    }, 400);
  };

  useEffect(() => {
    if (!isFilterOpen && isFilterClose) {
      dispatch(modalActions.initModal());
      closeModal();
    }
  }, [isFilterOpen, isFilterClose]);

  return (
    <St.FilterWrapper isFilterOpen={isFilterOpen}>
      <div onClick={handleCloseModal}>x</div>
      {filterButtonDataList?.map((filterButtonData) => {
        return <FilterContainer filterButtonData={filterButtonData} />;
      })}
    </St.FilterWrapper>
  );
};

export default FilterModal;
