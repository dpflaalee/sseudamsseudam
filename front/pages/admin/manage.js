import React, { useEffect } from "react";
import AppLayout from "../../components/AppLayout";
import 'antd/dist/antd.css';
import { useSelector, useDispatch } from "react-redux";
import { LOAD_COMPLAIN_REQUEST } from "@/reducers/complain";

import AdminProfile from "@/components/AdminProfile";

const manage = () => {
    const dispatch = useDispatch();


    return (
        <AppLayout>
            <>
                <AdminProfile />
            </>

        </AppLayout>);
}

export default manage;