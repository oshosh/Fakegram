import React, { useEffect, useState } from 'react';
import AppLayout from '../components/AppLayout';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import throttle from "lodash/throttle";

import PostForm from '../components/postForm/PostForm'
import PostCard from '../components/postCard/PostCard'
import { LOAD_POSTS_REQUEST } from '../reducers/post';

import BetterInfiniteScroll from '../components/common/BetterInfiniteScroll'

function Home() {
    const { me } = useSelector((state) => state.user);
    const { mainPosts, hasMorePosts, loadPostsLoading } = useSelector((state) => state.post);
    const dispatch = useDispatch()
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        if (mainPosts.length >= 100) {
            setHasMore(false);
        }
    }, [mainPosts.length]);

    useEffect(() => {
        dispatch({
            type: LOAD_POSTS_REQUEST
        })
    }, [])

    const onScroll = () => {
        if (hasMorePosts && !loadPostsLoading) {
            dispatch({
                type: LOAD_POSTS_REQUEST
            })
        }
    }

    const isRowLoaded = ({ index }) => {
        index < mainPosts.length && mainPosts[index] !== null;
    }
    const rowRenderer = ({ index, key, style, ...rest }) => {

        style = { ...style, display: 'flex', flexDirection: 'column', height: '100%', marginTop: '20px', border: '1px solid #d2d2d2', borderRadius: '5px', background: '#fff', marginBottom: '20px' }

        return (
            <PostCard
                key={key}
                post={mainPosts[index]}
                style={style}
            />
        )
    }
    return (
        <>
            <Head>
                <meta charSet="utf-8"></meta>
                <title>Fakegram</title>
            </Head>
            <AppLayout>

                {me && <PostForm />}

                <BetterInfiniteScroll
                    dataLength={mainPosts.length}
                    hasMore={hasMore}
                    next={onScroll}
                    loader={
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                        >
                            loading...
                        </div>
                    }
                    height={1500}
                    elementHeight={1000} // 새로 추가
                    rowRenderer={rowRenderer}
                    children={mainPosts}
                />

            </AppLayout>
        </>

    );
}

export default Home;
