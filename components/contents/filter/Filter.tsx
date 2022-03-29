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
import { makeQueryString, getSessionStorage } from 'lib/helpers';

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
  value: string;
};
type FilterContainerProps = {
  filterButtonData: {
    title: string;
    paramKey: string;
    type: string;
    buttonDatas: FilterButtonData[];
  };
};

const FilterContainer = ({ filterButtonData }: FilterContainerProps) => {
  const [rating, setRating] = useState([0, 5]);
  const handleSilder = (value: [number, number]) => {
    setRating(value);
  };
  const router = useRouter();
  const query = router.query;
  const paramkey = filterButtonData.paramKey;

  const handleFilterButtonClick = (value: string) => {
    /* 복수 선택 가능하게  */
    if (paramkey === 'category' || paramkey === 'cvs') {
      const queryCvs = query[paramkey] as string;
      if (queryCvs) {
        let array = queryCvs.split(',');
        //해당 어레이에 같은게 있는지 검사 할것
        const isExist = array.includes(value);
        // 같은게 있으면 제거
        if (isExist) array = array.filter((item) => item !== value);
        // 같은게 없으면 추가
        else array.push(value);
        const params = array.join();
        let filterParams = { ...query, [paramkey]: params };
        const url = makeQueryString('', filterParams);
        router.push(url);
      } else {
        let filterParams = { ...query, [paramkey]: value };
        const url = makeQueryString('', filterParams);
        router.push(url);
      }

      return;
    }

    let filterParams = {};
    //같은거 선택시 해제
    if (query[paramkey] === value) {
      filterParams = { ...query, [paramkey]: '' };
    } else {
      filterParams = { ...query, [paramkey]: value };
    }
    const url = makeQueryString('', filterParams);
    router.push(url);
  };

  const getIsSelected = (buttonValue: string) => {
    //복수
    if (paramkey === 'category' || paramkey === 'cvs') {
      return query[paramkey]?.includes(buttonValue);
    }
    const isSelected = buttonValue === query[filterButtonData.paramKey];
    return isSelected;
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
        {filterButtonData.buttonDatas.map((buttonData) => {
          return (
            <FilterButton
              isSelected={getIsSelected(buttonData.value)}
              value={buttonData.value}
              title={buttonData.buttonTitle}
              handleFilterButtonClick={handleFilterButtonClick}
            />
          );
        })}
      </St.FilterButtonContainer>
    </St.FilterContainer>
  );
};
const Filter = ({ query }: any) => {
  const filterWrapperRef = useRef(null);
  const isFilterOpen = useSelector(
    (state: RootState) => state.filter.isFilterOpen,
  );
  const [isFilterClose, setIsFilterClose] = useState(false);
  const dispatch = useDispatch();

  const handleFilterClose = () => {
    dispatch(filterActions.setIsFilterOpen(false));
  };

  /* filter on, off */
  useEffect(() => {
    const filterOn = getSessionStorage('filter_on');
    if (filterOn === 'true') {
      if (!isFilterOpen) dispatch(filterActions.setIsFilterOpen(true));
    }
    if (filterOn === 'false') {
      if (isFilterOpen) dispatch(filterActions.setIsFilterOpen(false));
    }
  }, [query]);

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
