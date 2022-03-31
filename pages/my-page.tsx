import React from 'react';
import { NextPage } from 'next';
import SignUp from 'components/auth/SignUp';

const Mypage: NextPage = (props: any) => {
  return (
    <>
      <div>
        <SignUp />
      </div>
    </>
  );
};

export default Mypage;
