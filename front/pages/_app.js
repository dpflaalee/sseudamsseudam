import React from 'react';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';   // 공통css
import Head from 'next/head';
import {Provider} from 'react-redux';
import wrapper from '../store/configureStore';

<<<<<<< HEAD
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
=======
const Ssdam = ({Component}) =>{
  return(<>
    <Head>
      <meta charset="utf-8"/>
      <title>Ssdam</title>
    </Head>
    <Component />
  </>);
};


Ssdam.protoType = {
  Component : PropTypes.elementType.isRequired

}

export default Ssdam;
>>>>>>> fa4b5d9f4792afd91842fd14171d2d4b9982d2e5
