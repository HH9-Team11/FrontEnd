import { SubmitHandler, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { useAppDispatch } from '../redux/configureStore';
import { login, setUserInfo } from '../redux/modules/user';

interface FormValue {
  username: string;
  password: string;
}
const Login = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValue>();

  const onSubmitHandler: SubmitHandler<FormValue> = (data) => {
    dispatch(login(data));
    history.replace('map');
  };
  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <Container>
        <Body>
          <LoginBox>
            <Label>아이디</Label>
            <Input
              {...register('username', {
                required: true,
                maxLength: 20,
              })}
              maxLength={20}
            />
            {errors.username?.type === 'required' && (
              <div className='errorMsg'>아이디를 입력해 주세요!</div>
            )}
            <Label>비밀번호</Label>
            <Input
              {...register('password', {
                required: true,
                maxLength: 20,
              })}
              type='password'
              maxLength={25}
            />
            {errors.password?.type === 'required' && (
              <div className='errorMsg'>비밀번호를 입력해 주세요!</div>
            )}
            <LoginBtn type='submit'>로그인</LoginBtn>
          </LoginBox>
        </Body>
      </Container>
    </form>
  );
};
const Container = styled.div`
  background-color: #e9d5ca;
  display: flex;
`;
const Body = styled.div`
  width: 542px;
  margin: 0 auto;
  height: 1080px;

  background-color: #fff;
`;

const LoginBox = styled.div`
  flex-direction: column;
  align-items: center;
  align-content: center;
  margin: 50% auto;
  .errorMsg {
    display: flex;
    color: red;
    font-weight: bold;
    margin-left: 100px;
  }
`;

const LoginBtn = styled.button`
  display: flex;
  margin: 10px auto;
  width: 200px;
  height: 40px;
  text-align: center;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  font-weight: bold;
  cursor: pointer;
`;
const Label = styled.label`
  margin: 0 auto;
  display: flex;
  justify-content: center;
  color: #363062;
`;
const Input = styled.input`
  width: 350px;
  height: 50px;
  display: flex;
  margin: 5px auto;
  border-radius: 15px;
  border: 1px solid gray;
  font-size: 15px;
  color: #363062;
`;

export default Login;
