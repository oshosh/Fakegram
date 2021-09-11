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

    & main {
        display: flex;
        justify-content: center;
        align-items: center;
        
        flex-grow: 1;

        & .container-wrapper {

            & .container-signup {
                max-width: 450px;
                flex-grow: 1;
                justify-content: center;
                align-items: center;
                margin: 0 auto;
            }
        }
    }

    & footer {
        margin-top: auto;
        padding: 0 20px;
        padding-left: 16px;
        padding-right: 16px;
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
                        풋터입니다.
                    </div>
                    <div>
                        풋터입니다.
                    </div>
                    <div>
                        풋터입니다.
                    </div>
                    <div>
                        풋터입니다.
                    </div>
                    <div>
                        풋터입니다.
                    </div>
                    <div>
                        풋터입니다.
                    </div>
                </footer>
            </SignUpWrapper>
        </>
    );
}

export default SignUpLayout;