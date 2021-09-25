import React, { useEffect } from 'react';
import AppLayout from '../components/AppLayout';
import Head from 'next/head';
import NicknameEditForm from '../components/profile/NicknameEditForm';
import TabMenu from '../components/profile/TabMenu';
import { useSelector } from 'react-redux';
import Router from 'next/router';


function Profile() {
    const { me } = useSelector((state) => state.user)

    useEffect(() => {
        if (!(me?.id)) {
            Router.push('/')
        }
    }, [me?.id]) // 첫 번째 렌더링 후에 호출되며 me.id가 호출 될때 마다

    return (
        <>
            <Head>
                <title>프로필 페이지 | Fakegram</title>
            </Head>
            <AppLayout>
                <NicknameEditForm />
                <TabMenu
                    followerList={me?.Followings}
                    followingList={me?.Followers}
                />
            </AppLayout>
        </>
    );
}

export default Profile;