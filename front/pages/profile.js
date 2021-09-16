import React from 'react';
import AppLayout from '../components/AppLayout';
import Head from 'next/head';
import NicknameEditForm from '../components/profile/NicknameEditForm';
import TabMenu from '../components/profile/TabMenu';


function profile() {

    const followingList = [{ nickname: 'hso11' }, { nickname: 'hso22' }, { nickname: 'hso33' }]
    const followerList = [{ nickname: 'osh1' }, { nickname: 'osh2' }, { nickname: 'osh3' }]

    return (
        <>
            <Head>
                <title>프로필 페이지 | Fakegram</title>
            </Head>
            <AppLayout>
                <NicknameEditForm />
                <TabMenu
                    followerList={followerList}
                    followingList={followingList}
                />
            </AppLayout>
        </>
    );
}

export default profile;