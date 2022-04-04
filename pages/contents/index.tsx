import { dehydrate, QueryClient, useQuery } from 'react-query';
import Contents from 'components/contents';
import { GetServerSideProps } from 'next';
import { getContents } from 'lib/api/contents';
import { makeUrl } from 'lib/helpers';
import { NextPage } from 'next';
import { wrapper } from 'store';

const ContentsPage: NextPage = (props: any) => {
  const { query } = props;

  return <Contents query={query} />;
};

export default ContentsPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();
  console.log(context);
  const isCSR =
    !context.req ||
    (context.req.url && context.req.url.startsWith('/_next/data'));
  const queryParam = context.query;
  const url = makeUrl(queryParam, 'http://localhost:3031/api/item/get-items');

  if (!isCSR) {
    await queryClient.prefetchQuery(
      [`get-contents-${url}`],
      () => getContents(url),
      {
        staleTime: 10000,
      },
    );
  }

  return {
    props: {
      query: queryParam,
      dehydratedState: dehydrate(queryClient),
    },
  };
};
