import styled from 'styled-components';

type StyledFilterButtonWrapper = {
  isSelected: boolean;
};
const St = {
  FilterButtonWrapper: styled.div<StyledFilterButtonWrapper>`
    border-radius: 20px;
    padding: 1.2rem;
    border: 2px solid black;
    span {
      font-weight: bold;
    }
    margin-top: 0.5em;
    margin-right: 0.5em;
  `,
};

type FilterButtonProps = {
  title: string;
  handleFilterButtonClick?: (key: string) => void;
  isSelected?: boolean;
};

const FilterButton = ({
  title = '',
  handleFilterButtonClick,
  isSelected = false,
}: FilterButtonProps) => {
  const handleButtonClick = (e: any) => {
    if (handleFilterButtonClick) handleFilterButtonClick(e.target.id);
  };
  return (
    <St.FilterButtonWrapper
      isSelected={isSelected}
      onClick={handleButtonClick}
      id=""
    >
      <span>{title}</span>
    </St.FilterButtonWrapper>
  );
};

export default FilterButton;
