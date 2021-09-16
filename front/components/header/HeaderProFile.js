import React, { useCallback } from 'react';
import Link from 'next/link'
import styled from 'styled-components';

import { UserOutlined } from '@ant-design/icons';
import { Menu, Avatar, Dropdown } from 'antd';
import { useDispatch } from 'react-redux';

import { logoutAction } from '../../reducers/user'

const MenuWrapper = styled(Menu)`
    border-radius: 5px;
    width: 150px;
`;

function HeaderProFile() {
    const dispatch = useDispatch();

    const onLogOut = useCallback(() => {
        dispatch(logoutAction())
    }, [])

    const menu = (
        <MenuWrapper>
            <Menu.Item icon={<UserOutlined />} disabled={false}>
                <Link href="/profile" >
                    <a>프로필</a>
                </Link>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item
                danger
                onClick={onLogOut}
            >
                로그아웃
            </Menu.Item>
        </MenuWrapper>
    );

    return (
        <Dropdown
            overlay={menu}
            trigger={["click"]}
            placement="bottomLeft"
            disabled={false}
        >
            <div onClick={e => e.preventDefault()}>
                <Avatar
                    size="medium"
                // icon={<UserOutlined />}
                >
                    OSH
                </Avatar>
            </div>
        </Dropdown>
    );
}

export default HeaderProFile;