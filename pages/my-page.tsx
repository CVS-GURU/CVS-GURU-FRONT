import React, { useEffect } from 'react';
import { NextPage } from 'next';
import Mypage from 'components/myPage';
import { cookieStringToObject } from 'lib/helpers';
import { wrapper } from 'store';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { loadMyInfoThunk } from 'store/auth';
import { useSelector, RootState } from 'store';
import axios from 'lib/api';
const MypagePage: NextPage = (props: any) => {
  const router = useRouter();

  const isLogged = useSelector((state: RootState) => state.auth.isLogged);
  useEffect(() => {
    console.log('isLogged = ', isLogged);
    if (!isLogged) {
      router.push('login');
    }
  }, [isLogged]);

  if (!isLogged) {
    return <div></div>;
  }
  return (
    <>
      <Mypage />
    </>
  );
};
export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query, req, res }) => {
      const cookie = req ? req.headers.cookie : '';
      axios.defaults.headers.cookie = '';
      // 쿠키가 브라우저에 있는경우만 넣어서 실행
      // (주의, 아래 조건이 없다면 다른 사람으로 로그인 될 수도 있음)
      if (req && cookie) {
        axios.defaults.headers.cookie = cookie as string;
        const parseCookie = cookieStringToObject(cookie);
        console.log('parseCookie: ', parseCookie);
        await store.dispatch(loadMyInfoThunk());
      }

      //await store.dispatch(loadMyInfoThunk());
      const isCSR = !req || (req.url && req.url.startsWith('/_next/data'));

      return { props: { query, isCSR } };
    }
);
export default MypagePage;
