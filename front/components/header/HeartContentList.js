import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link'
import styled from 'styled-components';

import { HeartFilled, HeartOutlined, UserOutlined } from '@ant-design/icons';
import { Menu, Avatar, Dropdown, Card } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { logoutRequestAction } from '../../reducers/user';

const HeartWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

function HeaderProFile() {
    const dispatch = useDispatch();
    const [heartActive, setHeartActive] = useState(true)

    const onHeartClick = useCallback((text) => {
        switch (text) {
            case 'on':
                setHeartActive(false)
                break;
            case 'close':
                setHeartActive(true)
                break;
        }
    }, [heartActive])

    const card = (
        <Card
            title={'테스트 타이틀'}
            cover={'테스트 커버'}
        >
            <Card.Meta
                title={'카드메타'}
                description={'카드메타 설명 카드메타 설명카드메타 설명카드메타 설명카드메타 설명카드메타 설명'}
            />
            asdfasd

        </Card>
    );

    const handleVisibleChange = useCallback((visible) => {
        if (!visible) {
            setHeartActive(true)
        }
    }, [heartActive])

    return (
        <Dropdown
            overlay={card}
            overlayStyle={{ width: '600px', height: '200px' }}
            trigger={["click"]}
            placement="bottomLeft"
            disabled={false}
            onVisibleChange={handleVisibleChange}
        >
            <div onClick={e => e.preventDefault()}>
                {
                    heartActive
                        ? (
                            <HeartWrapper>
                                <HeartOutlined
                                    key="heart"
                                    style={{ color: '#000', fontSize: '23px' }}
                                    onClick={() => onHeartClick('on')}
                                />
                            </HeartWrapper>
                        )
                        : (
                            <HeartWrapper>
                                <HeartFilled
                                    key="heart"
                                    style={{ color: '#000', fontSize: '23px' }}
                                    onClick={() => onHeartClick('close')}
                                />
                            </HeartWrapper>
                        )
                }
            </div>
        </Dropdown>
    );
}

export default HeaderProFile;