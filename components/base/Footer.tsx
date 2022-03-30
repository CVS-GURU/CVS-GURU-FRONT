import styled from 'styled-components';

const St = {
  FooterWrapper: styled.div`
    padding: 20px;
    // position: fixed;
    width: 100%;
    bottom: 0;
    font-size: 1rem;
    font-weight: 600;
    display: flex;
    justify-content: center;
  `,
};
const Footer = () => {
  return (
    <St.FooterWrapper>
      <span> Spreading values, TEAM D_D 💜</span>
    </St.FooterWrapper>
  );
};
export default Footer;
