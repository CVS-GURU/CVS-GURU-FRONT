import styled from 'styled-components';
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
  `,
};
const Comment = () => {
  return (
    <St.CommentWrapper>
      <St.UserInfoContainer className="flex">
        <div className="flex-center">
          <St.IconContainer />
        </div>
        <div style={{ padding: '0 1rem' }}>
          <div className="flex">
            <span className="rating">4.5</span>
          </div>
          <div className="flex">
            <div className="user-name">익명</div>
            <div className="date">2022.3.24</div>
          </div>
        </div>
      </St.UserInfoContainer>
      <St.CommentTextContainer>
        <span>
          생각보다 별로임; 걍 일반적인 참치마요 맛임, 솔직히 평가를 할 수가;
        </span>
      </St.CommentTextContainer>
    </St.CommentWrapper>
  );
};
export default Comment;
