import React from 'react';
import AppLayout from '../components/AppLayout';
import Head from 'next/head';


function Home() {
    return (
        <>
            <Head>
                <meta charSet="utf-8"></meta>
                <title>FakeGram</title>
            </Head>
            <AppLayout>
                hello, next !
            </AppLayout>
        </>

    );
}

export default Home;
