import React from 'react';
import styled from 'styled-components';
import { wrapper } from 'store';
import ContentDetail from 'components/contents/ContentDetail';

const St = {
  Wrapper: styled.div`
    text-align: center;
    background: ${(props) => props.theme.colors.primary};
    color: ${(props) => props.theme.colors.fontColor};
    margin: 5px;
  `,
};

const ContentDetailPage = (props: any) => {
  const { contentsId } = props;
  return (
    <St.Wrapper>
      <ContentDetail />
    </St.Wrapper>
  );
};

// SSR (프론트 서버에서 실행)

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, query: queryParam }) => {
      const { contentsId } = queryParam;
      return {
        props: { contentsId },
      };
    },
);

export default ContentDetailPage;
