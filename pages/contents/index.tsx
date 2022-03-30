import { dehydrate, QueryClient, useQuery } from 'react-query';
import Contents from 'components/contents';
import { getContents } from 'lib/api/contents';
import { makeUrl } from 'lib/helpers';
import { NextPage } from 'next';
import { wrapper } from 'store';

const ContentsPage: NextPage = (props: any) => {
  const { query } = props;

  return <Contents query={query} />;
};

export default ContentsPage;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, query: queryParam }) => {
      const queryClient = new QueryClient();

      const url = makeUrl(
        queryParam,
        'http://localhost:3031/api/item/get-items',
      );
      await queryClient.prefetchQuery('get-contents', () => getContents(url));

      return {
        props: {
          query: queryParam,
          dehydratedState: dehydrate(queryClient),
        },
      };
    },
);
