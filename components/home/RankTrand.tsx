import styled from 'styled-components';
import iconMap from 'lib/iconMap';
import useWindowSize, { Size } from 'hooks/useWindowSize';
const St = {
  Title: styled.div`
    margin: 5rem 0;
    font-size: 3rem;
    font-weight: 900;
  `,
  RankTrendWrapper: styled.div`
    margin: 5rem 0;
    @media (max-width: 720px) {
      justify-content: center;
    }
  `,
  RankItemWrapper: styled.div`
    padding: 1rem 0;
    font-weight: 400;
    .title {
      margin-bottom: 10px;
      font-weight: 900;
    }
    .user-commnent {
      margin-bottom: 10px;
    }
    .rating-icon {
      margin-right: 5px;
      margin-left: 2.5px;
      color: #ffd341;
    }
    .rating-count {
      text-align: center;
      font-size: 1rem;
      color: grey;
    }
  `,
};

const RankItem = ({ rank = 1 }) => {
  return (
    <St.RankItemWrapper className="flex">
      <div className="flex-center">
        <div style={{ fontSize: '2rem', fontWeight: 'bold', padding: '2px' }}>
          {rank}
        </div>
        <div style={{ borderRadius: '50%', width: '50px', height: '50px' }}>
          <img
            src="http://bgf-cu.xcache.kinxcdn.com/product/8801019610110.jpg"
            alt=""
            style={{ width: '100%' }}
          />
        </div>
        <div style={{ padding: '0 1rem' }}>
          <div className="title">주) 토핑 2배 참치마요</div>
          <div className="user-comment">꽤 괜찮았습니다.</div>
        </div>
        <div>
          <span className="rating">4.5</span>
          <span className="rating-icon">{iconMap.StarFilled}</span>
          <div className="">
            <span className="rating-count">(130)</span>
          </div>
        </div>
      </div>
    </St.RankItemWrapper>
  );
};

const RankTrand = () => {
  const { isMobileSize } = useWindowSize();
  return (
    <>
      <hr />
      <St.Title className="flex-center">
        <span>현재 가장 관심 받고 있어요!</span>
      </St.Title>
      <St.RankTrendWrapper className="flex-space-between">
        <div className="flex-column">
          <RankItem rank={1} />
          <RankItem rank={2} />
          <RankItem rank={3} />
          <RankItem rank={4} />
          <RankItem rank={5} />
        </div>
        {!isMobileSize && (
          <>
            <div className="flex-column">
              <RankItem />
              <RankItem />
              <RankItem />
              <RankItem />
              <RankItem />
            </div>
            <div className="flex-column">
              <RankItem />
              <RankItem />
              <RankItem />
              <RankItem />
              <RankItem />
            </div>
          </>
        )}
      </St.RankTrendWrapper>
    </>
  );
};

export default RankTrand;
