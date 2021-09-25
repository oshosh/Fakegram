import React from 'react';
import AppLayout from '../components/AppLayout';
import Head from 'next/head';
import { useSelector } from 'react-redux';

import PostForm from '../components/postForm/PostForm'
import PostCard from '../components/postCard/PostCard'

function Home() {
    const { me } = useSelector((state) => state.user);
    const { mainPosts } = useSelector((state) => state.post);

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
