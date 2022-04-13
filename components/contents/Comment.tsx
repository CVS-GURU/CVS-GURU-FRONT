import styled from 'styled-components';
import moment from 'moment';
const St = {
  CommentWrapper: styled.div`
    //padding: 1rem;
    // border-radius: 8px;
    // border: 1px solid;
    margin: 1rem 0;
  `,

  UserInfoContainer: styled.div`
    padding: 1rem 0;
    .rating {
      font-size: 2rem;
      font-weight: 800;
      padding-right: 1rem;
    }
    .user-name {
      font-weight: 800;
    }
    .date {
      color: grey;
    }
  `,

  IconContainer: styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: grey;
  `,
  CommentTextContainer: styled.div`
    text-align: left;
  `
};

type CommentProps = {
  commentInfo: {
    USER_ID: string;
    ITEM_SCORE: number;
    ITEM_COMMENT: string;
    INSERT_DATE: string;
    UPDATE_DATE: string;
  };
};
const Comment = ({ commentInfo }: CommentProps) => {
  return (
    <St.CommentWrapper>
      <St.UserInfoContainer className="flex">
        <div className="flex-center">
          <St.IconContainer />
        </div>
        <div style={{ padding: '0 1rem' }}>
          <div className="flex">
            <span className="rating">{commentInfo?.ITEM_SCORE}</span>
          </div>
          <div className="flex">
            <div className="user-name">{commentInfo?.USER_ID}</div>
            <div className="date">
              {moment(commentInfo?.UPDATE_DATE).format('YYYY년 MM월 DD일 ')}
            </div>
          </div>
        </div>
      </St.UserInfoContainer>
      <St.CommentTextContainer>
        <span>{commentInfo?.ITEM_COMMENT}</span>
      </St.CommentTextContainer>
    </St.CommentWrapper>
  );
};
export default Comment;
