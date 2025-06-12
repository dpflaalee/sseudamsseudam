import React, { useEffect,useState } from 'react';
import AppLayout from '@/components/AppLayout';
import Profile from '@/components/user/Profile';
import PostCard from '@/components/post/PostCard';

import { useDispatch, useSelector } from 'react-redux';
import { END } from 'redux-saga';
import { useRouter } from 'next/router';
import axios from 'axios';
import wrapper from '@/store/configureStore';
import { LOAD_USER_POSTS_REQUEST } from '../../../reducers/post';
import { LOAD_MY_INFO_REQUEST, LOAD_USER_REQUEST } from '../../../reducers/user';
import { LOAD_COMPLAIN_REQUEST } from '@/reducers/complain';
import TARGET_TYPE from '../../../../shared/constants/TARGET_TYPE';
import { LOAD_POSTS_REQUEST } from '../../../reducers/post';
import MyPrize from '@/components/prize/MyPrize';
import AnimalList from '@/components/animal/AnimalList';

const MyPage = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user)
    const { mainPosts } = useSelector(state => state.post)
    const router = useRouter();
    const { myPage } = router.query;
    const { myAnimals, selectedAnimal } = useSelector((state) => state.animal);
    console.log('myPage', myPage);

    // 신고 당한 유저 블라인드 처리
    const { mainComplainCard } = useSelector((state) => state.complain);

    useEffect(() => {
        dispatch({
            type: LOAD_COMPLAIN_REQUEST,
        });
    }, [dispatch]);

    useEffect(() => {
        dispatch({
            type: LOAD_POSTS_REQUEST,
        });
    }, [dispatch]);

    useEffect(() => {
        if (user) {
            dispatch({ type: 'LOAD_ANIMAL_LIST_REQUEST' });
        }
    }, [user, dispatch]);

    const isBlinded = mainComplainCard.some((report) => {
        return Number(report.targetId) === Number(myPage) && report.isBlind && report.targetType === TARGET_TYPE.USER;
    });

    const [showMyPrize, setShowMyPrize] = useState(false); // "내 쿠폰함" 상태

    const onShowMyPrize = () => {
        setShowMyPrize(prev => !prev); // "내 쿠폰함" 버튼 클릭 시 상태 토글
    };


    return (
        <AppLayout>
         <Profile
            postUserId={myPage}
            mainPosts={mainPosts}
            onShowMyPrize={onShowMyPrize}
            isMyProfile={user?.id === myPage}
        />
      
        {/* "내 쿠폰함" 버튼을 클릭했을 때 MyPrize만 렌더링 */}
        {showMyPrize ? (
            <MyPrize />
        ) : (
            // 기본적으로 게시물이 보이게
            !isBlinded && mainPosts.map((post) => {
            return <PostCard post={post} key={post.id} />;
            })
        )}
        <AnimalList animals={myAnimals} />
        </AppLayout>
    );
}

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
    console.log('context.params?.id=', context.params);
    const { myPage } = context.params;
    console.log('mypage=,', myPage);
    //1. cookie 설정
    const cookie = context.req ? context.req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';

    if (context.req && cookie) { axios.defaults.headers.Cookie = cookie; }
    //2. redux 액션
    context.store.dispatch({ type: LOAD_MY_INFO_REQUEST });
    context.store.dispatch({ type: LOAD_COMPLAIN_REQUEST });
    context.store.dispatch({ type: LOAD_POSTS_REQUEST });
    //context.store.dispatch({ type: LOAD_USER_POSTS_REQUEST  , data: context.params.myPage,});
    //context.store.dispatch({ type: LOAD_USER_REQUEST,   data: context.params.myPage, });
    context.store.dispatch(END);

    //   try{
    //     const res = await axios.get(`http://localhost:3065/user/myPage/${userId}`);
    //     const userData = res.data;
    //     await  context.store.sagaTask.toPromise();
    //     const state = context.store.getState();
    //     return {
    //       props: {
    //           userData,
    //       }
    //     }
    //   }catch(error){
    //     console.log('유저 조회 실패:',error);
    //     return {
    //         notFound: true,
    //     }
    //   }
    await context.store.sagaTask.toPromise();
    const state = context.store.getState();

});


export default MyPage;