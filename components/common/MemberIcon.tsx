import styled from "styled-components";

type StyleImageContainerProps = {
  backgroundColor: string;
  left: number;
};

const St = {
  ImageContainer: styled.div<StyleImageContainerProps>`
    color: white;
    font-weight: 900;
    position: absolute;
    border: 2px solid white;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: ${(props) => props.backgroundColor};
    left: ${(props) => props.left}px;
    img {
      width: 100%;
      background-size: cover;
      border-radius: 50%;
    }
  `,
};

type MemberIconProps = {
  left: number;
  backgroundColor: string;
  thumbnail?: string;
};

const MemberIcon = ({
  left = 0,
  backgroundColor = "grey",
  thumbnail,
}: MemberIconProps) => {
  return (
    <St.ImageContainer
      left={left}
      backgroundColor={backgroundColor}
      className="flex-center"
    >
      {thumbnail ? <img src={thumbnail} alt="" /> : <span>가</span>}
    </St.ImageContainer>
  );
};

export default MemberIcon;
