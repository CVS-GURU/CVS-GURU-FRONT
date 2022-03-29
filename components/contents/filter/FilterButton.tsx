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
    border: 2px solid black;
    span {
      font-weight: bold;
    }
    margin-top: 0.5em;
    margin-right: 0.5em;
    &hover: {
      color: red;
    }
  `,
};

type FilterButtonProps = {
  id: string;
  title: string;
  handleFilterButtonClick?: (key: string) => void;
  isSelected?: boolean;
};

const FilterButton = ({
  id,
  title = '',
  handleFilterButtonClick,
  isSelected = false,
}: FilterButtonProps) => {
  const handleButtonClick = (e: any) => {
    if (handleFilterButtonClick) handleFilterButtonClick(id);
  };
  return (
    <St.FilterButtonWrapper
      isSelected={isSelected}
      onClick={handleButtonClick}
      id={id}
    >
      <span>{title}</span>
    </St.FilterButtonWrapper>
  );
};

export default React.memo(FilterButton);
