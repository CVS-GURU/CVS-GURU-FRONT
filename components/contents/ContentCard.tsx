import styled from 'styled-components';

const St = {
  ContentCardWrapper: styled.div`
    border-radius: 4px;
    border: 1px solid grey;
  `,
  ImageContainer: styled.div`
    img {
      width: 100%;
      height: 100%;
      background-size: cover;
    }
  `,
};

type ContentCardProps = {
  contentsId: string;
  image_path: string;
  title: string;
  description?: string;
  rating: string;
  review_count: number;
};
const ContentCard = (contentsInfo: ContentCardProps) => {
  return (
    <St.ContentCardWrapper>
      <St.ImageContainer>
        <img
          src="http://bgf-cu.xcache.kinxcdn.com/product/8801019610110.jpg"
          alt=""
        />
      </St.ImageContainer>
      <div>
        <span> 주) 토핑 2배 참치마요</span>
      </div>
      <div>
        <span>4.5</span>
        <span>별</span>
        <span>(130)</span>
      </div>
    </St.ContentCardWrapper>
  );
};
export default ContentCard;
