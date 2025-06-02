import React from "react";
import AppLayout from "../../components/AppLayout";
import FindForm from "../../components/user/FindForm";
import { VerticalAlignMiddleOutlined } from "@ant-design/icons";
const find = () => {
    return (
        <AppLayout>
            <div 
                style={{
                width: '100%',             // 부모의 100% 너비를 차지
                display: 'flex',
                justifyContent: 'center',  // FindForm 자체를 중앙 정렬
                alignItems: 'center',      // 세로 중앙 정렬 (필요하다면)
                minHeight: '80vh',         // 높이 확보
            }}
            >
                <FindForm />
            </div>
        </AppLayout>
    );
}

export default find;