import React, { Component } from "react";
import PropTypes from "prop-types";
import 'antd/dist/antd.css';
import Head from 'next/head';

const Test = ({Component}) =>{
  return(<>
    <Head>
      <meta charset="utf-8"/>
      <title>Test</title>
    </Head>
    <Component/>
  </>);
};

Test.protoType = {
  Component : PropTypes.elementType.isRequired
}

export default Test;