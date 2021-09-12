import React from 'react';
import 'antd/dist/antd.css'
import PropTypes from 'prop-types'
import Head from 'next/head'

import wrapper from '../store/configureStore'
function App({ Component }) {
    return (
        <>
            <Head>
                <meta charSet="utf-8"></meta>
                <title>Fakegram</title>
            </Head>
            <Component />
        </>
    );
}

App.protoType = {
    Component: PropTypes.elementType.isRequired
}
export default wrapper.withRedux(App);