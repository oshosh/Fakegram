import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Menu } from 'antd'
import styled from 'styled-components';

const SignUpWrapper = styled.section`
    display: flex;
    flex-direction: column;
    margin: 0 auto;

    width: 100%;
    height: 100vh;
    overflow: hidden;

    flex: 1 1 auto;
    background:rgb(240, 240, 240) ;

    & main {
        display: flex;
        justify-content: center;
        align-items: center;
        
        flex-grow: 1;

        & .container-wrapper {

            & .container-signup {
                max-width: 380px;
                flex-grow: 1;
                justify-content: center;
                align-items: center;
                margin: 0 auto;
            }
        }
    }

    & footer {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: auto;
        padding: 0 20px;
        padding-left: 16px;
        padding-right: 16px;

        margin-bottom: 40px;
    }
`

function SignUpLayout({ children }) {
    return (
        <>
            <SignUpWrapper>
                <main>
                    <div className="container-wrapper">
                        <div className="container-signup">
                            {children}
                        </div>
                    </div>
                </main>
                <footer>
                    <div>
                        © 2021 by OH SEHYUN. All rights reserved.
                    </div>
                </footer>
            </SignUpWrapper>
        </>
    );
}

export default SignUpLayout;