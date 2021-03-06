import { HeartFilled, HeartOutlined, DownOutlined, UserOutlined } from '@ant-design/icons';
import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { useRouter } from 'next/router'

import { Input, Menu, Row, Col, Dropdown, Avatar } from 'antd';
import { ThemeProvider } from 'styled-components';
import styled, { createGlobalStyle } from 'styled-components';

import UserProfile from './login/UserProfile';
import LoginForm from './login/LoginForm';

import theme from '../theme/theme';
import titleLogo from '../images/logo_text.png'

import HomeImg from '../images/home.png'
import Modal from './common/Modoal'

import HeaderProFile from './header/HeaderProFile';
import HeartContentList from './header/HeartContentList'

import { useSelector } from 'react-redux'
import CustomAvatar from './common/CustomAvatar';
import Counter from './Counter';

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

    const me = useSelector((state) => state.user.me)
    // const isLoggedIn = true
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
                                    placeholder={"???????????? ??????"}
                                />
                            </div>
                            <div className="main-title-right">
                                <nav>
                                    <NavBar>
                                        <li>
                                            <Link href="/" >
                                                <a className="home-logo">
                                                    <img src={HomeImg} alt="?????????" />
                                                    <span className="blind">?????????</span>
                                                </a>
                                            </Link>
                                        </li>
                                        <li>
                                            <div>
                                                <Link href={router.pathname} >
                                                    <a className="content-activity">
                                                        <div className="heart">
                                                            {
                                                                !me
                                                                    ? (<HeartOutlined
                                                                        key="heart"
                                                                        style={{ color: '#000', fontSize: '23px' }}
                                                                    />)
                                                                    : <HeartContentList />
                                                            }
                                                        </div>
                                                        <span className="blind">????????? ??????</span>
                                                    </a>
                                                </Link>

                                            </div>
                                        </li>
                                        <li>
                                            {
                                                me
                                                    ? (<Link href="/profile" >
                                                        <a>
                                                            <HeaderProFile />
                                                        </a>
                                                    </Link>)
                                                    : <CustomAvatar
                                                        size={"medium"}
                                                        icon={<UserOutlined />}
                                                    />
                                            }
                                        </li>
                                    </NavBar>
                                </nav>
                            </div>
                        </HeaderContainer>
                    </HeaderWrapper>
                </header>

                <Row gutter={8}>
                    <Col xxl={4} xl={4} lg={5} xs={24} md={24}>
                        {
                            me
                                ? <UserProfile />
                                : <LoginForm />
                        }
                    </Col>
                    <Col xxl={4} xl={3} />
                    <Col xxl={8} xl={11} lg={13} xs={24} md={24} >
                        {children}
                    </Col>
                    <Col xxl={6} xl={6} lg={6} xs={24} md={24}>
                        {/* next.js?????? localstorge ?????? ?????? ?????? */}
                        <Counter />
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
    body {
        background: #fafafa;
    }
    header {
        background: #fff;
    }
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