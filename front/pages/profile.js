import React from 'react';
import AppLayout from '../components/AppLayout';
import Head from 'next/head';


function profile() {
    return (
        <>
            <Head>
                <title>프로필 페이지 | Fakegram</title>
            </Head>
            <AppLayout>
                프로필 페이지
            </AppLayout>
        </>
    );
}

export default profile;