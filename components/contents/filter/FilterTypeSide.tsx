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
import Collapse from 'components/common/Collapse';

type StyledFilterWrapperProps = {
  isFilterOpen: boolean;
  isSmall?: boolean | undefined;
};
const St = {
  FilterWrapper: styled.div<StyledFilterWrapperProps>`
    position: fixed;
    padding-top: 80px;
    top: 0px;
    left: 0px;
    display: flex;
    flex-direction: column;

    flex-shrink: 0;
    background-color: ${(props) => props.isSmall && 'rgba(0, 0, 0, 0.8)'};
    height: 100%;
    transition: padding-top 0.2s ease 0s, width 0.2s cubic-bezier(0.4, 0, 0.2, 1) 0s;
    border-right: ${(props) =>
      props.isFilterOpen ? '2px solid rgba(133, 133, 133, 0.1);' : 0}
    overflow: scroll;
    width: ${(props) => (props.isFilterOpen ? '280px' : '0px')};
  `,
  FilterContainer: styled.div`
    padding: 2rem;
    border-bottom: 1px solid grey;
  `,
  FilterTitle: styled.div`
    font-weight: bold;
    font-size: 1.8rem;
  `,
  FilterButtonContainer: styled.div``
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
        <Collapse title={filterButtonData.title}>
          <St.FilterButtonContainer>
            <Slider range min={0} max={5} onChange={handleSilder} />
            <div className="flex-center">
              <FilterButton title={rating?.toString()} />
            </div>
          </St.FilterButtonContainer>
        </Collapse>
      </St.FilterContainer>
    );
  }
  return (
    <St.FilterContainer>
      <Collapse title={filterButtonData.title}>
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
      </Collapse>
    </St.FilterContainer>
  );
};
const Filter = ({ query }: any) => {
  const filterWrapperRef = useRef(null);
  const isFilterOpen = useSelector(
    (state: RootState) => state.filter.isFilterOpen
  );
  const isContentsFullPage = useSelector(
    (state: RootState) => state.common.isContentsFullPage
  );
  const [isFilterClose, setIsFilterClose] = useState(false);
  const dispatch = useDispatch();

  const handleFilterClose = () => {
    dispatch(filterActions.setIsFilterOpen(!isFilterOpen));
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
    <St.FilterWrapper ref={filterWrapperRef} isFilterOpen={isFilterOpen}>
      {isFilterOpen &&
        filterButtonDataList?.map((filterButtonData, index) => {
          return (
            <FilterContainer filterButtonData={filterButtonData} key={index} />
          );
        })}
    </St.FilterWrapper>
  );
};

export default Filter;
