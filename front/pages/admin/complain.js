import React, { useEffect } from "react";
import AppLayout from "../../components/AppLayout";
import 'antd/dist/antd.css';
import { useSelector, useDispatch } from "react-redux";
import { LOAD_COMPLAIN_REQUEST } from "@/reducers/complain";

import ComplainCard from "../../components/Complains/ComplainCard";

const complain = () => {
    const dispatch = useDispatch();
    const { mainComplainCard } = useSelector((state) => state.complain);

    useEffect(() => {
        dispatch({
            type: LOAD_COMPLAIN_REQUEST,
        });
    }, [dispatch]);

    console.log('🔥 mainComplainCard:', mainComplainCard);

    return (
        <AppLayout>
            <>
                {mainComplainCard.map((c) => {
                    return (
                        <ComplainCard report={c} key={c.id} />
                    );
                })}
            </>

        </AppLayout>);
}

export default complain;