import React from "react";
import LoginForm from "../components/user/LoginForm";
const login = () => {
    return (
        <div
             style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh", // 화면 전체 높이 확보
            }}
        >
            <LoginForm />
        </div>
    );
};

export default login;