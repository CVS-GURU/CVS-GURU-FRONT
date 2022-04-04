import React from 'react';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import styled from 'styled-components';
import { wrapper } from 'store';
import { makeUrl } from 'lib/helpers';
import ContentDetail from 'components/contents/ContentDetail';
import { getContentsDetail } from 'lib/api/contents';
import axios from 'lib/api';
import { loadMyInfoThunk } from 'store/auth';

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
      <ContentDetail contentsId={contentsId} />
    </St.Wrapper>
  );
};

// SSR (프론트 서버에서 실행)

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, query: queryParam }) => {
      const cookie = req ? req.headers.cookie : '';
      axios.defaults.headers.common['Cookie'] = '';
      // 쿠키가 브라우저에 있는경우만 넣어서 실행
      // (주의, 아래 조건이 없다면 다른 사람으로 로그인 될 수도 있음)
      if (req && cookie) {
        console.log('cookie  = ', cookie);
        axios.defaults.headers.common['Cookie'] = cookie;
      }
      await store.dispatch(loadMyInfoThunk());

      const { contentsId } = queryParam;
      const queryClient = new QueryClient();

      const url = makeUrl(
        { id: contentsId },
        'http://localhost:3031/api/item/get-item-detail',
      );
      await queryClient.prefetchQuery(
        'get-contents-detail',
        () => getContentsDetail(url),
        { staleTime: 10000 },
      );

      return {
        props: {
          query: queryParam,
          contentsId,
          dehydratedState: dehydrate(queryClient),
        },
      };
    },
);

export default ContentDetailPage;
