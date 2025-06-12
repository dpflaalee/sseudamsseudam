import React, { useEffect } from "react";
import AppLayout from "../../components/AppLayout";
import 'antd/dist/antd.css';
import { useSelector, useDispatch } from "react-redux";
import { LOAD_COMPLAIN_REQUEST } from "@/reducers/complain";
import ComplainCard from "@/components/complains/ComplainCard";

import AdminProfile from "@/components/AdminProfile";
import _ from 'lodash';

const ComplainPage = () => {
    const dispatch = useDispatch();
    const { mainComplainCard } = useSelector((state) => state.complain);

    useEffect(() => {
        dispatch({
            type: LOAD_COMPLAIN_REQUEST,
        });
    }, [dispatch]);

    // 신고 목록을 type + targetId 기준으로 묶기
    const grouped = _.groupBy(mainComplainCard, (r) => `${r.type}_${r.targetId}`);
    const groupedCards = Object.entries(grouped); // [ [groupKey, reports[]], ... ]

    return (
        <AppLayout>
            <AdminProfile />
            {groupedCards.map(([groupKey, reports]) => (
                <ComplainCard key={groupKey} reports={reports} />
            ))}
        </AppLayout>
    );
};

export default ComplainPage;
