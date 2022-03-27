import styled from 'styled-components';

const St = {
  FooterWrapper: styled.div`
    width: 100%;
    height: 400px;
  `,
};
const Footer = () => {
  return <St.FooterWrapper>푸터 영역</St.FooterWrapper>;
};
export default Footer;
