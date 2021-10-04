import React, { useEffect } from 'react';
import AppLayout from '../components/AppLayout';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';

import PostForm from '../components/postForm/PostForm'
import PostCard from '../components/postCard/PostCard'
import { LOAD_POSTS_REQUEST } from '../reducers/post';

function Home() {
    const { me } = useSelector((state) => state.user);
    const { mainPosts, hasMorePosts, loadPostsLoading } = useSelector((state) => state.post);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch({
            type: LOAD_POSTS_REQUEST
        })
    }, [])

    useEffect(() => {
        function onScroll() {
            if ((window.scrollY + document.documentElement.clientHeight) > document.documentElement.scrollHeight - 300) {
                if (hasMorePosts && !loadPostsLoading) {
                    dispatch({
                        type: LOAD_POSTS_REQUEST
                    })
                }
            }
        }
        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll)
        }
    }, [hasMorePosts, loadPostsLoading])

    return (
        <>
            <Head>
                <meta charSet="utf-8"></meta>
                <title>Fakegram</title>
            </Head>
            <AppLayout>
                {me && <PostForm />}

                {mainPosts.map((post, idx) => {
                    return (<PostCard
                        key={post.id}
                        post={post}
                    />)
                })}

            </AppLayout>
        </>

    );
}

export default Home;
