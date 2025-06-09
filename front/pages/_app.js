import React, { Component } from "react";
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';   // 공통css
import Head from 'next/head';
import { Provider } from 'react-redux';
import wrapper from '../store/configureStore';

<<<<<<< HEAD
const Ssdam = ({ Component, ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;
=======
const Ssdam = ({ Component}) => {
  //const { store, props } = wrapper.useWrappedStore(rest);
  //const { pageProps } = props;
>>>>>>> 40eb36b40a243cdce7d3730a781b1a858dec2d91
  return (
    //<Provider store={store}>
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>Ssdam</title>
      </Head>
      <Component />
    </>
    //</Provider>
  );
};
Ssdam.propType = {
  Component: PropTypes.elementType.isRequired,
 // pageProps : PropTypes.any.isRequired
}

export default wrapper.withRedux(Ssdam);
