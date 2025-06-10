import 'antd/dist/antd.css';
import React, { useEffect } from 'react';
import AppLayout from '@/components/AppLayout';
import { useDispatch, useSelector } from 'react-redux';

import PostCard from '@/components/post/PostCard';

import { LOAD_POSTS_REQUEST } from '@/reducers/post';
//// import 수정

const Home = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.user);
    const { mainPosts, hasMorePosts, loadPostsLoading } = useSelector(state => state.post);
    console.log('👩‍🦳 mainPosts ', mainPosts);
    useEffect(() => {
        if (!loadPostsLoading && (mainPosts.length === 0 || hasMorePosts)) {
            const lastId = mainPosts[mainPosts.length - 1]?.id || 0;
            dispatch({
                type: LOAD_POSTS_REQUEST,
                data: lastId,
            });
        }
    }, []);

    useEffect(() => {
        function onScroll() {
            console.log(window.screenY, document.documentElement.clientHeight, document.documentElement.scrollHeight)
            if (window.screenY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 200) {
                if (hasMorePosts && !loadPostsLoading) {
                    dispatch({
                        type: LOAD_POSTS_REQUEST,
                        data: mainPosts[mainPosts.length - 1]?.id,
                    })
                }
            }
        }
        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        }
    }, [mainPosts, hasMorePosts, loadPostsLoading]);

    return (
        <AppLayout>
            {mainPosts
                .filter((post) => post.User.isAdmin)
                .map((post) => (
                    <PostCard post={post} key={post.id} />
                ))}

            {mainPosts.filter((post) => post.User?.isAdmin === true).length === 0 && (
                <div>공지사항이 없습니다.</div>
            )}
        </AppLayout>
    );
}

export default Home;
