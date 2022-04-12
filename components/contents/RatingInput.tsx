import styled from 'styled-components';
import RatingStar from 'components/contents/RatingStar';
const St = {
  InputWrapper: styled.div`
    padding: 1rem;
    border: 1px solid grey;
    width: 100%;
    input {
      width: 100%;
      border: none;
    }
  `,
  InputButton: styled.button`
    background: black;
    color: white;
    font-weight: 700;
    background: black;
    color: white;
    border: none;
    width: 70px;
  `
};

const RatingInput = () => {
  return (
    <div>
      <div style={{ padding: '1rem', textAlign: 'center' }}>
        <RatingStar />
      </div>
      <div className="flex-space-between">
        <St.InputWrapper>
          <input placeholder="리뷰를 작성해보세요" />
        </St.InputWrapper>
        <St.InputButton>입력</St.InputButton>
      </div>
    </div>
  );
};
export default RatingInput;
