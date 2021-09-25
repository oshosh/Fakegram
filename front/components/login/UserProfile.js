import { Avatar, Button, Card } from 'antd';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutRequestAction } from '../../reducers/user';
import CustomAvatar from '../common/CustomAvatar';

function UserProfile() {
    const dispatch = useDispatch()
    const { me, logOutLoading } = useSelector(state => state.user)

    const onLogOut = useCallback(() => {
        dispatch(logoutRequestAction())
    }, [])

    return (
        <Card
            actions={[
                <div key="twit">게시글<br />{me.Posts.length}</div>,
                <div key="followings">팔로잉 <br />{me.Followings.length}</div>,
                <div key="follower">팔로워 <br />{me.Followers.length}</div>,
            ]}
        >
            <Card.Meta
                avatar={
                    <CustomAvatar
                        size={"medium"}
                        textContent={me?.nickname}
                    />
                }
                title="OSH"
            ></Card.Meta>
            <Button loading={logOutLoading} onClick={onLogOut}>로그아웃</Button>
        </Card>
    );
}

export default UserProfile;