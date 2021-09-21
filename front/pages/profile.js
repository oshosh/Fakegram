import React, { useEffect } from 'react';
import AppLayout from '../components/AppLayout';
import Head from 'next/head';
import NicknameEditForm from '../components/profile/NicknameEditForm';
import TabMenu from '../components/profile/TabMenu';
import { useSelector } from 'react-redux';
import Router from 'next/router';


function profile() {
    const { me } = useSelector((state) => state.user)
    const followingList = [{ nickname: 'hso11' }, { nickname: 'hso22' }, { nickname: 'hso33' }]
    const followerList = [{ nickname: 'osh1' }, { nickname: 'osh2' }, { nickname: 'osh3' }]

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
                    followerList={followerList}
                    followingList={followingList}
                />
            </AppLayout>
        </>
    );
}

export default profile;