import React, { Component } from "react";
import PropTypes from "prop-types";
import 'antd/dist/antd.css';
import Head from 'next/head';
import { Provider } from "react-redux";
import wrapper from '../store/configureStore';  //## 

const Ssdam = ({ Component, ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;
  return (<>
    <Provider store={store}>
      <Head>
        <meta charset="utf-8" />
        <title>Ssdam</title>
      </Head>
      <Component />
    </Provider>
  </>);
};


Ssdam.protoType = {
  Component: PropTypes.elementType.isRequired

}

export default Ssdam;
