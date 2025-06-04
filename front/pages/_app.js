import React from "react";
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';
import Head from 'next/head';
import { Provider } from 'react-redux';
import wrapper from '../store/configureStore';

const Ssdam = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>Ssdam</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
};

Ssdam.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.any.isRequired
};

// next-redux-wrapper에서 withRedux로 감싸기
export default wrapper.withRedux(Ssdam);
