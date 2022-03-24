import styled from 'styled-components';
import { Rate } from 'antd';
const St = {
  StarWrapper: styled.div``,
};

const RatingStar = () => {
  return (
    <St.StarWrapper>
      <Rate allowHalf />
    </St.StarWrapper>
  );
};

export default RatingStar;
