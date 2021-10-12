import { SmileOutlined } from '@ant-design/icons';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';

// https://letsbuildui.dev/articles/building-a-dropdown-menu-component-with-react-hooks
function DropdownMenu({ children }) {
    const dropdownRef = useRef(null)
    const [isActive, setIsActive] = useState(false)
    const onClick = () => setIsActive(!isActive)

    useEffect(() => {
        // 만약 현재 활성화 요소를 제외하고 밖을 선택할 경우 닫기
        const pageClickEvent = (e) => {
            if (dropdownRef.current !== null && !dropdownRef.current.contains(e.target)) {
                setIsActive(!isActive);
            }
        }

        // If the item is active (ie open) then listen for clicks
        if (isActive) {
            window.addEventListener('click', pageClickEvent, false);
        }

        return () => {
            window.removeEventListener('click', pageClickEvent, false);
        }
    }, [isActive]);

    const zIndexStyle = useMemo(() => ({ zIndex: 4 }))

    return (
        <MenuContainer
            className="menu-container"
        >
            <button
                type="button"
                onClick={onClick}
                className="menu-trigger"
            >
                <span > <SmileOutlined className="smile-emoji" /></span>
            </button>

            {isActive ?
                (
                    <nav
                        style={zIndexStyle}
                        ref={dropdownRef}
                        className={`menu ${isActive ? 'active' : 'inactive'}`}
                    >
                        <ul>
                            <li><a>{children}</a></li>
                        </ul>
                    </nav>
                ) : ''
            }
        </MenuContainer>
    );
}

export default React.memo(DropdownMenu);

const MenuContainer = styled.div`
    position: relative;

    & .menu {
        background: #ffffff;
        border-radius: 8px;
        position: absolute;
        top: 60px;
        right: -210px;
        width: 300px;
        box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
        opacity: 0;
        visibility: hidden;
        transform: translateY(-20px);
        transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;
    }

    & .menu.active {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
    }

    & .menu ul {
        list-style: none;
        padding: 0;
        margin: 0;
        
    }

    & .menu li {
        border-bottom: 1px solid #dddddd;
        display: block;
        /* padding: 15px 20px; */
    }

    & .menu li a {
        text-decoration: none;
        color: #333333;
        padding: 15px 20px;
        display: block;
    }

    & .menu-trigger {
        width: 70px;
        height: 100%;

        background-color: #fff;
        border: none;
        opacity: 1;
        border-radius: 2px;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 4px 6px;
        
        /* box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3); */
        vertical-align: middle;
        transition: box-shadow 0.4s ease;

        & .smile-emoji {
            font-size: 25px;
        }
    }

    & .menu-trigger:hover {
        /* box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3); */
    }

    & .menu-trigger span {
        font-weight: 700;
        vertical-align: middle;
        font-size: 14px;
        margin: 0 10px;
    }

    & .menu-trigger img {
        border-radius: 90px;
    }
`