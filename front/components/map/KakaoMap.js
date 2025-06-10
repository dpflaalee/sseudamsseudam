import React, { useEffect, useState, useRef } from 'react';

const KakaoMap = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const placesRef = useRef(null);

  useEffect(() => {
    const mapContainer = document.getElementById('map');
    if (!mapContainer || mapContainer.hasChildNodes()) return;

    if (!document.getElementById('kakao-map-script')) {
      const script = document.createElement('script');
      script.id = 'kakao-map-script';
      script.src = "https://dapi.kakao.com/v2/maps/sdk.js?appkey=75091682b75aa23bbfb4b9c8e7ad6b2a&libraries=services&autoload=false";
      script.async = true;

      script.onload = () => {
        window.kakao.maps.load(() => {
          loadMap();
        });
      };

      document.head.appendChild(script);
    } else {
      if (window.kakao && window.kakao.maps) {
        loadMap();
      }
    }

    function loadMap() {
      const mapOption = {
        center: new window.kakao.maps.LatLng(37.56800, 126.98098),
        level: 4,
        mapTypeId: window.kakao.maps.MapTypeId.ROADMAP,
      };

      const map = new window.kakao.maps.Map(mapContainer, mapOption);
      mapRef.current = map;

      window.kakao.maps.event.addListener(map, 'click', function (mouseEvent) {
        console.log('지도에서 클릭한 위치의 좌표는 ' + mouseEvent.latLng.toString() + ' 입니다.');
      });

      const marker = new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(37.56800, 126.98098),
        draggable: true,
        map: map,
      });
      markerRef.current = marker;

      window.kakao.maps.event.addListener(marker, 'click', () => {
        alert('마커를 클릭했습니다!');
      });

      // 기타 마커 이벤트 생략 (필요하면 추가)

      // 장소 검색 서비스 생성
      const ps = new window.kakao.maps.services.Places();
      placesRef.current = ps;
    }
  }, []);

  const handleSearch = () => {
    const ps = placesRef.current;
    const map = mapRef.current;
    const marker = markerRef.current;

    if (!ps) {
      alert('지도 서비스가 아직 준비되지 않았습니다.');
      return;
    }

    if (!searchKeyword.trim()) {
      alert('검색어를 입력해주세요');
      return;
    }

    ps.keywordSearch(searchKeyword, (data, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const firstPlace = data[0];
        const newPos = new window.kakao.maps.LatLng(firstPlace.y, firstPlace.x);
        map.setCenter(newPos);
        marker.setPosition(newPos);
      } else {
        alert('검색 결과가 없습니다.');
      }
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ marginBottom: 10 }}>
        <input
          type="text"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          placeholder="장소를 검색하세요"
          style={{ padding: 5, width: 300 }}
        />
        <button onClick={handleSearch} style={{ marginLeft: 5, padding: '5px 10px' }}>검색</button>
      </div>
      <div
        id="map"
        style={{
          width: '90%',
          maxWidth: '1000px',
          height: '650px',
        }}
      />
    </div>
  );
};

export default KakaoMap;
