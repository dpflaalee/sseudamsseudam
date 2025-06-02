import React from "react";
import {Form,Input, Button,Card, Typography } from 'antd';

const FindForm = () => {
    const { Title } = Typography;
    return (
        <div>
            <Card title="">
                <Title level={4}>비밀번호 찾기</Title>
                
                <Form>
                    <span style={{fontSize:"10px", color:"lightgray"}}>이메일로 비밀번호 변경 메일이 발송됩니다.</span>
                    <Form.Item 
                    >
                        <Input placeholder="email"/>
                    </Form.Item>
                    <Button type="primary" style={{width:'100%'}} htmlType="submit" className="email-form-button">
                        비밀번호 찾기
                    </Button>
                </Form>
            </Card>
        </div>
    );
}

export default FindForm;