import styled from 'styled-components';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useEffect, useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
import Modal from 'react-modal';

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
const Signup = () => {
  const [address, setAddress] = useState<string>('');
  const [open, setOpen] = useState(false);

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

  useEffect(() => {
    const container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
    const options = {
      //지도를 생성할 때 필요한 기본 옵션
      center: new window.kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
      level: 1, //지도의 레벨(확대, 축소 정도)
    };
    const map = new window.kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
    const geocoder = new window.kakao.maps.services.Geocoder();
    if (address === '') {
      return;
    } else {
      geocoder.addressSearch(address, function (result: any, status: any) {
        // 정상적으로 검색이 완료됐으면
        if (status === window.kakao.maps.services.Status.OK) {
          const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
          console.log(coords);
          const marker = new window.kakao.maps.Marker({
            map: map,
            position: coords,
          });
          const infowindow = new window.kakao.maps.InfoWindow({
            content:
              '<div style="width:150px;text-align:center;padding:6px 0;">' +
              address +
              '</div>',
          });
          infowindow.open(map, marker);

          map.setCenter(coords);
        }
      });
    }
  }, [address]);

  const completeHandler = (data: any) => {
    setAddress(data.address);
    setOpen(false);
    console.log(data);
  };

  const modalstate = () => {
    setOpen(!open);
  };

  const customStyles = {
    overlay: {
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    content: {
      left: '0',
      margin: 'auto',
      width: '500px',
      height: '600px',
      padding: '0',
      overflow: 'hidden',
    },
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
          <Input {...register('userId', { required: true, maxLength: 12 })} />
          {errors.userId?.type === 'required' && <div>아이디 눌러</div>}
          <label>비밀번호 확인</label>
          <Input {...register('userId', { required: true, maxLength: 12 })} />
          {errors.userId?.type === 'required' && <div>아이디 눌러</div>}
          <label>강아지 이름</label>
          <Input {...register('userId', { required: true, maxLength: 12 })} />
          {errors.userId?.type === 'required' && <div>아이디 눌러</div>}
          <label>사진</label>
          <Input {...register('userId', { required: true, maxLength: 12 })} />
          {errors.userId?.type === 'required' && <div>아이디 눌러</div>}
          <label>강아지 크기 셀렉터로</label>
          <Input {...register('userId', { required: true, maxLength: 12 })} />
          {errors.userId?.type === 'required' && <div>아이디 눌러</div>}
          <label>강아지 나이</label>
          <Input {...register('userId', { required: true, maxLength: 12 })} />
          {errors.userId?.type === 'required' && <div>아이디 눌러</div>}
          <label>강아지 성별</label>
          <Input {...register('userId', { required: true, maxLength: 12 })} />
          {errors.userId?.type === 'required' && <div>아이디 눌러</div>}
          <div>
            <Input defaultValue={address} placeholder='예) 카카오' />
            <div onClick={modalstate}>주소검색</div>
            {open === true && (
              <div>
                <DaumPostcode onComplete={completeHandler} />
              </div>
            )}
          </div>

          <div
            id='map'
            style={{
              width: '100%',
              height: '300px',
            }}
          />
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
  width: 396px;
  height: 81px;
  display: flex;
  margin: 0 auto;
  border-radius: 15px;
  border: 1px solid gray;
  font-size: 25px;
`;
const SignupBtn = styled.button``;
const Body = styled.div`
  width: 542px;
  background-color: #fff;
`;

export default Signup;
