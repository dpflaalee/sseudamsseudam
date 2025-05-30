import React, { Component } from "react";
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';   // 공통css
import Head from 'next/head';
<<<<<<< HEAD
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

=======
import {Provider} from 'react-redux';
import wrapper from '../store/configureStore';


const Ssdam = ({Component, ...rest}) =>{
  const {store, props} = wrapper.useWrappedStore(rest);
  return(
  <Provider store={store}>
    <Head>
      <meta charset="utf-8"/>
      <title>Ssdam</title>
    </Head>
    <Component />
  </Provider>
  );
};
Ssdam.propType = {
  
  Component : PropTypes.elementType.isRequired
>>>>>>> origin/SH_0529
}

export default Ssdam;
