import { Avatar, Button, Card } from 'antd';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { logoutAction } from '../../reducers/user';
import CustomAvatar from '../common/CustomAvatar';

function UserProfile() {
    const dispatch = useDispatch()
    const onLogOut = useCallback(() => {
        dispatch(logoutAction())
    }, [])

    return (
        <Card
            actions={[
                <div key="twit">게시글<br />0</div>,
                <div key="followings">팔로잉 <br />0</div>,
                <div key="follower">팔로워 <br />0</div>,
            ]}
        >
            <Card.Meta
                avatar={
                    <CustomAvatar
                        size={"medium"}
                        textContent={"OH"}
                    />
                }
                title="OSH"
            ></Card.Meta>
            <Button onClick={onLogOut}>로그아웃</Button>
        </Card>
    );
}

export default UserProfile;