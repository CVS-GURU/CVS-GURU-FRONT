import React from 'react';
import { NextPage } from 'next';
import { wrapper } from 'store';
import axios from 'axios';
import SignUp from 'components/auth/SignUp';

const SignUpPage: NextPage = (props: any) => {
  const { query, isCSR } = props;
  return (
    <>
      <div>
        <SignUp />
      </div>
    </>
  );
};

export default SignUpPage;
