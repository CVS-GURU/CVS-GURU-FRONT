import styled from 'styled-components';
import { Rate } from 'antd';
const St = {
  StarWrapper: styled.div``
};

type RatingStarProps = {
  handleRating: (value: number) => void;
};
const RatingStar = ({ handleRating }: RatingStarProps) => {
  return (
    <St.StarWrapper>
      <Rate allowHalf onChange={handleRating} />
    </St.StarWrapper>
  );
};

export default RatingStar;
