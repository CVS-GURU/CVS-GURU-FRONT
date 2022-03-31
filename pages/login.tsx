import { useState } from 'react';
import { Input, Button } from 'components/common';
import styled from 'styled-components';
import { login } from 'lib/api/auth';
import { loginThunk } from 'store/auth';
import { useDispatch } from 'react-redux';
import MailIcon from '../public/static/svg/auth/mail.svg';
import OpenedEyeIcon from '../public/static/svg/auth/opened_eye.svg';
import ClosedEyeIcon from '../public/static/svg/auth/closed_eye.svg';

const St = {
  LoginWrapper: styled.div`
    max-width: 450px;
    margin: 50px auto;
    padding: 2rem;
  `,
  Title: styled.div`
    font-size: 2.7rem;
    font-weight: 800;
  `,
  InputContainer: styled.div`
    margin-top: 1rem;
    position: relative;
    svg {
      top: 16px;
      cursor: pointer;
    }
  `,

  ButtonContainer: styled.div`
    margin: 1rem 0;
    background: black;
    border-radius: 4px;
    color: white;
    padding: 1rem;
    text-align: center;
    font-weight: 900;
  `,
};
const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('wsadqeqe');
  const [password, setPassword] = useState('1234');

  const [isPasswordHided, setIsPasswordHided] = useState(true);
  //* 이메일 주소 변경시
  const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  //* 비밀번호 변경시
  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  //* 로그인 클릭시
  const onSubmitLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // setValidateMode(true);
    if (!email || !password) {
      alert('이메일과 비밀번호를 입력해 주세요.');
    } else {
      const loginBody = { user_id: email, password };
      dispatch(loginThunk(loginBody));
      try {
        // const { data } = await loginAPI(loginBody);
        // dispatch(userActions.setLoggedUser(data));
        // closeModal();
      } catch (e) {
        console.log(e.response);
      }
    }
  };
  //*비밀번호 숨김 토글하기
  const togglePasswordHiding = () => {
    setIsPasswordHided(!isPasswordHided);
  };
  return (
    <div>
      <St.LoginWrapper>
        <St.Title>Login</St.Title>
        <div className="flex-column">
          <St.InputContainer>
            <Input
              placeholder="이메일 주소"
              name="email"
              type="email"
              icon={<MailIcon />}
              value={email}
              onChange={onChangeEmail}
              isValid={email !== ''}
              errorMessage="이메일이 필요합니다."
            />
          </St.InputContainer>
          <St.InputContainer>
            <Input
              placeholder="비밀번호 설정하기"
              name="password"
              type={isPasswordHided ? 'password' : 'text'}
              icon={
                isPasswordHided ? (
                  <ClosedEyeIcon onClick={togglePasswordHiding} />
                ) : (
                  <OpenedEyeIcon onClick={togglePasswordHiding} />
                )
              }
              value={password}
              onChange={onChangePassword}
              isValid={password !== ''}
              errorMessage="비밀번호를 입력하세요."
            />
          </St.InputContainer>
          <form onSubmit={onSubmitLogin}>
            <St.ButtonContainer>
              <Button type="submit" color="bittersweet">
                Login
              </Button>
            </St.ButtonContainer>
          </form>
        </div>
      </St.LoginWrapper>
    </div>
  );
};

export default Login;
