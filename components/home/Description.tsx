import {
  SearchOutlined,
  CommentOutlined,
  HeartOutlined,
} from '@ant-design/icons';
import styled from 'styled-components';

const St = {
  DescriptionWrapper: styled.div`
    flex-wrap: wrap;
    display: flex;
    justify-content: space-around;
    margin: 40px 0px 20px;
    width: 100%;
  `,
  DescriptionCard: styled.div`
    margin-bottom: 20px;
    margin-right: 20px;
    margin-left: 20px;
    padding: 0px 20px;
    -webkit-box-pack: start;
    justify-content: flex-start;
    @media (min-width: 993px) {
      max-width: 360px;
    }
    @media (min-width: 815px) {
      max-width: 300px;
    }
    @media (min-width: 600px) {
      max-width: 240px;
    }
  `,
};
const DescriptionItem = () => {
  return (
    <St.DescriptionCard>
      <div>
        <SearchOutlined />
      </div>
      <div>평소에 먹던 음식을 검색해보세요.</div>
    </St.DescriptionCard>
  );
};
const Description = () => {
  return (
    <div className="flex-column" style={{ width: '100%' }}>
      <h1>디스크립션 콘테이너</h1>
      <St.DescriptionWrapper>
        <DescriptionItem />
        <DescriptionItem />
        <DescriptionItem />
      </St.DescriptionWrapper>
    </div>
  );
};

export default Description;
