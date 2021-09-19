import Slider from 'react-slick';
import React, { useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

export const Global = createGlobalStyle`
    .slick-slide {
        display: inline-block;
        text-align: center;
    }
    .slick-initialized { overflow: hidden; }
    
    .slick-slide div{
      outline: none;
    }

    .slick-dots {
        display: flex !important;
        justify-content: center;
        margin: 0;
        padding: 1rem 0;
	
	    list-style-type: none;
	
        li {
            margin: 0 0.25rem;
        }

        button {
            display: block;
            width: 1rem;
            height: 1rem;
            padding: 0;
            
            border: none;
            border-radius: 100%;
            background-color: orange;
            
            text-indent: -9999px;
        }

        li.slick-active button {
            background-color: red;
        }
        
    }
`

const SlickWrapper = styled.div`
    height: calc(100% - 44px); 
`

const SlickSlide = styled.img`
    margin: 0 auto;
    max-height: 750px;
`



function PostSlick({ src }) {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
    };

    return (
        <>
            <Global />

            <SlickWrapper className="container">
                <Slider {...settings}>
                    {
                        [src, src, src, src].map((data) => {
                            return (
                                <div>
                                    <SlickSlide src={data} />
                                </div>
                            )
                        })
                    }
                </Slider>
            </SlickWrapper>
        </>
    );
}

export default PostSlick;