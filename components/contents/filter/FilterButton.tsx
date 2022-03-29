import React from 'react';
import styled from 'styled-components';

type StyledFilterButtonWrapper = {
  isSelected: boolean;
};
const St = {
  FilterButtonWrapper: styled.div<StyledFilterButtonWrapper>`
    cursor: pointer;
    border-radius: 20px;
    padding: 1.2rem;
    border: ${(props) =>
      props.isSelected ? '2px solid #a400d4' : '2px solid black'};
    span {
      font-weight: bold;
    }
    margin-top: 0.5em;
    margin-right: 0.5em;
    color: ${(props) => props.isSelected && '#a400d4'};
    &hover: {
      color: red;
    }
  `,
};

type FilterButtonProps = {
  isSelected?: boolean;
  value?: string;
  title?: string;
  handleFilterButtonClick?: (key: string) => void;
};

const FilterButton = ({
  isSelected = false,
  value,
  title = '',
  handleFilterButtonClick,
}: FilterButtonProps) => {
  const handleButtonClick = (e: any) => {
    if (handleFilterButtonClick) handleFilterButtonClick(value);
  };
  return (
    <St.FilterButtonWrapper isSelected={isSelected} onClick={handleButtonClick}>
      <span>{title}</span>
    </St.FilterButtonWrapper>
  );
};

export default React.memo(FilterButton);
