import React from 'react';
import { NextPage } from 'next';
import { wrapper } from 'store';
import axios from 'axios';
import About from 'components/about';

const AboutPage: NextPage = (props: any) => {
  const { query, isCSR } = props;
  return (
    <>
      <div>
        <About />
      </div>
    </>
  );
};

export default AboutPage;
