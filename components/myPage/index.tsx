import styled from 'styled-components';
import { Tabs } from 'antd';
import iconMap from 'lib/iconMap';
import useWindowSize, { Size } from 'hooks/useWindowSize';
import MobileMypage from 'components/myPage//MobileMypage';
import MenuContainer from 'components/myPage/MenuContainer';
import Comment from 'components/contents/Comment';
const { TabPane } = Tabs;

const St = {
  RightSide: styled.div`
    margin-left: 150px;
  `,
  LeftSide: styled.div``,
  Wrapper: styled.div`
    width: 300px;
    border: 1px solid #cbcbcb;
    border-radius: 16px;
  `,
};

// const Comment = () => {
//   return (
//     <div
//       className="coment-box"
//       style={{ display: 'flex', marginBottom: '1rem' }}
//     >
//       <div className="img-box" style={{ width: '40px', height: '40px' }}>
//         <img
//           src=""
//           alt=""
//           style={{ width: '100%', height: '100%', borderRadius: '50%' }}
//         />
//       </div>
//       <div className="comment" style={{ padding: '0 1rem' }}>
//         <ul>
//           <li>
//             <strong style={{ fontWeight: 900 }}>익명</strong>
//             <h4 style={{ fontSize: '1.2rem' }}>
//               생각보다 별로인 그냥 일반적인 참피마요 같음 별로임
//               먹지마셈.나같으면 차라리 개밥을 쳐먹겠다.{' '}
//             </h4>
//           </li>
//         </ul>
//       </div>
//       <div className="star flex-center">
//         <h3>4.5 ★</h3>
//       </div>
//     </div>
//   );
// };

const Profile = () => {
  return (
    <>
      <div style={{ borderBottom: '1px solid #cbcbcb', padding: '1.5rem' }}>
        <div className="flex-center">
          <img src="" alt="" style={{ width: '80px', height: '80px' }} />
        </div>
        <div
          className="flex-center"
          style={{ margin: '1rem', fontSize: '1.6rem', fontWeight: 900 }}
        >
          <span>렁렁이</span> <span>#423</span>
        </div>
        <div
          className="flex-center"
          style={{ margin: '1rem', fontSize: '2rem', fontWeight: 900 }}
        >
          <strong>편의점 마스터</strong>
        </div>
        <div className="flex-center" style={{ margin: '2rem 0' }}>
          <div
            style={{
              border: '1px solid black',
              borderRadius: '50px',
              textAlign: 'center',
              padding: '1rem',
              width: '150px',
              fontSize: '1.5rem',
              fontWeight: 900,
            }}
          >
            수정
          </div>
        </div>
      </div>
      <MenuContainer />
    </>
  );
};

const Mypage = () => {
  const { isMobileSize } = useWindowSize();
  console.log('isMobileSize = ', isMobileSize);
  const callback = () => {};
  if (isMobileSize) {
    return <MobileMypage />;
  }
  return (
    <div className="flex" style={{ margin: '4rem 0' }}>
      <St.LeftSide>
        <St.Wrapper>
          <Profile />
        </St.Wrapper>
      </St.LeftSide>
      <St.RightSide>
        <Tabs defaultActiveKey="1" onChange={callback}>
          <TabPane tab="좋아요 한 후기" key="1">
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
          </TabPane>
          <TabPane tab="최근 검색한 내역" key="2">
            Content of Tab Pane 2
          </TabPane>
          <TabPane tab="내가 남긴 코멘트" key="3">
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
          </TabPane>
        </Tabs>
      </St.RightSide>
    </div>
  );
};

export default Mypage;
