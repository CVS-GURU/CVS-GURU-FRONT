import { useState } from 'react';
import styled from 'styled-components';
import { useSelector, RootState } from 'store';
import RatingStar from 'components/contents/RatingStar';
import { writeItemComment } from 'lib/api/item';
import { createHmac } from 'crypto';
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

type RatingInputProps = { contentsId: string };
const RatingInput = ({ contentsId }: RatingInputProps) => {
  const isMobileMenuListOpen = useSelector(
    (state: RootState) => state.common.isMobileMenuListOpen
  );
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(3);
  const handleComment = (e: any) => {
    setComment(e.target.value);
  };
  const handleRating = (value: number) => {
    console.log('handleRating', value);
    setRating(value);
  };

  const submitComment = async () => {
    try {
      const res = await writeItemComment({
        item_id: contentsId,
        item_score: rating?.toString(),
        item_comment: comment
      });
      console.log(res);
      if (!res) return;
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      <div style={{ padding: '1rem', textAlign: 'center' }}>
        <RatingStar handleRating={handleRating} />
      </div>
      <div className="flex-space-between">
        <St.InputWrapper>
          <input
            placeholder="리뷰를 작성해보세요"
            value={comment}
            onChange={handleComment}
          />
        </St.InputWrapper>
        <St.InputButton onClick={submitComment}>입력</St.InputButton>
      </div>
    </div>
  );
};
export default RatingInput;
