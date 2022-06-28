import styled from 'styled-components';
import { useForm, SubmitHandler } from 'react-hook-form';

const Signup = () => {
  interface FormValue {
    userId: string;
    passWord: string;
    passWordCehck: string;
    dogName: string;
    dogAge: string;
    dogGender: string;
    address: string;
    lat: number;
    lng: number;
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<FormValue>();

  const onSubmitHandler: SubmitHandler<FormValue> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <Container>
        <Body>
          <label>아이디</label>
          <Input
            {...register('userId', {
              required: true,
              maxLength: 12,
              pattern: /^[a-zA-Z0-9]{4,12}$/,
            })}
          />
          {errors.userId?.type === 'required' && <div>아이디 눌러</div>}
          {errors.userId?.type === 'maxLength' && <div>숫자 너음</div>}
          {errors.userId?.type === 'pattern' && <div>규식이 틀림</div>}

          <label>비밀번호</label>
          <input {...register('userId', { required: true, maxLength: 12 })} />
          {errors.userId?.type === 'required' && <div>아이디 눌러</div>}
          <label>비밀번호 확인</label>
          <input {...register('userId', { required: true, maxLength: 12 })} />
          {errors.userId?.type === 'required' && <div>아이디 눌러</div>}
          <label>여기는 주소가 들어감</label>
          <input {...register('userId', { required: true, maxLength: 12 })} />
          {errors.userId?.type === 'required' && <div>아이디 눌러</div>}
          <label>강아지 이름</label>
          <input {...register('userId', { required: true, maxLength: 12 })} />
          {errors.userId?.type === 'required' && <div>아이디 눌러</div>}
          <label>사진</label>
          <input {...register('userId', { required: true, maxLength: 12 })} />
          {errors.userId?.type === 'required' && <div>아이디 눌러</div>}
          <label>강아지 크기 셀렉터로</label>
          <input {...register('userId', { required: true, maxLength: 12 })} />
          {errors.userId?.type === 'required' && <div>아이디 눌러</div>}
          <label>강아지 나이</label>
          <input {...register('userId', { required: true, maxLength: 12 })} />
          {errors.userId?.type === 'required' && <div>아이디 눌러</div>}
          <label>강아지 성별</label>
          <input {...register('userId', { required: true, maxLength: 12 })} />
          {errors.userId?.type === 'required' && <div>아이디 눌러</div>}
          <SignupBtn type='submit'>회원가입</SignupBtn>
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
const Input = styled.input`
  width: 300px;
  height: 50px;
`;
const SignupBtn = styled.button``;
const Body = styled.div`
  width: 542px;
  background-color: #fff;
`;

export default Signup;
