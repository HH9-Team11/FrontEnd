import styled from 'styled-components';
import { useForm, SubmitHandler } from 'react-hook-form';
import React, { useEffect, useRef, useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
import axios from 'axios';
import { userApis } from '../apis/userApis';

// 폼데이터 타입 설정
interface FormValue {
  userId: string;
  passWord: string;
  passWordCehck: string;
  dogName: string;
  dogAge: number;
  dogSize: string;
  dogGender: string;
  address: string;
  lat: number;
  lng: number;
}

// 셀렉트 옵션들
const dogSizeOptions = [
  { value: 'none', label: '선택하세요' },
  { value: '소형견', label: '소형견' },
  { value: '중형견', label: '중형견' },
  { value: '대형견', label: '대형견' },
];
const dogAgeOptions = [
  { value: 0, label: '선택하세요' },
  { value: 0, label: '1살 미만' },
  { value: 1, label: '1살' },
  { value: 2, label: '2살' },
  { value: 3, label: '3살' },
  { value: 4, label: '4살' },
  { value: 5, label: '5살' },
  { value: 6, label: '6살' },
  { value: 7, label: '7살' },
  { value: 8, label: '8살' },
  { value: 9, label: '9살' },
  { value: 10, label: '10살' },
  { value: 11, label: '11살' },
  { value: 12, label: '12살' },
  { value: 13, label: '13살' },
  { value: 14, label: '14살' },
  { value: 15, label: '15살' },
];
const dogGenderOptions = [
  { value: 'none', label: '선택하세요' },
  { value: '남', label: '남자' },
  { value: '여', label: '여자' },
];

const Signup = () => {
  const [address, setAddress] = useState<string>('');
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<FileList | null>();
  const [imagePreview, setImagePreview] = useState<string>('');
  const [fileName, setFrileName] =
    useState<string>('강아지 사진을 올려주세요!');
  const [lat, setLat] = useState<string>('');
  const [lng, setLng] = useState<string>('');

  // 훅 폼 구조분해할당
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValue>();

  // 비밀번호 확인
  const passwordRef = useRef<string | null>(null);
  passwordRef.current = watch('passWord');

  // 이미지 이벤트 프리뷰 추가
  const imageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList != null) {
      setFile(fileList);
      const currentImageUrl: string = URL.createObjectURL(fileList[0]);
      setImagePreview(currentImageUrl);
    }
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
          // 새로운 좌표로 변경
          const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
          console.log(coords);
          setLat(coords.La);
          setLng(coords.Ma);
          const marker = new window.kakao.maps.Marker({
            map: map,
            position: coords,
          });
          // 마커에 위치정보 띄우기
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
  };

  const modalstate = () => {
    setOpen(!open);
  };

  // 서버 통신
  const onSubmitHandler: SubmitHandler<FormValue> = async (data) => {
    const formData = new FormData();
    console.log(data);
    const allData = {
      username: data.userId,
      password: data.passWord,
      dogName: data.dogName,
      dogAge: data.dogAge,
      dogSize: data.dogSize,
      dogGender: data.dogGender,
      address,
      lat,
      lng,
    };
    formData.append(
      'data',
      new Blob([JSON.stringify(allData)], {
        type: 'application/json',
      })
    );
    if (file) {
      formData.append('img', file[0]);
    }

    try {
      const aaa = await userApis.signup(formData);
      console.log(aaa);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <Container>
        <Body>
          <Label>아이디</Label>
          <Input
            {...register('userId', {
              required: true,
              maxLength: 12,
              pattern: /^[a-zA-Z0-9]{4,12}$/,
            })}
            placeholder='ex) dogleve12'
            maxLength={20}
          />
          {errors.userId?.type === 'required' && (
            <div className='errorMsg'>아이디를 입력해 주세요!</div>
          )}
          {errors.userId?.type === 'maxLength' && (
            <div className='errorMsg'>
              아이디는 대소문자, 숫자 포함 4~12글자 입니다!
            </div>
          )}
          {errors.userId?.type === 'pattern' && (
            <div className='errorMsg'>
              아이디는 대소문자, 숫자 포함 4~12글자 입니다!
            </div>
          )}

          <Label>비밀번호</Label>
          <Input
            {...register('passWord', {
              required: true,
              maxLength: 20,
              pattern: /^[A-Za-z0-9]{6,20}$/,
            })}
            type='password'
            maxLength={25}
          />
          {errors.passWord?.type === 'required' && (
            <div className='errorMsg'>비밀번호를 입력해 주세요!</div>
          )}
          {errors.passWord?.type === 'maxLength' && (
            <div className='errorMsg'>
              비밀번호는 대소문자, 숫자 포함6~20자 입니다!
            </div>
          )}
          {errors.passWord?.type === 'pattern' && (
            <div className='errorMsg'>
              비밀번호는 대소문자, 숫자 포함6~20자 입니다!
            </div>
          )}
          <Label>비밀번호 확인</Label>
          <Input
            {...register('passWordCehck', {
              required: true,
              validate: (value) => value === passwordRef.current,
            })}
            type='password'
            maxLength={25}
          />
          {errors.passWordCehck?.type === 'required' && (
            <div className='errorMsg'>비밀번호를 확인해주세요!</div>
          )}
          {errors.passWordCehck?.type === 'validate' && (
            <div className='errorMsg'>비밀번호가 같지 않습니다!</div>
          )}
          <Label>강아지 이름</Label>
          <Input {...register('dogName', { required: true, maxLength: 12 })} />

          {errors.dogName?.type === 'required' && (
            <div className='errorMsg'>강아지 이름을 적어 주세요!</div>
          )}

          <Label>강아지 크기 셀렉터로</Label>
          <Select {...register('dogSize', { required: true, maxLength: 12 })}>
            {dogSizeOptions.map((a, idx) => (
              <option key={a.label} value={a.value}>
                {a.label}
              </option>
            ))}
          </Select>

          {errors.dogSize?.type === 'required' && (
            <div className='errorMsg'>아이디 눌러</div>
          )}

          <Label>강아지 나이</Label>
          <Select {...register('dogAge', { required: true, maxLength: 12 })}>
            {dogAgeOptions.map((a, idx) => (
              <option key={a.label} value={a.value}>
                {a.label}
              </option>
            ))}
          </Select>

          {errors.dogAge?.type === 'required' && (
            <div className='errorMsg'>아이디 눌러</div>
          )}

          <Label>강아지 성별</Label>
          <Select {...register('dogGender', { required: true, maxLength: 12 })}>
            {dogGenderOptions.map((a, idx) => (
              <option key={a.label} value={a.value}>
                {a.label}
              </option>
            ))}
          </Select>

          {errors.dogGender?.type === 'required' && (
            <div className='errorMsg'>아이디 눌러</div>
          )}

          {/* 여기부터는 이미지 추가 */}
          <Label htmlFor='image'>{fileName}</Label>
          {imagePreview ? (
            <img className='imgBox' src={imagePreview} />
          ) : (
            <div className='notImgBox' />
          )}

          <input id='image' type='file' onChange={imageHandler} />

          {/* 여기부터는 주소 추가 */}
          <Input defaultValue={address} placeholder='예) 카카오' />
          <div onClick={modalstate}>주소검색</div>
          {open === true && (
            <div>
              <DaumPostcode onComplete={completeHandler} />
            </div>
          )}

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
const Label = styled.label`
  margin: 0 auto;
  display: flex;
  justify-content: center;
`;
const Select = styled.select`
  width: 350px;
  height: 50px;
  display: flex;
  margin: 5px auto;
  border-radius: 15px;
  border: 1px solid gray;
  font-size: 15px;
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
const SignupBtn = styled.button``;
const Body = styled.div`
  width: 542px;
  background-color: #fff;
  .errorMsg {
    display: flex;
    color: red;
    font-weight: bold;
    margin-left: 100px;
  }
  .notImgBox {
    margin: 0 auto;
    width: 300px;
    height: 300px;
    background-color: gray;
  }
  .imgBox {
    display: flex;
    margin: 0 auto;
    width: 300px;
    height: 300px;
  }
`;

export default Signup;
