import React from 'react';
import styled from 'styled-components';
import { wrapper } from 'store';

const St = {
  Wrapper: styled.div`
    text-align: center;
    background: ${(props) => props.theme.colors.primary};
    color: ${(props) => props.theme.colors.fontColor};
    margin: 5px;
  `,
};

const DataPage = (props: any) => {
  const { id } = props;
  return <St.Wrapper>{id}</St.Wrapper>;
};

// SSR (프론트 서버에서 실행)

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, query: queryParam }) => {
      const { id } = queryParam;
      return {
        props: { id },
      };
    },
);

export default DataPage;
