import React, { useEffect } from 'react';

const Map: React.FC = () => {
  useEffect(() => {
    const container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
    const options = {
      //지도를 생성할 때 필요한 기본 옵션
      center: new window.kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
      level: 1, //지도의 레벨(확대, 축소 정도)
    };

    const map = new window.kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

    const imageSrc =
        'data:image/png;base64,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', // 마커이미지의 주소입니다
      imageSize = new window.kakao.maps.Size(64, 69), // 마커이미지의 크기입니다
      imageOption = { offset: new window.kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

    // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
    const markerImage = new window.kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imageOption
      ),
      markerPosition = new window.kakao.maps.LatLng(33.450701, 126.570667); // 마커가 표시될 위치입니다

    // 마커를 생성합니다
    const marker = new window.kakao.maps.Marker({
      position: markerPosition,
      image: markerImage, // 마커이미지 설정
    });

    // 마커가 지도 위에 표시되도록 설정합니다
    marker.setMap(map);
  }, []);

  return (
    <div className='App'>
      <div
        id='map'
        style={{ width: '50vw', height: '50vh', border: '1px solid red' }}
      />
    </div>
  );
};

export default Map;
