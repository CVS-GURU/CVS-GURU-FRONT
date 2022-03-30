import {
  SearchOutlined,
  CommentOutlined,
  HeartOutlined,
} from '@ant-design/icons';
import styled from 'styled-components';
import iconmap from 'lib/iconMap';

const St = {
  Title: styled.div`
    margin: 5rem 0;
    font-size: 3rem;
    font-weight: 900;
  `,
  IconContainer: styled.div`
    padding: 2rem;
    font-size: 200%;
  `,

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
  Description: styled.div`
    font-weight: bold;
  `,
};
type DescriptionItemProps = {
  icon: string;
  title: string;
};
const DescriptionItem = ({ icon, title }: DescriptionItemProps) => {
  return (
    <St.DescriptionCard>
      <St.IconContainer className="flex-center">
        {iconmap[icon]}
      </St.IconContainer>
      <St.Description>
        <span>{title}</span>
      </St.Description>
    </St.DescriptionCard>
  );
};
const Description = () => {
  return (
    <div
      className="flex-column"
      style={{ width: '100%', marginBottom: '3rem' }}
    >
      <hr />
      <St.Title className="flex-center">
        <span> 내돈 내산을 위한 올바른 리뷰생활</span>
      </St.Title>
      <St.DescriptionWrapper>
        <DescriptionItem
          icon="SearchOutlined"
          title="평소에 먹던 음식을 검색해보세요."
        />
        <DescriptionItem
          icon="CommentOutlined"
          title="리뷰를 남기고 사람들과 공유해보세요."
        />
        <DescriptionItem
          icon="HeartOutlined"
          title="좋아요와 하트를 눌러서 저장해봐요."
        />
      </St.DescriptionWrapper>
    </div>
  );
};

export default Description;
