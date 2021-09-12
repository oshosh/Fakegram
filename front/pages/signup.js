import React, { useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router'
import { Button, Checkbox, Form, Input } from 'antd';

import { Controller, useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message'
import { yupResolver } from '@hookform/resolvers/yup';
import { signUpValidation } from '../hooks/yup'
import styled from 'styled-components';
import SignUpLayout from '../components/SignUpLayout';

import titleLogo from '../images/logo_text.png'
import Link from 'next/link';

const RequiredText = styled.p`
    font-size: 0.6rem;
    margin-top: 1px;
    color: #bf1650;

     &::before {
        content: "⚠ ";
        display: inline;
     }
`;
const FromWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 1.2rem;
    background: #fff;
    
    padding: 34px;
    
    border: 1px solid #d2d2d2;
    border-radius: 5px;

    & .form-header {
        width: 173px;
        height: 50px;
        background: url(${titleLogo}) no-repeat;
        background-size: cover;
        margin-bottom: 0.7rem
    }

    & .header-subtitle h2 {
        font-size: 16px;
        font-weight: 600;
        line-height: 1.3;
        margin: 0 40px 10px;
        color: #8e8e8e;
        text-align: center;
    }

    & .header-divider {
        display: flex;
        flex-direction: row;
        align-items: stretch;
        margin: 10px 40px 18px;
        width: 76%;

        & .divider1{
            
            display: flex;
            height: 1px;
            background-color: #dbdbdb;
            /* flex-shrink: 1;
            flex-grow: 1; */
            flex: 1 1 auto;
            position: relative;
            top: 0.45rem;
        }

        & .divider2{
            color: #8e8e8e;
            font-size: 13px;
            font-weight: 600;
            line-height: 15px;
            margin: 0 18px;
        }

        & .divider3{
            display: flex;
            height: 1px;
            background-color: #dbdbdb;
            flex: 1 1 auto;
            position: relative;
            top: 0.45rem;
        }
    }
`

const CustomAntdForm = styled(Form)`
    margin-top: 0.5rem;
    width: 258px;
    & div {
        margin-bottom: 0.5rem;
    }
`

const GotoHome = styled.div`
    background: #fff;
    display: flex;
    justify-content: space-around;
    padding: 34px;
    border: 1px solid #d2d2d2;
    border-radius: 5px;
`

function signup() {
    const router = useRouter()
    const { register, handleSubmit, watch, formState: { errors }, setValue, control } = useForm({
        resolver: yupResolver(signUpValidation),
        mode: 'onBlur',
    });

    useEffect(() => {
        createKakaoButton()
    }, [])

    const createKakaoButton = useCallback((e) => {
        if (window.Kakao) {
            const kakao = window.Kakao
            if (!kakao.isInitialized()) {
                kakao.init(process.env.KAKAO_SECRET_JS_KEY)

                Kakao.Auth.createLoginButton({
                    container: '#kakaoLoginBtn',
                    success: function (response) {

                        kakao.API.request({
                            url: "/v2/user/me",
                            success: function (response) {
                                const { id, email, nickname } = response
                                console.log(id);
                                console.log(email);
                                console.log(nickname);
                            },
                            fail: function (error) {
                                console.error(error)
                            },
                        })
                    },
                    fail: function (error) {
                        console.error(error)
                    },
                });
            }
        }
    }, [])

    const onSubmitSend = useCallback((e) => {
        console.log(watch())
    }, [])

    const logout = () => {
        const kakao = window.Kakao
        kakao.isInitialized()
        if (!kakao.Auth.getAccessToken()) {
            console.log('Not logged in.');
            return;
        }
        kakao.Auth.logout(function () {
            console.log(kakao.Auth.getAccessToken());
        });
    }


    return (

        <>
            <Head>
                <title>회원가입 페이지 | Fakegram</title>
            </Head>
            <SignUpLayout>
                <FromWrapper>
                    <div className="form-header" />
                    <div className="header-subtitle">
                        <h2>친구들의 사진과 동영상을 보려면 가입하세요.</h2>
                    </div>
                    {

                        <button
                            id={"kakaoLoginBtn"}
                        >
                            로그인
                        </button>
                    }
                    <button
                        id={"lgo"}
                        onClick={logout}
                    >
                        로그아웃
                    </button>

                    <div className="header-divider">
                        <div className="divider1"></div>
                        <div className="divider2">또는</div>
                        <div className="divider3"></div>
                    </div>


                    <CustomAntdForm onFinish={handleSubmit(onSubmitSend)}>
                        <div>
                            <Controller
                                as={<Input />}
                                type="text"
                                name="id"
                                control={control}
                                placeholder="이메일 주소"
                                defaultValue=""
                            />
                            <ErrorMessage
                                errors={errors}
                                name="id"
                                render={({ message }) => {
                                    return (
                                        <RequiredText>{message}</RequiredText>
                                    )
                                }}
                            />
                        </div>
                        <div>
                            <Controller
                                as={<Input />}
                                type="text"
                                name="nickname"
                                control={control}
                                placeholder="닉네임"
                                defaultValue=""
                            />
                            <ErrorMessage
                                errors={errors}
                                name="nickname"
                                render={({ message }) => {
                                    return (
                                        <RequiredText>{message}</RequiredText>
                                    )
                                }}
                            />
                        </div>
                        <div>
                            <Controller
                                as={<Input />}
                                type="password"
                                name="password"
                                control={control}
                                placeholder="패스워드"
                                defaultValue=""
                            />
                            <ErrorMessage
                                errors={errors}
                                name="password"
                                render={({ message }) => {
                                    return (
                                        <RequiredText>{message}</RequiredText>
                                    )
                                }}
                            />
                        </div>
                        <div>
                            <Controller
                                as={<Input />}
                                type="password"
                                name="repassword"
                                control={control}
                                placeholder="패스워드 재입력"
                                defaultValue=""
                            />
                            <ErrorMessage
                                errors={errors}
                                name="repassword"
                                render={({ message }) => {
                                    return (
                                        <RequiredText>{message}</RequiredText>
                                    )
                                }}
                            />
                        </div>
                        <div>
                            <Controller
                                name="term"
                                control={control}
                                defaultValue={false}
                                render={({ onChange, value }) => {
                                    return (
                                        <Checkbox
                                            onChange={e => onChange(e.target.checked)}
                                            checked={value}
                                        >
                                            약관에 동의 하시겠습니까 ?
                                        </Checkbox>
                                    )
                                }}
                            />
                            <ErrorMessage
                                errors={errors}
                                name="term"
                                render={({ message }) => {
                                    return (
                                        <RequiredText>{message}</RequiredText>
                                    )
                                }}
                            />
                        </div>
                        <div>
                            <Button
                                type="primary"
                                htmlType="submit"
                                block
                            >
                                가입하기
                            </Button>
                        </div>
                    </CustomAntdForm >
                </FromWrapper>

                <GotoHome>
                    계정이 있으신가요 ?
                    <Link href="/">
                        <a>
                            로그인 하러가기
                        </a>
                    </Link>
                </GotoHome>

            </SignUpLayout>
        </>
    );
}

export default signup;