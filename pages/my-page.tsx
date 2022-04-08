import React from 'react';
import { NextPage } from 'next';
import Mypage from 'components/myPage';
import SignUp from 'components/auth/SignUp';

const MypagePage: NextPage = (props: any) => {
  return (
    <>
      <div>
        <Mypage />
      </div>
    </>
  );
};

export default MypagePage;
