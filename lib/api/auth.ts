import axios from '.';
import { UserTypeRes, SingUpAPIParams } from '../../types/user';
//* 회원가입 body

//* 회원 가입 api
// export const signupAPI = (body: SingUpAPIBody) =>
//   axios.post<UserType>('/api/auth/signup', body);

export const signup = (body: SingUpAPIParams) => {
  return axios.post('/api/user/signUp', body);
};

//* 로그인 api
export const login = (body: { user_id: string; password: string }) => {
  return axios.post<UserTypeRes>('/api/user/login', body);
};

//* 쿠키의 access_token의 유저 정보 받아오는 api
export const me = () => axios.get('/api/user/me');

//* 로그 아웃 api
export const logout = () => axios.delete('/api/user/logout');

export const loadMyInfo = () => {
  return axios.post('/api/user/loadMyInfo');
};
