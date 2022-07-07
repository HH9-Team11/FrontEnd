import { SubmitHandler, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { useAppDispatch } from '../redux/configureStore';
import { login, setUserInfo } from '../redux/modules/user';

interface FormValue {
  username: string;
  password: string;
}
const Login = () => {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValue>();

  const onSubmitHandler: SubmitHandler<FormValue> = (data) => {
    console.log(data);
    dispatch(login(data));
  };
  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <Container>
        <Body>
          <Label>아이디</Label>
          <Input
            {...register('username', {
              required: true,
              maxLength: 20,
            })}
            maxLength={20}
          />
          <Label>비밀번호</Label>
          <Input
            {...register('password', {
              required: true,
              maxLength: 20,
            })}
            type='password'
            maxLength={25}
          />

          <SignupBtn type='submit'>로그인</SignupBtn>
        </Body>
      </Container>
    </form>
  );
};
const Container = styled.div`
  background-color: gray;
  width: 1920px;
  height: 1080px;
  display: flex;
`;
const Body = styled.div`
  width: 542px;
  background-color: #fff;
`;

const SignupBtn = styled.button``;
const Label = styled.label`
  margin: 0 auto;
  display: flex;
  justify-content: center;
`;
const Input = styled.input`
  width: 350px;
  height: 50px;
  display: flex;
  margin: 5px auto;
  border-radius: 15px;
  border: 1px solid gray;
  font-size: 15px;
`;

export default Login;
