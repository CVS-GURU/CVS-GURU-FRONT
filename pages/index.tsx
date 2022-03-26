import React from 'react';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { getDatasThunk } from 'store/data';
import { wrapper } from 'store';
import Home from 'components/home';

const Main: NextPage = () => {
  return (
    <>
      <Home />
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
