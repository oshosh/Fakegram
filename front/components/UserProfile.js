import { Avatar, Button, Card } from 'antd';
import React, { useCallback } from 'react';

function UserProfile({ setIsLoggedIn }) {

    const onLogOut = useCallback(() => {
        setIsLoggedIn(false)
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
                avatar={<Avatar>OH</Avatar>}
                title="OSH"
            ></Card.Meta>
            <Button onClick={onLogOut}>로그아웃</Button>
        </Card>
    );
}

export default UserProfile;