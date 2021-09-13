import { HeartFilled, HeartOutlined, DownOutlined, UserOutlined } from '@ant-design/icons';
import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { useRouter } from 'next/router'

import { Input, Menu, Row, Col, Dropdown, Avatar } from 'antd';
import { ThemeProvider } from 'styled-components';
import styled, { createGlobalStyle } from 'styled-components';

import UserProfile from '../components/UserProfile';
import LoginForm from '../components/LoginForm';

import theme from '../theme/theme';
import titleLogo from '../images/logo_text.png'

import HomeImg from '../images/home.png'
import Modal from '../components/Modoal'
import HeaderProFile from './HeaderProFile';

import { useSelector } from 'react-redux'

const HeaderWrapper = styled.div`
    max-width: 1100px;
    margin: 0 auto;
`
const HeaderContainer = styled.div`
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    & .main-title-left {
        & img {
            width: 140px;
            height: 40px;
            object-fit: contain;
        }

        & span {
            ${({ theme }) => theme.common.SpanBlind}
        }
    }

    & .main-title-right {
        display: flex;
    }
`

const NavBar = styled.ul`
    display: flex;
    list-style: none;
    padding: 16px 0 0 4px;
    justify-content: center;
    align-items: center;

    & li {
        margin-right: 1.5rem;

        & .home-logo {
            & img {
                width: 20px;
            }
        }
        & .content-activity{
            & .heart {
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }

        & .blind {
            ${({ theme }) => theme.common.SpanBlind}    
        }
    }
`
const SearchInput = styled(Input.Search)`
    vertical-align: middle;
`;

const HeartContent = styled.div`
    position: absolute;
    top: -600px;
    right: -300px;

    width: 500px;
    height: 200px;

    border-radius: 5px;
    background: tomato;
    z-index: 5;
`

function AppLayout({ children }) {
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn)
    const data = useSelector((state) => state)

    const [heartActive, setHeartActive] = useState(true)
    const [modalVisible, setModalVisible] = useState(false)

    const router = useRouter()

    const openModal = useCallback((e) => setModalVisible(true), [])
    const closeModal = useCallback((e) => {
        setHeartActive(true)
        setModalVisible(false)
    }, [])

    const onHeartClick = useCallback(() => {
        setHeartActive((prevState) => !prevState)
        openModal()
    }, [openModal])


    return (
        <>
            <Global />
            <ThemeProvider theme={theme}>
                <header style={{ borderBottom: "1px solid #d2d2d2" }}>
                    <HeaderWrapper>
                        <HeaderContainer>
                            <div className="main-title-left">
                                <Link href="/" >
                                    <a>
                                        <img src={titleLogo} alt="Fakegram_home" />
                                        <span className="blind">Fakegram</span>
                                    </a>
                                </Link>
                            </div>
                            <div className="main-title-middle">
                                <SearchInput
                                    enterButton
                                    style={{ verticalAlign: "middle" }}
                                    placeholder={"해시태그 검색"}
                                />
                            </div>
                            <div className="main-title-right">
                                <nav>
                                    <NavBar>
                                        <li>
                                            <Link href="/" >
                                                <a className="home-logo">
                                                    <img src={HomeImg} alt="홈으로" />
                                                    <span className="blind">홈으로</span>
                                                </a>
                                            </Link>
                                        </li>
                                        <li>
                                            <div>
                                                <Link href={router.pathname} >
                                                    <a className="content-activity">
                                                        <div className="heart">
                                                            {
                                                                heartActive
                                                                    ? (
                                                                        <HeartOutlined
                                                                            key="heart"
                                                                            style={{ color: '#000', fontSize: '20px' }}
                                                                            onClick={() => onHeartClick('on')}
                                                                        />
                                                                    )
                                                                    : <HeartFilled
                                                                        key="heart"
                                                                        style={{ color: '#000', fontSize: '20px' }}
                                                                        onClick={() => onHeartClick('close')}
                                                                    />
                                                            }
                                                        </div>
                                                        <span className="blind">게시물 활동</span>
                                                    </a>
                                                </Link>

                                            </div>
                                            <div>
                                                {
                                                    modalVisible
                                                    && <Modal
                                                        visible={modalVisible}
                                                        closable={true}
                                                        maskClosable={true}
                                                        onClose={closeModal}>
                                                        {
                                                            !heartActive
                                                                ? <HeartContent className="content-heart">
                                                                    123123124
                                                                </HeartContent>
                                                                : null
                                                        }
                                                    </Modal>
                                                }
                                            </div>
                                        </li>
                                        <li>
                                            {
                                                isLoggedIn
                                                    ? (<Link href="/profile" >
                                                        <a>
                                                            <HeaderProFile />
                                                        </a>
                                                    </Link>)
                                                    : <Avatar size="medium" icon={<UserOutlined />} />
                                            }
                                        </li>
                                    </NavBar>
                                </nav>
                            </div>
                        </HeaderContainer>
                    </HeaderWrapper>
                </header>

                <Row gutter={8}>
                    <Col lg={4} xs={24} md={4}>
                        {
                            isLoggedIn
                                ? <UserProfile />
                                : <LoginForm />
                        }
                    </Col>
                    <Col lg={13} xs={24} md={13} >
                        {children}
                    </Col>
                    <Col lg={7} xs={24} md={7}>
                        오른쪽
                    </Col>
                </Row>
            </ThemeProvider>
        </>
    );
}

AppLayout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default AppLayout;

const Global = createGlobalStyle`
    .ant-row {
        margin-right: 0 !important;
        margin-left: 0 !important;
    }

    .ant-col:first-child {
        padding-left: 0 !important;
    }
    .ant-col:last-child{
        padding-right: 0 !important;
    }
`