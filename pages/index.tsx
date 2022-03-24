import React from 'react';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { getDatasThunk } from 'store/data';
import { wrapper } from 'store';
import Home from 'components/home';
const Layout = dynamic(() => import('components/base/Layout'), {
  ssr: true,
});

const Main: NextPage = () => {
  return (
    <>
      <Layout>
        <Home />
      </Layout>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query, req }) => {
      //await store.dispatch(getDatasThunk());
      return { props: {} };
    },
);

export default Main;
