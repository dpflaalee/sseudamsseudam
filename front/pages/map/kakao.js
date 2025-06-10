import React, { useState } from "react";
import AppLayout from "../../components/AppLayout";
import 'antd/dist/antd.css';
import KakaoMap from "@/components/map/KakaoMap";

const KakaoMapPage = () => {
  return (
    <AppLayout>
      <>
      <KakaoMap />
      </>
    </AppLayout >
  );
}

export default KakaoMapPage;