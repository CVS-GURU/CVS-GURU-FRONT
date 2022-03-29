import { Row, Col } from 'antd';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import Contents from 'components/contents';
import { getContents } from 'lib/api/contents';
import { NextPage } from 'next';
import { wrapper } from 'store';

const ContentsPage: NextPage = (props: any) => {
  const { query } = props;
  console.log('query = ', query);
  return <Contents query={query} />;
};

export default ContentsPage;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, query: queryParam }) => {
      const queryClient = new QueryClient();

      await queryClient.prefetchQuery('get-contents', () =>
        getContents(
          'http://localhost:3031/api/item/get-item-with-price?from=3000&to=4000',
        ),
      );

      return {
        props: {
          query: queryParam,
          dehydratedState: dehydrate(queryClient),
        },
      };
    },
);
