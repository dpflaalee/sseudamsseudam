import React from 'react';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';   // 공통css
import Head from 'next/head';
import {Provider} from 'react-redux';
import wrapper from '../store/configureStore';

const Ssdam = ({ Component , ...rest }) => {
  ///////////////////////////////////////////////// code
  const {store, props} = wrapper.useWrappedStore(rest);
  const { pageProps } = props;
  ///////////////////////////////////////////////// view
  return(
  <Provider store={store}>
      <Head>
        <meta charSet="utf-8"/>
        <title>SseudamSseudam</title>
      </Head>
      <Component/>
  </Provider>
  );
};

Ssdam.propTypes = {
  Component : PropTypes.elementType.isRequired,
  pageProps : PropTypes.any.isRequired
}

export default Ssdam;